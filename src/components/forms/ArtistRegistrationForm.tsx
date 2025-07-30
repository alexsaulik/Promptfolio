import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AvatarUpload } from '@/components/upload/AvatarUpload';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { slugify } from '@/lib/utils';
import { Loader2, Plus, Upload, XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistRegistrationForm = () => {
    const { user, isSignedIn } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [currentGenre, setCurrentGenre] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Social links
    const [soundcloudUrl, setSoundcloudUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [spotifyUrl, setSpotifyUrl] = useState('');

    // AI music specifics
    const [aiPlatforms, setAiPlatforms] = useState<string[]>([]);
    const [currentPlatform, setCurrentPlatform] = useState('');
    const [promptStyleDescription, setPromptStyleDescription] = useState('');

    // For handling file uploads
    const coverImageInputRef = useRef<HTMLInputElement>(null);

    // Validation
    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!name) errors.name = 'Artist name is required';
        if (!bio) errors.bio = 'Bio is required';
        if (genre.length === 0) errors.genre = 'At least one genre is required';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle adding tags
    const handleAddGenre = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentGenre.trim()) {
            e.preventDefault();
            if (!genre.includes(currentGenre.trim().toLowerCase())) {
                setGenre([...genre, currentGenre.trim().toLowerCase()]);
            }
            setCurrentGenre('');
        }
    };

    const handleAddGenreClick = () => {
        if (currentGenre.trim() && !genre.includes(currentGenre.trim().toLowerCase())) {
            setGenre([...genre, currentGenre.trim().toLowerCase()]);
            setCurrentGenre('');
        }
    };

    const handleRemoveGenre = (tag: string) => {
        setGenre(genre.filter(t => t !== tag));
    };

    // AI Platform handling
    const handleAddPlatform = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentPlatform.trim()) {
            e.preventDefault();
            if (!aiPlatforms.includes(currentPlatform.trim().toLowerCase())) {
                setAiPlatforms([...aiPlatforms, currentPlatform.trim().toLowerCase()]);
            }
            setCurrentPlatform('');
        }
    };

    const handleAddPlatformClick = () => {
        if (currentPlatform.trim() && !aiPlatforms.includes(currentPlatform.trim().toLowerCase())) {
            setAiPlatforms([...aiPlatforms, currentPlatform.trim().toLowerCase()]);
            setCurrentPlatform('');
        }
    };

    const handleRemovePlatform = (platform: string) => {
        setAiPlatforms(aiPlatforms.filter(p => p !== platform));
    };

    // Handle cover image upload
    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `cover-${Date.now()}.${fileExt}`;
            const filePath = `covers/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('artists')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('artists')
                .getPublicUrl(filePath);

            setCoverImageUrl(publicUrl);
        } catch (error) {
            console.error('Error uploading cover image:', error);
            toast({
                title: 'Upload failed',
                description: 'There was a problem uploading your cover image.',
                variant: 'destructive',
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSignedIn || !user) {
            toast({
                title: 'Authentication required',
                description: 'You must be logged in to register as an artist.',
                variant: 'destructive',
            });
            navigate('/auth');
            return;
        }

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const slug = slugify(name);

            // Create artist profile
            const { data: artist, error: artistError } = await supabase
                .from('artists')
                .insert({
                    name,
                    slug,
                    bio,
                    location,
                    genre,
                    website_url: website,
                    avatar_url: avatarUrl,
                    cover_image_url: coverImageUrl,
                    soundcloud_url: soundcloudUrl,
                    youtube_url: youtubeUrl,
                    spotify_url: spotifyUrl,
                    verified: false, // Artist will need admin verification
                    social_links: {
                        soundcloud: soundcloudUrl,
                        youtube: youtubeUrl,
                        spotify: spotifyUrl
                    },
                    // AI-specific fields stored in description JSON or separate fields if you add them
                    description: JSON.stringify({
                        aiPlatforms,
                        promptStyle: promptStyleDescription
                    })
                })
                .select('id')
                .single();

            if (artistError) throw artistError;

            // Link the user to the artist profile by updating user metadata
            const { error: userUpdateError } = await supabase
                .from('users')
                .update({
                    role: 'creator',
                    // Add artist_id to user profile if you have a column for it
                })
                .eq('clerk_user_id', user.id);

            if (userUpdateError) throw userUpdateError;

            toast({
                title: 'Registration successful',
                description: 'Your artist profile has been submitted for approval.',
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating artist profile:', error);
            toast({
                title: 'Registration failed',
                description: 'There was a problem creating your artist profile.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container py-10 max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Register as an AI Music Artist</CardTitle>
                    <CardDescription>
                        Create your artist profile to showcase and monetize your AI music creations
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {/* Artist information */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Artist Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your artist name"
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="bio">Biography</Label>
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself as an AI music creator..."
                                    className={`min-h-[120px] ${errors.bio ? "border-red-500" : ""}`}
                                />
                                {errors.bio && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Your location (optional)"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder="Your website URL (optional)"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Profile Images */}
                        <div className="space-y-4">
                            <div>
                                <Label>Profile Picture</Label>
                                <div className="mt-2">
                                    <AvatarUpload
                                        initialImageUrl={avatarUrl || undefined}
                                        onUploadComplete={(url) => setAvatarUrl(url)}
                                        folder="artists"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="coverImage">Cover Image</Label>
                                <div className="mt-2 flex items-center space-x-4">
                                    {coverImageUrl ? (
                                        <div className="relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={coverImageUrl}
                                                alt="Cover preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 bg-black/40 hover:bg-black/60"
                                                onClick={() => setCoverImageUrl(null)}
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => coverImageInputRef.current?.click()}
                                            className="w-full h-32 border-dashed flex flex-col items-center justify-center"
                                        >
                                            <Upload className="h-6 w-6 mb-2" />
                                            <span>Upload Cover Image</span>
                                        </Button>
                                    )}
                                    <input
                                        ref={coverImageInputRef}
                                        type="file"
                                        id="coverImage"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={handleCoverImageUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Genres and AI Music Specifics */}
                        <div className="space-y-4">
                            <div>
                                <Label>Music Genres</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {genre.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveGenre(tag)}
                                                className="ml-1 text-muted-foreground hover:text-foreground"
                                            >
                                                <XIcon className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex mt-2">
                                    <Input
                                        value={currentGenre}
                                        onChange={(e) => setCurrentGenre(e.target.value)}
                                        placeholder="Add a genre (e.g. electronic, pop)"
                                        onKeyDown={handleAddGenre}
                                        className={errors.genre ? "border-red-500" : ""}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="ml-2"
                                        onClick={handleAddGenreClick}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {errors.genre && (
                                    <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
                                )}
                            </div>

                            <div>
                                <Label>AI Music Platforms Used</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {aiPlatforms.map((platform) => (
                                        <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                                            {platform}
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePlatform(platform)}
                                                className="ml-1 text-muted-foreground hover:text-foreground"
                                            >
                                                <XIcon className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex mt-2">
                                    <Input
                                        value={currentPlatform}
                                        onChange={(e) => setCurrentPlatform(e.target.value)}
                                        placeholder="Add platform (e.g. Suno, Soundraw)"
                                        onKeyDown={handleAddPlatform}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="ml-2"
                                        onClick={handleAddPlatformClick}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="promptStyle">Prompt Style Description</Label>
                                <Textarea
                                    id="promptStyle"
                                    value={promptStyleDescription}
                                    onChange={(e) => setPromptStyleDescription(e.target.value)}
                                    placeholder="Describe your approach to prompt engineering and music creation with AI..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Social Media Links</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="soundcloud">SoundCloud</Label>
                                    <Input
                                        id="soundcloud"
                                        value={soundcloudUrl}
                                        onChange={(e) => setSoundcloudUrl(e.target.value)}
                                        placeholder="SoundCloud profile URL"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="youtube">YouTube</Label>
                                    <Input
                                        id="youtube"
                                        value={youtubeUrl}
                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                        placeholder="YouTube channel URL"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="spotify">Spotify</Label>
                                    <Input
                                        id="spotify"
                                        value={spotifyUrl}
                                        onChange={(e) => setSpotifyUrl(e.target.value)}
                                        placeholder="Spotify artist URL"
                                    />
                                </div>
                            </div>
                        </div>

                        <Alert>
                            <AlertDescription>
                                Your artist profile will be reviewed by our admin team before being published.
                                You'll be notified when your profile is approved.
                            </AlertDescription>
                        </Alert>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ArtistRegistrationForm;
