import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Image, Palette, Search, Zap } from "lucide-react";
import { useState } from "react";

const VisualArt = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for visual art prompts
    const visualPrompts = [
        {
            id: '1',
            title: 'Hyperrealistic Portraits',
            slug: 'hyperrealistic-portraits',
            description: 'Generate stunning photorealistic portraits with perfect lighting and detail',
            type: 'image' as const,
            price: 29.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'portraitPro',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 8234,
                downloads: 1456,
                likes: 523
            },
            tags: ['portrait', 'realistic', 'photography']
        },
        {
            id: '2',
            title: 'Abstract Art Generator',
            slug: 'abstract-art-generator',
            description: 'Create mesmerizing abstract compositions with vibrant colors',
            type: 'image' as const,
            price: 0,
            isPaid: false,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'abstractMaster',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 5621,
                downloads: 892,
                likes: 234
            },
            tags: ['abstract', 'colorful', 'artistic']
        },
        {
            id: '3',
            title: 'Cyberpunk Cityscapes',
            slug: 'cyberpunk-cityscapes',
            description: 'Futuristic neon-lit cities with cyberpunk aesthetics',
            type: 'image' as const,
            price: 24.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'neonDreams',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 7893,
                downloads: 1234,
                likes: 456
            },
            tags: ['cyberpunk', 'neon', 'futuristic']
        },
        {
            id: '4',
            title: 'Watercolor Landscapes',
            slug: 'watercolor-landscapes',
            description: 'Beautiful watercolor-style nature scenes and landscapes',
            type: 'image' as const,
            price: 19.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'watercolorArt',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 4567,
                downloads: 723,
                likes: 189
            },
            tags: ['watercolor', 'landscape', 'nature']
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
                            <Palette className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-image bg-clip-text text-transparent">
                                Visual Art
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Explore cutting-edge visual art prompts for stunning images, illustrations, and digital masterpieces
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                <span>High Resolution</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span>Fast Generation</span>
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
                                    placeholder="Search art styles, subjects, or techniques..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>

                            <div className="flex gap-3 w-full lg:w-auto">
                                <Select defaultValue="trending">
                                    <SelectTrigger className="w-full lg:w-[160px] h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="trending">Trending</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
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

                    {/* Art Styles */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Popular Art Styles</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Realistic', 'Abstract', 'Impressionist', 'Cyberpunk', 'Watercolor', 'Digital Art', 'Portrait', 'Landscape'].map((style) => (
                                <Badge key={style} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                    {style}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Visual Art Prompts</h2>
                            <p className="text-muted-foreground">
                                Showing {visualPrompts.length} art prompts
                            </p>
                        </div>

                        {/* Prompts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {visualPrompts.map((prompt, index) => (
                                <div key={prompt.id} className={`animate-fade-in delay-${index}`}>
                                    <PromptCard prompt={prompt} />
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-8">
                            <Button variant="outline" size="lg">
                                Load More Art Prompts
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VisualArt;
