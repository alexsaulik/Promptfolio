import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Download, Eye, Heart, Image, Music, Play, Sparkles, Type } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PromptCardProps {
    prompt: {
        id: string;
        title: string;
        description: string;
        type: 'music' | 'image' | 'code' | 'text';
        price: number;
        isPremium?: boolean;
        coverImage?: string;
        audioPreview?: string;
        creator: {
            username: string;
            avatar?: string;
            isVerified?: boolean;
        };
        stats: {
            likes: number;
            downloads: number;
            views: number;
        };
        tags: string[];
    };
}

const typeConfig = {
    music: {
        icon: Music,
        variant: "music" as const,
        bgClass: "bg-gradient-music",
    },
    image: {
        icon: Image,
        variant: "image" as const,
        bgClass: "bg-gradient-image",
    },
    code: {
        icon: Code,
        variant: "code" as const,
        bgClass: "bg-gradient-code",
    },
    text: {
        icon: Type,
        variant: "text" as const,
        bgClass: "bg-gradient-text",
    },
};

export function PromptCard({ prompt }: PromptCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();

    const TypeIcon = typeConfig[prompt.type].icon;
    const typeVariant = typeConfig[prompt.type].variant;
    const typeBgClass = typeConfig[prompt.type].bgClass;

    const handlePlayAudio = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
        // Audio play logic would go here
    };

    return (
        <Card
            className="group relative overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-elevated hover:border-primary/20 cursor-pointer"
            onClick={() => navigate(`/prompt/${prompt.id}`)}
        >
            {/* Cover Image/Preview */}
            <div className="relative aspect-video w-full overflow-hidden">
                {prompt.coverImage ? (
                    <img
                        src={prompt.coverImage}
                        alt={prompt.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className={`h-full w-full ${typeBgClass} flex items-center justify-center`}>
                        <TypeIcon className="h-12 w-12 text-white/80" />
                    </div>
                )}

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {prompt.type === 'music' && prompt.audioPreview && (
                        <Button
                            variant="glass"
                            size="icon"
                            className="h-12 w-12 rounded-full"
                            onClick={handlePlayAudio}
                        >
                            <Play className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                        </Button>
                    )}
                    {prompt.type !== 'music' && (
                        <Button variant="glass" size="icon" className="h-12 w-12 rounded-full">
                            <Eye className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                {/* Premium Badge */}
                {prompt.isPremium && (
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-primary text-primary-foreground animate-glow-pulse">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Premium
                        </Badge>
                    </div>
                )}

                {/* Like Button */}
                <Button
                    variant="glass"
                    size="icon"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                    }}
                >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
            </div>

            <CardContent className="p-4 space-y-3">
                {/* Type Badge */}
                <div className="flex items-center justify-between">
                    <Badge variant={typeVariant} className="flex items-center gap-1">
                        <TypeIcon className="h-3 w-3" />
                        {prompt.type.charAt(0).toUpperCase() + prompt.type.slice(1)}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                        {prompt.price === 0 ? 'Free' : `$${prompt.price}`}
                    </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {prompt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {prompt.description}
                    </p>
                </div>

                {/* Creator */}
                <div className="flex items-center space-x-2">
                    {prompt.creator.avatar ? (
                        <img
                            src={prompt.creator.avatar}
                            alt={prompt.creator.username}
                            className="h-6 w-6 rounded-full"
                        />
                    ) : (
                        <div className="h-6 w-6 rounded-full bg-gradient-primary" />
                    )}
                    <span className="text-sm text-muted-foreground">
                        @{prompt.creator.username}
                    </span>
                    {prompt.creator.isVerified && (
                        <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-xs text-primary-foreground">✓</span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {prompt.stats.likes}
                        </span>
                        <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {prompt.stats.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {prompt.stats.views}
                        </span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                    {prompt.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                            {tag}
                        </Badge>
                    ))}
                    {prompt.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{prompt.tags.length - 3}
                        </Badge>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            navigate(`/prompt/${prompt.id}`);
                        }}
                    >
                        Preview
                    </Button>
                    <Button
                        variant={typeVariant}
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            if (prompt.price === 0) {
                                // Handle free download
                                console.log('Downloading free prompt:', prompt.id);
                            } else {
                                // Navigate to purchase page
                                navigate(`/prompt/${prompt.id}/purchase`);
                            }
                        }}
                    >
                        {prompt.price === 0 ? 'Download' : 'Buy Now'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
