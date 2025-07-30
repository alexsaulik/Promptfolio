import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useArtists } from '@/hooks/use-artists';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';
import { Clock, Search, UserCheck, UserX } from 'lucide-react';
import { useEffect, useState } from 'react';

const ArtistApproval = () => {
    const { pendingArtists, loading, approveArtist, deleteArtist, refetch } = useArtists();
    const { toast } = useToast();
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            setIsAdmin(user.publicMetadata.role === 'admin');
        }
    }, [user]);

    // Filter pending artists by search term
    const filteredArtists = pendingArtists?.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genre?.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

    const handleApprove = async (artistId: string) => {
        try {
            await approveArtist(artistId);
            toast({
                title: 'Artist approved',
                description: 'The artist profile is now live on the platform',
            });
            refetch();
        } catch (error) {
            console.error('Error approving artist:', error);
            toast({
                title: 'Error',
                description: 'Failed to approve artist',
                variant: 'destructive',
            });
        }
    };

    const handleReject = async (artistId: string) => {
        if (confirm('Are you sure you want to reject and delete this artist profile?')) {
            try {
                await deleteArtist(artistId);
                toast({
                    title: 'Artist rejected',
                    description: 'The artist profile has been removed',
                });
                refetch();
            } catch (error) {
                console.error('Error rejecting artist:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to reject artist',
                    variant: 'destructive',
                });
            }
        }
    };

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

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Artist Applications</h1>
                            <p className="text-muted-foreground">Review and approve artist registration requests</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search artists by name, bio, or genre..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Applications List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Pending Applications ({filteredArtists.length})</h2>
                            <Badge variant="outline" className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Awaiting Review
                            </Badge>
                        </div>

                        {loading ? (
                            <div className="h-40 flex items-center justify-center">
                                <p className="text-muted-foreground">Loading artist applications...</p>
                            </div>
                        ) : filteredArtists.length === 0 ? (
                            <Card>
                                <CardContent className="py-10 text-center">
                                    <p className="text-muted-foreground">
                                        {searchTerm ? 'No applications match your search' : 'No pending artist applications'}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6">
                                {filteredArtists.map((artist) => (
                                    <Card key={artist.id}>
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Artist Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <img
                                                            src={artist.avatar_url || '/placeholder-avatar.png'}
                                                            alt={artist.name}
                                                            className="h-16 w-16 rounded-full object-cover border"
                                                        />
                                                        <div>
                                                            <h3 className="text-lg font-medium">{artist.name}</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                Applied on {new Date(artist.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label>Bio</Label>
                                                            <p className="text-sm mt-1">{artist.bio || 'No bio provided'}</p>
                                                        </div>

                                                        <div>
                                                            <Label>Genres</Label>
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                {artist.genre?.map(genre => (
                                                                    <Badge key={genre} variant="secondary">{genre}</Badge>
                                                                )) || 'No genres specified'}
                                                            </div>
                                                        </div>

                                                        {artist.description && (
                                                            <div>
                                                                <Label>AI Music Platforms</Label>
                                                                <div className="mt-1 text-sm">
                                                                    {(() => {
                                                                        try {
                                                                            const data = JSON.parse(artist.description);
                                                                            return (
                                                                                <>
                                                                                    {data.aiPlatforms?.length > 0 && (
                                                                                        <div className="flex flex-wrap gap-2 mb-2">
                                                                                            {data.aiPlatforms.map((platform: string) => (
                                                                                                <Badge key={platform} variant="outline">{platform}</Badge>
                                                                                            ))}
                                                                                        </div>
                                                                                    )}
                                                                                    {data.promptStyle && (
                                                                                        <p className="text-sm text-muted-foreground">{data.promptStyle}</p>
                                                                                    )}
                                                                                </>
                                                                            );
                                                                        } catch {
                                                                            return artist.description;
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Social Links */}
                                                        {artist.social_links && Object.keys(artist.social_links).length > 0 && (
                                                            <div>
                                                                <Label>Social Links</Label>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-sm">
                                                                    {Object.entries(artist.social_links).map(([platform, url]) => (
                                                                        url && (
                                                                            <a
                                                                                key={platform}
                                                                                href={url.toString().startsWith('http') ? url.toString() : `https://${url}`}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-primary hover:underline flex items-center"
                                                                            >
                                                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                                            </a>
                                                                        )
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col justify-between min-w-[200px]">
                                                    <div className="space-y-3 mt-4 md:mt-0">
                                                        <Button
                                                            className="w-full"
                                                            onClick={() => handleApprove(artist.id)}
                                                        >
                                                            <UserCheck className="w-4 h-4 mr-2" />
                                                            Approve Artist
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full text-destructive hover:text-destructive"
                                                            onClick={() => handleReject(artist.id)}
                                                        >
                                                            <UserX className="w-4 h-4 mr-2" />
                                                            Reject
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
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ArtistApproval;
