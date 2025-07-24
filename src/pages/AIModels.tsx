import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModels } from "@/hooks/use-models";
import {
    Brain,
    Code,
    Cpu,
    Download,
    Eye,
    Filter,
    Globe,
    Heart,
    Image as ImageIcon,
    MessageSquare,
    Music,
    Search,
    Sparkles,
    Star,
    TrendingUp,
    Users,
    Video,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AIModels = () => {
    const { models, loading } = useModels();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredModels, setFilteredModels] = useState(models);

    useEffect(() => {
        let filtered = models;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(model =>
                model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(model => model.model_type === selectedCategory);
        }

        setFilteredModels(filtered);
    }, [models, searchTerm, selectedCategory]);

    const categories = [
        { id: "all", name: "All Models", icon: Globe, count: models.length },
        { id: "text-generation", name: "Text Generation", icon: MessageSquare, count: models.filter(m => m.model_type === "text-generation").length },
        { id: "image-generation", name: "Image Generation", icon: ImageIcon, count: models.filter(m => m.model_type === "image-generation").length },
        { id: "audio-generation", name: "Audio Generation", icon: Music, count: models.filter(m => m.model_type === "audio-generation").length },
        { id: "code-generation", name: "Code Generation", icon: Code, count: models.filter(m => m.model_type === "code-generation").length },
        { id: "video-generation", name: "Video Generation", icon: Video, count: models.filter(m => m.model_type === "video-generation").length },
    ];

    const featuredModels = models.filter(model => model.is_featured).slice(0, 3);
    const popularModels = models.sort((a, b) => b.downloads_count - a.downloads_count).slice(0, 6);

    const ModelCard = ({ model }: { model: any }) => (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                                {model.framework}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                v{model.version}
                            </Badge>
                            {model.is_featured && (
                                <Badge className="bg-gradient-primary text-xs">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                            <Link to={`/model/${model.slug}`} className="hover:underline">
                                {model.title}
                            </Link>
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                            {model.description}
                        </CardDescription>
                    </div>
                    {model.cover_image_url && (
                        <img
                            src={model.cover_image_url}
                            alt={model.title}
                            className="w-16 h-16 rounded-lg object-cover ml-4"
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                    {model.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                    {model.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                            +{model.tags.length - 3} more
                        </Badge>
                    )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {model.downloads_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {model.views_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {model.likes_count.toLocaleString()}
                        </span>
                    </div>
                    <div className="text-right">
                        {model.is_paid ? (
                            <span className="font-semibold text-primary">${model.price}</span>
                        ) : (
                            <span className="text-green-600 font-semibold">Free</span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                        <Link to={`/model/${model.slug}`}>
                            View Details
                        </Link>
                    </Button>
                    {!model.is_paid && (
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
                <div className="container relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Brain className="w-12 h-12 text-primary" />
                            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            AI Models Marketplace
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Discover, deploy, and share cutting-edge AI models for every use case.
                            From text generation to image synthesis, find the perfect model for your project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gradient-primary">
                                <Link to="/upload/model">
                                    <Cpu className="w-5 h-5 mr-2" />
                                    Upload Model
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg">
                                <TrendingUp className="w-5 h-5 mr-2" />
                                Browse Popular
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-muted/30">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {models.length.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Models Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {models.reduce((acc, model) => acc + model.downloads_count, 0).toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Total Downloads</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {new Set(models.map(model => model.user_id)).size.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Contributors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {models.filter(model => !model.is_paid).length.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Free Models</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Models */}
            {featuredModels.length > 0 && (
                <section className="py-16">
                    <div className="container">
                        <div className="flex items-center gap-3 mb-8">
                            <Star className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold">Featured Models</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredModels.map((model) => (
                                <ModelCard key={model.id} model={model} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className="py-16">
                <div className="container">
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-8">
                        {/* Search and Filters */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search models by name, description, or tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                        </div>

                        {/* Category Tabs */}
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.id}
                                    className="flex items-center gap-2 text-xs"
                                >
                                    <category.icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{category.name}</span>
                                    <Badge variant="secondary" className="text-xs">
                                        {category.count}
                                    </Badge>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Model Grid */}
                        <TabsContent value={selectedCategory} className="space-y-6">
                            {loading ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, i) => (
                                        <Card key={i} className="animate-pulse">
                                            <CardHeader>
                                                <div className="h-4 bg-muted rounded w-3/4" />
                                                <div className="h-3 bg-muted rounded w-1/2" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-20 bg-muted rounded mb-4" />
                                                <div className="h-10 bg-muted rounded" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : filteredModels.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredModels.map((model) => (
                                        <ModelCard key={model.id} model={model} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No models found</h3>
                                    <p className="text-muted-foreground mb-6">
                                        {searchTerm
                                            ? `No models match "${searchTerm}". Try adjusting your search.`
                                            : "No models available in this category yet."
                                        }
                                    </p>
                                    <Button asChild>
                                        <Link to="/upload/model">
                                            <Zap className="w-4 h-4 mr-2" />
                                            Upload First Model
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Popular Models Section */}
            {popularModels.length > 0 && (
                <section className="py-16 bg-muted/30">
                    <div className="container">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold">Popular This Week</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularModels.map((model) => (
                                <ModelCard key={model.id} model={model} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16">
                <div className="container">
                    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                        <CardContent className="text-center py-12">
                            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl font-bold mb-4">Join the AI Revolution</h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Share your AI models with the community and help advance the field of artificial intelligence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-gradient-primary">
                                    <Link to="/upload/model">
                                        <Cpu className="w-5 h-5 mr-2" />
                                        Upload Your Model
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link to="/auth">
                                        <Users className="w-5 h-5 mr-2" />
                                        Join Community
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AIModels;
