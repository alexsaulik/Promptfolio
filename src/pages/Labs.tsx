// Using Unsplash URLs for placeholder images
const comfyuiPortrait = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop";
const musicProduction = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop";
const videoUpscaling = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Play, Sparkles, Star, Users, Workflow, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Labs = () => {
    const [activeTab, setActiveTab] = useState("all");
    const navigate = useNavigate();
    const allWorkflows = [
        {
            id: 1,
            title: "ComfyUI Portrait Generator",
            slug: "comfyui-portrait-generator",
            description: "Professional headshot generator with advanced lighting controls and background removal",
            type: "workflow",
            difficulty: "Advanced",
            downloads: 1247,
            rating: 4.9,
            tags: ["ComfyUI", "Portrait", "Professional"],
            coverImage: comfyuiPortrait,
            creator: "AI_Studio_Pro",
            isPaid: false,
            isNew: true,
            createdAt: "2024-01-20"
        },
        {
            id: 2,
            title: "Music Production Chain",
            slug: "music-production-chain",
            description: "End-to-end workflow for generating, mixing, and mastering AI music tracks",
            type: "workflow",
            difficulty: "Expert",
            downloads: 892,
            rating: 4.8,
            tags: ["Music", "Audio", "Production"],
            coverImage: musicProduction,
            creator: "SoundCraft_AI",
            isPaid: true,
            isNew: false,
            createdAt: "2024-01-15"
        },
        {
            id: 3,
            title: "Video Upscaling Pipeline",
            slug: "video-upscaling-pipeline",
            description: "4K video enhancement with noise reduction and frame interpolation",
            type: "workflow",
            difficulty: "Intermediate",
            downloads: 2156,
            rating: 4.7,
            tags: ["Video", "Upscaling", "Enhancement"],
            coverImage: videoUpscaling,
            creator: "VideoWizard",
            isPaid: false,
            isNew: false,
            createdAt: "2024-01-10"
        },
        {
            id: 4,
            title: "AI Code Assistant Workflow",
            slug: "ai-code-assistant-workflow",
            description: "Automated code generation and review workflow for developers",
            type: "workflow",
            difficulty: "Beginner",
            downloads: 3421,
            rating: 4.6,
            tags: ["Code", "Programming", "Assistant"],
            coverImage: comfyuiPortrait,
            creator: "DevMaster",
            isPaid: false,
            isNew: true,
            createdAt: "2024-01-22"
        },
        {
            id: 5,
            title: "Advanced Image Stylization",
            slug: "advanced-image-stylization",
            description: "Professional image stylization with multiple artistic effects",
            type: "workflow",
            difficulty: "Expert",
            downloads: 567,
            rating: 4.9,
            tags: ["Image", "Style", "Art"],
            coverImage: videoUpscaling,
            creator: "ArtisticAI",
            isPaid: true,
            isNew: true,
            createdAt: "2024-01-18"
        }
    ];

    const getFilteredWorkflows = () => {
        switch (activeTab) {
            case "new":
                return allWorkflows.filter(w => w.isNew).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case "popular":
                return allWorkflows.sort((a, b) => b.downloads - a.downloads);
            case "free":
                return allWorkflows.filter(w => !w.isPaid);
            default:
                return allWorkflows;
        }
    };

    const featuredWorkflows = getFilteredWorkflows();

    const categories = [
        {
            name: "Image Generation",
            count: 45,
            icon: Sparkles,
            gradient: "from-purple-500/20 to-pink-500/20",
            description: "Advanced image creation workflows"
        },
        {
            name: "Video Processing",
            count: 23,
            icon: Play,
            gradient: "from-blue-500/20 to-cyan-500/20",
            description: "Video editing and enhancement pipelines"
        },
        {
            name: "Audio Creation",
            count: 18,
            icon: Zap,
            gradient: "from-green-500/20 to-emerald-500/20",
            description: "Music and sound generation workflows"
        },
        {
            name: "Code Generation",
            count: 32,
            icon: Workflow,
            gradient: "from-orange-500/20 to-red-500/20",
            description: "Programming and development automation"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="relative">
                {/* Hero Section with Subtle Warp Background */}
                <WarpBackground
                    className="relative py-24 overflow-hidden !p-0 !border-0 !rounded-none"
                    perspective={40}
                    beamsPerSide={1}
                    beamSize={8}
                    beamDelayMax={6}
                    beamDelayMin={2}
                    beamDuration={10}
                    gridColor="hsl(var(--border) / 0.3)"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent via-40% to-accent/5" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <Badge variant="secondary" className="mb-4 px-4 py-2">
                                <Zap className="w-4 h-4 mr-2" />
                                PromptfolioLab
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 animate-fade-in">
                                Ready-to-Run AI Workflows
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in delay-200">
                                Professional-grade AI workflows, pre-built models, and automation pipelines.
                                From ComfyUI nodes to complete production chains - everything you need to accelerate your creative process.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
                                <Button size="lg" className="px-8 py-4 text-lg" onClick={() => navigate('/lab/workflows')}>
                                    <Download className="w-5 h-5 mr-2" />
                                    Browse Workflows
                                </Button>
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg" onClick={() => navigate('/community')}>
                                    <Users className="w-5 h-5 mr-2" />
                                    Join Community
                                </Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                            <div className="text-center animate-scale-in">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">120+</div>
                                <div className="text-muted-foreground">Workflows</div>
                            </div>
                            <div className="text-center animate-scale-in delay-100">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
                                <div className="text-muted-foreground">Downloads</div>
                            </div>
                            <div className="text-center animate-scale-in delay-200">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8</div>
                                <div className="text-muted-foreground">Avg Rating</div>
                            </div>
                            <div className="text-center animate-scale-in delay-300">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2K+</div>
                                <div className="text-muted-foreground">Creators</div>
                            </div>
                        </div>
                    </div>
                </WarpBackground>

                {/* AI Tools & Features Section */}
                <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 px-4 py-2">
                                <Sparkles className="w-4 h-4 mr-2" />
                                AI Laboratory
                            </Badge>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
                                Professional AI Tools
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Access cutting-edge AI models, experiment with workflows, and accelerate your creative process with our professional toolkit.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 mb-16">
                            {/* AI Model Hub */}
                            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/20 cursor-pointer" onClick={() => navigate('/lab/models')}>
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Zap className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">AI Model Hub</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Access SOTA models: GPT-4, Claude, Gemini, DALL-E 3, Midjourney, Stable Diffusion XL, and more.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Available Models</span>
                                            <span className="font-semibold">50+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>API Integrations</span>
                                            <span className="font-semibold">15+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Real-time Access</span>
                                            <span className="font-semibold text-green-500">✓ Live</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Workflow Engine */}
                            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-accent/20 cursor-pointer" onClick={() => navigate('/lab/workflows')}>
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-accent/10 rounded-lg">
                                            <Workflow className="h-6 w-6 text-accent" />
                                        </div>
                                        <CardTitle className="text-xl">Workflow Engine</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Chain AI models together, automate complex processes, and build production-ready pipelines.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Pre-built Workflows</span>
                                            <span className="font-semibold">120+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Custom Nodes</span>
                                            <span className="font-semibold">500+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>ComfyUI Compatible</span>
                                            <span className="font-semibold text-green-500">✓ Yes</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Creative Packs */}
                            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/20 cursor-pointer" onClick={() => navigate('/lab/packs')}>
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Download className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">Creative Packs</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Ready-to-use prompt collections, LoRA models, and style guides for instant creativity.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Prompt Packs</span>
                                            <span className="font-semibold">200+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>LoRA Models</span>
                                            <span className="font-semibold">150+</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Total Downloads</span>
                                            <span className="font-semibold">1M+</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Featured Tools Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/lab/image-generation')}>
                                <CardContent className="pt-8">
                                    <div className="text-4xl mb-3">🎨</div>
                                    <h3 className="font-semibold mb-2">Image Generation</h3>
                                    <p className="text-sm text-muted-foreground">SDXL, Midjourney, DALL-E</p>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/lab/audio-creation')}>
                                <CardContent className="pt-8">
                                    <div className="text-4xl mb-3">🎵</div>
                                    <h3 className="font-semibold mb-2">Music Creation</h3>
                                    <p className="text-sm text-muted-foreground">Suno, MusicGen, AIVA</p>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/lab/code-generation')}>
                                <CardContent className="pt-8">
                                    <div className="text-4xl mb-3">💻</div>
                                    <h3 className="font-semibold mb-2">Code Generation</h3>
                                    <p className="text-sm text-muted-foreground">GitHub Copilot, CodeT5</p>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/lab/video-processing')}>
                                <CardContent className="pt-8">
                                    <div className="text-4xl mb-3">🎬</div>
                                    <h3 className="font-semibold mb-2">Video Processing</h3>
                                    <p className="text-sm text-muted-foreground">RunwayML, Pika Labs</p>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20" onClick={() => navigate('/lab/local-ai')}>
                                <CardContent className="pt-8">
                                    <div className="text-4xl mb-3">🧠</div>
                                    <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">Local AI</h3>
                                    <p className="text-sm text-green-600 dark:text-green-400">Llama, Ollama, Private</p>
                                    <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">NEW</Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Featured Workflow Section with WarpBackground Demo */}
                <section className="py-16 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured This Week</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Highlighted workflow with advanced effects
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <WarpBackground
                                perspective={60}
                                beamsPerSide={1}
                                beamSize={6}
                                beamDelayMax={5}
                                beamDelayMin={2}
                                beamDuration={8}
                                gridColor="hsl(var(--border) / 0.2)"
                                className="rounded-xl !p-6"
                            >
                                <Card className="w-96 bg-card/80 backdrop-blur-sm border-primary/20">
                                    <CardContent className="flex flex-col gap-4 p-6">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-primary border-primary">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                Featured
                                            </Badge>
                                            <Badge variant="secondary">ComfyUI</Badge>
                                        </div>
                                        <CardTitle className="text-xl">Professional Portrait Generator</CardTitle>
                                        <CardDescription className="text-base">
                                            Advanced lighting controls, background removal, and professional headshot generation.
                                            Perfect for creating LinkedIn profiles and business portraits.
                                        </CardDescription>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="font-medium">4.9</span>
                                                <span className="text-muted-foreground">(247 reviews)</span>
                                            </div>
                                            <Button size="sm">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </WarpBackground>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-16 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Workflow Categories</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Discover specialized workflows for every creative domain
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <Card
                                    key={category.name}
                                    className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-gradient-to-br ${category.gradient} backdrop-blur-sm animate-fade-in`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => window.location.href = `/lab/${category.name.toLowerCase().replace(' ', '-')}`}
                                >
                                    <CardHeader className="text-center pb-4">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <category.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                                        <CardDescription className="text-sm">{category.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <Badge variant="secondary" className="px-3 py-1">
                                            {category.count} workflows
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Workflows */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Workflows</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Hand-picked, production-ready workflows from top creators
                            </p>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
                                <TabsTrigger value="all">All ({allWorkflows.length})</TabsTrigger>
                                <TabsTrigger value="new">New ({allWorkflows.filter(w => w.isNew).length})</TabsTrigger>
                                <TabsTrigger value="popular">Popular</TabsTrigger>
                                <TabsTrigger value="free">Free ({allWorkflows.filter(w => !w.isPaid).length})</TabsTrigger>
                            </TabsList>

                            {["all", "new", "popular", "free"].map((tabValue) => (
                                <TabsContent key={tabValue} value={tabValue} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {featuredWorkflows.map((workflow, index) => (
                                            <Link
                                                key={workflow.id}
                                                to={`/workflow/${workflow.slug}`}
                                                className="block group"
                                            >
                                                <Card className={`overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in cursor-pointer`} style={{ animationDelay: `${index * 150}ms` }}>
                                                    <div className="relative">
                                                        <img
                                                            src={workflow.coverImage}
                                                            alt={workflow.title}
                                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute top-4 left-4">
                                                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                                                {workflow.difficulty}
                                                            </Badge>
                                                        </div>
                                                        <div className="absolute top-4 right-4">
                                                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                                                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                                {workflow.rating}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <CardHeader className="pb-3">
                                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                                            {workflow.title}
                                                        </CardTitle>
                                                        <CardDescription className="text-sm leading-relaxed">
                                                            {workflow.description}
                                                        </CardDescription>
                                                    </CardHeader>

                                                    <CardContent className="space-y-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {workflow.tags.map((tag) => (
                                                                <Badge key={tag} variant="outline" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>

                                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                            <span>by {workflow.creator}</span>
                                                            <div className="flex items-center">
                                                                <Download className="w-4 h-4 mr-1" />
                                                                {workflow.downloads.toLocaleString()}
                                                            </div>
                                                        </div>

                                                        <Button className="w-full group-hover:shadow-lg transition-all" onClick={(e) => e.preventDefault()}>
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Download Workflow
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>

                        <div className="text-center mt-12">
                            <Button variant="outline" size="lg" className="px-8">
                                View All Workflows
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Lab Assets Upload Section */}
                <section className="py-20 bg-muted/20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Lab Assets</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Upload workflows, models, and creative packs
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Workflows */}
                            <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                <CardHeader className="text-center pb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                        <Workflow className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">🔧 Workflows</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Upload ComfyUI workflows
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => navigate('/upload/workflow')}
                                    >
                                        Upload Workflow
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Models */}
                            <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                <CardHeader className="text-center pb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                        <Zap className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">🎯 Models</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Share AI models
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => navigate('/upload/model')}
                                    >
                                        Upload Model
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Packs */}
                            <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                <CardHeader className="text-center pb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                                        <Download className="w-8 h-8 text-green-400" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">📦 Packs</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Bundle assets
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        disabled
                                    >
                                        Create (Coming Soon)
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Own?</h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Join thousands of creators sharing their workflows and earning from their expertise.
                            Upload your first workflow and start building your reputation in the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="px-8 py-4"
                                onClick={() => navigate('/upload/workflow')}
                            >
                                <Workflow className="w-5 h-5 mr-2" />
                                Upload Workflow
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4"
                                onClick={() => navigate('/lab/workflows')}
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Labs;
