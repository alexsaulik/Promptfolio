import { CreatePromptForm } from "@/components/forms/CreatePromptForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAssets } from "@/components/UserAssets";
import { usePrompts } from "@/hooks/use-prompts";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import { BarChart3, Download, Eye, FileCode, Heart, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // Get current user ID from our users table
    useEffect(() => {
        if (user) {
            supabase
                .from('users')
                .select('id')
                .eq('clerk_user_id', user.id)
                .single()
                .then(({ data }) => {
                    if (data) {
                        setCurrentUserId(data.id);
                    }
                });
        }
    }, [user]);

    const { prompts, loading: promptsLoading, refetch } = usePrompts({
        userId: currentUserId || undefined,
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="min-h-screen bg-background relative">
            <Header />
            <main className="container py-8 relative z-10">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
                            <p className="text-muted-foreground">Manage your prompts, sales, and creative assets</p>
                        </div>
                        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                            <DialogTrigger asChild>
                                <ShimmerButton
                                    className="px-6 py-2"
                                    shimmerColor="#ffffff"
                                    background="rgba(138, 43, 226, 0.9)"
                                    borderRadius="8px"
                                >
                                    <span className="flex items-center text-white font-medium">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Prompt
                                    </span>
                                </ShimmerButton>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <CreatePromptForm
                                    onSuccess={() => {
                                        setShowCreateForm(false);
                                        refetch();
                                    }}
                                    onCancel={() => setShowCreateForm(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$0.00</div>
                                <p className="text-xs text-muted-foreground">No sales yet</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                                <Download className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">Total downloads</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Views</CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">Profile views</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">Total followers</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Dashboard Tabs */}
                    <Tabs defaultValue="prompts" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="prompts">My Prompts</TabsTrigger>
                            <TabsTrigger value="lab">Lab Assets</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="followers">Followers</TabsTrigger>
                        </TabsList>

                        <TabsContent value="prompts" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Prompts</CardTitle>
                                    <CardDescription>Manage and track your prompt portfolio</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {promptsLoading ? (
                                        <div className="text-center py-12">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                                            <p className="text-muted-foreground">Loading your prompts...</p>
                                        </div>
                                    ) : prompts.length === 0 ? (
                                        <div className="text-center py-12">
                                            <p className="text-muted-foreground mb-4">No prompts created yet</p>
                                            <Button onClick={() => setShowCreateForm(true)}>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Create Your First Prompt
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {prompts.map((prompt) => (
                                                <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                                                    <CardContent className="p-4">
                                                        {prompt.cover_image_url && (
                                                            <div className="aspect-video rounded-lg overflow-hidden mb-3">
                                                                <img
                                                                    src={prompt.cover_image_url}
                                                                    alt={prompt.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <Badge variant="secondary" className="capitalize">
                                                                    {prompt.type.replace('_', ' ')}
                                                                </Badge>
                                                                {prompt.is_featured && (
                                                                    <Badge variant="default">Featured</Badge>
                                                                )}
                                                            </div>
                                                            <h3 className="font-semibold line-clamp-2">{prompt.title}</h3>
                                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                                {prompt.prompt_text}
                                                            </p>
                                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                                <div className="flex items-center gap-4">
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
                                                                {prompt.is_paid && (
                                                                    <span className="font-medium">${prompt.price}</span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {prompt.tags.slice(0, 3).map((tag, index) => (
                                                                    <Badge key={index} variant="outline" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                                {prompt.tags.length > 3 && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        +{prompt.tags.length - 3}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="lab" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lab Assets</CardTitle>
                                    <CardDescription>Upload workflows, models, and creative packs</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <Card className="group border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                                            <CardContent className="flex flex-col items-center justify-center p-8">
                                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <FileCode className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2">Workflows</h3>
                                                <p className="text-sm text-muted-foreground text-center mb-4">Upload ComfyUI workflows and automation scripts</p>
                                                <Button asChild className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                                                    <Link to="/upload/workflow">Upload Workflow</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                        <Card className="group border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                                            <CardContent className="flex flex-col items-center justify-center p-8">
                                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <div className="text-white font-bold text-xl">AI</div>
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2">Models</h3>
                                                <p className="text-sm text-muted-foreground text-center mb-4">Share trained AI models and checkpoints</p>
                                                <Button asChild className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                                                    <Link to="/upload/model">Upload Model</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                        <Card className="group border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                                            <CardContent className="flex flex-col items-center justify-center p-8">
                                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <Plus className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2">Packs</h3>
                                                <p className="text-sm text-muted-foreground text-center mb-4">Bundle multiple assets together</p>
                                                <Button asChild className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                                                    <Link to="/upload/pack">Create Pack</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* My Uploaded Assets */}
                                    <div className="space-y-6">
                                        <UserAssets userId={currentUserId} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sales" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sales Analytics</CardTitle>
                                    <CardDescription>Track your revenue and download performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground mb-4">No sales data yet</p>
                                        <p className="text-sm text-muted-foreground">Create and promote your prompts to start earning</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="followers" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Followers</CardTitle>
                                    <CardDescription>Connect with your audience</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground mb-4">No followers yet</p>
                                        <p className="text-sm text-muted-foreground">Build your reputation by creating quality prompts</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
