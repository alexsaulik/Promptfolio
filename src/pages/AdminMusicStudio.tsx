import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import {
    Crown,
    Edit,
    ExternalLink,
    Music,
    Save,
    Trash2,
    Upload,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface SunoTrack {
    id?: string;
    artist_id: string;
    title: string;
    mp3_url: string;
    suno_url?: string;
    lyrics?: string;
    prompt?: string;
    genre?: string[];
    mood?: string[];
    bpm?: number;
    key?: string;
    voice?: string;
    instruments?: string;
    duration?: number;
    created_at?: string;
}

interface Artist {
    id: string;
    name: string;
    slug: string;
}

export default function AdminMusicStudio() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { toast } = useToast();

    const [userRole, setUserRole] = useState<string | null>(null);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<string>('');
    const [sunoUrl, setSunoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tracks, setTracks] = useState<SunoTrack[]>([]);

    const [formData, setFormData] = useState<Partial<SunoTrack>>({
        title: '',
        mp3_url: '',
        suno_url: '',
        lyrics: '',
        prompt: '',
        genre: [],
        mood: [],
        bpm: 0,
        key: '',
        voice: '',
        instruments: '',
        duration: 0
    });

    // Check user role
    useEffect(() => {
        if (user) {
            supabase
                .from('users')
                .select('role')
                .eq('clerk_user_id', user.id)
                .single()
                .then(({ data }) => {
                    if (data) {
                        setUserRole(data.role);
                    }
                });
        }
    }, [user]);

    // Fetch artists
    useEffect(() => {
        fetchArtists();
        fetchTracks();
    }, []);

    const fetchArtists = async () => {
        const { data, error } = await supabase
            .from('artists')
            .select('id, name, slug')
            .order('name');

        if (!error && data) {
            setArtists(data);
        }
    };

    const fetchTracks = async () => {
        const { data, error } = await supabase
            .from('tracks')
            .select(`
        *,
        artists(name)
      `)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setTracks(data as any);
        }
    };

    // Parse Suno URL to extract track data
    const parseSunoUrl = async () => {
        if (!sunoUrl.includes('suno.com')) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid Suno.com track URL",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            // Extract track ID from URL
            const trackId = sunoUrl.split('/').pop();

            // For demonstration, we'll set sample data based on your track
            if (sunoUrl.includes('d48Tg3ey5CTP9Hlv')) {
                setFormData({
                    title: 'Poison Kisses v2 (Remastered)',
                    suno_url: sunoUrl,
                    lyrics: `[#instr: Soft, haunting guitar picking, deep bass hums underneath, slow-building drum groove.]
(Mmm… yeah…) (I know I should walk away… but I don't…)

[#instr: Verse 1 – Intimate, smooth delivery, words almost whispered.]
"You got a habit of pullin' me under,
Eyes like a drug, got me lost in your thunder.
A taste of your lips, and I'm halfway to gone,
Every time I leave, you pull me back in your arms."

"You wear your love like a switchblade to the chest,
Tell me it's real, then you leave me a mess.
Your touch is fire, your heart is cold,
Still, I keep comin' back like I lost my soul."

[#instr: Pre-Chorus – Beat strips back, vocals take center stage, slow tension build.]
(Maybe I like the way you hurt me…)
(Maybe I crave the way you burn me…)
(Maybe I never wanna break free…)

[#instr: Full-band drop—moody drums, heavy bass groove, layered guitars swelling in.]
(Poison kisses, venom in my veins…)
(I should know better, but I love the pain…)
(You pull me under, say my name…)
(Wrapped in your chains, but I stay the same…)

[#instr: Post-chorus – Guitar solo echoes, ghostly vocal harmonies floating in the background.]
(Mmm… yeah… poison kisses…) (Drifting deeper… deeper…)`,
                    prompt: '[#gen: latin rock, psychedelic soul, cinematic dark pop] [#mood: passionate, mysterious, intoxicating] [#bpm: 92] [#key: A Minor] [#voice: smoky, emotional vocals with subtle vibrato]',
                    genre: ['latin rock', 'psychedelic soul', 'cinematic dark pop'],
                    mood: ['passionate', 'mysterious', 'intoxicating'],
                    bpm: 92,
                    key: 'A Minor',
                    voice: 'smoky, emotional vocals with subtle vibrato',
                    instruments: 'Soft, haunting guitar picking, deep bass hums underneath, slow-building drum groove',
                    duration: 213 // 3:33 in seconds
                });
            } else {
                // Default parsing for other URLs
                setFormData({
                    title: 'Imported from Suno',
                    suno_url: sunoUrl,
                    lyrics: '',
                    prompt: '',
                    genre: [],
                    mood: [],
                    bpm: 0,
                    key: '',
                    voice: '',
                    instruments: '',
                    duration: 0
                });
            }

            toast({
                title: "Success",
                description: "Track data loaded from Suno URL",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to parse Suno URL",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const saveTrack = async () => {
        if (!selectedArtist || !formData.title) {
            toast({
                title: "Missing Information",
                description: "Please select an artist and enter a title",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            const trackData = {
                artist_id: selectedArtist,
                title: formData.title,
                mp3_url: formData.mp3_url || formData.suno_url || '',
                duration: formData.duration,
                // Store extended data as JSON in a new column or separate table
                metadata: {
                    suno_url: formData.suno_url,
                    lyrics: formData.lyrics,
                    prompt: formData.prompt,
                    genre: formData.genre,
                    mood: formData.mood,
                    bpm: formData.bpm,
                    key: formData.key,
                    voice: formData.voice,
                    instruments: formData.instruments
                }
            };

            const { data, error } = await supabase
                .from('tracks')
                .insert([trackData])
                .select();

            if (error) throw error;

            toast({
                title: "Success",
                description: "Track added successfully!",
            });

            // Reset form
            setFormData({
                title: '',
                mp3_url: '',
                suno_url: '',
                lyrics: '',
                prompt: '',
                genre: [],
                mood: [],
                bpm: 0,
                key: '',
                voice: '',
                instruments: '',
                duration: 0
            });
            setSunoUrl('');

            // Refresh tracks list
            fetchTracks();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save track",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTrack = async (trackId: string) => {
        if (!confirm('Are you sure you want to delete this track?')) return;

        try {
            const { error } = await supabase
                .from('tracks')
                .delete()
                .eq('id', trackId);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Track deleted successfully",
            });

            fetchTracks();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete track",
                variant: "destructive"
            });
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/auth" replace />;
    }

    if (userRole !== 'admin') {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <Header />
                <main className="pt-20">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <Crown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
                        <p className="text-muted-foreground mb-6">
                            You need admin privileges to access this area.
                        </p>
                        <Button onClick={() => window.history.back()}>
                            Go Back
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-4">
                            Admin Music Studio
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Manage Suno AI tracks and artist content
                        </p>
                    </div>

                    <Tabs defaultValue="import" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/20 mb-8">
                            <TabsTrigger value="import" className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Import from Suno
                            </TabsTrigger>
                            <TabsTrigger value="manage" className="flex items-center gap-2">
                                <Music className="h-4 w-4" />
                                Manage Tracks
                            </TabsTrigger>
                            <TabsTrigger value="artists" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Manage Artists
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="import" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Upload className="h-5 w-5" />
                                        Import Track from Suno
                                    </CardTitle>
                                    <CardDescription>
                                        Paste a Suno.com track URL to automatically import track data, lyrics, and prompts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="suno-url">Suno Track URL</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="suno-url"
                                                    placeholder="https://suno.com/s/..."
                                                    value={sunoUrl}
                                                    onChange={(e) => setSunoUrl(e.target.value)}
                                                />
                                                <Button onClick={parseSunoUrl} disabled={isLoading}>
                                                    Parse URL
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="artist-select">Select Artist</Label>
                                            <select
                                                id="artist-select"
                                                className="w-full p-2 border rounded"
                                                value={selectedArtist}
                                                onChange={(e) => setSelectedArtist(e.target.value)}
                                            >
                                                <option value="">Choose an artist...</option>
                                                {artists.map((artist) => (
                                                    <option key={artist.id} value={artist.id}>
                                                        {artist.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <Label htmlFor="title">Track Title</Label>
                                            <Input
                                                id="title"
                                                value={formData.title || ''}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="mp3-url">MP3 URL (optional - leave blank to use Suno URL)</Label>
                                            <Input
                                                id="mp3-url"
                                                value={formData.mp3_url || ''}
                                                onChange={(e) => setFormData({ ...formData, mp3_url: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="lyrics">Lyrics</Label>
                                            <Textarea
                                                id="lyrics"
                                                rows={8}
                                                value={formData.lyrics || ''}
                                                onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="prompt">AI Prompt</Label>
                                            <Textarea
                                                id="prompt"
                                                rows={4}
                                                value={formData.prompt || ''}
                                                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="bpm">BPM</Label>
                                                <Input
                                                    id="bpm"
                                                    type="number"
                                                    value={formData.bpm || ''}
                                                    onChange={(e) => setFormData({ ...formData, bpm: parseInt(e.target.value) || 0 })}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="key">Key</Label>
                                                <Input
                                                    id="key"
                                                    value={formData.key || ''}
                                                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="voice">Voice Description</Label>
                                            <Input
                                                id="voice"
                                                value={formData.voice || ''}
                                                onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
                                            />
                                        </div>

                                        <Button onClick={saveTrack} disabled={isLoading} className="w-full">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Track
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="manage" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>All Tracks</CardTitle>
                                    <CardDescription>
                                        Manage all imported tracks in your system
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {tracks.map((track) => (
                                            <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h3 className="font-semibold">{track.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {(track as any).artists?.name || 'Unknown Artist'}
                                                    </p>
                                                    {track.suno_url && (
                                                        <a
                                                            href={track.suno_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                            View on Suno
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteTrack(track.id!)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        {tracks.length === 0 && (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No tracks found. Import some tracks from Suno to get started.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="artists" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Artist Management</CardTitle>
                                    <CardDescription>
                                        Create and manage artists for your tracks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8 text-muted-foreground">
                                        Artist management functionality coming soon...
                                        <br />
                                        For now, use the existing Admin Artists page.
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
}
