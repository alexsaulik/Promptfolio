import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Heart, Music, Star } from "lucide-react";

const workflows = [
    {
        id: 1,
        title: "AI Music Composer",
        description: "Generate original music compositions in various genres using advanced AI algorithms",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        rating: 4.9,
        downloads: 18750,
        price: 30,
        tags: ["Composition", "AI", "Original"],
        difficulty: "Advanced",
        creator: "MelodyMaker"
    },
    {
        id: 2,
        title: "Vocal Enhancement Suite",
        description: "Professional vocal processing with pitch correction, harmonization, and effects",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        rating: 4.8,
        downloads: 14320,
        price: 0,
        tags: ["Vocal", "Enhancement", "Professional"],
        difficulty: "Intermediate",
        creator: "VocalPro"
    },
    {
        id: 3,
        title: "Ambient Soundscape Generator",
        description: "Create immersive ambient soundscapes for meditation, games, and multimedia",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        rating: 4.7,
        downloads: 9840,
        price: 15,
        tags: ["Ambient", "Soundscape", "Immersive"],
        difficulty: "Beginner",
        creator: "AmbientLab"
    },
    {
        id: 4,
        title: "Beat Making Workshop",
        description: "Hip-hop and electronic beat production with sample manipulation and synthesis",
        image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491",
        rating: 4.8,
        downloads: 22100,
        price: 0,
        tags: ["Beats", "Hip-hop", "Electronic"],
        difficulty: "Intermediate",
        creator: "BeatCraft"
    },
    {
        id: 5,
        title: "Audio Restoration Master",
        description: "Restore and clean up old recordings with noise reduction and enhancement",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
        rating: 4.9,
        downloads: 7650,
        price: 25,
        tags: ["Restoration", "Cleaning", "Enhancement"],
        difficulty: "Advanced",
        creator: "RestorePro"
    },
    {
        id: 6,
        title: "Podcast Production Suite",
        description: "Complete podcast production workflow with editing, mixing, and mastering tools",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
        rating: 4.6,
        downloads: 16430,
        price: 18,
        tags: ["Podcast", "Production", "Complete"],
        difficulty: "Intermediate",
        creator: "PodcastPro"
    }
];

export default function AudioCreation() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6">
                        <Music className="h-4 w-4" />
                        <span className="text-sm font-medium text-primary">Audio Creation</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
                        Audio Creation Workflows
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Professional audio production workflows for music creation, sound design, and audio post-production with AI-powered tools.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="hero" size="lg">
                            Browse All Workflows
                        </Button>
                        <Button variant="glass" size="lg">
                            Upload Your Workflow
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
                            <p className="text-muted-foreground">Top-rated audio creation and production workflows</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">18 workflows</Badge>
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
                                        <Music className="h-12 w-12 text-white" />
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge variant={workflow.price === 0 ? "secondary" : "default"}>
                                            {workflow.price === 0 ? "Free" : `$${workflow.price}`}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                                            {workflow.difficulty}
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
