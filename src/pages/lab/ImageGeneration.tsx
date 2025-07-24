import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Heart, Image, Palette, Sparkles, Star } from "lucide-react";

const workflows = [
    {
        id: 1,
        title: "Photorealistic Portrait Generator",
        description: "Create stunning photorealistic portraits with advanced AI models and lighting controls",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        rating: 4.9,
        downloads: 45230,
        price: 40,
        tags: ["Portrait", "Photorealistic", "Lighting"],
        difficulty: "Advanced",
        creator: "PortraitMaster",
        style: "Realistic"
    },
    {
        id: 2,
        title: "Anime Art Studio",
        description: "Generate beautiful anime-style artwork with customizable characters and backgrounds",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        rating: 4.8,
        downloads: 62150,
        price: 0,
        tags: ["Anime", "Character", "Background"],
        difficulty: "Intermediate",
        creator: "AnimeArtist",
        style: "Anime"
    },
    {
        id: 3,
        title: "Landscape Masterpiece",
        description: "Create breathtaking landscape art with weather effects and seasonal variations",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        rating: 4.7,
        downloads: 28940,
        price: 25,
        tags: ["Landscape", "Weather", "Nature"],
        difficulty: "Intermediate",
        creator: "LandscapePro",
        style: "Artistic"
    },
    {
        id: 4,
        title: "Abstract Art Generator",
        description: "Explore creative abstract compositions with color theory and geometric patterns",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
        rating: 4.6,
        downloads: 18750,
        price: 0,
        tags: ["Abstract", "Geometric", "Color"],
        difficulty: "Beginner",
        creator: "AbstractVision",
        style: "Abstract"
    },
    {
        id: 5,
        title: "Product Photography Studio",
        description: "Professional product photography with studio lighting and background removal",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
        rating: 4.9,
        downloads: 34120,
        price: 35,
        tags: ["Product", "Studio", "Commercial"],
        difficulty: "Advanced",
        creator: "ProductPro",
        style: "Commercial"
    },
    {
        id: 6,
        title: "Digital Painting Workshop",
        description: "Transform photos into digital paintings with various artistic styles and brushes",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
        rating: 4.8,
        downloads: 22680,
        price: 20,
        tags: ["Painting", "Artistic", "Transform"],
        difficulty: "Intermediate",
        creator: "DigitalBrush",
        style: "Painterly"
    }
];

export default function ImageGeneration() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6">
                        <Image className="h-4 w-4" />
                        <span className="text-sm font-medium text-primary">Image Generation</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
                        Image Generation Workflows
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Professional image generation workflows for art creation, photo enhancement, and visual design with cutting-edge AI models.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="hero" size="lg">
                            <Palette className="h-4 w-4 mr-2" />
                            Browse All Workflows
                        </Button>
                        <Button variant="glass" size="lg">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Create Your Art
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
                            <p className="text-muted-foreground">Top-rated image generation and art creation workflows</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">32 workflows</Badge>
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
                                        <Image className="h-12 w-12 text-white" />
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
                                            {workflow.style}
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
