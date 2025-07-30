import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { CheckCircle, Edit, Plus, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";

const AdminArtists = () => {
    const { artists, featuredArtist, loading, createArtist, updateArtist, deleteArtist, approveArtist } = useArtists();
    const { toast } = useToast();
    const { user } = useUser();

    // Filter artists by approval status (assuming we need pending artists for approval workflow)
    const pendingArtists = artists?.filter(artist => !artist.verified) || [];

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
        description: '',
        verified: false,
    });

    const { tracks } = useTracks();
    const { galleryItems } = useGallery();

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">Loading...</div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingArtist) {
                await updateArtist(editingArtist.id, formData);
                toast({ title: "Artist updated successfully" });
            } else {
                await createArtist(formData);
                toast({ title: "Artist created successfully" });
            }
            setShowForm(false);
            setEditingArtist(null);
            resetForm();
        } catch (error) {
            toast({ title: "Error saving artist", variant: "destructive" });
        }
    };

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
            description: '',
            verified: false,
        });
    };

    const handleEdit = (artist: Artist) => {
        setEditingArtist(artist);
        setFormData({
            name: artist.name,
            slug: artist.slug,
            bio: artist.bio || '',
            avatar_url: artist.avatar_url || '',
            followers: artist.followers || 0,
            prompts_count: artist.prompts_count || 0,
            plays: artist.plays || 0,
            featured: artist.featured || false,
            recent_tracks: artist.recent_tracks || [],
            social_links: artist.social_links || {},
            genre: artist.genre || [],
            description: artist.description || '',
            verified: artist.verified || false,
        });
        setShowForm(true);
    };

    const handleDelete = async (artistId: string) => {
        if (window.confirm('Are you sure you want to delete this artist?')) {
            try {
                await deleteArtist(artistId);
                toast({ title: "Artist deleted successfully" });
            } catch (error) {
                toast({ title: "Error deleting artist", variant: "destructive" });
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
                            <h1 className="text-3xl font-bold">Artists Management</h1>
                            <p className="text-muted-foreground">Manage and review artist profiles</p>
                        </div>
                        <Button onClick={() => setShowForm(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Artist
                        </Button>
                    </div>

                    <Tabs defaultValue="active" className="space-y-6">
                        <TabsList className="mb-4">
                            <TabsTrigger value="active">Active Artists</TabsTrigger>
                            <TabsTrigger value="pending">
                                Pending Approval
                                {pendingArtists?.length > 0 && (
                                    <Badge variant="secondary" className="ml-2">{pendingArtists.length}</Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="active">
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
                                                <Label>Avatar</Label>
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
                                                    <Label htmlFor="prompts_count">Prompts Count</Label>
                                                    <Input
                                                        id="prompts_count"
                                                        type="number"
                                                        value={formData.prompts_count}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, prompts_count: parseInt(e.target.value) || 0 }))}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="plays">Plays</Label>
                                                    <Input
                                                        id="plays"
                                                        type="number"
                                                        value={formData.plays}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, plays: parseInt(e.target.value) || 0 }))}
                                                    />
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

                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="verified"
                                                    checked={formData.verified}
                                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: checked }))}
                                                />
                                                <Label htmlFor="verified">Verified</Label>
                                            </div>

                                            <div className="flex gap-4">
                                                <Button type="submit">
                                                    <Save className="h-4 w-4 mr-2" />
                                                    {editingArtist ? 'Update' : 'Create'} Artist
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setShowForm(false);
                                                        setEditingArtist(null);
                                                        resetForm();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Artists Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {allArtists?.map((artist) => (
                                    <Card key={artist.id} className="overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={artist.avatar_url || ''} alt={artist.name} />
                                                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-lg">{artist.name}</CardTitle>
                                                    <div className="flex gap-2">
                                                        {artist.featured && <Badge variant="default">Featured</Badge>}
                                                        {artist.verified && <Badge variant="secondary">Verified</Badge>}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-4">{artist.bio}</p>
                                            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                                                <span>{artist.followers || 0} followers</span>
                                                <span>{artist.plays || 0} plays</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(artist)}
                                                    className="flex-1"
                                                >
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(artist.id)}
                                                    className="flex-1"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="pending">
                            <div className="space-y-6">
                                {pendingArtists?.length > 0 ? (
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {pendingArtists.map((artist) => (
                                            <Card key={artist.id} className="overflow-hidden">
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={artist.avatar_url || ''} alt={artist.name} />
                                                            <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <CardTitle className="text-lg">{artist.name}</CardTitle>
                                                            <Badge variant="outline" className="text-xs">Pending Approval</Badge>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground mb-4">{artist.bio}</p>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => approveArtist(artist.id)}
                                                            className="flex-1"
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDelete(artist.id)}
                                                            className="flex-1"
                                                        >
                                                            <X className="h-4 w-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="py-12 text-center">
                                            <p className="text-muted-foreground">No pending artists to review</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminArtists;
