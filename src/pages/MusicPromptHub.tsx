import MusicPromptSubmissionForm from '@/components/forms/MusicPromptSubmissionForm';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Download, Heart, Loader2, Music, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const MusicPromptHub = () => {
    const { isSignedIn, isLoaded, clerkUser } = useAuth();
    const { toast } = useToast();

    const [activeTab, setActiveTab] = useState('submit');
    const [myPrompts, setMyPrompts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch user's music prompts
    useEffect(() => {
        const fetchUserPrompts = async () => {
            if (!clerkUser) return;

            try {
                setLoading(true);

                const { data, error } = await supabase
                    .from('prompts')
                    .select(`
            *,
            artists (
              name
            )
          `)
                    .eq('user_id', clerkUser.id)
                    .eq('type', 'music')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                setMyPrompts(data || []);
            } catch (err) {
                console.error('Error fetching user prompts:', err);
                toast({
                    title: 'Error fetching prompts',
                    description: 'Failed to load your music prompts',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        if (clerkUser) {
            fetchUserPrompts();
        }
    }, [clerkUser, toast]);

    const handlePromptSubmitted = () => {
        setActiveTab('my-prompts');
        // Refetch user's prompts
        if (clerkUser) {
            fetchUserPrompts();
        }
    };

    const fetchUserPrompts = async () => {
        if (!clerkUser) return;

        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('prompts')
                .select(`
          *,
          artists (
            name
          )
        `)
                .eq('user_id', clerkUser.id)
                .eq('type', 'music')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setMyPrompts(data || []);
        } catch (err) {
            console.error('Error fetching user prompts:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/auth?redirect=/music-prompts" replace />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">AI Music Prompts Hub</h1>
                        <p className="text-muted-foreground">
                            Share and manage your AI music prompts and templates
                        </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="submit">Submit New Prompt</TabsTrigger>
                            <TabsTrigger value="my-prompts">My Music Prompts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="submit">
                            <MusicPromptSubmissionForm
                                onSuccess={handlePromptSubmitted}
                                onCancel={() => setActiveTab('my-prompts')}
                            />
                        </TabsContent>

                        <TabsContent value="my-prompts">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Music Prompts</CardTitle>
                                    <CardDescription>
                                        All your submitted music prompts and templates
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    {loading ? (
                                        <div className="py-8 text-center">
                                            <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-muted-foreground" />
                                            <p className="text-muted-foreground">Loading your prompts...</p>
                                        </div>
                                    ) : myPrompts.length === 0 ? (
                                        <div className="py-8 text-center">
                                            <Music className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                                            <p className="text-muted-foreground">You haven't submitted any music prompts yet</p>
                                            <button
                                                className="mt-4 text-primary hover:underline"
                                                onClick={() => setActiveTab('submit')}
                                            >
                                                Submit your first music prompt
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {myPrompts.map((prompt) => (
                                                <Card key={prompt.id} className="overflow-hidden">
                                                    <div className="flex flex-col md:flex-row">
                                                        {prompt.cover_image_url && (
                                                            <div className="md:w-1/4 h-40 md:h-auto">
                                                                <img
                                                                    src={prompt.cover_image_url}
                                                                    alt={prompt.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className={`p-4 ${prompt.cover_image_url ? 'md:w-3/4' : 'w-full'}`}>
                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                <Badge variant="secondary" className="capitalize">
                                                                    <Music className="h-3 w-3 mr-1" />
                                                                    Music Prompt
                                                                </Badge>
                                                                {prompt.artists && (
                                                                    <Badge variant="outline">
                                                                        <User className="h-3 w-3 mr-1" />
                                                                        {prompt.artists.name}
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <h3 className="font-semibold text-lg">{prompt.title}</h3>

                                                            <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                                {prompt.prompt_text}
                                                            </div>

                                                            <div className="mt-3 flex flex-wrap gap-1">
                                                                {prompt.tags.slice(0, 4).map((tag: string) => (
                                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                                {prompt.tags.length > 4 && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        +{prompt.tags.length - 4}
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                                                                <div className="flex items-center">
                                                                    <Calendar className="h-3 w-3 mr-1" />
                                                                    {new Date(prompt.created_at).toLocaleDateString()}
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="flex items-center">
                                                                        <Download className="h-3 w-3 mr-1" />
                                                                        {prompt.downloads_count || 0}
                                                                    </span>
                                                                    <span className="flex items-center">
                                                                        <Heart className="h-3 w-3 mr-1" />
                                                                        {prompt.likes_count || 0}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
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

export default MusicPromptHub;
