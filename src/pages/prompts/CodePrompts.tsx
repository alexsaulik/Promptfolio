import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Download, Eye, Heart, Search, Star, Terminal } from "lucide-react";

export default function CodePrompts() {
    const prompts = [
        {
            id: 1,
            title: "React Component Generator",
            description: "Generate modern React components with TypeScript and best practices",
            author: "DevMaster",
            rating: 4.9,
            downloads: 2140,
            price: 18,
            tags: ["React", "TypeScript", "Components", "Frontend"]
        },
        {
            id: 2,
            title: "Python Algorithm Builder",
            description: "Create efficient algorithms and data structures in Python",
            author: "AlgoExpert",
            rating: 4.8,
            downloads: 1890,
            price: 22,
            tags: ["Python", "Algorithms", "Data Structures", "Backend"]
        },
        {
            id: 3,
            title: "API Documentation Writer",
            description: "Generate comprehensive API documentation and examples",
            author: "DocGuru",
            rating: 4.7,
            downloads: 967,
            price: 12,
            tags: ["Documentation", "API", "REST", "Technical Writing"]
        },
        {
            id: 4,
            title: "Database Query Optimizer",
            description: "SQL query optimization and database design patterns",
            author: "DBArchitect",
            rating: 4.9,
            downloads: 1450,
            price: 25,
            tags: ["SQL", "Database", "Optimization", "Performance"]
        }
    ];

    const categories = [
        "All Categories",
        "Frontend Development",
        "Backend Development",
        "Mobile Development",
        "Data Science",
        "DevOps",
        "Testing",
        "Documentation",
        "Architecture",
        "Debugging"
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-code to-code-foreground bg-clip-text text-transparent mb-6">
                                Code & Development Prompts
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Accelerate your development workflow with AI-powered coding prompts for every programming language and framework.
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row gap-4 mb-12">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search code prompts..."
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
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* Prompts Grid */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {prompts.map((prompt) => (
                                <Card key={prompt.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <div className="aspect-video bg-gradient-to-br from-code/20 to-code/5 flex items-center justify-center">
                                            <Terminal className="h-12 w-12 text-code/40" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="secondary">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Preview
                                                </Button>
                                                <Button size="sm" variant="secondary">
                                                    <Heart className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg group-hover:text-code transition-colors">
                                                    {prompt.title}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-muted-foreground">
                                                    by {prompt.author}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-code">${prompt.price}</div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                                                    {prompt.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {prompt.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {prompt.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Download className="h-4 w-4 mr-1" />
                                                {prompt.downloads} downloads
                                            </div>
                                            <Button className="bg-gradient-to-r from-code to-code/80 text-code-foreground hover:shadow-lg hover:shadow-code/25 transition-all duration-300">
                                                Get Prompt
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <Button variant="outline" className="border-border/50">
                                Load More Prompts
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Boost Your Development Speed</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-code/10 rounded-lg flex items-center justify-center mb-4">
                                        <Code className="h-6 w-6 text-code" />
                                    </div>
                                    <CardTitle>Clean Code</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Generate production-ready code following best practices and industry standards.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-code/10 rounded-lg flex items-center justify-center mb-4">
                                        <Terminal className="h-6 w-6 text-code" />
                                    </div>
                                    <CardTitle>Multi-Language</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Support for Python, JavaScript, TypeScript, Java, C++, and 20+ languages.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-code/10 rounded-lg flex items-center justify-center mb-4">
                                        <Star className="h-6 w-6 text-code" />
                                    </div>
                                    <CardTitle>Tested Solutions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        All prompts include test cases, documentation, and real-world examples.
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
