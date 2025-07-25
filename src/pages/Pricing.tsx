import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown, Heart, Sparkles, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for exploring AI prompts",
            features: [
                "Access to free prompts",
                "Basic search functionality",
                "Community support",
                "5 downloads per month",
                "Standard quality prompts"
            ],
            buttonText: "Get Started",
            buttonVariant: "outline" as const,
            popular: false,
            icon: <Heart className="h-6 w-6" />
        },
        {
            name: "Creator",
            price: "$19",
            period: "month",
            description: "For creators building amazing content",
            features: [
                "Everything in Free",
                "Unlimited downloads",
                "Premium prompt collection",
                "Upload your own prompts",
                "Advanced analytics",
                "Priority support",
                "Custom tags & categories",
                "Creator dashboard"
            ],
            buttonText: "Start Creating",
            buttonVariant: "hero" as const,
            popular: true,
            icon: <Sparkles className="h-6 w-6" />
        },
        {
            name: "Pro",
            price: "$49",
            period: "month",
            description: "For professionals and teams",
            features: [
                "Everything in Creator",
                "AI model access",
                "Workflow automation",
                "Team collaboration",
                "White-label solutions",
                "API access",
                "Custom integrations",
                "Dedicated account manager",
                "Advanced customization"
            ],
            buttonText: "Go Pro",
            buttonVariant: "outline" as const,
            popular: false,
            icon: <Crown className="h-6 w-6" />
        }
    ];

    const features = [
        {
            title: "AI-Powered Prompts",
            description: "Curated collection of high-quality prompts for all major AI models",
            icon: <Zap className="h-8 w-8 text-primary" />
        },
        {
            title: "Creator Tools",
            description: "Professional tools to create, test, and monetize your prompts",
            icon: <Sparkles className="h-8 w-8 text-image" />
        },
        {
            title: "Community Driven",
            description: "Join thousands of creators sharing knowledge and inspiration",
            icon: <Star className="h-8 w-8 text-music" />
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-16">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <Badge variant="secondary" className="mb-4">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Transparent Pricing
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer">
                            Choose Your Creative Journey
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Whether you're just starting or building the next big thing, we have the perfect plan to fuel your creativity with AI prompts.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                        {plans.map((plan, index) => (
                            <Card
                                key={plan.name}
                                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${plan.popular
                                    ? 'border-primary shadow-glow ring-2 ring-primary/20'
                                    : 'hover:border-primary/50'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0">
                                        <Badge className="rounded-l-none rounded-b-none bg-gradient-to-r from-primary to-primary-glow">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8">
                                    <div className="flex justify-center mb-4">
                                        <div className={`p-3 rounded-full ${plan.popular
                                            ? 'bg-gradient-to-r from-primary/20 to-primary-glow/20'
                                            : 'bg-muted'
                                            }`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">/{plan.period}</span>
                                    </div>
                                    <CardDescription className="text-base">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <Button
                                        variant={plan.buttonVariant}
                                        className="w-full mb-6"
                                        asChild
                                    >
                                        <Link to="/auth">{plan.buttonText}</Link>
                                    </Button>

                                    <div className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-3">
                                                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Features Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Promptfolio?</h2>
                        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                            Join the leading marketplace for AI prompts and creative assets
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {features.map((feature, index) => (
                                <Card key={index} className="text-center p-6 hover:border-primary/50 transition-colors">
                                    <CardContent className="pt-6">
                                        <div className="flex justify-center mb-4">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes! You can upgrade, downgrade, or cancel your subscription at any time.
                                        Changes take effect at your next billing cycle.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We accept all major credit cards, PayPal, and bank transfers.
                                        All payments are securely processed and encrypted.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Is there a free trial?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Yes! Our Free plan lets you explore Promptfolio with no time limits.
                                        Upgrade anytime to unlock premium features and unlimited access.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16 p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border border-primary/20">
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                            Ready to Start Creating?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of creators who are already using Promptfolio to build amazing AI-powered content.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="hero" size="lg" asChild>
                                <Link to="/auth">Start Free Today</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/">View Examples</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
