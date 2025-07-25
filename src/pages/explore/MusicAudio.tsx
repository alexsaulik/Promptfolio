import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Headphones, Music, Play, Search } from "lucide-react";
import { useState } from "react";

const MusicAudio = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for music prompts
    const musicPrompts = [
        {
            id: '1',
            title: 'Lo-Fi Hip Hop Generator',
            slug: 'lo-fi-hip-hop-generator',
            description: 'Create chill lo-fi beats perfect for studying and relaxation',
            type: 'music' as const,
            price: 19.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'lofiBeats',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 4521,
                downloads: 892,
                likes: 234
            },
            tags: ['lo-fi', 'hip-hop', 'chill']
        },
        {
            id: '2',
            title: 'Epic Orchestral Themes',
            slug: 'epic-orchestral-themes',
            description: 'Generate cinematic orchestral music for films and games',
            type: 'music' as const,
            price: 34.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'orchestralMaster',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 3287,
                downloads: 567,
                likes: 189
            },
            tags: ['orchestral', 'epic', 'cinematic']
        },
        {
            id: '3',
            title: 'Ambient Soundscapes',
            slug: 'ambient-soundscapes',
            description: 'Create immersive ambient soundscapes for meditation',
            type: 'music' as const,
            price: 0,
            isPaid: false,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'ambientZen',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 2156,
                downloads: 445,
                likes: 156
            },
            tags: ['ambient', 'meditation', 'zen']
        },
        {
            id: '4',
            title: 'Electronic Dance Beats',
            slug: 'electronic-dance-beats',
            description: 'High-energy EDM tracks for parties and workouts',
            type: 'music' as const,
            price: 24.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'edmProducer',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 5623,
                downloads: 1203,
                likes: 387
            },
            tags: ['edm', 'dance', 'electronic']
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
                            <Music className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-music bg-clip-text text-transparent">
                                Music & Audio
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Discover professional music prompts and audio generation tools for every genre and mood
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Headphones className="w-4 h-4" />
                                <span>Premium Audio Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Play className="w-4 h-4" />
                                <span>Instant Preview</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span>Commercial License</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search music prompts, genres, or artists..."
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

                    {/* Genre Categories */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Popular Genres</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Lo-Fi', 'Hip-Hop', 'Electronic', 'Orchestral', 'Ambient', 'Jazz', 'Rock', 'Pop'].map((genre) => (
                                <Badge key={genre} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Music Prompts</h2>
                            <p className="text-muted-foreground">
                                Showing {musicPrompts.length} music prompts
                            </p>
                        </div>

                        {/* Prompts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {musicPrompts.map((prompt, index) => (
                                <div key={prompt.id} className={`animate-fade-in delay-${index + 1}`}>
                                    <PromptCard prompt={prompt} />
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-8">
                            <Button variant="outline" size="lg">
                                Load More Music Prompts
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MusicAudio;
