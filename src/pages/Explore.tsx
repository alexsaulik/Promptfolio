import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, Filter, Grid, Heart, List, Search } from "lucide-react";
import { useState } from "react";

const Explore = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for prompts
    const prompts = [
        {
            id: '1',
            title: 'Cinematic Portrait Generator',
            slug: 'cinematic-portrait-generator',
            description: 'Create stunning cinematic portraits with dramatic lighting and film grain effects',
            type: 'image' as const,
            price: 12.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'cinematicAI',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 2847,
                downloads: 342,
                likes: 89
            },
            tags: ['portrait', 'cinematic', 'dramatic']
        },
        {
            id: '2',
            title: 'Epic Fantasy Landscapes',
            slug: 'epic-fantasy-landscapes',
            description: 'Generate breathtaking fantasy worlds with mystical elements and magical atmospheres',
            type: 'image' as const,
            price: 0,
            isPaid: false,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'fantasyMaster',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 1923,
                downloads: 156,
                likes: 67
            },
            tags: ['fantasy', 'landscape', 'mystical']
        },
        {
            id: '3',
            title: 'Ambient Lo-Fi Beat Pack',
            slug: 'ambient-lofi-beat-pack',
            description: 'Collection of soothing lo-fi beats perfect for studying and relaxation',
            type: 'music' as const,
            price: 24.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'chillBeats',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 3456,
                downloads: 289,
                likes: 134
            },
            tags: ['lofi', 'ambient', 'chill']
        }
    ];

    const categories = [
        { name: 'All', count: 1247 },
        { name: 'Image', count: 456 },
        { name: 'Text', count: 234 },
        { name: 'Music', count: 189 },
        { name: 'Code', count: 167 },
        { name: 'Video', count: 89 }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
                            Explore AI Prompts
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Discover thousands of high-quality prompts from talented creators worldwide
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search prompts, creators, or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>

                            <div className="flex gap-3 w-full lg:w-auto">
                                <Select defaultValue="recent">
                                    <SelectTrigger className="w-full lg:w-[140px] h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
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

                                <div className="flex bg-muted rounded-lg p-1">
                                    <Button
                                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className="h-10 w-10"
                                    >
                                        <Grid className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className="h-10 w-10"
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-8">
                        <Tabs defaultValue="All" className="w-full">
                            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full max-w-2xl mx-auto mb-8">
                                {categories.map((category) => (
                                    <TabsTrigger key={category.name} value={category.name} className="text-xs">
                                        {category.name}
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                            {category.count}
                                        </Badge>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="All" className="space-y-8">
                                {/* Results Header */}
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground">
                                        Showing {prompts.length} of 1,247 prompts
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>View:</span>
                                        <Button
                                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                            size="sm"
                                            onClick={() => setViewMode('grid')}
                                        >
                                            Grid
                                        </Button>
                                        <Button
                                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                            size="sm"
                                            onClick={() => setViewMode('list')}
                                        >
                                            List
                                        </Button>
                                    </div>
                                </div>

                                {/* Prompts Grid */}
                                <div className={viewMode === 'grid'
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                    : 'space-y-4'
                                }>
                                    {prompts.map((prompt, index) => (
                                        <div key={prompt.id} className={`animate-fade-in animate-delay-${index}`}>
                                            {viewMode === 'grid' ? (
                                                <PromptCard prompt={prompt} />
                                            ) : (
                                                <Card className="flex flex-row overflow-hidden hover:shadow-lg transition-shadow">
                                                    <img
                                                        src={prompt.coverImageUrl}
                                                        alt={prompt.title}
                                                        className="w-32 h-32 object-cover"
                                                    />
                                                    <div className="flex-1 p-4">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <h3 className="font-semibold text-lg mb-1">{prompt.title}</h3>
                                                                <p className="text-sm text-muted-foreground mb-2">{prompt.description}</p>
                                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                    <div className="flex items-center">
                                                                        <Eye className="w-3 h-3 mr-1" />
                                                                        {prompt.stats.views}
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <Download className="w-3 h-3 mr-1" />
                                                                        {prompt.stats.downloads}
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <Heart className="w-3 h-3 mr-1" />
                                                                        {prompt.stats.likes}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-lg font-semibold mb-2">
                                                                    {prompt.isPaid ? `$${prompt.price}` : 'Free'}
                                                                </div>
                                                                <Button size="sm">
                                                                    {prompt.isPaid ? 'Buy Now' : 'Download'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Load More */}
                                <div className="text-center pt-8">
                                    <Button variant="outline" size="lg">
                                        Load More Prompts
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Explore;
