import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, FileText, Heart, PenTool, Search, Star } from "lucide-react";

export default function TextPrompts() {
    const prompts = [
        {
            id: 1,
            title: "Blog Post Generator",
            description: "Create engaging blog posts on any topic with SEO optimization",
            author: "ContentPro",
            rating: 4.9,
            downloads: 3240,
            price: 15,
            tags: ["Blogging", "SEO", "Content Marketing", "Writing"]
        },
        {
            id: 2,
            title: "Creative Story Writer",
            description: "Generate compelling stories, characters, and plot developments",
            author: "StoryWeaver",
            rating: 4.8,
            downloads: 2190,
            price: 20,
            tags: ["Creative Writing", "Storytelling", "Fiction", "Characters"]
        },
        {
            id: 3,
            title: "Business Copy Generator",
            description: "Professional marketing copy, emails, and sales content",
            author: "CopyMaster",
            rating: 4.7,
            downloads: 1867,
            price: 25,
            tags: ["Marketing", "Sales", "Business", "Copywriting"]
        },
        {
            id: 4,
            title: "Academic Writing Assistant",
            description: "Research papers, essays, and academic documentation",
            author: "ScholarAI",
            rating: 4.9,
            downloads: 1650,
            price: 18,
            tags: ["Academic", "Research", "Essays", "Education"]
        }
    ];

    const categories = [
        "All Categories",
        "Blog Writing",
        "Creative Writing",
        "Business Copy",
        "Academic Writing",
        "Social Media",
        "Email Marketing",
        "Technical Writing",
        "Screenwriting",
        "Poetry"
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-text to-text-foreground bg-clip-text text-transparent mb-6">
                                Text & Writing Prompts
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Master the art of written communication with AI-powered prompts for every writing style and purpose.
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row gap-4 mb-12">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search writing prompts..."
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
                                        <div className="aspect-video bg-gradient-to-br from-text/20 to-text/5 flex items-center justify-center">
                                            <FileText className="h-12 w-12 text-text/40" />
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
                                                <CardTitle className="text-lg group-hover:text-text transition-colors">
                                                    {prompt.title}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-muted-foreground">
                                                    by {prompt.author}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-text">${prompt.price}</div>
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
                                            <Button className="bg-gradient-to-r from-text to-text/80 text-text-foreground hover:shadow-lg hover:shadow-text/25 transition-all duration-300">
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
                        <h2 className="text-3xl font-bold text-center mb-12">Elevate Your Writing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-text/10 rounded-lg flex items-center justify-center mb-4">
                                        <PenTool className="h-6 w-6 text-text" />
                                    </div>
                                    <CardTitle>Professional Quality</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Prompts crafted by professional writers and content strategists.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-text/10 rounded-lg flex items-center justify-center mb-4">
                                        <FileText className="h-6 w-6 text-text" />
                                    </div>
                                    <CardTitle>Versatile Formats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        From blog posts to novels, technical docs to poetry - we cover it all.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-text/10 rounded-lg flex items-center justify-center mb-4">
                                        <Star className="h-6 w-6 text-text" />
                                    </div>
                                    <CardTitle>SEO Optimized</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Built-in SEO best practices to help your content rank higher.
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
