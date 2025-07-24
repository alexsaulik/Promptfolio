import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePrompts } from "@/hooks/use-prompts";
import {
    AudioWaveform,
    Drum,
    Guitar,
    Headphones,
    Mic,
    Music,
    Piano,
    Play,
    Radio,
    Search,
    Volume2
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MusicPrompts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const { prompts, loading } = usePrompts({ type: "music" });

    const musicGenres = [
        "all",
        "electronic",
        "ambient",
        "classical",
        "jazz",
        "rock",
        "pop",
        "experimental",
        "cinematic",
        "lo-fi"
    ];

    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = searchTerm === "" ||
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.prompt_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

        const matchesGenre = selectedGenre === "all" ||
            (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(selectedGenre.toLowerCase())));

        return matchesSearch && matchesGenre;
    });

    const featuredPrompts = prompts.filter(prompt => prompt.is_featured).slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-pink-600/20"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                            <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-full">
                                <Music className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Music Prompts
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                        Discover AI-powered music creation prompts that inspire melodies, beats, and harmonies.
                        From ambient soundscapes to energetic electronic tracks, unleash your musical creativity.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border">
                            <Headphones className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">Audio Generation</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border">
                            <AudioWaveform className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">Sound Design</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border">
                            <Radio className="w-4 h-4 text-pink-400" />
                            <span className="text-sm">Music Composition</span>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container py-12 space-y-12">
                {/* Featured Prompts */}
                {featuredPrompts.length > 0 && (
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">Featured Music Prompts</h2>
                            <p className="text-muted-foreground">Hand-picked prompts from our community of music creators</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredPrompts.map((prompt) => (
                                <Card key={prompt.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-purple-500/10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 group-hover:to-purple-500/20 transition-all duration-500"></div>
                                    <CardContent className="relative p-6">
                                        {prompt.cover_image_url && (
                                            <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                                                <img
                                                    src={prompt.cover_image_url}
                                                    alt={prompt.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <Button size="icon" variant="secondary" className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    <Play className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                        <div className="space-y-3">
                                            <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                                                Featured
                                            </Badge>
                                            <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">
                                                {prompt.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {prompt.prompt_text}
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {prompt.tags.slice(0, 3).map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Search and Filter */}
                <section className="space-y-6">
                    <Card className="bg-gradient-to-r from-background via-background to-purple-500/5 border-purple-200/20">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Search music prompts, genres, or techniques..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-background/50 backdrop-blur-sm border-purple-200/30 focus:border-purple-400"
                                    />
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {musicGenres.map((genre) => (
                                        <Button
                                            key={genre}
                                            variant={selectedGenre === genre ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedGenre(genre)}
                                            className={selectedGenre === genre ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
                                        >
                                            {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Music Categories */}
                <section className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
                        <p className="text-muted-foreground">Discover prompts tailored to different music creation needs</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Guitar, label: "Instrumental", color: "from-orange-500 to-red-500" },
                            { icon: Mic, label: "Vocals", color: "from-blue-500 to-cyan-500" },
                            { icon: Piano, label: "Classical", color: "from-purple-500 to-pink-500" },
                            { icon: Drum, label: "Percussion", color: "from-green-500 to-teal-500" },
                        ].map((category, index) => (
                            <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <CardContent className="p-6 text-center">
                                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <category.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold group-hover:text-purple-400 transition-colors">
                                        {category.label}
                                    </h3>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Prompts Grid */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">All Music Prompts</h2>
                            <p className="text-muted-foreground">
                                {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        <Button asChild variant="outline" className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300">
                            <Link to="/create-music-prompt">
                                <Music className="w-4 h-4 mr-2" />
                                Create Music Prompt
                            </Link>
                        </Button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Card key={i} className="animate-pulse">
                                    <CardContent className="p-6">
                                        <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted rounded w-3/4"></div>
                                            <div className="h-3 bg-muted rounded w-1/2"></div>
                                            <div className="h-3 bg-muted rounded w-full"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredPrompts.length === 0 ? (
                        <Card className="p-12 text-center bg-gradient-to-br from-background to-purple-500/5">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-60">
                                <Music className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No music prompts found</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm || selectedGenre !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Be the first to create a music prompt for our community"
                                }
                            </p>
                            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500">
                                <Link to="/create-music-prompt">Create Your First Music Prompt</Link>
                            </Button>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPrompts.map((prompt) => (
                                <Card key={prompt.id} className="group hover:shadow-xl transition-all duration-500 animate-fade-in overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-purple-500/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 group-hover:to-purple-500/10 transition-all duration-500"></div>
                                    <CardContent className="relative p-0">
                                        {prompt.cover_image_url && (
                                            <div className="aspect-video overflow-hidden relative">
                                                <img
                                                    src={prompt.cover_image_url}
                                                    alt={prompt.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                                {/* Artist Info Overlay */}
                                                {prompt.artist && (
                                                    <Link
                                                        to={`/artist/${prompt.artist.slug}`}
                                                        className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm hover:bg-black/60 transition-colors"
                                                    >
                                                        {prompt.artist.avatar_url && (
                                                            <img
                                                                src={prompt.artist.avatar_url}
                                                                alt={prompt.artist.name}
                                                                className="w-6 h-6 rounded-full object-cover"
                                                            />
                                                        )}
                                                        <span className="font-medium">{prompt.artist.name}</span>
                                                    </Link>
                                                )}

                                                {/* Play Button */}
                                                <Button
                                                    size="icon"
                                                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                                                    onClick={() => {
                                                        if (prompt.preview_url) {
                                                            const audio = new Audio(prompt.preview_url);
                                                            audio.play();
                                                        }
                                                    }}
                                                >
                                                    <Play className="w-4 h-4 text-white" />
                                                </Button>
                                            </div>
                                        )}

                                        <div className="p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30">
                                                        Music
                                                    </Badge>
                                                    {prompt.is_featured && (
                                                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                                {prompt.is_paid && prompt.price > 0 && (
                                                    <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                        ${prompt.price}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-xl line-clamp-2 group-hover:text-purple-400 transition-colors cursor-pointer mb-2">
                                                    {prompt.title}
                                                </h3>
                                                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                                    {prompt.prompt_text.split('\n')[0]}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                                                        <Play className="h-4 w-4" />
                                                        {prompt.views_count || 0}
                                                    </span>
                                                    <span className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                                                        <Volume2 className="h-4 w-4" />
                                                        {prompt.downloads_count || 0}
                                                    </span>
                                                </div>
                                            </div>

                                            {prompt.tags && prompt.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {prompt.tags.slice(0, 4).map((tag, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="text-xs cursor-pointer hover:bg-purple-500/20 hover:border-purple-400 transition-colors"
                                                            onClick={() => setSearchTerm(tag)}
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {prompt.tags.length > 4 && (
                                                        <Badge variant="outline" className="text-xs text-muted-foreground">
                                                            +{prompt.tags.length - 4}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex gap-2 pt-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 hover:bg-purple-500/10 hover:border-purple-400 transition-colors"
                                                    onClick={() => {
                                                        if (prompt.preview_url) {
                                                            const audio = new Audio(prompt.preview_url);
                                                            audio.play();
                                                        }
                                                    }}
                                                >
                                                    <Play className="w-3 h-3 mr-1" />
                                                    Preview
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                                >
                                                    {prompt.is_paid && prompt.price > 0 ? `Buy $${prompt.price}` : 'Download'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {/* Call to Action */}
                <section className="py-16">
                    <Card className="bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-pink-600/20 border-purple-200/30">
                        <CardContent className="p-12 text-center">
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center gap-2">
                                    <Volume2 className="w-8 h-8 text-purple-400" />
                                    <AudioWaveform className="w-8 h-8 text-blue-400" />
                                    <Radio className="w-8 h-8 text-pink-400" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Ready to Create Music?</h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Join our community of music creators and share your own AI music prompts.
                                Help others discover new sounds and techniques.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                    <Link to="/create-music-prompt">
                                        <Music className="w-5 h-5 mr-2" />
                                        Start Creating
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="hover:bg-background/50">
                                    <Link to="/explore">
                                        <Search className="w-5 h-5 mr-2" />
                                        Explore More
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MusicPrompts;
