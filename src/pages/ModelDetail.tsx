import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Model } from "@/hooks/use-models";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, ArrowLeft, Brain, Download, Eye, Heart, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ModelDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [model, setModel] = useState<Model | null>(null);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState<any>(null);

    useEffect(() => {
        const fetchModel = async () => {
            if (!slug) return;

            try {
                const { data: modelData, error } = await supabase
                    .from('models')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setModel(modelData);

                // Fetch creator info
                const { data: userData } = await supabase
                    .from('users')
                    .select('username, avatar_url')
                    .eq('id', modelData.user_id)
                    .single();

                setCreator(userData);
            } catch (error) {
                console.error('Error fetching model:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchModel();
    }, [slug]);

    const handleDownload = async (fileUrl: string) => {
        if (!model) return;

        // Track download
        await supabase
            .from('models')
            .update({ downloads_count: model.downloads_count + 1 })
            .eq('id', model.id);

        // Open download link
        window.open(fileUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container py-8">
                    <div className="flex items-center justify-center min-h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!model) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container py-8">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold mb-4">Model Not Found</h1>
                        <p className="text-muted-foreground mb-8">The model you're looking for doesn't exist.</p>
                        <Button asChild>
                            <Link to="/dashboard">Back to Dashboard</Link>
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
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild>
                            <Link to="/dashboard">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Link>
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Model Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="capitalize">
                                                    {model.model_type.replace('-', ' ')}
                                                </Badge>
                                                <Badge variant="outline">
                                                    {model.framework}
                                                </Badge>
                                                <Badge variant="outline">
                                                    v{model.version}
                                                </Badge>
                                                {model.is_featured && (
                                                    <Badge variant="default">
                                                        <Star className="w-3 h-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-3xl">{model.title}</CardTitle>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {model.views_count} views
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Download className="w-4 h-4" />
                                                    {model.downloads_count} downloads
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-4 h-4" />
                                                    {model.likes_count} likes
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {model.is_paid ? (
                                                <div className="text-2xl font-bold">${model.price}</div>
                                            ) : (
                                                <Badge variant="secondary" className="text-lg px-3 py-1">Free</Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {model.description}
                                        </p>
                                    </div>

                                    {model.requirements && (
                                        <div>
                                            <h3 className="font-semibold mb-2">System Requirements</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {model.requirements}
                                            </p>
                                        </div>
                                    )}

                                    {model.tags.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {model.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* License Warning */}
                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                                            <div className="text-sm">
                                                <p className="font-medium text-yellow-500">License: {model.license}</p>
                                                <p className="mt-1 text-muted-foreground">
                                                    Please review the license terms before using this model.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Download */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="w-5 h-5" />
                                        Download Files
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {model.file_urls.length > 0 ? (
                                        model.file_urls.map((fileUrl, index) => (
                                            <Button
                                                key={index}
                                                onClick={() => handleDownload(fileUrl)}
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                File {index + 1}
                                            </Button>
                                        ))
                                    ) : (
                                        <div>
                                            <Button
                                                className="w-full bg-gradient-primary"
                                                disabled
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                {model.is_paid ? `Download - $${model.price}` : 'Download Free'}
                                            </Button>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Files not available
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Creator */}
                            {creator && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Creator
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-3">
                                            {creator.avatar_url ? (
                                                <img
                                                    src={creator.avatar_url}
                                                    alt={creator.username}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="w-5 h-5" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium">{creator.username}</p>
                                                <p className="text-sm text-muted-foreground">Creator</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Model Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type</span>
                                        <span className="capitalize">{model.model_type.replace('-', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Framework</span>
                                        <span>{model.framework}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Version</span>
                                        <span>v{model.version}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">License</span>
                                        <span>{model.license}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Published</span>
                                        <span>{new Date(model.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Updated</span>
                                        <span>{new Date(model.updated_at).toLocaleDateString()}</span>
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

export default ModelDetail;
