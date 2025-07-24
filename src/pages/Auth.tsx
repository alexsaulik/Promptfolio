import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Code, Music, Palette, Sparkles, Star, Users } from 'lucide-react';
import { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [isWaitlisted, setIsWaitlisted] = useState(false);
    const { toast } = useToast();

    const handleWaitlistSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast({
                title: "Email required",
                description: "Please enter your email to join the waitlist.",
                variant: "destructive",
            });
            return;
        }

        // Store in localStorage for now - in production you'd send to your backend
        const waitlistEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
        if (!waitlistEmails.includes(email)) {
            waitlistEmails.push(email);
            localStorage.setItem('waitlistEmails', JSON.stringify(waitlistEmails));
        }

        setIsWaitlisted(true);
        toast({
            title: "You're on the list! 🎉",
            description: "We'll notify you when Promptfolio launches.",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Sparkles className="h-4 w-4" />
                            Coming Soon - Join the Waitlist
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Welcome to Promptfolio
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            The premium AI prompt marketplace where creators showcase and monetize their best prompts,
                            while buyers discover plug-and-play solutions for their creative projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Waitlist Form */}
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl mb-2">Join the Waitlist</CardTitle>
                                <p className="text-muted-foreground">
                                    Be among the first to access Promptfolio when we launch
                                </p>
                            </CardHeader>
                            <CardContent>
                                {!isWaitlisted ? (
                                    <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" size="lg">
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Join Waitlist
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Star className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">You're In! 🎉</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Thank you for joining our waitlist. We'll notify you as soon as Promptfolio is ready.
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsWaitlisted(false);
                                                setEmail('');
                                            }}
                                        >
                                            Join Another Email
                                        </Button>
                                    </div>
                                )}

                                <div className="mt-6 pt-6 border-t">
                                    <p className="text-sm text-muted-foreground text-center mb-4">
                                        Already have early access?
                                    </p>

                                    <Tabs defaultValue="signin" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="signin" className="mt-6">
                                            <div className="flex justify-center">
                                                <SignIn
                                                    fallbackRedirectUrl="/dashboard"
                                                    appearance={{
                                                        elements: {
                                                            rootBox: "mx-auto",
                                                            card: "shadow-none border-0 bg-transparent",
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="signup" className="mt-6">
                                            <div className="flex justify-center">
                                                <SignUp
                                                    fallbackRedirectUrl="/dashboard"
                                                    appearance={{
                                                        elements: {
                                                            rootBox: "mx-auto",
                                                            card: "shadow-none border-0 bg-transparent",
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Features Preview */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">What's Coming</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-card/30">
                                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Music className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">AI Music Prompts</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Discover prompts for generating music, lyrics, and audio content
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-card/30">
                                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Palette className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Visual Art Prompts</h3>
                                            <p className="text-sm text-muted-foreground">
                                                High-quality prompts for image generation and digital art
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-card/30">
                                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Code className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Code Generation</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Prompts for coding, workflows, and development tasks
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-card/30">
                                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Users className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Creator Marketplace</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Monetize your prompts and build a following
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-6 rounded-lg">
                                <h3 className="font-semibold mb-2">Early Access Benefits</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                                        Priority access to beta features
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                                        Exclusive creator onboarding
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                                        Special launch pricing
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                                        Direct feedback to our team
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Auth;
