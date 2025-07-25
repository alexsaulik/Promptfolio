import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Award,
    Bot, Brain, Code,
    Cpu,
    Download, ExternalLink,
    FileText,
    Image, Music, Search,
    Shield,
    Sparkles,
    Star,
    TrendingUp,
    Video
} from "lucide-react";
import { useState } from "react";

const AIModelsHub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);

    const models = [
        // === TEXT & LANGUAGE MODELS ===
        {
            id: 1,
            name: "GPT-4 Turbo",
            provider: "OpenAI",
            category: "text",
            subcategory: "Large Language Model",
            description: "Most capable large language model with 128k context window and latest training data",
            rating: 4.9,
            pricing: "$0.01/1K tokens (input), $0.03/1K tokens (output)",
            status: "live",
            icon: "🤖",
            modelSize: "1.76T parameters",
            contextLength: "128,000 tokens",
            languages: "100+",
            trainingData: "Up to April 2024",
            latency: "~2-4 seconds",
            accuracy: "95%",
            features: ["Text Generation", "Code", "Analysis", "Creative Writing", "Function Calling", "Vision"],
            useCases: ["Content Creation", "Code Generation", "Data Analysis", "Customer Support", "Translation"],
            limitations: ["Token limits", "Potential hallucinations", "Training cutoff"],
            apiEndpoint: "https://api.openai.com/v1/chat/completions",
            documentation: "https://platform.openai.com/docs"
        },
        {
            id: 2,
            name: "Claude 3.5 Sonnet",
            provider: "Anthropic",
            category: "text",
            subcategory: "Large Language Model",
            description: "Advanced AI assistant with superior reasoning, coding, and analysis capabilities",
            rating: 4.9,
            pricing: "$3/1M tokens (input), $15/1M tokens (output)",
            status: "live",
            icon: "🧠",
            modelSize: "~400B parameters",
            contextLength: "200,000 tokens",
            languages: "95+",
            trainingData: "Up to April 2024",
            latency: "~1-3 seconds",
            accuracy: "96%",
            features: ["Analysis", "Writing", "Code", "Math", "Vision", "Artifacts"],
            useCases: ["Research", "Complex Analysis", "Code Review", "Academic Writing", "Problem Solving"],
            limitations: ["Rate limits", "Regional availability", "Token costs"],
            apiEndpoint: "https://api.anthropic.com/v1/messages",
            documentation: "https://docs.anthropic.com"
        },
        {
            id: 3,
            name: "LLaMA 3.1 405B",
            provider: "Meta",
            category: "text",
            subcategory: "Open Source LLM",
            description: "Meta's largest and most capable open-source language model with exceptional performance",
            rating: 4.8,
            pricing: "Free/Open Source",
            status: "live",
            icon: "🦙",
            modelSize: "405B parameters",
            contextLength: "128,000 tokens",
            languages: "8 primary languages",
            trainingData: "Up to December 2023",
            latency: "~5-10 seconds (varies by deployment)",
            accuracy: "93%",
            features: ["Text Generation", "Code", "Reasoning", "Multilingual", "Fine-tuning"],
            useCases: ["Research", "Custom Applications", "Local Deployment", "Fine-tuning", "Commercial Use"],
            limitations: ["Hardware requirements", "Deployment complexity", "Inference costs"],
            apiEndpoint: "Custom deployment",
            documentation: "https://github.com/meta-llama/llama3"
        },
        {
            id: 4,
            name: "Gemini 1.5 Pro",
            provider: "Google",
            category: "text",
            subcategory: "Multimodal LLM",
            description: "Google's advanced multimodal model with 1M+ token context and multimodal capabilities",
            rating: 4.7,
            pricing: "$7/1M tokens (input), $21/1M tokens (output)",
            status: "live",
            icon: "💎",
            modelSize: "Unknown",
            contextLength: "1,000,000+ tokens",
            languages: "100+",
            trainingData: "Up to February 2024",
            latency: "~2-5 seconds",
            accuracy: "94%",
            features: ["Text", "Vision", "Audio", "Video", "Code", "Long Context"],
            useCases: ["Document Analysis", "Video Understanding", "Code Analysis", "Research", "Multimodal Tasks"],
            limitations: ["Context costs", "Regional availability", "Rate limits"],
            apiEndpoint: "https://generativelanguage.googleapis.com",
            documentation: "https://ai.google.dev/docs"
        },

        // === IMAGE GENERATION MODELS ===
        {
            id: 5,
            name: "DALL-E 3",
            provider: "OpenAI",
            category: "image",
            subcategory: "Text-to-Image",
            description: "Most advanced text-to-image model with exceptional prompt understanding and quality",
            rating: 4.8,
            pricing: "$0.04/image (1024x1024), $0.08/image (1792x1024)",
            status: "live",
            icon: "🎨",
            modelSize: "Unknown",
            maxResolution: "1792×1024",
            outputFormats: ["PNG"],
            trainingData: "Diverse image-text pairs",
            generationTime: "~10-30 seconds",
            aspectRatios: ["1:1", "16:9", "9:16"],
            features: ["High Quality", "Prompt Adherence", "Style Variety", "Safety Filters"],
            useCases: ["Marketing", "Art Creation", "Concept Design", "Illustrations", "Social Media"],
            limitations: ["Content policy", "Resolution limits", "Generation time"],
            apiEndpoint: "https://api.openai.com/v1/images/generations",
            documentation: "https://platform.openai.com/docs/guides/images"
        },
        {
            id: 6,
            name: "Midjourney V6",
            provider: "Midjourney",
            category: "image",
            subcategory: "Artistic Generation",
            description: "Premium artistic image generation with exceptional quality and style consistency",
            rating: 4.9,
            pricing: "$10/month (Basic), $30/month (Standard), $60/month (Pro)",
            status: "live",
            icon: "🎭",
            modelSize: "Unknown",
            maxResolution: "2048×2048",
            outputFormats: ["PNG", "WEBP"],
            trainingData: "Curated artistic datasets",
            generationTime: "~30-60 seconds",
            aspectRatios: ["1:1", "2:3", "3:2", "16:9", "9:16"],
            features: ["Artistic Quality", "Style Control", "Upscaling", "Variations", "Remix"],
            useCases: ["Digital Art", "Concept Art", "Photography", "Design", "Creative Projects"],
            limitations: ["Discord interface", "Commercial licensing", "Wait times"],
            apiEndpoint: "Discord Bot API",
            documentation: "https://docs.midjourney.com"
        },
        {
            id: 7,
            name: "Stable Diffusion XL",
            provider: "Stability AI",
            category: "image",
            subcategory: "Open Source Generation",
            description: "Most popular open-source image generation model with extensive customization options",
            rating: 4.7,
            pricing: "Free/Open Source",
            status: "live",
            icon: "🖼️",
            modelSize: "6.6B parameters",
            maxResolution: "1024×1024",
            outputFormats: ["PNG", "JPG", "WEBP"],
            trainingData: "LAION dataset",
            generationTime: "~3-10 seconds",
            aspectRatios: ["1:1", "4:3", "3:4", "16:9", "9:16"],
            features: ["Open Source", "Fine-tuning", "LoRA Support", "ControlNet", "Inpainting"],
            useCases: ["Custom Models", "Commercial Use", "Research", "Local Generation", "Batch Processing"],
            limitations: ["Hardware requirements", "Setup complexity", "Quality variance"],
            apiEndpoint: "Custom deployment",
            documentation: "https://github.com/Stability-AI/generative-models"
        },
        {
            id: 8,
            name: "Flux.1 Pro",
            provider: "Black Forest Labs",
            category: "image",
            subcategory: "Professional Generation",
            description: "Next-generation image model with superior prompt understanding and photorealism",
            rating: 4.8,
            pricing: "$0.055/image",
            status: "live",
            icon: "⚡",
            modelSize: "12B parameters",
            maxResolution: "2048×2048",
            outputFormats: ["PNG", "JPG"],
            trainingData: "High-quality datasets",
            generationTime: "~5-15 seconds",
            aspectRatios: ["1:1", "16:9", "9:16", "21:9", "2:3", "3:2"],
            features: ["Photorealism", "Text Rendering", "Complex Scenes", "Style Control"],
            useCases: ["Professional Photography", "Product Design", "Advertising", "Film Previsualization"],
            limitations: ["Cost per image", "API availability", "Queue times"],
            apiEndpoint: "https://api.bfl.ml/",
            documentation: "https://docs.bfl.ml"
        },

        // === VIDEO GENERATION MODELS ===
        {
            id: 9,
            name: "Kling 2.1 Pro",
            provider: "Kuaishou Technology",
            category: "video",
            subcategory: "Text-to-Video",
            description: "Revolutionary video generation model with industry-leading quality and 10-second clips",
            rating: 4.9,
            pricing: "$0.6/credit (10s video)",
            status: "live",
            icon: "🎬",
            modelSize: "Unknown",
            maxResolution: "1080p",
            maxDuration: "10 seconds",
            frameRate: "30 FPS",
            outputFormats: ["MP4"],
            features: ["High Quality", "Motion Consistency", "Scene Understanding", "Style Control"],
            useCases: ["Content Creation", "Social Media", "Advertising", "Concept Visualization", "Film"],
            limitations: ["Duration limits", "Cost", "Generation time", "Regional availability"],
            apiEndpoint: "https://api.kling.kuaishou.com",
            documentation: "https://docs.kling.ai"
        },
        {
            id: 10,
            name: "RunwayML Gen-3 Alpha",
            provider: "Runway",
            category: "video",
            subcategory: "Multimodal Video",
            description: "Advanced video generation and editing with precise motion control and style consistency",
            rating: 4.7,
            pricing: "$15/month (Standard), $35/month (Pro), $76/month (Unlimited)",
            status: "live",
            icon: "🎭",
            modelSize: "Unknown",
            maxResolution: "1280×768",
            maxDuration: "10 seconds",
            frameRate: "24 FPS",
            outputFormats: ["MP4", "GIF"],
            features: ["Motion Control", "Style Transfer", "Image-to-Video", "Text-to-Video", "Video Editing"],
            useCases: ["Film Production", "Social Content", "Marketing", "Art Projects", "Prototyping"],
            limitations: ["Credit system", "Resolution limits", "Processing time"],
            apiEndpoint: "https://api.runwayml.com",
            documentation: "https://docs.runwayml.com"
        },
        {
            id: 11,
            name: "Pika Labs 1.5",
            provider: "Pika Labs",
            category: "video",
            subcategory: "Creative Video",
            description: "AI video generation platform with focus on creative and artistic video content",
            rating: 4.6,
            pricing: "$10/month (Standard), $35/month (Pro), $70/month (Pro+)",
            status: "live",
            icon: "🌟",
            modelSize: "Unknown",
            maxResolution: "1024×576",
            maxDuration: "4 seconds",
            frameRate: "24 FPS",
            outputFormats: ["MP4"],
            features: ["Creative Effects", "Character Consistency", "Camera Movement", "Sound Effects"],
            useCases: ["Social Media", "Creative Projects", "Memes", "Short Content", "Experimental Art"],
            limitations: ["Duration limits", "Queue system", "Style limitations"],
            apiEndpoint: "Discord Bot",
            documentation: "https://docs.pika.art"
        },

        // === AUDIO & MUSIC MODELS ===
        {
            id: 12,
            name: "Suno AI v4",
            provider: "Suno",
            category: "audio",
            subcategory: "Music Generation",
            description: "Most advanced AI music creation platform with vocals, instruments, and full songs",
            rating: 4.8,
            pricing: "$10/month (Pro), $30/month (Premier)",
            status: "live",
            icon: "🎵",
            modelSize: "Unknown",
            maxDuration: "4 minutes",
            outputFormats: ["MP3", "WAV"],
            genres: "All genres",
            features: ["Vocals", "Lyrics", "Instrumental", "Genre Control", "Stem Separation"],
            useCases: ["Music Production", "Content Creation", "Podcasts", "Commercial Music", "Demos"],
            limitations: ["Copyright considerations", "Credit limits", "Commercial licensing"],
            apiEndpoint: "https://api.suno.ai",
            documentation: "https://docs.suno.ai"
        },
        {
            id: 13,
            name: "Udio",
            provider: "Udio",
            category: "audio",
            subcategory: "Music Creation",
            description: "Professional AI music generator with high-quality audio and precise style control",
            rating: 4.7,
            pricing: "$10/month (Standard), $30/month (Pro)",
            status: "live",
            icon: "🎼",
            modelSize: "Unknown",
            maxDuration: "15 minutes",
            outputFormats: ["MP3", "WAV", "FLAC"],
            genres: "200+ genres",
            features: ["High Fidelity", "Style Mixing", "Stem Control", "Audio Inpainting", "Remixing"],
            useCases: ["Professional Music", "Film Scoring", "Game Audio", "Commercial Jingles"],
            limitations: ["Generation time", "Credit system", "Licensing complexity"],
            apiEndpoint: "https://api.udio.com",
            documentation: "https://docs.udio.com"
        },
        {
            id: 14,
            name: "ElevenLabs Voice",
            provider: "ElevenLabs",
            category: "audio",
            subcategory: "Voice Synthesis",
            description: "Ultra-realistic voice cloning and speech synthesis with emotional control",
            rating: 4.9,
            pricing: "$5/month (Starter), $22/month (Creator), $99/month (Pro)",
            status: "live",
            icon: "🗣️",
            modelSize: "Unknown",
            maxDuration: "Unlimited",
            outputFormats: ["MP3", "WAV"],
            languages: "29 languages",
            features: ["Voice Cloning", "Emotion Control", "Real-time", "Multi-language", "API Access"],
            useCases: ["Audiobooks", "Podcasts", "Gaming", "Accessibility", "Content Localization"],
            limitations: ["Ethical considerations", "Character limits", "Voice rights"],
            apiEndpoint: "https://api.elevenlabs.io",
            documentation: "https://docs.elevenlabs.io"
        },

        // === CODE GENERATION MODELS ===
        {
            id: 15,
            name: "GitHub Copilot",
            provider: "GitHub/OpenAI",
            category: "code",
            subcategory: "Code Completion",
            description: "AI pair programmer with real-time code suggestions and context awareness",
            rating: 4.6,
            pricing: "$10/month (Individual), $19/month (Business)",
            status: "live",
            icon: "💻",
            modelSize: "Based on Codex",
            languages: "100+ programming languages",
            features: ["Real-time Suggestions", "Context Awareness", "IDE Integration", "Chat Interface"],
            useCases: ["Software Development", "Code Learning", "Productivity", "Documentation", "Debugging"],
            limitations: ["IDE dependency", "Internet required", "Suggestion quality varies"],
            apiEndpoint: "IDE Integration",
            documentation: "https://docs.github.com/copilot"
        },
        {
            id: 16,
            name: "Claude 3.5 Sonnet (Code)",
            provider: "Anthropic",
            category: "code",
            subcategory: "Code Generation",
            description: "Specialized for complex coding tasks, system design, and technical problem solving",
            rating: 4.8,
            pricing: "$3/1M tokens (input), $15/1M tokens (output)",
            status: "live",
            icon: "🔧",
            modelSize: "~400B parameters",
            languages: "50+ programming languages",
            features: ["Code Generation", "Debugging", "Architecture", "Code Review", "Testing"],
            useCases: ["System Design", "Code Architecture", "Complex Algorithms", "Technical Writing"],
            limitations: ["Token costs", "Context limits", "Real-time limitations"],
            apiEndpoint: "https://api.anthropic.com/v1/messages",
            documentation: "https://docs.anthropic.com"
        },
        {
            id: 17,
            name: "CodeLlama 70B",
            provider: "Meta",
            category: "code",
            subcategory: "Open Source Code",
            description: "Specialized code generation model based on LLaMA with strong programming capabilities",
            rating: 4.5,
            pricing: "Free/Open Source",
            status: "live",
            icon: "🦙",
            modelSize: "70B parameters",
            languages: "20+ programming languages",
            features: ["Code Completion", "Code Explanation", "Bug Fixing", "Code Translation"],
            useCases: ["Open Source Projects", "Learning", "Code Analysis", "Custom Deployment"],
            limitations: ["Hardware requirements", "Setup complexity", "Limited compared to GPT-4"],
            apiEndpoint: "Custom deployment",
            documentation: "https://github.com/facebookresearch/codellama"
        }
    ];

    const categories = [
        { id: "all", label: "All Models", icon: Bot, count: models.length },
        { id: "text", label: "Text & Language", icon: Brain, count: models.filter(m => m.category === "text").length },
        { id: "image", label: "Image Generation", icon: Image, count: models.filter(m => m.category === "image").length },
        { id: "video", label: "Video Creation", icon: Video, count: models.filter(m => m.category === "video").length },
        { id: "audio", label: "Audio & Music", icon: Music, count: models.filter(m => m.category === "audio").length },
        { id: "code", label: "Code Generation", icon: Code, count: models.filter(m => m.category === "code").length }
    ];

    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredModels = models.filter(model => {
        const matchesCategory = selectedCategory === "all" || model.category === selectedCategory;
        const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "live": return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Live</Badge>;
            case "beta": return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Beta</Badge>;
            case "coming-soon": return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Coming Soon</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-16">
                {/* Hero Section */}
                <WarpBackground
                    className="relative py-20 overflow-hidden !p-0 !border-0 !rounded-none"
                    perspective={50}
                    beamsPerSide={2}
                    beamSize={6}
                    beamDelayMax={8}
                    beamDelayMin={3}
                    beamDuration={12}
                    gridColor="hsl(var(--border) / 0.2)"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent via-50% to-accent/5" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm">
                                <Bot className="w-4 h-4 mr-2" />
                                AI Model Library
                            </Badge>
                            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-8">
                                State-of-the-Art AI Models
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                                Comprehensive library of the latest AI models from LLaMA to Kling 2.1 Pro.
                                Compare specifications, performance metrics, and find the perfect model for your project.
                            </p>

                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        placeholder="Search models by name, provider, or capability..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-12 pr-4 py-3 text-lg border-border/50 bg-background/50 backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{models.length}+</div>
                                    <div className="text-sm text-muted-foreground">AI Models</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">6</div>
                                    <div className="text-sm text-muted-foreground">Categories</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">15+</div>
                                    <div className="text-sm text-muted-foreground">Providers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">Live</div>
                                    <div className="text-sm text-muted-foreground">Real-time Data</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </WarpBackground>

                {/* Category Tabs */}
                <section className="py-8 bg-muted/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-6 h-auto p-1">
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category.id}
                                        value={category.id}
                                        className="flex flex-col items-center py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <category.icon className="w-5 h-5 mb-1" />
                                        <span className="text-xs font-medium">{category.label}</span>
                                        <span className="text-xs opacity-70">({category.count})</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                </section>

                {/* Models Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredModels.map((model, index) => (
                                <Dialog key={model.id}>
                                    <DialogTrigger asChild>
                                        <Card className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
                                            style={{ animationDelay: `${index * 100}ms` }}>
                                            <CardHeader className="pb-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="text-2xl">{model.icon}</div>
                                                        <div>
                                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                                {model.name}
                                                            </CardTitle>
                                                            <div className="text-sm text-muted-foreground">{model.provider}</div>
                                                        </div>
                                                    </div>
                                                    {getStatusBadge(model.status)}
                                                </div>

                                                <Badge variant="outline" className="w-fit text-xs">
                                                    {model.subcategory}
                                                </Badge>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                <CardDescription className="text-sm leading-relaxed">
                                                    {model.description}
                                                </CardDescription>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="font-medium text-sm">{model.rating}</span>
                                                    </div>
                                                    <div className="text-sm font-medium text-primary">
                                                        {model.pricing}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1">
                                                    {model.features.slice(0, 3).map((feature) => (
                                                        <Badge key={feature} variant="secondary" className="text-xs">
                                                            {feature}
                                                        </Badge>
                                                    ))}
                                                    {model.features.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{model.features.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>

                                                <Button variant="outline" className="w-full text-sm">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="text-3xl">{model.icon}</div>
                                                <div>
                                                    <DialogTitle className="text-2xl">{model.name}</DialogTitle>
                                                    <DialogDescription className="text-lg">{model.provider}</DialogDescription>
                                                </div>
                                            </div>
                                        </DialogHeader>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                            {/* Left Column - Basic Info */}
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                        <FileText className="w-5 h-5 mr-2" />
                                                        Overview
                                                    </h3>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {model.description}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                        <Sparkles className="w-5 h-5 mr-2" />
                                                        Key Features
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {model.features.map((feature) => (
                                                            <Badge key={feature} variant="outline" className="justify-center">
                                                                {feature}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                        <TrendingUp className="w-5 h-5 mr-2" />
                                                        Use Cases
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {model.useCases.map((useCase) => (
                                                            <div key={useCase} className="flex items-center text-sm">
                                                                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                                                {useCase}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column - Technical Specs */}
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                        <Cpu className="w-5 h-5 mr-2" />
                                                        Technical Specifications
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {model.modelSize && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Model Size:</span>
                                                                <span className="font-medium">{model.modelSize}</span>
                                                            </div>
                                                        )}
                                                        {model.contextLength && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Context Length:</span>
                                                                <span className="font-medium">{model.contextLength}</span>
                                                            </div>
                                                        )}
                                                        {model.maxResolution && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Max Resolution:</span>
                                                                <span className="font-medium">{model.maxResolution}</span>
                                                            </div>
                                                        )}
                                                        {model.maxDuration && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Max Duration:</span>
                                                                <span className="font-medium">{model.maxDuration}</span>
                                                            </div>
                                                        )}
                                                        {model.languages && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Languages:</span>
                                                                <span className="font-medium">{model.languages}</span>
                                                            </div>
                                                        )}
                                                        {model.accuracy && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Accuracy:</span>
                                                                <span className="font-medium">{model.accuracy}</span>
                                                            </div>
                                                        )}
                                                        {model.latency && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Latency:</span>
                                                                <span className="font-medium">{model.latency}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                        <Award className="w-5 h-5 mr-2" />
                                                        Performance & Pricing
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Rating:</span>
                                                            <div className="flex items-center">
                                                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                                                <span className="font-medium">{model.rating}/5</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Pricing:</span>
                                                            <span className="font-medium text-primary">{model.pricing}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Status:</span>
                                                            {getStatusBadge(model.status)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                        <Shield className="w-5 h-5 mr-2" />
                                                        Limitations
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {model.limitations.map((limitation) => (
                                                            <div key={limitation} className="flex items-center text-sm text-muted-foreground">
                                                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                                                {limitation}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <Button className="w-full" size="lg">
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Access Model
                                                    </Button>
                                                    {model.documentation && (
                                                        <Button variant="outline" className="w-full" size="lg" asChild>
                                                            <a href={model.documentation} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                                Documentation
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>

                        {filteredModels.length === 0 && (
                            <div className="text-center py-16">
                                <Bot className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No models found</h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your search or category filter.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AIModelsHub;
