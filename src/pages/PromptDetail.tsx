import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Play, Pause, Download, Heart, Eye, Share2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Prompt {
    id: string;
    slug: string;
    title: string;
    prompt_text: string;
    type: string;
    tags: string[];
    price: number;
    is_paid: boolean;
    is_featured: boolean;
    cover_image_url?: string;
    preview_url?: string;
    views_count: number;
    downloads_count: number;
    likes_count: number;
    created_at: string;
    user: {
        id: string;
        username: string;
        avatar_url?: string;
        role: string;
    };
    artist?: {
        id: string;
        slug: string;
        name: string;
        avatar_url?: string;
        genre?: string[];
    };
}

const PromptDetail = () => {
    const { slug } = useParams();
    const { user } = useUser();
    const { toast } = useToast();
    const [prompt, setPrompt] = useState<Prompt | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetchPrompt();
    }, [slug]);

    const fetchPrompt = async () => {
        if (!slug) return;

        try {
            const { data, error } = await supabase
                .from('prompts')
                .select(`
          *,
          user:users!prompts_user_id_fkey(id, username, avatar_url, role),
          artist:artists(id, slug, name, avatar_url, genre)
        `)
                .eq('slug', slug)
                .maybeSingle();

            if (error) {
                console.error('Error fetching prompt:', error);
                return;
            }

            if (data) {
                setPrompt(data);
                // Track view
                if (user) {
                    trackView(data.id);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const trackView = async (promptId: string) => {
        try {
            await supabase
                .from('views')
                .insert({
                    prompt_id: promptId,
                    user_id: user?.id || null
                });
        } catch (error) {
            console.error('Error tracking view:', error);
        }
    };

    const handleCopyPrompt = () => {
        if (prompt) {
            navigator.clipboard.writeText(prompt.prompt_text);
            toast({
                title: "Copied!",
                description: "Prompt copied to clipboard",
            });
        }
    };

    const handleDownload = async () => {
        if (!prompt || !user) return;

        try {
            await supabase
                .from('downloads')
                .insert({
                    user_id: user.id,
                    prompt_id: prompt.id
                });

            toast({
                title: "Downloaded!",
                description: "Prompt added to your collection",
            });
        } catch (error) {
            console.error('Error tracking download:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-muted rounded w-1/3"></div>
                        <div className="h-64 bg-muted rounded"></div>
                        <div className="h-32 bg-muted rounded"></div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!prompt) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container py-8">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold mb-4">Prompt not found</h1>
                        <p className="text-muted-foreground mb-6">The prompt you're looking for doesn't exist.</p>
                        <Button asChild>
                            <Link to="/">Browse Prompts</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={`bg-${prompt.type}-light text-${prompt.type}`}>
                                {prompt.type}
                            </Badge>
                            {prompt.is_featured && (
                                <Badge variant="secondary">Featured</Badge>
                            )}
                        </div>
                        <h1 className="text-4xl font-bold">{prompt.title}</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {prompt.views_count}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    {prompt.downloads_count}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    {prompt.likes_count}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Heart className="h-4 w-4 mr-2" />
                                    Like
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Preview */}
                            {prompt.cover_image_url && (
                                <Card>
                                    <CardContent className="p-0">
                                        <img
                                            src={prompt.cover_image_url}
                                            alt={prompt.title}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Audio Preview */}
                            {prompt.type === 'music' && prompt.preview_url && (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                >
                                                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                                </Button>
                                                <div>
                                                    <p className="font-medium">Preview</p>
                                                    <p className="text-sm text-muted-foreground">30 second sample</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Prompt Text */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Prompt</h3>
                                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                                        {prompt.prompt_text}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button onClick={handleCopyPrompt}>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy Prompt
                                        </Button>
                                        {prompt.is_paid ? (
                                            <Button className="bg-gradient-primary">
                                                Buy for ${prompt.price}
                                            </Button>
                                        ) : (
                                            <Button variant="outline" onClick={handleDownload}>
                                                <Download className="h-4 w-4 mr-2" />
                                                Download Free
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tags */}
                            {prompt.tags.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {prompt.tags.map((tag) => (
                                                <Badge key={tag} variant="outline">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Creator */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Creator</h3>
                                    <Link to={`/${prompt.user.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <Avatar>
                                            <AvatarImage src={prompt.user.avatar_url} />
                                            <AvatarFallback>{prompt.user.username[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{prompt.user.username}</p>
                                            <Badge variant="outline" className="text-xs">
                                                {prompt.user.role}
                                            </Badge>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Artist (if music prompt) */}
                            {prompt.artist && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Artist</h3>
                                        <Link to={`/artist/${prompt.artist.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                            <Avatar>
                                                <AvatarImage src={prompt.artist.avatar_url} />
                                                <AvatarFallback>{prompt.artist.name[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{prompt.artist.name}</p>
                                                {prompt.artist.genre && prompt.artist.genre.length > 0 && (
                                                    <p className="text-sm text-muted-foreground">{prompt.artist.genre.join(', ')}</p>
                                                )}
                                            </div>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Related Prompts */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Related Prompts</h3>
                                    <p className="text-sm text-muted-foreground">More prompts coming soon</p>
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

export default PromptDetail;
