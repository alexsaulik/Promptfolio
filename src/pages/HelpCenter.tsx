import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookOpen,
    CreditCard,
    Download,
    FileText,
    MessageCircle,
    Search,
    Settings,
    Shield,
    Star,
    Users,
    Video,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HelpCenter() {
    const helpCategories = [
        {
            title: "Getting Started",
            icon: BookOpen,
            description: "Learn the basics of Promptfolio",
            articles: [
                "How to create your first account",
                "Understanding prompt categories",
                "Navigating the dashboard",
                "Setting up your profile"
            ]
        },
        {
            title: "Using Prompts",
            icon: Zap,
            description: "Master prompt creation and usage",
            articles: [
                "How to write effective prompts",
                "Prompt optimization techniques",
                "Testing and refining prompts",
                "Sharing prompts with the community"
            ]
        },
        {
            title: "Account & Billing",
            icon: CreditCard,
            description: "Manage your account and subscription",
            articles: [
                "Upgrading to premium plans",
                "Managing your subscription",
                "Payment methods and billing",
                "Cancellation and refunds"
            ]
        },
        {
            title: "Community",
            icon: Users,
            description: "Connect with other creators",
            articles: [
                "Joining the community",
                "Community guidelines",
                "Sharing and collaborating",
                "Getting feedback on prompts"
            ]
        },
        {
            title: "Security & Privacy",
            icon: Shield,
            description: "Keep your account secure",
            articles: [
                "Account security best practices",
                "Privacy settings",
                "Data protection",
                "Reporting issues"
            ]
        },
        {
            title: "Troubleshooting",
            icon: Settings,
            description: "Solve common issues",
            articles: [
                "Login and access problems",
                "Performance issues",
                "Feature not working",
                "Browser compatibility"
            ]
        }
    ];

    const popularArticles = [
        {
            title: "How to Create Your First AI Prompt",
            category: "Getting Started",
            readTime: "5 min read",
            rating: 4.9
        },
        {
            title: "Understanding Prompt Engineering",
            category: "Using Prompts",
            readTime: "8 min read",
            rating: 4.8
        },
        {
            title: "Upgrading to Premium Features",
            category: "Account & Billing",
            readTime: "3 min read",
            rating: 4.7
        },
        {
            title: "Community Guidelines and Best Practices",
            category: "Community",
            readTime: "6 min read",
            rating: 4.9
        }
    ];

    const quickActions = [
        {
            title: "Contact Support",
            description: "Get help from our team",
            icon: MessageCircle,
            action: "contact",
            variant: "primary"
        },
        {
            title: "Video Tutorials",
            description: "Watch step-by-step guides",
            icon: Video,
            action: "tutorials",
            variant: "secondary"
        },
        {
            title: "Download Resources",
            description: "Get templates and guides",
            icon: Download,
            action: "downloads",
            variant: "secondary"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-6">
                            Help Center
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Find answers, learn best practices, and get the most out of Promptfolio
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search for help articles..."
                                className="pl-10 py-6 text-center"
                            />
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {quickActions.map((action, index) => (
                                <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 cursor-pointer">
                                    <CardContent className="p-6 text-center">
                                        <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.variant === 'primary' ? 'bg-primary/10' : 'bg-muted/50'
                                            }`}>
                                            <action.icon className={`h-6 w-6 ${action.variant === 'primary' ? 'text-primary' : 'text-muted-foreground'
                                                }`} />
                                        </div>
                                        <h3 className="font-semibold mb-2">{action.title}</h3>
                                        <p className="text-sm text-muted-foreground">{action.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <Tabs defaultValue="categories" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="categories">Browse by Category</TabsTrigger>
                                <TabsTrigger value="popular">Popular Articles</TabsTrigger>
                                <TabsTrigger value="faq">FAQ</TabsTrigger>
                            </TabsList>

                            <TabsContent value="categories" className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {helpCategories.map((category, index) => (
                                        <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 cursor-pointer">
                                            <CardHeader>
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-primary/10 p-2 rounded-lg">
                                                        <category.icon className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-lg">{category.title}</CardTitle>
                                                        <CardDescription>{category.description}</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2">
                                                    {category.articles.map((article, articleIndex) => (
                                                        <li key={articleIndex} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                            • {article}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="popular" className="mt-8">
                                <div className="space-y-4">
                                    {popularArticles.map((article, index) => (
                                        <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 cursor-pointer">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold mb-2">{article.title}</h3>
                                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                            <Badge variant="outline">{article.category}</Badge>
                                                            <span>{article.readTime}</span>
                                                            <div className="flex items-center">
                                                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                                                <span>{article.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="faq" className="mt-8">
                                <div className="max-w-4xl mx-auto">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>How do I get started with Promptfolio?</AccordionTrigger>
                                            <AccordionContent>
                                                Getting started is easy! Simply create an account, explore our curated prompt library, and start experimenting with different AI models. You can begin with our free tier to get familiar with the platform.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>What AI models does Promptfolio support?</AccordionTrigger>
                                            <AccordionContent>
                                                We support a wide range of AI models including GPT (OpenAI), Claude (Anthropic), Midjourney, Stable Diffusion, DALL-E, and many others for text, image, audio, and video generation.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>Can I sell my prompts on the platform?</AccordionTrigger>
                                            <AccordionContent>
                                                Yes! Our marketplace allows creators to monetize high-quality prompts. Join our creator program to start earning from your expertise and build a following in the AI creative community.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-4">
                                            <AccordionTrigger>What's included in the premium plans?</AccordionTrigger>
                                            <AccordionContent>
                                                Premium plans include unlimited prompt generation, access to exclusive prompts, priority support, advanced analytics, collaboration tools, and early access to new features.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-5">
                                            <AccordionTrigger>How do I contact support?</AccordionTrigger>
                                            <AccordionContent>
                                                You can reach our support team at <a href="mailto:ai@alexsaulea.com" className="text-primary hover:text-primary-glow transition-colors">ai@alexsaulea.com</a>. We typically respond within 24 hours during business days.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-6">
                                            <AccordionTrigger>Is my data secure on Promptfolio?</AccordionTrigger>
                                            <AccordionContent>
                                                Absolutely. We use enterprise-grade security measures, encrypt all data in transit and at rest, and never share your prompts or personal information with third parties without your consent.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Contact Support Section */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Our support team is here to help you succeed with AI-powered creativity
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Contact Support
                                </Button>
                            </Link>
                            <Button variant="outline" className="border-border/50">
                                <Users className="mr-2 h-4 w-4" />
                                Join Community
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
