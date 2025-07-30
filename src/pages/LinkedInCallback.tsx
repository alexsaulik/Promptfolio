import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LinkedInCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Processing LinkedIn authorization...');

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const error = searchParams.get('error');
            const state = searchParams.get('state');

            if (error) {
                setStatus('error');
                setMessage(`LinkedIn authorization failed: ${error}`);
                return;
            }

            if (!code) {
                setStatus('error');
                setMessage('No authorization code received from LinkedIn');
                return;
            }

            try {
                // Store the authorization code in localStorage for the integration to pick up
                localStorage.setItem('linkedin_auth_code', code);
                localStorage.setItem('linkedin_auth_timestamp', Date.now().toString());

                setStatus('success');
                setMessage('LinkedIn authorization successful! Closing window...');

                // Close popup window or redirect back
                if (window.opener) {
                    // This is a popup, close it
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                } else {
                    // This is not a popup, redirect back
                    setTimeout(() => {
                        navigate('/local-ai?tab=integrations');
                    }, 2000);
                }

            } catch (error) {
                console.error('LinkedIn callback error:', error);
                setStatus('error');
                setMessage('Failed to process LinkedIn authorization');
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        {status === 'loading' && <Loader2 className="h-12 w-12 text-primary animate-spin" />}
                        {status === 'success' && <CheckCircle className="h-12 w-12 text-green-500" />}
                        {status === 'error' && <XCircle className="h-12 w-12 text-red-500" />}
                    </div>
                    <CardTitle>
                        {status === 'loading' && 'Processing Authorization'}
                        {status === 'success' && 'Authorization Successful!'}
                        {status === 'error' && 'Authorization Failed'}
                    </CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    {status === 'error' && (
                        <Button
                            onClick={() => navigate('/local-ai?tab=integrations')}
                            className="w-full"
                        >
                            Return to Integrations
                        </Button>
                    )}
                    {status === 'success' && (
                        <p className="text-sm text-muted-foreground">
                            You will be redirected automatically...
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
