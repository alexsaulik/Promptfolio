import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import EnhancedTrackPlayer from "@/components/music/EnhancedTrackPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicUploadManager from "@/components/upload/MusicUploadManager";
import { Library, Music, Sparkles, Upload } from "lucide-react";

export default function MusicStudio() {
    // Sample track for demonstration
    const sampleTrack = {
        id: "1",
        title: "Poison Kisses",
        artist: "AI Composer",
        mp3Url: "/placeholder-audio.mp3",
        coverImageUrl: "/api/placeholder/800/300",
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
        prompt: `[#gen: alternative rock, dark pop r&b, cinematic, #mood: moody, seductive, reckless, #bpm: 95, #key: A Minor, #voice: smooth, melancholic vocals, subtle falsetto, hypnotic delivery]

[#instr: Soft, haunting guitar picking, deep bass hums underneath, slow-building drum groove.]
(Mmm… yeah…) (I know I should walk away… but I don't…)

[#instr: Verse 1 – Intimate, smooth delivery, words almost whispered.]
"You got a habit of pullin' me under,
Eyes like a drug, got me lost in your thunder.
A taste of your lips, and I'm halfway to gone,
Every time I leave, you pull me back in your arms."

[#instr: Pre-Chorus – Beat strips back, vocals take center stage, slow tension build.]
(Maybe I like the way you hurt me…)
(Maybe I crave the way you burn me…)
(Maybe I never wanna break free…)

[#instr: Full-band drop—moody drums, heavy bass groove, layered guitars swelling in.]
(Poison kisses, venom in my veins…)
(I should know better, but I love the pain…)
(You pull me under, say my name…)
(Wrapped in your chains, but I stay the same…)`,
        genre: ["alternative rock", "dark pop", "r&b", "cinematic"],
        mood: ["moody", "seductive", "reckless"],
        bpm: 95,
        key: "A Minor",
        voice: "smooth, melancholic vocals, subtle falsetto, hypnotic delivery",
        instruments: "Soft, haunting guitar picking, deep bass hums underneath, slow-building drum groove",
        duration: 203,
        plays: 1247,
        likes: 89,
        downloads: 34,
        createdAt: "2025-01-15T10:30:00Z"
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
                                    <Music className="h-16 w-16 text-primary animate-glow-pulse" />
                                    <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full animate-ping" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-6">
                                Suno AI Music Studio
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Upload, manage, and showcase your AI-generated music with complete prompts and lyrics
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-7xl">
                        <Tabs defaultValue="demo" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-muted/20 mb-8">
                                <TabsTrigger value="demo" className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Demo Track
                                </TabsTrigger>
                                <TabsTrigger value="upload" className="flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    Upload Music
                                </TabsTrigger>
                                <TabsTrigger value="library" className="flex items-center gap-2">
                                    <Library className="h-4 w-4" />
                                    Music Library
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="demo" className="mt-8">
                                <div className="max-w-4xl mx-auto">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold mb-4">Sample Suno AI Track</h2>
                                        <p className="text-muted-foreground">
                                            See how your AI-generated music will be displayed with complete prompts and lyrics
                                        </p>
                                    </div>
                                    <EnhancedTrackPlayer track={sampleTrack} showFullDetails={true} />
                                </div>
                            </TabsContent>

                            <TabsContent value="upload" className="mt-8">
                                <MusicUploadManager />
                            </TabsContent>

                            <TabsContent value="library" className="mt-8">
                                <div className="text-center py-12">
                                    <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">Your Music Library</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Upload your first track to start building your AI music collection
                                    </p>
                                    <div className="max-w-md mx-auto">
                                        <EnhancedTrackPlayer track={sampleTrack} showFullDetails={false} />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Perfect for Suno AI Creators</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 relative">
                                    <Upload className="h-8 w-8 text-primary animate-glow-pulse" />
                                    <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Smart Prompt Parsing</h3>
                                <p className="text-muted-foreground">
                                    Automatically extracts genre, mood, BPM, key, and voice style from your Suno prompts
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-music/10 rounded-lg flex items-center justify-center mx-auto mb-4 relative">
                                    <Music className="h-8 w-8 text-music" />
                                    <div className="absolute inset-0 bg-music/5 rounded-lg animate-pulse" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Rich Audio Player</h3>
                                <p className="text-muted-foreground">
                                    Professional music player with lyrics display and prompt visualization
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 relative">
                                    <Library className="h-8 w-8 text-accent animate-glow-pulse" />
                                    <div className="absolute inset-0 bg-accent/5 rounded-lg animate-pulse" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Artist Integration</h3>
                                <p className="text-muted-foreground">
                                    Seamlessly integrates with artist profiles and the Promptfolio marketplace
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
