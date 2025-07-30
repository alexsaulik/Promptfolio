import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const LinkedInDebugTest = () => {
    const testBasicAuth = () => {
        const clientId = '776znbpfsmf1yd';
        const redirectUri = 'http://localhost:8080/auth/linkedin';

        // Most basic LinkedIn OAuth URL
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile`;

        console.log('🔍 Debug: Opening URL:', authUrl);
        window.open(authUrl, '_blank');
    };

    const testEnvironmentVars = () => {
        console.log('🔍 Environment Variables:');
        console.log('Client ID:', import.meta.env.VITE_LINKEDIN_CLIENT_ID);
        console.log('Client Secret:', import.meta.env.VITE_LINKEDIN_CLIENT_SECRET ? 'Present' : 'Missing');
        console.log('Redirect URI:', import.meta.env.VITE_LINKEDIN_REDIRECT_URI);
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>LinkedIn Debug Tests</CardTitle>
                <CardDescription>Test different LinkedIn auth scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={testEnvironmentVars} variant="outline" className="w-full">
                    Check Environment Variables
                </Button>
                <Button onClick={testBasicAuth} className="w-full">
                    Test Basic LinkedIn Auth
                </Button>
            </CardContent>
        </Card>
    );
};
