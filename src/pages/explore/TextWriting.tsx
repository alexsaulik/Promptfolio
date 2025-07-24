import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Download, Filter, PenTool, Search, Zap } from "lucide-react";
import { useState } from "react";

const TextWriting = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for text prompts
    const textPrompts = [
        {
            id: '1',
            title: 'Blog Post Generator',
            slug: 'blog-post-generator',
            description: 'Create engaging blog posts with SEO optimization and compelling headlines',
            type: 'text' as const,
            price: 19.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'contentKing',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 7234,
                downloads: 1345,
                likes: 567
            },
            tags: ['blog', 'seo', 'content']
        },
        {
            id: '2',
            title: 'Creative Story Writer',
            slug: 'creative-story-writer',
            description: 'Generate captivating short stories with rich characters and plots',
            type: 'text' as const,
            price: 0,
            isPaid: false,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'storyMaster',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 5621,
                downloads: 923,
                likes: 345
            },
            tags: ['fiction', 'creative', 'storytelling']
        },
        {
            id: '3',
            title: 'Marketing Copy Creator',
            slug: 'marketing-copy-creator',
            description: 'Craft persuasive marketing copy that converts and engages',
            type: 'text' as const,
            price: 34.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'copyWriter',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 8934,
                downloads: 1623,
                likes: 678
            },
            tags: ['marketing', 'copywriting', 'conversion']
        },
        {
            id: '4',
            title: 'Technical Documentation',
            slug: 'technical-documentation',
            description: 'Generate clear and comprehensive technical documentation',
            type: 'text' as const,
            price: 24.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'techWriter',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 4567,
                downloads: 789,
                likes: 234
            },
            tags: ['technical', 'documentation', 'clarity']
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <PenTool className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-text bg-clip-text text-transparent">
                                Text & Writing
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Master the art of writing with AI prompts for content creation, storytelling, and professional communication
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span>Professional Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span>Instant Results</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span>Multiple Formats</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search writing styles, topics, or formats..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>

                            <div className="flex gap-3 w-full lg:w-auto">
                                <Select defaultValue="popular">
                                    <SelectTrigger className="w-full lg:w-[160px] h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="downloads">Most Downloaded</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="icon" className="h-12 w-12">
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Writing Categories */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Writing Categories</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Blog Posts', 'Creative Writing', 'Marketing Copy', 'Technical Writing', 'Academic', 'Poetry', 'Scripts', 'Emails'].map((category) => (
                                <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Writing Prompts</h2>
                            <p className="text-muted-foreground">
                                Showing {textPrompts.length} writing prompts
                            </p>
                        </div>

                        {/* Prompts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {textPrompts.map((prompt, index) => (
                                <div key={prompt.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                    <PromptCard prompt={prompt} />
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-8">
                            <Button variant="outline" size="lg">
                                Load More Writing Prompts
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TextWriting;
