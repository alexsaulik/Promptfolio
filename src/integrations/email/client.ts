export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    body: string;
    variables: string[];
    category: 'business' | 'marketing' | 'personal' | 'automated';
}

export interface EmailContact {
    email: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    tags?: string[];
}

export interface EmailCampaign {
    id: string;
    name: string;
    templateId: string;
    contacts: EmailContact[];
    scheduledTime?: Date;
    status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
    metrics?: {
        sent: number;
        delivered: number;
        opened: number;
        clicked: number;
        bounced: number;
    };
}

export class EmailClient {
    private apiKey: string | null = null;
    private provider: 'resend' | 'sendgrid' | 'mailgun' | 'smtp' = 'resend';

    constructor(provider: 'resend' | 'sendgrid' | 'mailgun' | 'smtp' = 'resend') {
        this.provider = provider;
        this.apiKey = this.getApiKey();
    }

    private getApiKey(): string | null {
        switch (this.provider) {
            case 'resend':
                return import.meta.env.VITE_RESEND_API_KEY || null;
            case 'sendgrid':
                return import.meta.env.VITE_SENDGRID_API_KEY || null;
            case 'mailgun':
                return import.meta.env.VITE_MAILGUN_API_KEY || null;
            default:
                return null;
        }
    }

    // Send single email
    async sendEmail(
        to: string | string[],
        subject: string,
        html: string,
        from?: string,
        attachments?: Array<{ filename: string; content: string; type: string }>
    ): Promise<{ id: string; status: string }> {
        const fromEmail = from || import.meta.env.VITE_DEFAULT_FROM_EMAIL || 'noreply@alexsaulea.com';

        switch (this.provider) {
            case 'resend':
                return this.sendWithResend(to, subject, html, fromEmail, attachments);
            case 'sendgrid':
                return this.sendWithSendGrid(to, subject, html, fromEmail, attachments);
            default:
                throw new Error(`Provider ${this.provider} not implemented`);
        }
    }

    // Send with Resend (recommended for simplicity)
    private async sendWithResend(
        to: string | string[],
        subject: string,
        html: string,
        from: string,
        attachments?: Array<{ filename: string; content: string; type: string }>
    ): Promise<{ id: string; status: string }> {
        if (!this.apiKey) throw new Error('Resend API key not configured');

        const emailData: any = {
            from,
            to: Array.isArray(to) ? to : [to],
            subject,
            html
        };

        if (attachments && attachments.length > 0) {
            emailData.attachments = attachments;
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to send email: ${error}`);
        }

        const result = await response.json();
        return {
            id: result.id,
            status: 'sent'
        };
    }

    // Send with SendGrid
    private async sendWithSendGrid(
        to: string | string[],
        subject: string,
        html: string,
        from: string,
        attachments?: Array<{ filename: string; content: string; type: string }>
    ): Promise<{ id: string; status: string }> {
        if (!this.apiKey) throw new Error('SendGrid API key not configured');

        const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];

        const emailData: any = {
            personalizations: [{
                to: recipients,
                subject
            }],
            from: { email: from },
            content: [{
                type: 'text/html',
                value: html
            }]
        };

        if (attachments && attachments.length > 0) {
            emailData.attachments = attachments.map(att => ({
                content: att.content,
                filename: att.filename,
                type: att.type,
                disposition: 'attachment'
            }));
        }

        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to send email: ${error}`);
        }

        return {
            id: `sendgrid_${Date.now()}`,
            status: 'sent'
        };
    }

    // Send AI-generated email based on template and context
    async sendAIEmail(
        templateId: string,
        to: string | string[],
        variables: Record<string, string>,
        context?: string
    ): Promise<{ id: string; status: string }> {
        const template = this.getEmailTemplate(templateId);
        if (!template) throw new Error('Template not found');

        // Replace variables in template
        let subject = template.subject;
        let body = template.body;

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            subject = subject.replace(new RegExp(placeholder, 'g'), value);
            body = body.replace(new RegExp(placeholder, 'g'), value);
        }

        // If context is provided, enhance with AI
        if (context) {
            // This would integrate with your AI system to enhance the email
            body = await this.enhanceEmailWithAI(body, context);
        }

        return this.sendEmail(to, subject, body);
    }

    // Schedule email (requires backend service for production)
    async scheduleEmail(
        to: string | string[],
        subject: string,
        html: string,
        scheduledTime: Date,
        from?: string
    ): Promise<{ id: string; scheduledTime: Date }> {
        // For now, store locally. In production, this would go to a queue service
        const scheduledEmail = {
            id: `scheduled_${Date.now()}`,
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
            from,
            scheduledTime,
            status: 'scheduled'
        };

        const existingEmails = JSON.parse(localStorage.getItem('scheduled_emails') || '[]');
        existingEmails.push(scheduledEmail);
        localStorage.setItem('scheduled_emails', JSON.stringify(existingEmails));

        return {
            id: scheduledEmail.id,
            scheduledTime
        };
    }

    // Get email templates
    getEmailTemplates(): EmailTemplate[] {
        const defaultTemplates: EmailTemplate[] = [
            {
                id: 'follow-up',
                name: 'Professional Follow-up',
                subject: 'Following up on {{topic}}',
                body: `Hi {{name}},

I wanted to follow up on our conversation about {{topic}}.

{{message}}

Best regards,
{{senderName}}`,
                variables: ['name', 'topic', 'message', 'senderName'],
                category: 'business'
            },
            {
                id: 'meeting-summary',
                name: 'Meeting Summary',
                subject: 'Summary: {{meetingTitle}}',
                body: `Hi team,

Here's a summary of our {{meetingTitle}} meeting:

**Key Points:**
{{keyPoints}}

**Action Items:**
{{actionItems}}

**Next Steps:**
{{nextSteps}}

Thanks,
{{senderName}}`,
                variables: ['meetingTitle', 'keyPoints', 'actionItems', 'nextSteps', 'senderName'],
                category: 'business'
            },
            {
                id: 'content-notification',
                name: 'Content Publication Notification',
                subject: 'New content published: {{contentTitle}}',
                body: `Hi {{name}},

I've just published new content that might interest you:

**{{contentTitle}}**
{{contentSummary}}

You can read it here: {{contentLink}}

Best regards,
{{senderName}}`,
                variables: ['name', 'contentTitle', 'contentSummary', 'contentLink', 'senderName'],
                category: 'marketing'
            }
        ];

        // Load custom templates from storage
        const customTemplates = JSON.parse(localStorage.getItem('email_templates') || '[]');
        return [...defaultTemplates, ...customTemplates];
    }

    getEmailTemplate(id: string): EmailTemplate | null {
        const templates = this.getEmailTemplates();
        return templates.find(t => t.id === id) || null;
    }

    // Save custom template
    saveEmailTemplate(template: Omit<EmailTemplate, 'id'>): EmailTemplate {
        const newTemplate: EmailTemplate = {
            ...template,
            id: `template_${Date.now()}`
        };

        const existingTemplates = JSON.parse(localStorage.getItem('email_templates') || '[]');
        existingTemplates.push(newTemplate);
        localStorage.setItem('email_templates', JSON.stringify(existingTemplates));

        return newTemplate;
    }

    // AI enhancement (would integrate with your AI system)
    private async enhanceEmailWithAI(body: string, context: string): Promise<string> {
        // This would call your AI service to enhance the email
        // For now, return the original body
        return body;
    }

    // Get scheduled emails
    getScheduledEmails(): any[] {
        return JSON.parse(localStorage.getItem('scheduled_emails') || '[]');
    }

    // Validate email address
    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Bulk email validation
    validateEmails(emails: string[]): { valid: string[]; invalid: string[] } {
        const valid: string[] = [];
        const invalid: string[] = [];

        emails.forEach(email => {
            if (this.isValidEmail(email)) {
                valid.push(email);
            } else {
                invalid.push(email);
            }
        });

        return { valid, invalid };
    }

    // Check if configured
    isConfigured(): boolean {
        return !!this.apiKey;
    }

    // Test connection
    async testConnection(): Promise<boolean> {
        try {
            // Send a test email to verify configuration
            const testResult = await this.sendEmail(
                'test@example.com',
                'Test Email',
                '<p>This is a test email.</p>'
            );
            return !!testResult.id;
        } catch (error) {
            console.error('Email connection test failed:', error);
            return false;
        }
    }
}

export const emailClient = new EmailClient();
