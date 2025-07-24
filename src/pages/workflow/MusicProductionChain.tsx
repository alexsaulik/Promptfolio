import musicProduction from "@/assets/music-production.jpg";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, Download, Eye, Heart, Share2, Star, Tag, User } from "lucide-react";
import { Link } from "react-router-dom";

const MusicProductionChain = () => {
    const workflow = {
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
                                    {workflow.isPaid && (
                                        <Badge variant="outline" className="gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            Premium
                                        </Badge>
                                    )}
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
                                        Purchase & Download - ${workflow.price}
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
                                        This comprehensive music production workflow covers the entire process from initial AI generation
                                        to final mastered track. Designed for musicians, producers, and audio engineers who want to
                                        leverage AI in their creative process while maintaining professional quality standards.
                                    </p>

                                    <h4 className="font-semibold">What's Included:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        <li>AI-powered melody and harmony generation</li>
                                        <li>Automatic drum pattern creation and variation</li>
                                        <li>Dynamic arrangement and structure building</li>
                                        <li>Professional mixing chain presets</li>
                                        <li>AI-assisted mastering process</li>
                                        <li>Export settings for streaming platforms</li>
                                    </ul>

                                    <h4 className="font-semibold">Requirements:</h4>
                                    <p className="text-muted-foreground">{workflow.requirements}</p>

                                    <h4 className="font-semibold">Setup Instructions:</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                                        <li>Install required audio processing software</li>
                                        <li>Import the workflow templates</li>
                                        <li>Configure your audio interface and MIDI controller</li>
                                        <li>Load the AI model presets</li>
                                        <li>Start creating your first AI-generated track!</li>
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
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                                            <span className="text-white font-bold">{workflow.creator[0]}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{workflow.creator}</h4>
                                            <p className="text-sm text-muted-foreground">Professional Producer</p>
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
                                        <span>Audio Production</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Category</span>
                                        <span>Music & Audio</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Difficulty</span>
                                        <Badge variant="secondary">{workflow.difficulty}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Price</span>
                                        <span className="font-semibold text-primary">
                                            ${workflow.price}
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

export default MusicProductionChain;
