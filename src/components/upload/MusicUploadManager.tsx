import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    Code,
    Download,
    Eye,
    Guitar,
    Mic,
    Music,
    Pause,
    Play,
    Save,
    Share2,
    Sparkles,
    Upload,
    Volume2
} from "lucide-react";
import { useRef, useState } from "react";

interface SunoTrack {
    id?: string;
    title: string;
    artist: string;
    mp3File: File | null;
    mp3Url?: string;
    lyrics: string;
    prompt: string;
    genre: string[];
    mood: string[];
    bpm: number;
    key: string;
    voice: string;
    instruments: string;
    duration?: number;
    coverImage?: File | null;
    tags: string[];
    isPublic: boolean;
}

export default function MusicUploadManager() {
    const [track, setTrack] = useState<SunoTrack>({
        title: "",
        artist: "",
        mp3File: null,
        lyrics: "",
        prompt: "",
        genre: [],
        mood: [],
        bpm: 120,
        key: "C Major",
        voice: "",
        instruments: "",
        tags: [],
        isPublic: true
    });

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Parse Suno prompt format
    const parseSunoPrompt = (promptText: string) => {
        const genMatch = promptText.match(/\[#gen:\s*([^\]]+)\]/);
        const moodMatch = promptText.match(/\[#mood:\s*([^\]]+)\]/);
        const bpmMatch = promptText.match(/\[#bpm:\s*(\d+)\]/);
        const keyMatch = promptText.match(/\[#key:\s*([^\]]+)\]/);
        const voiceMatch = promptText.match(/\[#voice:\s*([^\]]+)\]/);

        if (genMatch) {
            const genres = genMatch[1].split(',').map(g => g.trim());
            setTrack(prev => ({ ...prev, genre: genres }));
        }

        if (moodMatch) {
            const moods = moodMatch[1].split(',').map(m => m.trim());
            setTrack(prev => ({ ...prev, mood: moods }));
        }

        if (bpmMatch) {
            setTrack(prev => ({ ...prev, bpm: parseInt(bpmMatch[1]) }));
        }

        if (keyMatch) {
            setTrack(prev => ({ ...prev, key: keyMatch[1].trim() }));
        }

        if (voiceMatch) {
            setTrack(prev => ({ ...prev, voice: voiceMatch[1].trim() }));
        }

        // Extract instruments from instr tags
        const instrMatches = promptText.match(/\[#instr:\s*([^\]]+)\]/g);
        if (instrMatches) {
            const instruments = instrMatches.map(match =>
                match.replace(/\[#instr:\s*/, '').replace(/\]/, '')
            ).join('; ');
            setTrack(prev => ({ ...prev, instruments }));
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('audio/')) {
            setTrack(prev => ({
                ...prev,
                mp3File: file,
                mp3Url: URL.createObjectURL(file)
            }));

            // Load audio to get duration
            const audio = new Audio();
            audio.src = URL.createObjectURL(file);
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
                setTrack(prev => ({ ...prev, duration: audio.duration }));
            };
        }
    };

    const togglePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSave = async () => {
        setIsUploading(true);
        try {
            // Here you would upload to your backend/Supabase
            // For now, we'll simulate the upload
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Track saved:', track);
            alert('Track uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-4">
                        Suno AI Music Manager
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Upload your AI-generated tracks with prompts and lyrics
                    </p>
                </div>

                <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/20">
                        <TabsTrigger value="upload" className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Track
                        </TabsTrigger>
                        <TabsTrigger value="prompt" className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Prompt & Lyrics
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Preview
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Music className="h-5 w-5 text-primary" />
                                        Track Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title">Track Title</Label>
                                            <Input
                                                id="title"
                                                value={track.title}
                                                onChange={(e) => setTrack(prev => ({ ...prev, title: e.target.value }))}
                                                placeholder="Poison Kisses"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="artist">Artist Name</Label>
                                            <Input
                                                id="artist"
                                                value={track.artist}
                                                onChange={(e) => setTrack(prev => ({ ...prev, artist: e.target.value }))}
                                                placeholder="Your Artist Name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="mp3-upload">MP3 File</Label>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                {track.mp3File ? track.mp3File.name : 'Choose MP3 file'}
                                            </Button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="audio/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                aria-label="Upload MP3 file"
                                            />
                                        </div>
                                    </div>

                                    {track.mp3Url && (
                                        <Card className="bg-muted/20 p-4">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    size="icon"
                                                    variant={isPlaying ? "default" : "outline"}
                                                    onClick={togglePlayback}
                                                >
                                                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                                </Button>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">{track.title || 'Untitled'}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {formatTime(currentTime)} / {formatTime(duration)}
                                                    </div>
                                                </div>
                                                <Volume2 className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <audio
                                                ref={audioRef}
                                                src={track.mp3Url}
                                                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                                                onEnded={() => setIsPlaying(false)}
                                            />
                                        </Card>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Musical Details */}
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Guitar className="h-5 w-5 text-music" />
                                        Musical Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="bpm">BPM</Label>
                                            <Input
                                                id="bpm"
                                                type="number"
                                                value={track.bpm}
                                                onChange={(e) => setTrack(prev => ({ ...prev, bpm: parseInt(e.target.value) || 120 }))}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="key">Key</Label>
                                            <Input
                                                id="key"
                                                value={track.key}
                                                onChange={(e) => setTrack(prev => ({ ...prev, key: e.target.value }))}
                                                placeholder="A Minor"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="voice">Voice Description</Label>
                                        <Input
                                            id="voice"
                                            value={track.voice}
                                            onChange={(e) => setTrack(prev => ({ ...prev, voice: e.target.value }))}
                                            placeholder="smooth, melancholic vocals, subtle falsetto"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="instruments">Instruments</Label>
                                        <Textarea
                                            id="instruments"
                                            value={track.instruments}
                                            onChange={(e) => setTrack(prev => ({ ...prev, instruments: e.target.value }))}
                                            placeholder="Soft, haunting guitar picking, deep bass hums underneath..."
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <Label>Genres</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {track.genre.map((genre, index) => (
                                                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                                                    {genre}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Moods</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {track.mood.map((mood, index) => (
                                                <Badge key={index} variant="secondary" className="bg-music/10 text-music">
                                                    {mood}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="prompt" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Suno Prompt */}
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Code className="h-5 w-5 text-code" />
                                        Suno AI Prompt
                                    </CardTitle>
                                    <CardDescription>
                                        Paste your complete Suno prompt here - it will auto-parse the musical details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={track.prompt}
                                        onChange={(e) => {
                                            setTrack(prev => ({ ...prev, prompt: e.target.value }));
                                            if (e.target.value.includes('[#gen:') || e.target.value.includes('[#mood:')) {
                                                parseSunoPrompt(e.target.value);
                                            }
                                        }}
                                        placeholder="[#gen: alternative rock, dark pop r&b, cinematic, #mood: moody, seductive, reckless, #bpm: 95, #key: A Minor, #voice: smooth, melancholic vocals, subtle falsetto, hypnotic delivery]..."
                                        rows={12}
                                        className="font-mono text-sm"
                                    />
                                    <Button
                                        onClick={() => parseSunoPrompt(track.prompt)}
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                    >
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Parse Prompt
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Lyrics */}
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Mic className="h-5 w-5 text-accent" />
                                        Lyrics
                                    </CardTitle>
                                    <CardDescription>
                                        The complete lyrics of your generated song
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={track.lyrics}
                                        onChange={(e) => setTrack(prev => ({ ...prev, lyrics: e.target.value }))}
                                        placeholder="You got a habit of pullin' me under,
Eyes like a drug, got me lost in your thunder..."
                                        rows={12}
                                        className="font-mono text-sm"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="mt-6">
                        <Card className="bg-card/50 border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="h-5 w-5 text-primary" />
                                    Track Preview
                                </CardTitle>
                                <CardDescription>
                                    How your track will appear on the platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Track Preview Card */}
                                <div className="max-w-2xl mx-auto">
                                    <Card className="bg-gradient-to-br from-muted/50 to-card/50 border-primary/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-music/20 rounded-lg flex items-center justify-center">
                                                    <Music className="h-8 w-8 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold mb-1">{track.title || 'Untitled Track'}</h3>
                                                    <p className="text-muted-foreground mb-2">by {track.artist || 'Unknown Artist'}</p>
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {track.genre.slice(0, 3).map((genre, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {genre}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {track.bpm} BPM • {track.key} • {formatTime(track.duration || 0)}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Play className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Separator className="my-6" />

                                <div className="flex justify-center gap-4">
                                    <Button onClick={handleSave} disabled={isUploading || !track.title || !track.mp3File}>
                                        {isUploading ? (
                                            <>
                                                <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Track
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="outline">
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Share Preview
                                    </Button>
                                </div>

                                {(!track.title || !track.mp3File) && (
                                    <Alert className="mt-4">
                                        <AlertDescription>
                                            Please provide at least a title and MP3 file to save the track.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
