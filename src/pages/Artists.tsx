import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useArtists } from "@/hooks/use-artists";
import { useUser } from "@clerk/clerk-react";
import { Download, ExternalLink, Filter, Music, Play, Plus, Search, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Artists = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { artists, featuredArtist, loading, error } = useArtists();
    const { user } = useUser();
    const navigate = useNavigate();

    // Check if user is admin (you may need to adjust this based on your user metadata structure)
    const isAdmin = user?.publicMetadata?.role === 'admin';

    // Filter artists based on search query
    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <Skeleton className="h-12 w-64 mx-auto mb-4" />
                            <Skeleton className="h-6 w-96 mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <Card key={i} className="overflow-hidden">
                                    <Skeleton className="h-48 w-full" />
                                    <CardContent className="p-4 space-y-2">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-full" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Artists</h1>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Music className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-music bg-clip-text text-transparent">
                                Featured Artists
                            </h1>
                            {isAdmin && (
                                <Button
                                    onClick={() => navigate('/admin/artists')}
                                    className="ml-4"
                                    size="sm"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Manage Artists
                                </Button>
                            )}
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Discover talented musicians pushing the boundaries of AI-assisted music creation
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>Professional Artists</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Play className="w-4 h-4" />
                                <span>High Quality Music</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span>Premium Prompts</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search artists, genres, or tracks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>

                            <div className="flex gap-3 w-full lg:w-auto">
                                <Select defaultValue="followers">
                                    <SelectTrigger className="w-full lg:w-[160px] h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="followers">Most Followers</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="prompts">Most Prompts</SelectItem>
                                        <SelectItem value="plays">Most Plays</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="icon" className="h-12 w-12">
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Artist Spotlight */}
                    {featuredArtist && (
                        <div className="mb-16">
                            <h2 className="text-2xl font-semibold mb-6 text-center">Artist Spotlight</h2>
                            <Card className="relative overflow-hidden bg-gradient-music border-primary/20 hover:shadow-elevated transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
                                <CardContent className="p-8 relative z-10">
                                    <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
                                        <img
                                            src={featuredArtist.avatar_url || '/placeholder.svg'}
                                            alt={featuredArtist.name}
                                            className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover shadow-glow"
                                        />

                                        <div className="flex-1 text-center lg:text-left space-y-4">
                                            <div>
                                                <h3 className="text-3xl font-bold text-white mb-2">{featuredArtist.name}</h3>
                                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                                                    {featuredArtist.genre.map((g) => (
                                                        <Badge key={g} variant="secondary" className="bg-white/20 text-white border-white/30">
                                                            {g}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <p className="text-white/80 text-lg">{featuredArtist.bio}</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-6 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{featuredArtist.followers.toLocaleString()}</div>
                                                    <div className="text-white/60 text-sm">Followers</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{featuredArtist.prompts_count}</div>
                                                    <div className="text-white/60 text-sm">Prompts</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{featuredArtist.plays.toLocaleString()}</div>
                                                    <div className="text-white/60 text-sm">Total Plays</div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="text-white font-semibold">Recent Tracks</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {featuredArtist.recent_tracks.map((track) => (
                                                        <Badge key={track} variant="outline" className="border-white/30 text-white hover:bg-white/20">
                                                            <Play className="w-3 h-3 mr-1" />
                                                            {track}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                                {Object.entries(featuredArtist.social_links).map(([platform, handle]) => {
                                                    if (!handle) return null;
                                                    const getUrl = (platform: string, handle: unknown) => {
                                                        const handleStr = String(handle);
                                                        switch (platform.toLowerCase()) {
                                                            case 'spotify': return `https://open.spotify.com/artist/${handleStr}`;
                                                            case 'soundcloud': return `https://soundcloud.com/${handleStr}`;
                                                            case 'youtube': return `https://youtube.com/${handleStr}`;
                                                            case 'bandcamp': return `https://${handleStr}.bandcamp.com`;
                                                            case 'twitter': return `https://twitter.com/${handleStr}`;
                                                            case 'instagram': return `https://instagram.com/${handleStr}`;
                                                            default: return handleStr.startsWith('http') ? handleStr : `https://${handleStr}`;
                                                        }
                                                    };

                                                    return (
                                                        <Button
                                                            key={platform}
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-white/30 text-white hover:bg-white/20"
                                                            asChild
                                                        >
                                                            <a href={getUrl(platform, handle)} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                                {platform}
                                                            </a>
                                                        </Button>
                                                    );
                                                })}
                                                <Link to={`/artist/${featuredArtist.slug}`}>
                                                    <Button variant="music" size="sm">
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Genre Categories */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Popular Genres</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Electronic', 'Ambient', 'Lo-Fi', 'Hip-Hop', 'Synthwave', 'Acoustic', 'Jazz', 'Pop'].map((genre) => (
                                <Badge key={genre} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">All Artists</h2>
                            <p className="text-muted-foreground">
                                Showing {filteredArtists.length} artists
                            </p>
                        </div>

                        {/* Artists Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredArtists.map((artist, index) => (
                                <Card key={artist.id} className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="relative">
                                        <img
                                            src={artist.avatar_url || '/placeholder.svg'}
                                            alt={artist.name}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <Badge variant="secondary" className="mb-2 bg-black/50 text-white border-white/20">
                                                {artist.genre.join(', ')}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-4 space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{artist.name}</h3>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {artist.genre.map((g) => (
                                                    <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                            <div>
                                                <div className="font-semibold">{artist.followers.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Followers</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{artist.prompts_count}</div>
                                                <div className="text-xs text-muted-foreground">Prompts</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-semibold">{artist.plays.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Plays</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 justify-center">
                                            <Link to={`/artist/${artist.slug}`}>
                                                <Button variant="outline" size="sm">
                                                    View Profile
                                                </Button>
                                            </Link>
                                            {artist.social_links?.spotify && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={`https://open.spotify.com/artist/${artist.social_links.spotify}`} target="_blank" rel="noopener noreferrer">
                                                        Spotify
                                                    </a>
                                                </Button>
                                            )}
                                            {artist.social_links?.soundcloud && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={`https://soundcloud.com/${artist.social_links.soundcloud}`} target="_blank" rel="noopener noreferrer">
                                                        SoundCloud
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-8">
                            <Button variant="outline" size="lg">
                                Load More Artists
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Artists;
