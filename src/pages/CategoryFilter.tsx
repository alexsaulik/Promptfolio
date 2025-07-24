import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompts/PromptCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Filter } from "lucide-react";

interface PromptData {
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
        username: string;
        avatar_url?: string;
        role: string;
    };
}

const CategoryFilter = () => {
    const { slug } = useParams();
    const [prompts, setPrompts] = useState<PromptData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPromptsByCategory();
    }, [slug]);

    const fetchPromptsByCategory = async () => {
        if (!slug) return;

        try {
            const { data, error } = await supabase
                .from('prompts')
                .select(`
          *,
          user:users!prompts_user_id_fkey(username, avatar_url, role)
        `)
                .contains('tags', [slug])
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching prompts:', error);
                return;
            }

            setPrompts(data || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const categoryName = slug?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Filter className="h-6 w-6 text-primary" />
                            <Badge variant="outline" className="text-base px-3 py-1">
                                {categoryName}
                            </Badge>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">
                                {categoryName} Prompts
                            </h1>
                            <p className="text-muted-foreground">
                                Discover creative prompts in the {categoryName.toLowerCase()} category
                            </p>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {/* Results */}
                    {!loading && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <p className="text-muted-foreground">
                                    {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'} found
                                </p>
                            </div>

                            {prompts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {prompts.map((prompt) => (
                                        <PromptCard
                                            key={prompt.id}
                                            prompt={{
                                                id: prompt.id,
                                                title: prompt.title,
                                                description: prompt.prompt_text.substring(0, 100) + "...",
                                                type: prompt.type as any,
                                                price: prompt.price,
                                                isPremium: prompt.is_featured,
                                                coverImage: prompt.cover_image_url,
                                                audioPreview: prompt.preview_url,
                                                creator: {
                                                    username: prompt.user.username,
                                                    avatar: prompt.user.avatar_url,
                                                    isVerified: prompt.user.role === 'admin'
                                                },
                                                stats: {
                                                    views: prompt.views_count,
                                                    downloads: prompt.downloads_count,
                                                    likes: prompt.likes_count
                                                },
                                                tags: prompt.tags
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        No prompts found in {categoryName.toLowerCase()}
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        Be the first to create a prompt in this category!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CategoryFilter;
