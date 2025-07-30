
export interface LinkedInProfile {
    id: string;
    firstName: string;
    lastName: string;
    headline: string;
    profilePicture?: string;
    vanityName?: string;
}

export interface LinkedInPost {
    id: string;
    text: string;
    author: string;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    shareCount: number;
}

export class LinkedInClient {
    private accessToken: string | null = null;
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor() {
        this.clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || '';
        this.clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET || '';
        this.redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || 'https://promptfolio.alexsaulea.com/auth/linkedin';
    }    // OAuth2 Authorization
    getAuthUrl(): string {
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            scope: 'r_liteprofile',
            state: this.generateState()
        });

        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
        console.log('🔍 LinkedIn Auth Debug Info:');
        console.log('Client ID:', this.clientId);
        console.log('Redirect URI:', this.redirectUri);
        console.log('Generated Auth URL:', authUrl);

        return authUrl;
    } async exchangeCodeForToken(code: string): Promise<string> {
        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
            }),
        });

        const data = await response.json();
        this.accessToken = data.access_token;

        // Store token securely
        localStorage.setItem('linkedin_access_token', this.accessToken);

        return this.accessToken;
    }

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    // Get user profile
    async getProfile(): Promise<LinkedInProfile> {
        if (!this.accessToken) throw new Error('No access token available');

        const response = await fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,headline,profilePicture(displayImage~:playableStreams))', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        return {
            id: data.id,
            firstName: data.firstName.localized.en_US,
            lastName: data.lastName.localized.en_US,
            headline: data.headline?.localized?.en_US || '',
            profilePicture: data.profilePicture?.displayImage?.elements?.[0]?.identifiers?.[0]?.identifier
        };
    }

    // Create a post
    async createPost(text: string, imageUrl?: string): Promise<LinkedInPost> {
        if (!this.accessToken) throw new Error('No access token available');

        const profile = await this.getProfile();
        const authorUrn = `urn:li:person:${profile.id}`;

        const postData: any = {
            author: authorUrn,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: {
                        text: text
                    },
                    shareMediaCategory: imageUrl ? 'IMAGE' : 'NONE'
                }
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
            }
        };

        if (imageUrl) {
            // For images, we'd need to upload the image first
            // This is a simplified version
            postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
                status: 'READY',
                description: {
                    text: 'Image description'
                },
                media: imageUrl,
                title: {
                    text: 'Image title'
                }
            }];
        }

        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to create post: ${error}`);
        }

        const result = await response.json();

        return {
            id: result.id,
            text: text,
            author: authorUrn,
            createdAt: new Date().toISOString(),
            likeCount: 0,
            commentCount: 0,
            shareCount: 0
        };
    }

    // Schedule a post (would require backend service)
    async schedulePost(text: string, scheduledTime: Date, imageUrl?: string): Promise<{ id: string; scheduledTime: Date }> {
        // This would typically be handled by a backend service
        // For now, we'll store it locally and handle scheduling client-side
        const scheduledPost = {
            id: `scheduled_${Date.now()}`,
            text,
            imageUrl,
            scheduledTime,
            status: 'scheduled'
        };

        const existingPosts = JSON.parse(localStorage.getItem('scheduled_linkedin_posts') || '[]');
        existingPosts.push(scheduledPost);
        localStorage.setItem('scheduled_linkedin_posts', JSON.stringify(existingPosts));

        return {
            id: scheduledPost.id,
            scheduledTime
        };
    }

    // Get scheduled posts
    getScheduledPosts(): any[] {
        return JSON.parse(localStorage.getItem('scheduled_linkedin_posts') || '[]');
    }

    // Helper methods
    private generateState(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Get user's companies/organizations
    async getCompanies(): Promise<any[]> {
        if (!this.accessToken) throw new Error('No access token available');

        const response = await fetch('https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch companies');
        return await response.json();
    }

    // Get post analytics
    async getPostAnalytics(postId: string): Promise<any> {
        if (!this.accessToken) throw new Error('No access token available');

        const response = await fetch(`https://api.linkedin.com/v2/socialActions/${postId}/likes`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch post analytics');
        return await response.json();
    }

    // Get user's network info
    async getNetworkInfo(): Promise<any> {
        if (!this.accessToken) throw new Error('No access token available');

        const response = await fetch('https://api.linkedin.com/v2/people/~:(firstName,lastName,headline,numConnections)', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch network info');
        return await response.json();
    }

    // Create company post (if you manage company pages)
    async createCompanyPost(companyId: string, text: string, imageUrl?: string): Promise<any> {
        if (!this.accessToken) throw new Error('No access token available');

        const authorUrn = `urn:li:organization:${companyId}`;

        const postData: any = {
            author: authorUrn,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: {
                        text: text
                    },
                    shareMediaCategory: imageUrl ? 'IMAGE' : 'NONE'
                }
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
            }
        };

        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to create company post: ${error}`);
        }

        return await response.json();
    }

    // Get user's posts history
    async getUserPosts(limit: number = 10): Promise<LinkedInPost[]> {
        if (!this.accessToken) throw new Error('No access token available');

        // Note: This requires additional permissions and might need backend implementation
        // LinkedIn API has restrictions on accessing user's own posts
        const response = await fetch(`https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:${(await this.getProfile()).id}&count=${limit}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch user posts');

        const data = await response.json();
        return data.elements?.map((post: any) => ({
            id: post.id,
            text: post.text?.text || '',
            author: post.owner,
            createdAt: new Date(post.created?.time || Date.now()).toISOString(),
            likeCount: 0, // Would need separate API call
            commentCount: 0, // Would need separate API call
            shareCount: 0 // Would need separate API call
        })) || [];
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!this.accessToken || !!localStorage.getItem('linkedin_access_token');
    }

    // Initialize from stored token
    initializeFromStorage(): boolean {
        const token = localStorage.getItem('linkedin_access_token');
        if (token) {
            this.accessToken = token;
            return true;
        }
        return false;
    }

    // Check and handle pending authorization code
    async handlePendingAuth(): Promise<boolean> {
        const authCode = localStorage.getItem('linkedin_auth_code');
        const timestamp = localStorage.getItem('linkedin_auth_timestamp');

        if (authCode && timestamp) {
            // Check if code is still fresh (within 10 minutes)
            const codeAge = Date.now() - parseInt(timestamp);
            if (codeAge < 10 * 60 * 1000) { // 10 minutes
                try {
                    await this.exchangeCodeForToken(authCode);
                    // Clean up
                    localStorage.removeItem('linkedin_auth_code');
                    localStorage.removeItem('linkedin_auth_timestamp');
                    return true;
                } catch (error) {
                    console.error('Failed to exchange LinkedIn auth code:', error);
                    // Clean up failed attempt
                    localStorage.removeItem('linkedin_auth_code');
                    localStorage.removeItem('linkedin_auth_timestamp');
                }
            } else {
                // Code expired, clean up
                localStorage.removeItem('linkedin_auth_code');
                localStorage.removeItem('linkedin_auth_timestamp');
            }
        }
        return false;
    }

    // Logout
    logout(): void {
        this.accessToken = null;
        localStorage.removeItem('linkedin_access_token');
    }
}

export const linkedinClient = new LinkedInClient();
