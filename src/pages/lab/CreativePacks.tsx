import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Crown,
    Download,
    FileText,
    Gift,
    Image,
    Music,
    Package,
    Sparkles,
    Star,
    Users,
    Video,
    Zap
} from "lucide-react";

export default function CreativePacks() {
    const packs = [
        {
            id: 1,
            title: "Ultimate Portrait Collection",
            description: "Professional portrait styles and techniques for stunning headshots",
            price: "$29.99",
            originalPrice: "$49.99",
            rating: 4.9,
            downloads: 5420,
            items: 150,
            type: "Visual",
            premium: true,
            popular: true,
            image: "/api/placeholder/400/250",
            includes: ["50 Portrait Prompts", "25 Lighting Styles", "15 Background Options", "Workflow Templates"]
        },
        {
            id: 2,
            title: "Cyberpunk Future Pack",
            description: "Futuristic cyberpunk aesthetics and neon-soaked environments",
            price: "$19.99",
            originalPrice: "$34.99",
            rating: 4.8,
            downloads: 3240,
            items: 120,
            type: "Visual",
            premium: false,
            popular: false,
            image: "/api/placeholder/400/250",
            includes: ["40 City Prompts", "30 Character Styles", "20 Vehicle Designs", "Color Palettes"]
        },
        {
            id: 3,
            title: "Ambient Soundscapes Studio",
            description: "Atmospheric audio prompts for immersive soundscape creation",
            price: "$24.99",
            originalPrice: "$39.99",
            rating: 4.7,
            downloads: 2156,
            items: 80,
            type: "Audio",
            premium: true,
            popular: false,
            image: "/api/placeholder/400/250",
            includes: ["60 Ambient Prompts", "20 Nature Sounds", "15 Urban Atmospheres", "Mixing Guide"]
        },
        {
            id: 4,
            title: "Content Creator Starter",
            description: "Essential prompts for social media and content creation",
            price: "Free",
            originalPrice: "",
            rating: 4.6,
            downloads: 8790,
            items: 50,
            type: "Text",
            premium: false,
            popular: true,
            image: "/api/placeholder/400/250",
            includes: ["30 Caption Prompts", "10 Headline Templates", "5 Story Formats", "Hashtag Guide"]
        }
    ];

    const categories = [
        { name: "All Packs", icon: Package, count: 156 },
        { name: "Visual Art", icon: Image, count: 87 },
        { name: "Audio", icon: Music, count: 34 },
        { name: "Video", icon: Video, count: 23 },
        { name: "Writing", icon: FileText, count: 45 }
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Visual": return Image;
            case "Audio": return Music;
            case "Video": return Video;
            case "Text": return FileText;
            default: return Package;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Visual": return "bg-primary/10 text-primary";
            case "Audio": return "bg-music/10 text-music";
            case "Video": return "bg-accent/10 text-accent";
            case "Text": return "bg-muted/40 text-foreground";
            default: return "bg-muted/20 text-muted-foreground";
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <div className="relative flex justify-center mb-6">
                                <div className="relative">
                                    <Package className="h-16 w-16 text-primary animate-glow-pulse" />
                                    <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full animate-ping" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-6">
                                Creative Packs
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Curated collections of premium prompts, templates, and resources for every creative project.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="pt-6">
                                    <div className="relative">
                                        <div className="text-2xl font-bold text-primary">156</div>
                                        <div className="absolute inset-0 text-primary/20 animate-pulse">156</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Packs</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="pt-6">
                                    <div className="text-2xl font-bold text-music">12K+</div>
                                    <div className="text-sm text-muted-foreground">Downloads</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="pt-6">
                                    <div className="text-2xl font-bold text-accent">4.8</div>
                                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="pt-6">
                                    <div className="text-2xl font-bold text-primary">2.5K</div>
                                    <div className="text-sm text-muted-foreground">Happy Users</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Categories and Packs */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <Tabs defaultValue="all-packs" className="w-full">
                            <TabsList className="grid w-full grid-cols-5 bg-muted/20">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <TabsTrigger
                                            key={category.name.toLowerCase().replace(" ", "-")}
                                            value={category.name.toLowerCase().replace(" ", "-")}
                                            className="flex flex-col items-center gap-1 py-3"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="text-xs">{category.name}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {category.count}
                                            </Badge>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>

                            <TabsContent value="all-packs" className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {packs.map((pack) => {
                                        const TypeIcon = getTypeIcon(pack.type);
                                        return (
                                            <Card key={pack.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group cursor-pointer overflow-hidden">
                                                <div className="relative">
                                                    {pack.popular && (
                                                        <div className="absolute top-3 left-3 z-10">
                                                            <Badge className="bg-primary text-primary-foreground relative">
                                                                <Crown className="h-3 w-3 mr-1 animate-glow-pulse" />
                                                                Popular
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    {pack.premium && (
                                                        <div className="absolute top-3 right-3 z-10">
                                                            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                                                                <Sparkles className="h-3 w-3 mr-1" />
                                                                Premium
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                        <div className="relative">
                                                            <TypeIcon className="h-16 w-16 text-primary/40" />
                                                            <div className="absolute inset-0 h-16 w-16 bg-primary/10 rounded-full animate-pulse" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <CardHeader>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Badge className={getTypeColor(pack.type)}>
                                                            {pack.type}
                                                        </Badge>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-primary">
                                                                {pack.price}
                                                            </div>
                                                            {pack.originalPrice && (
                                                                <div className="text-sm text-muted-foreground line-through">
                                                                    {pack.originalPrice}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                        {pack.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm text-muted-foreground">
                                                        {pack.description}
                                                    </CardDescription>
                                                </CardHeader>

                                                <CardContent>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                                                            {pack.rating}
                                                        </div>
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Download className="h-4 w-4 mr-1" />
                                                            {pack.downloads}
                                                        </div>
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Package className="h-4 w-4 mr-1" />
                                                            {pack.items} items
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="text-sm font-medium mb-2">What's Included:</div>
                                                        <div className="space-y-1">
                                                            {pack.includes.slice(0, 2).map((item, index) => (
                                                                <div key={index} className="text-xs text-muted-foreground flex items-center">
                                                                    <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                                                                    {item}
                                                                </div>
                                                            ))}
                                                            {pack.includes.length > 2 && (
                                                                <div className="text-xs text-primary">
                                                                    +{pack.includes.length - 2} more items
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <Button className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                                                        <div className="relative flex items-center justify-center">
                                                            {pack.price === "Free" ? (
                                                                <>
                                                                    <Gift className="h-4 w-4 mr-2 animate-glow-pulse" />
                                                                    Get Free Pack
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Sparkles className="h-4 w-4 mr-2 animate-glow-pulse" />
                                                                    Purchase Pack
                                                                </>
                                                            )}
                                                        </div>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </TabsContent>

                            {/* Other category tabs would have similar content */}
                            <TabsContent value="visual-art" className="mt-8">
                                <div className="text-center py-12">
                                    <Image className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Visual Art Packs</h3>
                                    <p className="text-muted-foreground">Professional visual prompts and templates for stunning artwork.</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="audio" className="mt-8">
                                <div className="text-center py-12">
                                    <Music className="h-16 w-16 text-music/40 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Audio Packs</h3>
                                    <p className="text-muted-foreground">Music and sound design prompts for immersive audio experiences.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Creative Packs?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 relative">
                                        <Zap className="h-6 w-6 text-primary animate-glow-pulse" />
                                        <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse" />
                                    </div>
                                    <CardTitle>Instant Access</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Download immediately after purchase with lifetime access to all pack contents.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-music/10 rounded-lg flex items-center justify-center mb-4 relative">
                                        <Users className="h-6 w-6 text-music" />
                                        <div className="absolute inset-0 bg-music/5 rounded-lg animate-pulse" />
                                    </div>
                                    <CardTitle>Community Tested</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        All packs are tested by our creative community before release.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 relative">
                                        <Crown className="h-6 w-6 text-accent animate-glow-pulse" />
                                        <div className="absolute inset-0 bg-accent/5 rounded-lg animate-pulse" />
                                    </div>
                                    <CardTitle>Premium Quality</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Professionally curated content from top creators and artists worldwide.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
