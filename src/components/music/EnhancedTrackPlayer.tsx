import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Clock,
    Code,
    Download,
    Eye,
    Heart,
    Mic,
    Music,
    Pause,
    Play,
    Share2,
    Sparkles,
    Users,
    Volume2,
    VolumeX
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Track {
    id: string;
    title: string;
    artist: string;
    mp3Url?: string;
    coverImageUrl?: string;
    lyrics?: string;
    prompt?: string;
    genre?: string[];
    mood?: string[];
    bpm?: number;
    key?: string;
    voice?: string;
    instruments?: string;
    duration?: number;
    plays?: number;
    likes?: number;
    downloads?: number;
    createdAt?: string;
}

interface EnhancedTrackPlayerProps {
    track: Track;
    showFullDetails?: boolean;
}

const EnhancedTrackPlayer: React.FC<EnhancedTrackPlayerProps> = ({
    track,
    showFullDetails = true
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

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

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            const time = (value[0] / 100) * (track.duration || 100);
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const parsePromptSections = (prompt: string) => {
        const sections = {
            generation: prompt.match(/\[#gen:\s*([^\]]+)\]/)?.[1] || '',
            mood: prompt.match(/\[#mood:\s*([^\]]+)\]/)?.[1] || '',
            bpm: prompt.match(/\[#bpm:\s*(\d+)\]/)?.[1] || '',
            key: prompt.match(/\[#key:\s*([^\]]+)\]/)?.[1] || '',
            voice: prompt.match(/\[#voice:\s*([^\]]+)\]/)?.[1] || '',
            instructions: [] as string[]
        };

        const instrMatches = prompt.match(/\[#instr:\s*([^\]]+)\]/g);
        if (instrMatches) {
            sections.instructions = instrMatches.map(match =>
                match.replace(/\[#instr:\s*/, '').replace(/\]/, '')
            );
        }

        return sections;
    };

    const promptSections = parsePromptSections(track.prompt);

    const formatLyrics = (lyrics: string) => {
        return lyrics
            .split('\n')
            .map((line, index) => {
                // Handle different types of content
                if (line.startsWith('[#instr:')) {
                    return (
                        <div key={index} className="text-sm text-accent bg-accent/10 px-3 py-2 rounded-md my-2 font-mono">
                            <span className="text-xs uppercase tracking-wide">Instruction:</span><br />
                            {line.replace(/\[#instr:\s*/, '').replace(/\]/, '')}
                        </div>
                    );
                } else if (line.startsWith('(') && line.endsWith(')')) {
                    return (
                        <div key={index} className="text-muted-foreground italic text-center my-2">
                            {line}
                        </div>
                    );
                } else if (line.startsWith('"') && line.endsWith('"')) {
                    return (
                        <div key={index} className="text-foreground font-medium my-1 pl-4 border-l-2 border-primary/50">
                            {line.slice(1, -1)}
                        </div>
                    );
                } else if (line.trim() === '') {
                    return <div key={index} className="h-2" />;
                } else {
                    return (
                        <div key={index} className="text-foreground my-1">
                            {line}
                        </div>
                    );
                }
            });
    };

    return (
        <div className="space-y-6">
            {/* Main Player Card */}
            <Card className="bg-gradient-to-br from-card/50 to-muted/20 border-primary/20 overflow-hidden">
                <div className="relative">
                    {track.coverImageUrl && (
                        <div className="aspect-video sm:aspect-[3/1] overflow-hidden">
                            <img
                                src={track.coverImageUrl}
                                alt={track.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                        </div>
                    )}

                    <div className="relative p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            {!track.coverImageUrl && (
                                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-music/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Music className="h-12 w-12 text-primary" />
                                </div>
                            )}

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse">
                                        {track.title}
                                    </h1>
                                    <p className="text-lg text-muted-foreground">by {track.artist}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {track.genre.map((genre, index) => (
                                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                                            {genre}
                                        </Badge>
                                    ))}
                                    {track.mood.map((mood, index) => (
                                        <Badge key={index} variant="secondary" className="bg-music/10 text-music">
                                            {mood}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {formatTime(track.duration || 0)}
                                    </span>
                                    <span>{track.bpm} BPM</span>
                                    <span>{track.key}</span>
                                </div>

                                {/* Audio Controls */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            size="lg"
                                            onClick={togglePlayback}
                                            className="bg-gradient-to-r from-primary to-music hover:from-primary/80 hover:to-music/80"
                                        >
                                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                        </Button>

                                        <div className="flex-1">
                                            <Progress
                                                value={(currentTime / (track.duration || 100)) * 100}
                                                className="h-2 cursor-pointer"
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    const percent = ((e.clientX - rect.left) / rect.width) * 100;
                                                    handleSeek([percent]);
                                                }}
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                <span>{formatTime(currentTime)}</span>
                                                <span>{formatTime(track.duration || 0)}</span>
                                            </div>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setIsMuted(!isMuted)}
                                        >
                                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant={isLiked ? "default" : "outline"}
                                            onClick={() => setIsLiked(!isLiked)}
                                        >
                                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                            {track.likes}
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Download className="h-4 w-4" />
                                            {track.downloads}
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Share2 className="h-4 w-4" />
                                            Share
                                        </Button>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                                            <Eye className="h-4 w-4" />
                                            {track.plays.toLocaleString()} plays
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={track.mp3Url}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onEnded={() => setIsPlaying(false)}
                    onLoadedMetadata={() => {
                        if (audioRef.current) {
                            audioRef.current.volume = volume;
                        }
                    }}
                />
            </Card>

            {showFullDetails && (
                <Tabs defaultValue="lyrics" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/20">
                        <TabsTrigger value="lyrics" className="flex items-center gap-2">
                            <Mic className="h-4 w-4" />
                            Lyrics
                        </TabsTrigger>
                        <TabsTrigger value="prompt" className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            AI Prompt
                        </TabsTrigger>
                        <TabsTrigger value="details" className="flex items-center gap-2">
                            <Music className="h-4 w-4" />
                            Details
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lyrics" className="mt-6">
                        <Card className="bg-card/50 border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mic className="h-5 w-5 text-accent" />
                                    Song Lyrics
                                </CardTitle>
                                <CardDescription>
                                    Generated with Suno AI
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-invert max-w-none">
                                    <div className="font-mono text-sm leading-relaxed bg-muted/20 p-6 rounded-lg">
                                        {formatLyrics(track.lyrics)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="prompt" className="mt-6">
                        <Card className="bg-card/50 border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="h-5 w-5 text-code" />
                                    Suno AI Prompt
                                </CardTitle>
                                <CardDescription>
                                    The complete prompt used to generate this track
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Parsed Sections */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {promptSections.generation && (
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <div className="text-sm font-medium text-primary mb-2">Generation Style</div>
                                            <div className="text-sm">{promptSections.generation}</div>
                                        </div>
                                    )}
                                    {promptSections.mood && (
                                        <div className="bg-music/5 p-4 rounded-lg">
                                            <div className="text-sm font-medium text-music mb-2">Mood</div>
                                            <div className="text-sm">{promptSections.mood}</div>
                                        </div>
                                    )}
                                    {promptSections.voice && (
                                        <div className="bg-accent/5 p-4 rounded-lg">
                                            <div className="text-sm font-medium text-accent mb-2">Voice Style</div>
                                            <div className="text-sm">{promptSections.voice}</div>
                                        </div>
                                    )}
                                    <div className="bg-code/5 p-4 rounded-lg">
                                        <div className="text-sm font-medium text-code mb-2">Technical</div>
                                        <div className="text-sm">
                                            {promptSections.bpm && `${promptSections.bpm} BPM`}
                                            {promptSections.key && ` • ${promptSections.key}`}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Full Prompt */}
                                <div>
                                    <div className="text-sm font-medium mb-2">Complete Prompt</div>
                                    <div className="bg-muted/20 p-4 rounded-lg">
                                        <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                                            {track.prompt}
                                        </pre>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="details" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Music className="h-5 w-5 text-primary" />
                                        Musical Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">BPM</span>
                                        <span className="font-medium">{track.bpm}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Key</span>
                                        <span className="font-medium">{track.key}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium">{formatTime(track.duration || 0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Voice Style</span>
                                        <span className="font-medium text-right flex-1 ml-4">{track.voice}</span>
                                    </div>
                                    <Separator />
                                    <div>
                                        <span className="text-muted-foreground text-sm">Instruments</span>
                                        <p className="text-sm mt-1">{track.instruments}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-music" />
                                        Engagement Stats
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Plays</span>
                                        <span className="font-medium">{track.plays.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Likes</span>
                                        <span className="font-medium">{track.likes.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Downloads</span>
                                        <span className="font-medium">{track.downloads.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Created</span>
                                        <span className="font-medium">
                                            {new Date(track.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="text-center">
                                        <Button className="w-full bg-gradient-to-r from-primary to-music">
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Create Similar Track
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
