import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookOpen,
    Code,
    Download,
    ExternalLink,
    FileText,
    Github,
    Search,
    Settings,
    Users,
    Video,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Documentation() {
    const quickStart = [
        {
            title: "1. Create Account",
            description: "Sign up for your free Promptfolio account",
            icon: Users
        },
        {
            title: "2. Browse Prompts",
            description: "Explore our curated collection of AI prompts",
            icon: Search
        },
        {
            title: "3. Download & Use",
            description: "Get prompts and start creating amazing content",
            icon: Download
        }
    ];

    const apiEndpoints = [
        {
            method: "GET",
            endpoint: "/api/prompts",
            description: "Fetch all available prompts",
            badge: "Public"
        },
        {
            method: "POST",
            endpoint: "/api/prompts",
            description: "Create a new prompt",
            badge: "Auth Required"
        },
        {
            method: "GET",
            endpoint: "/api/prompts/{id}",
            description: "Get a specific prompt by ID",
            badge: "Public"
        },
        {
            method: "PUT",
            endpoint: "/api/prompts/{id}",
            description: "Update an existing prompt",
            badge: "Auth Required"
        }
    ];

    const tutorials = [
        {
            title: "Getting Started with AI Prompting",
            description: "Learn the fundamentals of effective AI prompt engineering",
            type: "Video",
            duration: "12 min",
            level: "Beginner"
        },
        {
            title: "Advanced Prompt Techniques",
            description: "Master complex prompting strategies for better results",
            type: "Article",
            duration: "8 min read",
            level: "Advanced"
        },
        {
            title: "Selling Your Prompts",
            description: "Complete guide to monetizing your prompt creations",
            type: "Guide",
            duration: "15 min read",
            level: "Intermediate"
        },
        {
            title: "API Integration Tutorial",
            description: "How to integrate Promptfolio API into your applications",
            type: "Code",
            duration: "20 min",
            level: "Developer"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                            Documentation
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Everything you need to know about using Promptfolio, from basic concepts to advanced integrations.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search documentation..."
                                className="pl-10 py-6 text-center"
                            />
                        </div>
                    </div>
                </section>

                {/* Quick Start */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Quick Start Guide</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {quickStart.map((step, index) => (
                                <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm text-center">
                                    <CardHeader>
                                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                            <step.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle>{step.title}</CardTitle>
                                        <CardDescription>{step.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Documentation */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <Tabs defaultValue="guides" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="guides">Guides</TabsTrigger>
                                <TabsTrigger value="api">API Reference</TabsTrigger>
                                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                                <TabsTrigger value="examples">Examples</TabsTrigger>
                            </TabsList>

                            <TabsContent value="guides" className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-primary/10 p-2 rounded-lg">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <CardTitle>User Guide</CardTitle>
                                                    <CardDescription>Complete guide for end users</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm">
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Account Setup & Profile</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Browsing & Searching Prompts</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Purchasing & Downloads</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Community Features</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-accent/10 p-2 rounded-lg">
                                                    <Zap className="h-5 w-5 text-accent" />
                                                </div>
                                                <div>
                                                    <CardTitle>Creator Guide</CardTitle>
                                                    <CardDescription>For prompt creators and sellers</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm">
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Creating Quality Prompts</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Marketplace Guidelines</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Pricing Strategies</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Marketing Your Work</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-code/10 p-2 rounded-lg">
                                                    <Code className="h-5 w-5 text-code" />
                                                </div>
                                                <div>
                                                    <CardTitle>Developer Guide</CardTitle>
                                                    <CardDescription>API integration and development</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm">
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• API Authentication</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Endpoints Reference</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Rate Limits & Best Practices</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Webhooks & Events</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-music/10 p-2 rounded-lg">
                                                    <Settings className="h-5 w-5 text-music" />
                                                </div>
                                                <div>
                                                    <CardTitle>Admin Guide</CardTitle>
                                                    <CardDescription>Platform administration</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm">
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• User Management</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Content Moderation</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Analytics & Reporting</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• System Configuration</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="api" className="mt-8">
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold mb-4">API Reference</h3>
                                        <p className="text-muted-foreground">
                                            RESTful API for integrating Promptfolio into your applications
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {apiEndpoints.map((endpoint, index) => (
                                            <Card key={index} className="bg-card/50 border-border/50">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                                                                {endpoint.method}
                                                            </Badge>
                                                            <code className="text-sm bg-muted/50 px-2 py-1 rounded">
                                                                {endpoint.endpoint}
                                                            </code>
                                                        </div>
                                                        <Badge variant="outline">{endpoint.badge}</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-2">
                                                        {endpoint.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="tutorials" className="mt-8">
                                <div className="space-y-6">
                                    {tutorials.map((tutorial, index) => (
                                        <Card key={index} className="bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                                                        <p className="text-sm text-muted-foreground mb-3">
                                                            {tutorial.description}
                                                        </p>
                                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                            <Badge variant="outline">{tutorial.type}</Badge>
                                                            <span>{tutorial.duration}</span>
                                                            <Badge variant="secondary">{tutorial.level}</Badge>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        {tutorial.type === 'Video' && <Video className="h-5 w-5 text-muted-foreground" />}
                                                        {tutorial.type === 'Code' && <Code className="h-5 w-5 text-muted-foreground" />}
                                                        {(tutorial.type === 'Article' || tutorial.type === 'Guide') && <FileText className="h-5 w-5 text-muted-foreground" />}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="examples" className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Card className="bg-card/50 border-border/50">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Github className="h-5 w-5 mr-2" />
                                                Code Examples
                                            </CardTitle>
                                            <CardDescription>
                                                Ready-to-use code snippets and integrations
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center justify-between">
                                                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">JavaScript SDK</span>
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                </li>
                                                <li className="flex items-center justify-between">
                                                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Python Client</span>
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                </li>
                                                <li className="flex items-center justify-between">
                                                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">React Components</span>
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                </li>
                                                <li className="flex items-center justify-between">
                                                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Node.js Server</span>
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card/50 border-border/50">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Zap className="h-5 w-5 mr-2" />
                                                Use Cases
                                            </CardTitle>
                                            <CardDescription>
                                                Real-world examples and implementation patterns
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm">
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• E-commerce Integration</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Content Management System</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Mobile App Implementation</li>
                                                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">• Webhook Processing</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Contact Support */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                                    Contact Support
                                </Button>
                            </Link>
                            <Link to="/help">
                                <Button variant="outline" className="border-border/50">
                                    Visit Help Center
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
