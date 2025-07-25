import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin } from "lucide-react";

export default function Contact() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just redirect to email
        window.location.href = "mailto:ai@alexsaulea.com";
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Have questions about Promptfolio? Need help with your AI creative workflow?
                            We're here to help you unlock your creative potential.
                        </p>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                                    <p className="text-lg text-muted-foreground mb-8">
                                        Whether you're a creator looking to enhance your workflow or have feedback to share,
                                        we'd love to hear from you.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-primary/10 p-3 rounded-lg">
                                                    <Mail className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Email Us</h3>
                                                    <p className="text-muted-foreground mb-2">
                                                        Send us a message and we'll respond within 24 hours
                                                    </p>
                                                    <a
                                                        href="mailto:ai@alexsaulea.com"
                                                        className="text-primary hover:text-primary-glow transition-colors font-medium"
                                                    >
                                                        ai@alexsaulea.com
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-accent/10 p-3 rounded-lg">
                                                    <Clock className="h-6 w-6 text-accent" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Response Time</h3>
                                                    <p className="text-muted-foreground">
                                                        We typically respond to all inquiries within 24 hours during business days.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-music/10 p-3 rounded-lg">
                                                    <MapPin className="h-6 w-6 text-music" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Support</h3>
                                                    <p className="text-muted-foreground">
                                                        Get help with technical issues, feature requests, or general questions about the platform.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Send us a Message</CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we'll get back to you as soon as possible.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="Your first name"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="Your last name"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="your.email@example.com"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Input
                                                    id="subject"
                                                    placeholder="What's this about?"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message</Label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Tell us how we can help..."
                                                    className="min-h-[120px]"
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                            >
                                                Send Message
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-lg text-muted-foreground">
                                Quick answers to common questions about Promptfolio
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">How do I get started?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Simply sign up for an account and start exploring our curated collection of AI prompts.
                                        You can also create and share your own prompts with the community.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">Is Promptfolio free to use?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We offer both free and premium plans. The free plan includes access to basic features,
                                        while premium plans unlock advanced tools and exclusive content.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">Can I sell my prompts?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes! Our marketplace allows creators to monetize their high-quality prompts.
                                        Join our creator program to start earning from your expertise.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">What AI models are supported?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We support prompts for various AI models including GPT, Claude, Midjourney,
                                        Stable Diffusion, and many others across text, image, and audio generation.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
