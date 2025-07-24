import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Download, Eye, Heart, Star, Terminal } from "lucide-react";

const workflows = [
    {
        id: 1,
        title: "Full-Stack App Generator",
        description: "Generate complete React + Node.js applications with authentication, database, and deployment",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        rating: 4.9,
        downloads: 32450,
        price: 45,
        tags: ["Full-Stack", "React", "Node.js"],
        difficulty: "Advanced",
        creator: "CodeCrafter",
        language: "TypeScript"
    },
    {
        id: 2,
        title: "API Documentation Builder",
        description: "Automatically generate beautiful API documentation from code comments and schemas",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        rating: 4.8,
        downloads: 18720,
        price: 0,
        tags: ["Documentation", "API", "OpenAPI"],
        difficulty: "Intermediate",
        creator: "DocMaster",
        language: "Python"
    },
    {
        id: 3,
        title: "Test Suite Generator",
        description: "Generate comprehensive unit and integration tests for your codebase automatically",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        rating: 4.7,
        downloads: 15840,
        price: 25,
        tags: ["Testing", "Unit Tests", "Coverage"],
        difficulty: "Intermediate",
        creator: "TestBot",
        language: "JavaScript"
    },
    {
        id: 4,
        title: "Code Refactoring Assistant",
        description: "Intelligently refactor legacy code with modern patterns and best practices",
        image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
        rating: 4.9,
        downloads: 27100,
        price: 0,
        tags: ["Refactoring", "Legacy", "Patterns"],
        difficulty: "Advanced",
        creator: "RefactorPro",
        language: "Multi"
    },
    {
        id: 5,
        title: "Database Schema Optimizer",
        description: "Analyze and optimize database schemas for performance and scalability",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
        rating: 4.6,
        downloads: 9650,
        price: 35,
        tags: ["Database", "Performance", "SQL"],
        difficulty: "Advanced",
        creator: "DBOptimizer",
        language: "SQL"
    },
    {
        id: 6,
        title: "Component Library Builder",
        description: "Generate reusable UI component libraries with documentation and storybook",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 4.8,
        downloads: 21430,
        price: 30,
        tags: ["Components", "UI", "Storybook"],
        difficulty: "Intermediate",
        creator: "ComponentCraft",
        language: "TypeScript"
    }
];

export default function CodeGeneration() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6">
                        <Code className="h-4 w-4" />
                        <span className="text-sm font-medium text-primary">Code Generation</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
                        Code Generation Workflows
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Automated code generation workflows to accelerate development, improve code quality, and reduce repetitive tasks with AI-powered tools.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="hero" size="lg">
                            <Terminal className="h-4 w-4 mr-2" />
                            Browse All Workflows
                        </Button>
                        <Button variant="glass" size="lg">
                            <Bot className="h-4 w-4 mr-2" />
                            Create Custom Workflow
                        </Button>
                    </div>
                </div>
            </section>

            {/* Workflows Grid */}
            <section className="py-16 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Featured Workflows</h2>
                            <p className="text-muted-foreground">Top-rated development automation workflows</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">24 workflows</Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workflows.map((workflow) => (
                            <Card key={workflow.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-white/10">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={workflow.image}
                                        alt={workflow.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Code className="h-12 w-12 text-white" />
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge variant={workflow.price === 0 ? "secondary" : "default"}>
                                            {workflow.price === 0 ? "Free" : `$${workflow.price}`}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                                            {workflow.difficulty}
                                        </Badge>
                                        <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                                            {workflow.language}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg font-semibold line-clamp-2">{workflow.title}</CardTitle>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{workflow.description}</p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {workflow.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span>{workflow.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Download className="h-4 w-4" />
                                                <span>{workflow.downloads.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">by {workflow.creator}</span>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="default">
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
