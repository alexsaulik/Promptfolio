import { AlertCircle, CheckCircle, ExternalLink, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useIntegrations } from '../../hooks/use-integrations';
import { LinkedInDebugTest } from '../LinkedInDebugTest';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const IntegrationTest: React.FC = () => {
    const { connections, linkedin, notion, email, checkConnections } = useIntegrations();
    const [testResults, setTestResults] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    // Test forms state
    const [linkedinPost, setLinkedinPost] = useState('Test post from Promptfolio! 🚀');
    const [emailTest, setEmailTest] = useState({
        to: '',
        subject: 'Test Email from Promptfolio',
        content: 'This is a test email from your Promptfolio integration.'
    });
    const [notionTest, setNotionTest] = useState({
        title: 'Test Page from Promptfolio',
        content: 'This is a test page created by Promptfolio integration.'
    });

    const runTest = async (integration: string, testFn: () => Promise<any>) => {
        setLoading(prev => ({ ...prev, [integration]: true }));
        try {
            const result = await testFn();
            setTestResults(prev => ({ ...prev, [integration]: { success: true, data: result } }));
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                [integration]: {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                }
            }));
        } finally {
            setLoading(prev => ({ ...prev, [integration]: false }));
        }
    };

    const ConnectionStatus: React.FC<{ name: string; connected: boolean; onConnect?: () => void }> = ({
        name,
        connected,
        onConnect
    }) => (
        <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
                {connected ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">{name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={connected ? "default" : "destructive"}>
                    {connected ? 'Connected' : 'Not Connected'}
                </Badge>
                {!connected && onConnect && (
                    <Button onClick={onConnect} size="sm" variant="outline">
                        Connect
                    </Button>
                )}
            </div>
        </div>
    );

    const TestResult: React.FC<{ integration: string }> = ({ integration }) => {
        const result = testResults[integration];
        if (!result) return null;

        return (
            <div className={`mt-2 p-3 rounded-lg border ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center gap-2">
                    {result.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                        {result.success ? 'Test Successful' : 'Test Failed'}
                    </span>
                </div>
                {result.error && (
                    <p className="text-sm text-red-600 mt-1">{result.error}</p>
                )}
                {result.data && (
                    <pre className="text-xs text-gray-600 mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-32">
                        {JSON.stringify(result.data, null, 2)}
                    </pre>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Integration Testing Dashboard</h2>
                <p className="text-gray-600">Test your LinkedIn, Notion, and Email integrations</p>
            </div>

            {/* Debug Component */}
            <LinkedInDebugTest />

            {/* Connection Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Connection Status</CardTitle>
                    <CardDescription>Check which integrations are properly configured</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <ConnectionStatus
                        name="LinkedIn"
                        connected={connections.linkedin}
                        onConnect={() => linkedin.connect()}
                    />
                    <ConnectionStatus
                        name="Notion"
                        connected={connections.notion}
                    />
                    <ConnectionStatus
                        name="Email"
                        connected={connections.email}
                    />
                    <Button
                        onClick={checkConnections}
                        variant="outline"
                        className="w-full"
                    >
                        Refresh Connection Status
                    </Button>
                </CardContent>
            </Card>

            {/* LinkedIn Tests */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        LinkedIn Integration Tests
                        {connections.linkedin && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>Test LinkedIn posting and profile access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Button
                            onClick={() => runTest('linkedin-profile', () => linkedin.getProfile())}
                            disabled={!connections.linkedin || loading['linkedin-profile']}
                            className="w-full"
                        >
                            {loading['linkedin-profile'] ? 'Testing...' : 'Test Get Profile'}
                        </Button>
                        <TestResult integration="linkedin-profile" />
                    </div>

                    <div>
                        <Textarea
                            placeholder="Enter test post content..."
                            value={linkedinPost}
                            onChange={(e) => setLinkedinPost(e.target.value)}
                            className="mb-2"
                        />
                        <Button
                            onClick={() => runTest('linkedin-post', () => linkedin.post(linkedinPost))}
                            disabled={!connections.linkedin || loading['linkedin-post'] || !linkedinPost.trim()}
                            className="w-full"
                        >
                            {loading['linkedin-post'] ? 'Posting...' : 'Test Create Post'}
                        </Button>
                        <TestResult integration="linkedin-post" />
                    </div>
                </CardContent>
            </Card>

            {/* Email Tests */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Email Integration Tests
                        {connections.email && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>Test email sending functionality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Recipient email address"
                        type="email"
                        value={emailTest.to}
                        onChange={(e) => setEmailTest(prev => ({ ...prev, to: e.target.value }))}
                    />
                    <Input
                        placeholder="Email subject"
                        value={emailTest.subject}
                        onChange={(e) => setEmailTest(prev => ({ ...prev, subject: e.target.value }))}
                    />
                    <Textarea
                        placeholder="Email content"
                        value={emailTest.content}
                        onChange={(e) => setEmailTest(prev => ({ ...prev, content: e.target.value }))}
                    />
                    <Button
                        onClick={() => runTest('email-send', () =>
                            email.send(emailTest.to, emailTest.subject, `<p>${emailTest.content}</p>`)
                        )}
                        disabled={!connections.email || loading['email-send'] || !emailTest.to || !emailTest.subject}
                        className="w-full"
                    >
                        {loading['email-send'] ? 'Sending...' : 'Test Send Email'}
                    </Button>
                    <TestResult integration="email-send" />
                </CardContent>
            </Card>

            {/* Notion Tests */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Notion Integration Tests
                        {connections.notion && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>Test Notion database and page creation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Button
                            onClick={() => runTest('notion-databases', () => notion.getDatabases())}
                            disabled={!connections.notion || loading['notion-databases']}
                            className="w-full"
                        >
                            {loading['notion-databases'] ? 'Loading...' : 'Test Get Databases'}
                        </Button>
                        <TestResult integration="notion-databases" />
                    </div>

                    <Input
                        placeholder="Test page title"
                        value={notionTest.title}
                        onChange={(e) => setNotionTest(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Textarea
                        placeholder="Test page content"
                        value={notionTest.content}
                        onChange={(e) => setNotionTest(prev => ({ ...prev, content: e.target.value }))}
                    />
                    <p className="text-sm text-gray-600">
                        Note: You'll need to select a database ID from the results above to create a test page.
                    </p>
                </CardContent>
            </Card>

            {/* Environment Variables Check */}
            <Card>
                <CardHeader>
                    <CardTitle>Environment Configuration</CardTitle>
                    <CardDescription>Verify your environment variables are set correctly</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">LinkedIn</h4>
                            <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_LINKEDIN_CLIENT_ID ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Client ID</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_LINKEDIN_CLIENT_SECRET ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Client Secret</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_LINKEDIN_REDIRECT_URI ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Redirect URI</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-medium">Email</h4>
                            <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_RESEND_API_KEY ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Resend API Key</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_DEFAULT_FROM_EMAIL ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>From Email</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-medium">Notion</h4>
                            <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_NOTION_ACCESS_TOKEN ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Access Token</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-medium">Supabase</h4>
                            <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_SUPABASE_URL ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Supabase URL</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {import.meta.env.VITE_SUPABASE_ANON_KEY ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Anon Key</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Setup Links */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Setup Links</CardTitle>
                    <CardDescription>Direct links to configure your integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://developer.linkedin.com/apps', '_blank')}
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        LinkedIn Developer Console
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://www.notion.so/my-integrations', '_blank')}
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Notion Integrations
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://resend.com/api-keys', '_blank')}
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Resend API Keys
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://vercel.com', '_blank')}
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Vercel Deployment
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
