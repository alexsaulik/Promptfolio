import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "@/components/upload/AvatarUpload";
import { Artist, useArtists } from "@/hooks/use-artists";
import { useGallery } from "@/hooks/use-gallery";
import { useToast } from "@/hooks/use-toast";
import { useTracks } from "@/hooks/use-tracks";
import { useUser } from "@clerk/clerk-react";
import { Edit, Music, Play, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

const AdminArtists = () => {
    const { artists, featuredArtist, loading, createArtist, updateArtist, deleteArtist } = useArtists();
    const { toast } = useToast();
    const { user } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
    const [selectedArtistForMedia, setSelectedArtistForMedia] = useState<string | null>(null);
    const [uploadingTrack, setUploadingTrack] = useState(false);
    const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        bio: '',
        avatar_url: '',
        followers: 0,
        prompts_count: 0,
        plays: 0,
        featured: false,
        recent_tracks: [] as string[],
        social_links: {} as any,
        genre: [] as string[],
    });

    const { tracks, createTrack, deleteTrack, uploadTrackFile } = useTracks(selectedArtistForMedia || undefined);
    const { galleryItems, createGalleryItem, deleteGalleryItem, uploadGalleryImage } = useGallery(selectedArtistForMedia || undefined);

    // Check if user is admin
    const isAdmin = user?.publicMetadata?.role === 'admin';

    if (!isAdmin) {
        return (
            <ProtectedRoute message="Access denied. Admin privileges required.">
                <div className="min-h-screen bg-background">
                    <Header />
                    <main className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
                            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
                        </div>
                    </main>
                    <Footer />
                </div>
            </ProtectedRoute>
        );
    }

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            bio: '',
            avatar_url: '',
            followers: 0,
            prompts_count: 0,
            plays: 0,
            featured: false,
            recent_tracks: [],
            social_links: {},
            genre: [],
        });
        setEditingArtist(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingArtist) {
                await updateArtist(editingArtist.id, formData);
            } else {
                await createArtist(formData);
            }
            resetForm();
        } catch (error) {
            console.error('Error saving artist:', error);
        }
    };

    const handleEdit = (artist: Artist) => {
        setFormData({
            name: artist.name,
            slug: artist.slug,
            bio: artist.bio || '',
            avatar_url: artist.avatar_url || '',
            followers: artist.followers,
            prompts_count: artist.prompts_count,
            plays: artist.plays,
            featured: artist.featured,
            recent_tracks: artist.recent_tracks,
            social_links: artist.social_links,
            genre: artist.genre,
        });
        setEditingArtist(artist);
        setShowForm(true);
    };

    const handleDelete = async (artistId: string) => {
        if (confirm('Are you sure you want to delete this artist?')) {
            try {
                await deleteArtist(artistId);
            } catch (error) {
                console.error('Error deleting artist:', error);
            }
        }
    };

    const allArtists = featuredArtist ? [featuredArtist, ...artists] : artists;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Artist Management</h1>
                            <p className="text-muted-foreground">Manage artists and their profiles</p>
                        </div>
                        <Button onClick={() => setShowForm(true)} disabled={showForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Artist
                        </Button>
                    </div>

                    {/* Artist Form */}
                    {showForm && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>{editingArtist ? 'Edit Artist' : 'Add New Artist'}</CardTitle>
                                <CardDescription>
                                    {editingArtist ? 'Update artist information' : 'Create a new artist profile'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Artist Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                value={formData.slug}
                                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                                placeholder="artist-name-slug"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            value={formData.bio}
                                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Avatar Image</Label>
                                        <AvatarUpload
                                            currentAvatarUrl={formData.avatar_url}
                                            onAvatarChange={(url) => setFormData(prev => ({ ...prev, avatar_url: url }))}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="followers">Followers</Label>
                                            <Input
                                                id="followers"
                                                type="number"
                                                value={formData.followers}
                                                onChange={(e) => setFormData(prev => ({ ...prev, followers: parseInt(e.target.value) || 0 }))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="prompts_count">Prompts</Label>
                                            <Input
                                                id="prompts_count"
                                                type="number"
                                                value={formData.prompts_count}
                                                onChange={(e) => setFormData(prev => ({ ...prev, prompts_count: parseInt(e.target.value) || 0 }))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="plays">Total Plays</Label>
                                            <Input
                                                id="plays"
                                                type="number"
                                                value={formData.plays}
                                                onChange={(e) => setFormData(prev => ({ ...prev, plays: parseInt(e.target.value) || 0 }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="genre">Genres (comma-separated)</Label>
                                        <Input
                                            id="genre"
                                            value={formData.genre.join(', ')}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                genre: e.target.value.split(',').map(g => g.trim()).filter(Boolean)
                                            }))}
                                            placeholder="Electronic, Ambient, Synthwave"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="recent_tracks">Recent Tracks (comma-separated)</Label>
                                        <Input
                                            id="recent_tracks"
                                            value={formData.recent_tracks.join(', ')}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                recent_tracks: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                                            }))}
                                            placeholder="Track 1, Track 2, Track 3"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Social Links</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="spotify">Spotify</Label>
                                                <Input
                                                    id="spotify"
                                                    value={formData.social_links?.spotify || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        social_links: { ...prev.social_links, spotify: e.target.value }
                                                    }))}
                                                    placeholder="artist-username"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="soundcloud">SoundCloud</Label>
                                                <Input
                                                    id="soundcloud"
                                                    value={formData.social_links?.soundcloud || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        social_links: { ...prev.social_links, soundcloud: e.target.value }
                                                    }))}
                                                    placeholder="artist-username"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="youtube">YouTube</Label>
                                                <Input
                                                    id="youtube"
                                                    value={formData.social_links?.youtube || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        social_links: { ...prev.social_links, youtube: e.target.value }
                                                    }))}
                                                    placeholder="@artist-channel"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="bandcamp">Bandcamp</Label>
                                                <Input
                                                    id="bandcamp"
                                                    value={formData.social_links?.bandcamp || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        social_links: { ...prev.social_links, bandcamp: e.target.value }
                                                    }))}
                                                    placeholder="artist-name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="twitter">Twitter</Label>
                                                <Input
                                                    id="twitter"
                                                    value={formData.social_links?.twitter || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        social_links: { ...prev.social_links, twitter: e.target.value }
                                                    }))}
                                                    placeholder="@artist"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="instagram">Instagram</Label>
                                                <Input
                                                    id="instagram"
                                                    value={formData.social_links?.instagram || ''}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        social_links: { ...prev.social_links, instagram: e.target.value }
                                                    }))}
                                                    placeholder="@artist"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="featured"
                                            checked={formData.featured}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                                        />
                                        <Label htmlFor="featured">Featured Artist</Label>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button type="submit">
                                            <Save className="w-4 h-4 mr-2" />
                                            {editingArtist ? 'Update Artist' : 'Create Artist'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={resetForm}>
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Artists List */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Current Artists ({allArtists.length})</h2>

                        {loading ? (
                            <p>Loading artists...</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {allArtists.map((artist) => (
                                    <Card key={artist.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={artist.avatar_url || '/placeholder.svg'}
                                                        alt={artist.name}
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-semibold">{artist.name}</h3>
                                                            {artist.featured && <Badge variant="default">Featured</Badge>}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{artist.bio}</p>
                                                        <div className="flex gap-2 mt-2">
                                                            {artist.genre.map((g) => (
                                                                <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="text-right text-sm">
                                                        <div>{artist.followers.toLocaleString()} followers</div>
                                                        <div>{artist.prompts_count} prompts</div>
                                                        <div>{artist.plays.toLocaleString()} plays</div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => handleEdit(artist)}>
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() => setSelectedArtistForMedia(artist.id)}
                                                        >
                                                            <Music className="h-4 w-4 mr-1" />
                                                            Media
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(artist.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Media Management Modal */}
                    {selectedArtistForMedia && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                            <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Manage Media</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedArtistForMedia(null)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="tracks" className="space-y-6">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="tracks">Tracks</TabsTrigger>
                                            <TabsTrigger value="gallery">Gallery</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="tracks" className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="file"
                                                    accept="audio/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file && selectedArtistForMedia) {
                                                            setUploadingTrack(true);
                                                            try {
                                                                const url = await uploadTrackFile(file, selectedArtistForMedia);
                                                                const title = file.name.replace(/\.[^/.]+$/, "");
                                                                await createTrack({
                                                                    artist_id: selectedArtistForMedia,
                                                                    title,
                                                                    mp3_url: url,
                                                                });
                                                            } catch (error) {
                                                                console.error('Error uploading track:', error);
                                                            } finally {
                                                                setUploadingTrack(false);
                                                            }
                                                        }
                                                    }}
                                                />
                                                {uploadingTrack && <div className="text-sm text-muted-foreground">Uploading...</div>}
                                            </div>

                                            <div className="space-y-2">
                                                {tracks.map((track) => (
                                                    <div key={track.id} className="flex items-center justify-between p-3 border rounded">
                                                        <div className="flex items-center gap-3">
                                                            <Play className="h-4 w-4" />
                                                            <div>
                                                                <p className="font-medium">{track.title}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : 'Unknown duration'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => deleteTrack(track.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="gallery" className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file && selectedArtistForMedia) {
                                                            setUploadingGalleryImage(true);
                                                            try {
                                                                const url = await uploadGalleryImage(file, selectedArtistForMedia);
                                                                await createGalleryItem({
                                                                    artist_id: selectedArtistForMedia,
                                                                    image_url: url,
                                                                });
                                                            } catch (error) {
                                                                console.error('Error uploading gallery image:', error);
                                                            } finally {
                                                                setUploadingGalleryImage(false);
                                                            }
                                                        }
                                                    }}
                                                />
                                                {uploadingGalleryImage && <div className="text-sm text-muted-foreground">Uploading...</div>}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {galleryItems.map((item) => (
                                                    <div key={item.id} className="relative group">
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.caption || 'Gallery image'}
                                                            className="w-full aspect-square object-cover rounded"
                                                        />
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={() => deleteGalleryItem(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminArtists;
