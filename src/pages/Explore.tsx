import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Meteors } from "@/components/magicui/meteors";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { SimpleFlickeringGrid } from "@/components/magicui/simple-flickering-grid";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Code, Download, Eye, Filter, Grid, Heart, Image, List, Music, Search, Star, Type, Verified
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Explore = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('recent');
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 🚀 Status logging function for tracking changes
    const logStatus = (action: string, data?: any) => {
        const timestamp = new Date().toISOString();
        console.log(`🎯 [${timestamp}] Explore Page - ${action}`, data || '');
    };

    // Handle URL category and search parameters
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');

        if (categoryParam) {
            const categoryMap: Record<string, string> = {
                'music': 'Music',
                'image': 'Image',
                'code': 'Code',
                'text': 'Text',
                'video': 'Video'
            };
            const newCategory = categoryMap[categoryParam] || 'All';
            setActiveCategory(newCategory);
            logStatus('URL Category Parameter Applied', { param: categoryParam, category: newCategory });
        }

        if (searchParam) {
            setSearchQuery(searchParam);
            logStatus('URL Search Parameter Applied', { query: searchParam });
        }
    }, [searchParams]);

    // Enhanced status logging
    useEffect(() => {
        logStatus('🚀 Component Mounted with Premium Effects', {
            premiumComponents: ['WarpBackground', 'Meteors', 'ShimmerButton', 'SimpleFlickeringGrid'],
            initialState: { viewMode, activeCategory, sortBy }
        });
    }, []);

    useEffect(() => {
        logStatus('Search Query Changed', {
            query: searchQuery,
            length: searchQuery.length,
            isEmpty: searchQuery === ''
        });
    }, [searchQuery]);

    useEffect(() => {
        logStatus('Category Filter Changed', {
            previousCategory: activeCategory,
            newCategory: activeCategory
        });
    }, [activeCategory]);

    useEffect(() => {
        logStatus('Sort Method Changed', { sortBy });
    }, [sortBy]);

    // 🎯 Enhanced Mock Data - Comprehensive Prompt Library
    // Helper to generate slug from title
    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    // Original prompts array
    const originalPrompts = [
        {
            id: 'cinematic-portrait-generator',
            title: 'Cinematic Portrait Generator',
            slug: 'cinematic-portrait-generator',
            description: 'Create stunning cinematic portraits with dramatic lighting and film grain effects. Perfect for professional headshots and artistic photography.',
            type: 'image' as const,
            price: 12.99,
            isPaid: true,
            isFeatured: true,
            isPremium: true,
            isNew: false,
            coverImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
            creator: {
                username: 'cinematicAI',
                displayName: 'Cinematic AI Studio',
                avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 15420,
                totalSales: 3420
            },
            stats: {
                views: 28470,
                downloads: 3420,
                likes: 890,
                rating: 4.8,
                reviews: 245,
                revenue: 42840
            },
            tags: ['portrait', 'cinematic', 'dramatic', 'photography', 'professional', 'lighting', 'film-grain'],
            category: 'Image',
            difficulty: 'Advanced',
            lastUpdated: '2024-01-25',
            createdAt: '2024-01-10',
            compatibility: ['DALL-E 3', 'Midjourney V6', 'Stable Diffusion XL'],
            industries: ['Photography', 'Marketing', 'Entertainment', 'Branding'],
            license: 'Commercial',
            fileSize: '2.4 MB',
            languages: ['English', 'Spanish', 'French']
        },
        {
            id: 'epic-fantasy-landscapes',
            title: 'Epic Fantasy Landscapes',
            slug: 'epic-fantasy-landscapes',
            description: 'Generate breathtaking fantasy worlds with mystical elements and magical atmospheres. Ideal for game development and digital art.',
            type: 'image' as const,
            price: 0,
            isPaid: false,
            isFeatured: false,
            isPremium: false,
            isNew: true,
            coverImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
            creator: {
                username: 'fantasyMaster',
                displayName: 'Fantasy Master Studios',
                avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: false,
                followers: 8950,
                totalSales: 0
            },
            stats: {
                views: 15670,
                downloads: 2340,
                likes: 1560,
                rating: 4.6,
                reviews: 189,
                revenue: 0
            },
            tags: ['fantasy', 'landscape', 'magical', 'digital-art', 'game-dev', 'mystical', 'worlds'],
            category: 'Image',
            difficulty: 'Intermediate',
            lastUpdated: '2024-01-24',
            createdAt: '2024-01-22',
            compatibility: ['Midjourney V6', 'Stable Diffusion XL', 'SDXL'],
            industries: ['Gaming', 'Entertainment', 'Publishing', 'Digital Art'],
            license: 'Creative Commons',
            fileSize: '1.8 MB',
            languages: ['English', 'German', 'Japanese']
        },
        {
            id: 'ai-music-composer-ambient',
            title: 'AI Music Composer - Ambient',
            slug: 'ai-music-composer-ambient',
            description: 'Generate atmospheric ambient music perfect for meditation, focus work, and relaxation. Professional quality compositions with customizable moods.',
            type: 'music' as const,
            price: 19.99,
            isPaid: true,
            isFeatured: true,
            isPremium: true,
            isNew: false,
            coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
            audioPreview: '/placeholder-audio.mp3',
            creator: {
                username: 'ambientAI',
                displayName: 'Ambient AI Composer',
                avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 12340,
                totalSales: 5670
            },
            stats: {
                views: 34210,
                downloads: 5670,
                likes: 2340,
                rating: 4.9,
                reviews: 334,
                revenue: 113223
            },
            tags: ['ambient', 'meditation', 'relaxation', 'atmospheric', 'professional', 'focus', 'zen'],
            category: 'Music',
            difficulty: 'Professional',
            lastUpdated: '2024-01-23',
            createdAt: '2024-01-05',
            compatibility: ['Suno AI v4', 'Udio', 'MusicGen', 'AIVA'],
            industries: ['Wellness', 'Productivity', 'Healthcare', 'Meditation'],
            license: 'Commercial',
            fileSize: '45 MB',
            languages: ['English', 'Sanskrit', 'Instrumental']
        },
        {
            id: 'react-component-generator',
            title: 'React Component Generator Pro',
            slug: 'react-component-generator-pro',
            description: 'Automatically generate clean, modern React components with TypeScript support, best practices, and comprehensive testing included.',
            type: 'code' as const,
            price: 8.99,
            isPaid: true,
            isFeatured: false,
            isPremium: false,
            isNew: false,
            coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
            creator: {
                username: 'reactDev',
                displayName: 'React Development Pro',
                avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 18750,
                totalSales: 8920
            },
            stats: {
                views: 45210,
                downloads: 8920,
                likes: 4450,
                rating: 4.7,
                reviews: 567,
                revenue: 79592
            },
            tags: ['react', 'typescript', 'components', 'development', 'modern', 'best-practices', 'testing'],
            category: 'Code',
            difficulty: 'Intermediate',
            lastUpdated: '2024-01-25',
            createdAt: '2024-01-01',
            compatibility: ['GPT-4 Turbo', 'Claude 3.5', 'GitHub Copilot', 'CodeLlama'],
            industries: ['Software Development', 'Web Development', 'Tech', 'Startups'],
            license: 'MIT',
            fileSize: '3.2 MB',
            languages: ['TypeScript', 'JavaScript', 'JSX']
        },
        {
            id: 'creative-writing-assistant',
            title: 'Creative Writing Assistant',
            slug: 'creative-writing-assistant',
            description: 'Enhance your storytelling with AI-powered writing prompts, character development, plot suggestions, and narrative structure guidance.',
            type: 'text' as const,
            price: 0,
            isPaid: false,
            isFeatured: false,
            isPremium: false,
            isNew: true,
            coverImageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
            creator: {
                username: 'wordCrafter',
                displayName: 'Word Crafter Studios',
                avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=40&h=40&fit=crop&crop=face',
                isVerified: false,
                isPro: false,
                followers: 5640,
                totalSales: 0
            },
            stats: {
                views: 21560,
                downloads: 6780,
                likes: 2340,
                rating: 4.5,
                reviews: 298,
                revenue: 0
            },
            tags: ['writing', 'creative', 'storytelling', 'characters', 'plot', 'fiction', 'narrative'],
            category: 'Text',
            difficulty: 'Beginner',
            lastUpdated: '2024-01-24',
            createdAt: '2024-01-20',
            compatibility: ['GPT-4 Turbo', 'Claude 3.5', 'Gemini 1.5', 'LLaMA 3.1'],
            industries: ['Publishing', 'Education', 'Entertainment', 'Content Creation'],
            license: 'Creative Commons',
            fileSize: '850 KB',
            languages: ['English', 'Spanish', 'French', 'German']
        },
        {
            id: 'ai-video-script-writer',
            title: 'AI Video Script Writer Pro',
            slug: 'ai-video-script-writer-pro',
            description: 'Create engaging video scripts for YouTube, social media, and marketing campaigns with AI assistance. Includes hooks, CTAs, and engagement optimization.',
            type: 'text' as const,
            price: 15.99,
            isPaid: true,
            isFeatured: true,
            isPremium: false,
            isNew: false,
            coverImageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop',
            creator: {
                username: 'scriptMaster',
                displayName: 'Script Master Pro',
                avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 23450,
                totalSales: 12450
            },
            stats: {
                views: 52340,
                downloads: 12450,
                likes: 5670,
                rating: 4.8,
                reviews: 689,
                revenue: 199175
            },
            tags: ['video', 'script', 'youtube', 'marketing', 'social-media', 'content', 'engagement'],
            category: 'Text',
            difficulty: 'Advanced',
            lastUpdated: '2024-01-23',
            createdAt: '2023-12-15',
            compatibility: ['GPT-4 Turbo', 'Claude 3.5', 'Gemini 1.5'],
            industries: ['Marketing', 'Social Media', 'Content Creation', 'YouTube'],
            license: 'Commercial',
            fileSize: '1.2 MB',
            languages: ['English', 'Spanish', 'Portuguese']
        },
        {
            id: 'professional-logo-designer',
            title: 'Professional Logo Designer AI',
            slug: 'professional-logo-designer-ai',
            description: 'Generate stunning, brand-ready logos with modern design principles and vector-style outputs. Perfect for startups and rebranding projects.',
            type: 'image' as const,
            price: 24.99,
            isPaid: true,
            isFeatured: true,
            isPremium: true,
            isNew: false,
            coverImageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop',
            creator: {
                username: 'logoMaster',
                displayName: 'Logo Master Design',
                avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 19870,
                totalSales: 4560
            },
            stats: {
                views: 38750,
                downloads: 4560,
                likes: 1890,
                rating: 4.9,
                reviews: 412,
                revenue: 113874
            },
            tags: ['logo', 'branding', 'professional', 'vector', 'business', 'identity', 'startup'],
            category: 'Image',
            difficulty: 'Professional',
            lastUpdated: '2024-01-21',
            createdAt: '2023-12-01',
            compatibility: ['DALL-E 3', 'Midjourney V6', 'Stable Diffusion XL'],
            industries: ['Branding', 'Design', 'Business', 'Startups'],
            license: 'Commercial',
            fileSize: '3.8 MB',
            languages: ['English', 'Spanish', 'French', 'German']
        },
        {
            id: 'electronic-music-producer',
            title: 'Electronic Music Producer Suite',
            slug: 'electronic-music-producer-suite',
            description: 'Create high-energy electronic tracks with professional mixing and mastering techniques. Includes EDM, techno, house, and ambient presets.',
            type: 'music' as const,
            price: 29.99,
            isPaid: true,
            isFeatured: false,
            isPremium: true,
            isNew: false,
            coverImageUrl: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&h=300&fit=crop',
            audioPreview: '/placeholder-electronic.mp3',
            creator: {
                username: 'electronicPro',
                displayName: 'Electronic Pro Studio',
                avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 16540,
                totalSales: 3450
            },
            stats: {
                views: 29340,
                downloads: 3450,
                likes: 1670,
                rating: 4.7,
                reviews: 234,
                revenue: 103455
            },
            tags: ['electronic', 'edm', 'dance', 'techno', 'professional', 'mixing', 'house'],
            category: 'Music',
            difficulty: 'Professional',
            lastUpdated: '2024-01-19',
            createdAt: '2023-11-15',
            compatibility: ['Suno AI v4', 'Udio', 'AIVA', 'MusicGen'],
            industries: ['Music Production', 'Entertainment', 'Gaming', 'Fitness'],
            license: 'Commercial',
            fileSize: '78 MB',
            languages: ['Instrumental', 'English', 'Vocal Samples']
        },
        {
            id: 'ai-video-generator',
            title: 'AI Video Content Generator',
            slug: 'ai-video-generator',
            description: 'Create professional video content with AI assistance. Perfect for social media, marketing, and educational content with automated editing.',
            type: 'video' as const,
            price: 34.99,
            isPaid: true,
            isFeatured: true,
            isPremium: true,
            isNew: true,
            coverImageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
            creator: {
                username: 'videoAI',
                displayName: 'Video AI Productions',
                avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: true,
                followers: 21340,
                totalSales: 2890
            },
            stats: {
                views: 31250,
                downloads: 2890,
                likes: 1456,
                rating: 4.8,
                reviews: 178,
                revenue: 101076
            },
            tags: ['video', 'content', 'social-media', 'marketing', 'automated', 'editing', 'professional'],
            category: 'Video',
            difficulty: 'Advanced',
            lastUpdated: '2024-01-25',
            createdAt: '2024-01-15',
            compatibility: ['Kling 2.1 Pro', 'RunwayML Gen-3', 'Pika Labs', 'Sora'],
            industries: ['Video Production', 'Marketing', 'Social Media', 'Education'],
            license: 'Commercial',
            fileSize: '125 MB',
            languages: ['English', 'Spanish', 'Mandarin']
        },
        {
            id: 'python-code-optimizer',
            title: 'Python Code Optimizer & Refactor',
            slug: 'python-code-optimizer',
            description: 'Optimize and refactor Python code for better performance, readability, and maintainability. Includes PEP 8 compliance and best practices.',
            type: 'code' as const,
            price: 6.99,
            isPaid: true,
            isFeatured: false,
            isPremium: false,
            isNew: true,
            coverImageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
            creator: {
                username: 'pythonMaster',
                displayName: 'Python Master Dev',
                avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
                isVerified: true,
                isPro: false,
                followers: 12450,
                totalSales: 6780
            },
            stats: {
                views: 28670,
                downloads: 6780,
                likes: 3240,
                rating: 4.6,
                reviews: 445,
                revenue: 47372
            },
            tags: ['python', 'optimization', 'refactor', 'performance', 'clean-code', 'pep8', 'best-practices'],
            category: 'Code',
            difficulty: 'Intermediate',
            lastUpdated: '2024-01-24',
            createdAt: '2024-01-18',
            compatibility: ['GPT-4 Turbo', 'Claude 3.5', 'CodeLlama 70B'],
            industries: ['Software Development', 'Data Science', 'Backend Development'],
            license: 'MIT',
            fileSize: '2.1 MB',
            languages: ['Python', 'Documentation']
        }
    ];

    // Ensure every prompt has a slug
    const prompts = originalPrompts.map(prompt => ({
        ...prompt,
        slug: prompt.slug || generateSlug(prompt.title),
    }));

    // Filter prompts based on search and active category
    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = searchQuery === '' ||
            prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            prompt.creator.username.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeCategory === 'All' || prompt.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    const categories = [
        { name: 'All', count: prompts.length },
        { name: 'Image', count: prompts.filter(p => p.category === 'Image').length },
        { name: 'Text', count: prompts.filter(p => p.category === 'Text').length },
        { name: 'Music', count: prompts.filter(p => p.category === 'Music').length },
        { name: 'Code', count: prompts.filter(p => p.category === 'Code').length },
        { name: 'Video', count: prompts.filter(p => p.category === 'Video').length }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Full Viewport FlickeringGrid Background */}
            <SimpleFlickeringGrid
                squareSize={3}
                gridGap={12}
                color="#8B5CF6"
                maxOpacity={0.15}
                flickerChance={0.05}
            />

            {/* Meteors Background */}
            <Meteors number={30} />

            <Header />

            <main className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <div className="mb-8">
                        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
                            {activeCategory !== 'All' && (
                                <>
                                    <span>/</span>
                                    <span className="text-foreground font-medium">{activeCategory} Prompts</span>
                                </>
                            )}
                            {searchQuery && (
                                <>
                                    <span>/</span>
                                    <span className="text-foreground font-medium">Search: "{searchQuery}"</span>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
                                Discover Premium AI Prompts
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                                Explore our curated collection of professional-grade prompts for music, images, code, and text generation.
                                <br className="hidden md:block" />
                                Created by expert prompt engineers and verified by our community.
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>50,000+ Premium Prompts</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Verified className="h-4 w-4 text-primary" />
                                <span>Verified Creators</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Download className="h-4 w-4 text-accent" />
                                <span>1M+ Downloads</span>
                            </div>
                        </div>

                        {/* Premium CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <Button variant="outline" onClick={() => navigate('/auth')}>
                                Browse Free Prompts
                            </Button>
                            <ShimmerButton
                                onClick={() => navigate('/auth')}
                                className="px-6 py-2"
                                shimmerColor="#ffffff"
                                background="rgba(138, 43, 226, 0.9)"
                                borderRadius="8px"
                            >
                                <span className="text-white font-medium">
                                    Get Unlimited Access
                                </span>
                            </ShimmerButton>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-border/50 shadow-lg">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                                placeholder="Search 50,000+ premium prompts, creators, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-12 h-14 text-lg bg-background/50 border-border/50 focus:border-primary/50 rounded-xl"
                            />
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={() => setSearchQuery('')}
                                >
                                    ×
                                </Button>
                            )}
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                                <Select value={activeCategory} onValueChange={setActiveCategory}>
                                    <SelectTrigger className="w-full lg:w-[160px] h-12 bg-background/50 border-border/50">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Categories</SelectItem>
                                        <SelectItem value="Music">🎵 Music & Audio</SelectItem>
                                        <SelectItem value="Image">🎨 Visual Art</SelectItem>
                                        <SelectItem value="Code">💻 Code Development</SelectItem>
                                        <SelectItem value="Text">✍️ Text & Writing</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select defaultValue="recent">
                                    <SelectTrigger className="w-full lg:w-[160px] h-12 bg-background/50 border-border/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="downloads">Most Downloaded</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" className="h-12 px-6 bg-background/50 border-border/50 hover:bg-primary/10">
                                    <Filter className="w-4 h-4 mr-2" />
                                    More Filters
                                </Button>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground hidden lg:block">View:</span>
                                <div className="flex bg-muted/50 rounded-lg p-1">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className="h-10 px-4"
                                    >
                                        <Grid className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className="h-10 px-4"
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

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

                    {/* Results Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground mb-1">
                                {activeCategory === 'All' ? 'All Prompts' : `${activeCategory} Prompts`}
                            </h2>
                            <p className="text-muted-foreground">
                                {filteredPrompts.length} results found
                                {searchQuery && ` for "${searchQuery}"`}
                                {activeCategory !== 'All' && ` in ${activeCategory}`}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Showing {Math.min(filteredPrompts.length, 12)} of {filteredPrompts.length}</span>
                        </div>
                    </div>    {/* Categories */}
                    <div className="mb-8">
                        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
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

                            {categories.map((category) => (
                                <TabsContent key={category.name} value={category.name} className="space-y-8">
                                    {/* Results Header */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-muted-foreground">
                                            Showing {filteredPrompts.length} of {category.count} prompts in {category.name}
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

                                    {/* SEO-Friendly Category Description */}
                                    {category.name !== 'All' && (
                                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                                            <h2 className="text-lg font-semibold mb-2">{category.name} Prompts</h2>
                                            <p className="text-muted-foreground">
                                                {category.name === 'Image' && 'Discover AI prompts for stunning visual art, photography, and digital illustrations. From portraits to landscapes, create amazing images with AI.'}
                                                {category.name === 'Music' && 'Generate beautiful music and audio with AI. Create ambient tracks, beats, and compositions for any project or mood.'}
                                                {category.name === 'Code' && 'Accelerate your development with AI-generated code prompts. From React components to full applications, code smarter with AI.'}
                                                {category.name === 'Text' && 'Enhance your writing with AI text generation prompts. Perfect for creative writing, marketing copy, and content creation.'}
                                                {category.name === 'Video' && 'Create compelling video content with AI assistance. Generate scripts, concepts, and production ideas.'}
                                            </p>
                                        </div>
                                    )}

                                    {/* Prompts Grid */}
                                    {filteredPrompts.length === 0 ? (
                                        <div className="text-center py-16">
                                            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
                                            <p className="text-muted-foreground mb-6">
                                                {searchQuery
                                                    ? `No results for "${searchQuery}" in ${category.name} category`
                                                    : `No prompts available in ${category.name} category`
                                                }
                                            </p>
                                            {searchQuery && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setSearchQuery('')}
                                                >
                                                    Clear search
                                                </Button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className={viewMode === 'grid'
                                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                            : 'space-y-4'
                                        }>
                                            {filteredPrompts.map((prompt, index) => (
                                                <div key={prompt.id} className={`animate-fade-in animate-delay-${index}`}>
                                                    {viewMode === 'grid' ? (
                                                        <PromptCard prompt={prompt} />
                                                    ) : (
                                                        <Card
                                                            className="flex flex-row overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                                            onClick={() => navigate(`/prompt/${prompt.slug}`)}
                                                        >
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
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <span className="text-sm text-muted-foreground">by {prompt.creator.username}</span>
                                                                            {prompt.creator.isVerified && (
                                                                                <Verified className="w-4 h-4 text-blue-500" />
                                                                            )}
                                                                            <div className="flex items-center gap-1">
                                                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                                                <span className="text-sm">{prompt.stats.rating}</span>
                                                                            </div>
                                                                        </div>
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
                                    )}

                                    {/* Quick Category Navigation */}
                                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border">
                                        <h3 className="text-lg font-semibold mb-4">Explore More Categories</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <Link to="/explore?category=image" className="group">
                                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 group-hover:border-primary transition-colors">
                                                    <Image className="w-6 h-6" />
                                                    <span>Image Prompts</span>
                                                </Button>
                                            </Link>
                                            <Link to="/explore?category=text" className="group">
                                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 group-hover:border-primary transition-colors">
                                                    <Type className="w-6 h-6" />
                                                    <span>Text Prompts</span>
                                                </Button>
                                            </Link>
                                            <Link to="/explore?category=code" className="group">
                                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 group-hover:border-primary transition-colors">
                                                    <Code className="w-6 h-6" />
                                                    <span>Code Prompts</span>
                                                </Button>
                                            </Link>
                                            <Link to="/explore?category=music" className="group">
                                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 group-hover:border-primary transition-colors">
                                                    <Music className="w-6 h-6" />
                                                    <span>Music Prompts</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Load More */}
                                    <div className="text-center pt-8">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={() => {
                                                // TODO: Implement load more functionality
                                                console.log('Loading more', category.name, 'prompts...');
                                            }}
                                        >
                                            Load More {category.name} Prompts
                                        </Button>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    );
};

export default Explore;
