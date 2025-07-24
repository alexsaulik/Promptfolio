import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Film, Heart, Play, Star, Video } from "lucide-react";

const workflows = [
    {
        id: 1,
        title: "AI Video Upscaler Pro",
        description: "Upscale videos to 4K/8K resolution with AI-powered enhancement and noise reduction",
        image: "https://images.unsplash.com/photo-1489599187152-82e5a26ba0b1",
        rating: 4.9,
        downloads: 28450,
        price: 50,
        tags: ["Upscaling", "4K", "Enhancement"],
        difficulty: "Advanced",
        creator: "VideoEnhancer",
        format: "MP4/MOV"
    },
    {
        id: 2,
        title: "Motion Graphics Studio",
        description: "Create stunning motion graphics and animations with AI-assisted keyframe generation",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
        rating: 4.8,
        downloads: 34720,
        price: 0,
        tags: ["Motion", "Animation", "Graphics"],
        difficulty: "Intermediate",
        creator: "MotionMaster",
        format: "After Effects"
    },
    {
        id: 3,
        title: "Color Grading Assistant",
        description: "Professional color grading with AI-powered look development and mood matching",
        image: "https://images.unsplash.com/photo-1478720568477-b956dc04bd5f",
        rating: 4.7,
        downloads: 19840,
        price: 30,
        tags: ["Color", "Grading", "Cinematic"],
        difficulty: "Intermediate",
        creator: "ColorCraft",
        format: "DaVinci"
    },
    {
        id: 4,
        title: "Auto Video Editor",
        description: "Intelligent video editing with scene detection, pacing optimization, and music sync",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
        rating: 4.8,
        downloads: 42100,
        price: 0,
        tags: ["Editing", "Auto-cut", "Sync"],
        difficulty: "Beginner",
        creator: "EditBot",
        format: "Premiere"
    },
    {
        id: 5,
        title: "Green Screen Wizard",
        description: "Advanced chroma keying with edge refinement and realistic background integration",
        image: "https://images.unsplash.com/photo-1533310266094-8898a03807dd",
        rating: 4.6,
        downloads: 15650,
        price: 25,
        tags: ["Chroma", "Keying", "VFX"],
        difficulty: "Advanced",
        creator: "VFXMaster",
        format: "Multi"
    },
    {
        id: 6,
        title: "Stabilization Engine",
        description: "Remove camera shake and stabilize footage with advanced motion analysis algorithms",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        rating: 4.9,
        downloads: 22430,
        price: 35,
        tags: ["Stabilization", "Shake", "Smooth"],
        difficulty: "Intermediate",
        creator: "StabilizePro",
        format: "Universal"
    }
];

export default function VideoProcessing() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6">
                        <Video className="h-4 w-4" />
                        <span className="text-sm font-medium text-primary">Video Processing</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
                        Video Processing Workflows
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Professional video processing workflows for enhancement, editing, and post-production with AI-powered automation and quality improvements.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="hero" size="lg">
                            <Film className="h-4 w-4 mr-2" />
                            Browse All Workflows
                        </Button>
                        <Button variant="glass" size="lg">
                            <Play className="h-4 w-4 mr-2" />
                            Try Demo
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
                            <p className="text-muted-foreground">Top-rated video processing and enhancement workflows</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">26 workflows</Badge>
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
                                        <Video className="h-12 w-12 text-white" />
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
                                            {workflow.format}
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
