import comfyuiPortrait from "@/assets/comfyui-portrait.jpg";
import musicProduction from "@/assets/music-production.jpg";
import videoUpscaling from "@/assets/video-upscaling.jpg";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Download, Eye, Heart, Share2, Star, Tag, User } from "lucide-react";
import { useParams } from "react-router-dom";

const WorkflowDetail = () => {
    const { slug } = useParams();

    // Mock workflow data - in real app this would come from useWorkflows hook
    const workflowsData = {
        "comfyui-portrait-generator": {
            id: "1",
            title: "ComfyUI Portrait Generator",
            description: "Professional headshot generator with advanced lighting controls and background removal. This comprehensive workflow includes multiple nodes for face detection, lighting adjustment, background manipulation, and final enhancement processing.",
            difficulty: "Advanced",
            downloads: 1247,
            views: 5834,
            likes: 342,
            rating: 4.9,
            tags: ["ComfyUI", "Portrait", "Professional", "Face", "Lighting"],
            creator: "AI_Studio_Pro",
            createdAt: "2024-01-15",
            price: 0,
            isPaid: false,
            requirements: "ComfyUI 1.0+, Face Detection Model, Background Removal Model",
            fileUrl: "/workflows/comfyui-portrait.json",
            coverImage: comfyuiPortrait
        },
        "music-production-chain": {
            id: "2",
            title: "Music Production Chain",
            description: "End-to-end workflow for generating, mixing, and mastering AI music tracks. Complete pipeline from initial generation to final master with professional-grade processing and effects.",
            difficulty: "Expert",
            downloads: 892,
            views: 3456,
            likes: 234,
            rating: 4.8,
            tags: ["Music", "Audio", "Production", "Mixing", "Mastering"],
            creator: "SoundCraft_AI",
            createdAt: "2024-01-12",
            price: 29.99,
            isPaid: true,
            requirements: "Audio processing software, MIDI controller recommended",
            fileUrl: "/workflows/music-production.json",
            coverImage: musicProduction
        },
        "video-upscaling-pipeline": {
            id: "3",
            title: "Video Upscaling Pipeline",
            description: "4K video enhancement with noise reduction and frame interpolation. Advanced upscaling pipeline that enhances video quality while maintaining natural motion and reducing artifacts.",
            difficulty: "Intermediate",
            downloads: 2156,
            views: 8765,
            likes: 567,
            rating: 4.7,
            tags: ["Video", "Upscaling", "Enhancement", "4K", "AI"],
            creator: "VideoWizard",
            createdAt: "2024-01-10",
            price: 0,
            isPaid: false,
            requirements: "GPU with 8GB+ VRAM, Video processing software",
            fileUrl: "/workflows/video-upscaling.json",
            coverImage: videoUpscaling
        }
    };

    const workflow = workflowsData[slug as keyof typeof workflowsData] || workflowsData["comfyui-portrait-generator"];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <span>Labs</span>
                            <span>/</span>
                            <span>Workflows</span>
                            <span>/</span>
                            <span className="text-foreground">{workflow.title}</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary">{workflow.difficulty}</Badge>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{workflow.rating}</span>
                                    </div>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold mb-4">{workflow.title}</h1>
                                <p className="text-lg text-muted-foreground mb-6">{workflow.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {workflow.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="gap-1">
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        <span>by {workflow.creator}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(workflow.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="flex items-center gap-1">
                                        <Download className="w-4 h-4" />
                                        <span className="font-medium">{workflow.downloads.toLocaleString()}</span>
                                        <span className="text-muted-foreground text-sm">downloads</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        <span className="font-medium">{workflow.views.toLocaleString()}</span>
                                        <span className="text-muted-foreground text-sm">views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        <span className="font-medium">{workflow.likes.toLocaleString()}</span>
                                        <span className="text-muted-foreground text-sm">likes</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button size="lg" className="flex-1">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Workflow
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Card className="overflow-hidden">
                                    <img
                                        src={workflow.coverImage}
                                        alt={workflow.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Details Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About This Workflow</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="leading-relaxed">
                                        This professional-grade ComfyUI workflow is designed for creating high-quality portrait photographs
                                        with advanced lighting controls and automatic background removal capabilities. Perfect for
                                        photographers, content creators, and AI enthusiasts looking to generate professional headshots.
                                    </p>

                                    <h4 className="font-semibold">Features:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        <li>Advanced face detection and alignment</li>
                                        <li>Multiple lighting presets and manual controls</li>
                                        <li>Automatic background removal and replacement</li>
                                        <li>Skin enhancement and smoothing</li>
                                        <li>Professional color grading</li>
                                        <li>Batch processing capabilities</li>
                                    </ul>

                                    <h4 className="font-semibold">Requirements:</h4>
                                    <p className="text-muted-foreground">{workflow.requirements}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Creator</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                            <span className="text-white font-bold">{workflow.creator[0]}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{workflow.creator}</h4>
                                            <p className="text-sm text-muted-foreground">Verified Creator</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        View Profile
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Workflow Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type</span>
                                        <span>ComfyUI Workflow</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Category</span>
                                        <span>Image Generation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Difficulty</span>
                                        <Badge variant="secondary">{workflow.difficulty}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Price</span>
                                        <span className="font-semibold text-primary">
                                            {workflow.isPaid ? `$${workflow.price}` : "Free"}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WorkflowDetail;
