import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Calendar, Cpu, Download, Eye, Settings, UserCheck, UserPlus, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface UserProfile {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar_url?: string;
    bio?: string;
    created_at: string;
}

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
}

interface ModelData {
    id: string;
    title: string;
    slug: string;
    description: string;
    model_type: string;
    framework: string;
    version: string;
    price: number;
    is_paid: boolean;
    cover_image_url?: string;
    views_count: number;
    downloads_count: number;
    likes_count: number;
    created_at: string;
}

interface WorkflowData {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    is_paid: boolean;
    cover_image_url?: string;
    views_count: number;
    downloads_count: number;
    likes_count: number;
    created_at: string;
}

const UserProfile = () => {
    const { username } = useParams();
    const { clerkUser, supabaseUser } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [prompts, setPrompts] = useState<PromptData[]>([]);
    const [models, setModels] = useState<ModelData[]>([]);
    const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("prompts");

    useEffect(() => {
        fetchProfile();
    }, [username]);

    const fetchProfile = async () => {
        if (!username) return;

        try {
            // Fetch user profile
            const { data: profileData, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .maybeSingle();

            if (profileError) {
                console.error('Error fetching profile:', profileError);
                return;
            }

            if (!profileData) {
                setLoading(false);
                return;
            }

            setProfile(profileData);

            // Fetch user's prompts
            const { data: promptsData, error: promptsError } = await supabase
                .from('prompts')
                .select('*')
                .eq('user_id', profileData.id)
                .order('created_at', { ascending: false });

            if (promptsError) {
                console.error('Error fetching prompts:', promptsError);
            } else {
                setPrompts(promptsData || []);
            }

            // Fetch user's models
            const { data: modelsData, error: modelsError } = await supabase
                .from('models')
                .select('*')
                .eq('user_id', profileData.id)
                .order('created_at', { ascending: false });

            if (modelsError) {
                console.error('Error fetching models:', modelsError);
            } else {
                setModels(modelsData || []);
            }

            // Fetch user's workflows
            const { data: workflowsData, error: workflowsError } = await supabase
                .from('workflows')
                .select('*')
                .eq('user_id', profileData.id)
                .order('created_at', { ascending: false });

            if (workflowsError) {
                console.error('Error fetching workflows:', workflowsError);
            } else {
                setWorkflows(workflowsData || []);
            }

            // Fetch followers count
            const { count: followersCountData } = await supabase
                .from('follows')
                .select('*', { count: 'exact', head: true })
                .eq('followed_user_id', profileData.id);

            setFollowersCount(followersCountData || 0);

            // Check if current user is following this profile
            if (supabaseUser) {
                const { data: followData } = await supabase
                    .from('follows')
                    .select('id')
                    .eq('follower_id', supabaseUser.id)
                    .eq('followed_user_id', profileData.id)
                    .maybeSingle();

                setIsFollowing(!!followData);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!profile || !supabaseUser) return;

        try {
            if (isFollowing) {
                // Unfollow
                await supabase
                    .from('follows')
                    .delete()
                    .eq('follower_id', supabaseUser.id)
                    .eq('followed_user_id', profile.id);

                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
                toast({
                    title: "Unfollowed",
                    description: `You're no longer following ${profile.username}`,
                });
            } else {
                // Follow
                await supabase
                    .from('follows')
                    .insert({
                        follower_id: supabaseUser.id,
                        followed_user_id: profile.id
                    });

                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
                toast({
                    title: "Following",
                    description: `You're now following ${profile.username}`,
                });
            }
        } catch (error) {
            console.error('Error updating follow status:', error);
            toast({
                title: "Error",
                description: "Failed to update follow status",
                variant: "destructive",
            });
        }
    };

    const handleProfileUpdate = () => {
        setIsEditDialogOpen(false);
        fetchProfile(); // Refresh profile data
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-32 bg-muted rounded"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-muted rounded"></div>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container py-8">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
                        <p className="text-muted-foreground mb-6">The profile you're looking for doesn't exist.</p>
                        <Button asChild>
                            <a href="/">Browse Prompts</a>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const totalDownloads = prompts.reduce((sum, prompt) => sum + prompt.downloads_count, 0) +
        models.reduce((sum, model) => sum + model.downloads_count, 0) +
        workflows.reduce((sum, workflow) => sum + workflow.downloads_count, 0);
    const totalViews = prompts.reduce((sum, prompt) => sum + prompt.views_count, 0) +
        models.reduce((sum, model) => sum + model.views_count, 0) +
        workflows.reduce((sum, workflow) => sum + workflow.views_count, 0);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Profile Header */}
                    <Card>
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={profile.avatar_url} />
                                    <AvatarFallback className="text-2xl">
                                        {profile.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h1 className="text-3xl font-bold">{profile.username}</h1>
                                            <Badge variant="outline">{profile.role}</Badge>
                                        </div>
                                        {profile.bio && (
                                            <p className="text-muted-foreground">{profile.bio}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {followersCount} followers
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Download className="h-4 w-4" />
                                            {totalDownloads} downloads
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {totalViews} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Joined {new Date(profile.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {supabaseUser && supabaseUser.id === profile.id && (
                                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">
                                                    <Settings className="h-4 w-4 mr-2" />
                                                    Edit Profile
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                                <ProfileEditForm
                                                    user={profile}
                                                    onSuccess={handleProfileUpdate}
                                                    onCancel={() => setIsEditDialogOpen(false)}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    )}

                                    {supabaseUser && supabaseUser.id !== profile.id && (
                                        <Button onClick={handleFollow} className={isFollowing ? "bg-muted" : "bg-gradient-primary"}>
                                            {isFollowing ? (
                                                <>
                                                    <UserCheck className="h-4 w-4 mr-2" />
                                                    Following
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                    Follow
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
                            <TabsTrigger value="prompts" className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Prompts ({prompts.length})
                            </TabsTrigger>
                            <TabsTrigger value="models" className="flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                Models ({models.length})
                            </TabsTrigger>
                            <TabsTrigger value="workflows" className="flex items-center gap-2">
                                <Cpu className="w-4 h-4" />
                                Workflows ({workflows.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="prompts" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Prompts</h2>
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
                                                    username: profile.username,
                                                    avatar: profile.avatar_url,
                                                    isVerified: profile.role === 'admin'
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
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground mb-4">No prompts yet</p>
                                        <p className="text-sm text-muted-foreground">
                                            {supabaseUser && supabaseUser.id === profile.id
                                                ? "Start building your promptfolio by creating your first prompt"
                                                : `${profile.username} hasn't created any prompts yet`
                                            }
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="models" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">AI Models</h2>
                            </div>

                            {models.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {models.map((model) => (
                                        <Card key={model.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {model.framework}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-xs">
                                                                v{model.version}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                            <Link to={`/model/${model.slug}`} className="hover:underline">
                                                                {model.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {model.description}
                                                        </p>
                                                    </div>
                                                    {model.cover_image_url && (
                                                        <img
                                                            src={model.cover_image_url}
                                                            alt={model.title}
                                                            className="w-16 h-16 rounded-lg object-cover ml-4"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1">
                                                            <Download className="w-4 h-4" />
                                                            {model.downloads_count}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4" />
                                                            {model.views_count}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        {model.is_paid ? (
                                                            <span className="font-semibold text-primary">${model.price}</span>
                                                        ) : (
                                                            <span className="text-green-600 font-semibold">Free</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button asChild size="sm" className="w-full">
                                                    <Link to={`/model/${model.slug}`}>
                                                        View Model
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground mb-4">No AI models yet</p>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            {supabaseUser && supabaseUser.id === profile.id
                                                ? "Share your trained AI models with the community"
                                                : `${profile.username} hasn't uploaded any models yet`
                                            }
                                        </p>
                                        {supabaseUser && supabaseUser.id === profile.id && (
                                            <Button asChild>
                                                <Link to="/upload/model">
                                                    <Brain className="w-4 h-4 mr-2" />
                                                    Upload Model
                                                </Link>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="workflows" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">ComfyUI Workflows</h2>
                            </div>

                            {workflows.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {workflows.map((workflow) => (
                                        <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {workflow.category}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-xs">
                                                                {workflow.difficulty}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                            <Link to={`/workflow/${workflow.slug}`} className="hover:underline">
                                                                {workflow.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {workflow.description}
                                                        </p>
                                                    </div>
                                                    {workflow.cover_image_url && (
                                                        <img
                                                            src={workflow.cover_image_url}
                                                            alt={workflow.title}
                                                            className="w-16 h-16 rounded-lg object-cover ml-4"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1">
                                                            <Download className="w-4 h-4" />
                                                            {workflow.downloads_count}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4" />
                                                            {workflow.views_count}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        {workflow.is_paid ? (
                                                            <span className="font-semibold text-primary">${workflow.price}</span>
                                                        ) : (
                                                            <span className="text-green-600 font-semibold">Free</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button asChild size="sm" className="w-full">
                                                    <Link to={`/workflow/${workflow.slug}`}>
                                                        View Workflow
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <Cpu className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground mb-4">No workflows yet</p>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            {supabaseUser && supabaseUser.id === profile.id
                                                ? "Share your ComfyUI workflows with the community"
                                                : "Share your ComfyUI workflows with the community"
                                            }
                                        </p>
                                        {supabaseUser && supabaseUser.id === profile.id && (
                                            <Button asChild>
                                                <Link to="/upload/workflow">
                                                    <Cpu className="w-4 h-4 mr-2" />
                                                    Upload Workflow
                                                </Link>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserProfile;
