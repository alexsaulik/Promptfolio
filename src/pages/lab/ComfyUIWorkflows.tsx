import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Code,
    Download,
    Heart,
    Image,
    Play,
    Search,
    Sparkles,
    Star,
    Workflow,
    Zap
} from "lucide-react";

export default function ComfyUIWorkflows() {
    const workflows = [
        {
            id: 1,
            title: "Portrait Magic Pro",
            description: "Professional portrait enhancement with automatic background removal",
            author: "PortraitMaster",
            rating: 4.9,
            downloads: 3240,
            complexity: "Intermediate",
            category: "Portrait",
            nodes: 45,
            image: "/api/placeholder/300/200"
        },
        {
            id: 2,
            title: "Fantasy Landscape Generator",
            description: "Create epic fantasy landscapes with atmospheric effects",
            author: "FantasyAI",
            rating: 4.8,
            downloads: 2890,
            complexity: "Advanced",
            category: "Landscape",
            nodes: 67,
            image: "/api/placeholder/300/200"
        },
        {
            id: 3,
            title: "Character Design Studio",
            description: "Complete character creation workflow with multiple poses",
            author: "CharacterPro",
            rating: 4.7,
            downloads: 2156,
            complexity: "Expert",
            category: "Character",
            nodes: 89,
            image: "/api/placeholder/300/200"
        },
        {
            id: 4,
            title: "Product Photography Setup",
            description: "Commercial product shots with perfect lighting and shadows",
            author: "ProductViz",
            rating: 4.9,
            downloads: 1876,
            complexity: "Beginner",
            category: "Product",
            nodes: 23,
            image: "/api/placeholder/300/200"
        }
    ];

    const categories = [
        "All Categories",
        "Portrait",
        "Landscape",
        "Character",
        "Product",
        "Abstract",
        "Architecture",
        "Fashion",
        "Automotive"
    ];

    const complexityColors = {
        "Beginner": "bg-green-500/10 text-green-500",
        "Intermediate": "bg-yellow-500/10 text-yellow-500",
        "Advanced": "bg-orange-500/10 text-orange-500",
        "Expert": "bg-red-500/10 text-red-500"
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <div className="relative flex justify-center mb-6">
                                <div className="relative">
                                    <Workflow className="h-16 w-16 text-primary animate-glow-pulse" />
                                    <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full animate-ping" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-6">
                                ComfyUI Workflows
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Professional ComfyUI workflows for every creative need. Pre-built, optimized, and ready to use.
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row gap-4 mb-12">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search workflows..."
                                    className="pl-10"
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category.toLowerCase()}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Complexity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                    <SelectItem value="expert">Expert</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* Workflows Grid */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {workflows.map((workflow) => (
                                <Card key={workflow.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <div className="relative">
                                                <Workflow className="h-12 w-12 text-primary/40" />
                                                <div className="absolute inset-0 h-12 w-12 bg-primary/10 rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="secondary">
                                                    <Play className="h-4 w-4 mr-1" />
                                                    Preview
                                                </Button>
                                                <Button size="sm" variant="secondary">
                                                    <Heart className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge className={complexityColors[workflow.complexity as keyof typeof complexityColors]}>
                                                {workflow.complexity}
                                            </Badge>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Code className="h-3 w-3 mr-1" />
                                                {workflow.nodes} nodes
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                            {workflow.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            by {workflow.author}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {workflow.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                                                {workflow.rating}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Download className="h-4 w-4 mr-1" />
                                                {workflow.downloads}
                                            </div>
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                                            <div className="relative flex items-center justify-center">
                                                <Sparkles className="h-4 w-4 mr-2 animate-glow-pulse" />
                                                Get Workflow
                                            </div>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <Button variant="outline" className="border-border/50">
                                Load More Workflows
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Workflows?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 relative">
                                        <Zap className="h-6 w-6 text-primary animate-glow-pulse" />
                                        <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse" />
                                    </div>
                                    <CardTitle>Production Ready</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        All workflows are tested and optimized for professional use with detailed documentation.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 relative">
                                        <Image className="h-6 w-6 text-accent" />
                                        <div className="absolute inset-0 bg-accent/5 rounded-lg animate-pulse" />
                                    </div>
                                    <CardTitle>High Quality</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Created by professional artists and engineers for stunning visual results.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-music/10 rounded-lg flex items-center justify-center mb-4 relative">
                                        <Download className="h-6 w-6 text-music animate-glow-pulse" />
                                        <div className="absolute inset-0 bg-music/5 rounded-lg animate-pulse" />
                                    </div>
                                    <CardTitle>Easy Setup</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        One-click installation with automatic dependency management and setup guides.
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
