// Using Unsplash URL for placeholder image
const videoUpscaling = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Download, Eye, Heart, Share2, Star, Tag, User, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const VideoUpscalingPipeline = () => {
    const workflow = {
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
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Link to="/lab" className="hover:text-primary">Labs</Link>
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
                                    <Badge variant="outline" className="gap-1">
                                        <Zap className="w-3 h-3" />
                                        Popular
                                    </Badge>
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
                                        <span>by </span>
                                        <Link
                                            to={`/${workflow.creator.toLowerCase().replace('_', '')}`}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            {workflow.creator}
                                        </Link>
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
                                        Transform your low-resolution videos into stunning 4K quality with this advanced AI upscaling pipeline.
                                        This workflow combines multiple state-of-the-art algorithms to enhance video resolution, reduce noise,
                                        and improve overall visual quality while preserving natural motion and details.
                                    </p>

                                    <h4 className="font-semibold">Key Features:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        <li>AI-powered video super-resolution up to 4K</li>
                                        <li>Advanced noise reduction and artifact removal</li>
                                        <li>Frame interpolation for smooth motion</li>
                                        <li>Color correction and enhancement</li>
                                        <li>Batch processing capabilities</li>
                                        <li>Multiple output format support</li>
                                    </ul>

                                    <h4 className="font-semibold">System Requirements:</h4>
                                    <p className="text-muted-foreground">{workflow.requirements}</p>

                                    <h4 className="font-semibold">Usage Guide:</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                                        <li>Ensure your GPU meets the minimum requirements</li>
                                        <li>Install the required video processing software</li>
                                        <li>Import the upscaling pipeline configuration</li>
                                        <li>Load your source video files</li>
                                        <li>Configure output settings and start processing</li>
                                        <li>Enjoy your enhanced 4K videos!</li>
                                    </ol>
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
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                            <span className="text-white font-bold">{workflow.creator[0]}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{workflow.creator}</h4>
                                            <p className="text-sm text-muted-foreground">Video Enhancement Specialist</p>
                                        </div>
                                    </div>
                                    <Link to={`/${workflow.creator.toLowerCase().replace('_', '')}`}>
                                        <Button variant="outline" className="w-full">
                                            View Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Workflow Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type</span>
                                        <span>Video Processing</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Category</span>
                                        <span>Video Enhancement</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Difficulty</span>
                                        <Badge variant="secondary">{workflow.difficulty}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Price</span>
                                        <span className="font-semibold text-primary">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">File Size</span>
                                        <span>45 MB</span>
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

export default VideoUpscalingPipeline;
