import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Music, Plus, Upload, X } from 'lucide-react';
import React, { useState } from 'react';

interface MusicPromptSubmissionFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    artistId?: string; // Optional artist ID if the user is already an artist
}

interface SunoPrompt {
    genre?: string[];
    mood?: string[];
    bpm?: number;
    key?: string;
    voice?: string;
    instruments?: string;
}

const MusicPromptSubmissionForm: React.FC<MusicPromptSubmissionFormProps> = ({
    onSuccess,
    onCancel,
    artistId
}) => {
    const { user } = useAuth();
    const { toast } = useToast();

    const [title, setTitle] = useState('');
    const [promptText, setPromptText] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState('');
    const [selectedArtist, setSelectedArtist] = useState<string>(artistId || '');
    const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Tags extracted from the prompt
    const [tags, setTags] = useState<string[]>([]);
    const [parsedPromptData, setParsedPromptData] = useState<SunoPrompt>({});

    // Handle cover image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast({
                title: 'File too large',
                description: 'Image must be less than 5MB',
                variant: 'destructive',
            });
            return;
        }

        setCoverImage(file);
        const objectUrl = URL.createObjectURL(file);
        setCoverImagePreview(objectUrl);
    };

    // Parse Suno AI prompt to extract metadata
    const parseSunoPrompt = (prompt: string): SunoPrompt => {
        const result: SunoPrompt = {};

        // Extract genre
        const genreMatch = prompt.match(/\[#gen:([^\]]+)\]/i);
        if (genreMatch && genreMatch[1]) {
            result.genre = genreMatch[1].split(',').map(g => g.trim().toLowerCase());
        }

        // Extract mood
        const moodMatch = prompt.match(/\[#mood:([^\]]+)\]/i);
        if (moodMatch && moodMatch[1]) {
            result.mood = moodMatch[1].split(',').map(m => m.trim().toLowerCase());
        }

        // Extract BPM
        const bpmMatch = prompt.match(/\[#bpm:(\d+)\]/i);
        if (bpmMatch && bpmMatch[1]) {
            result.bpm = parseInt(bpmMatch[1]);
        }

        // Extract key
        const keyMatch = prompt.match(/\[#key:([^\]]+)\]/i);
        if (keyMatch && keyMatch[1]) {
            result.key = keyMatch[1].trim();
        }

        // Extract voice
        const voiceMatch = prompt.match(/\[#voice:([^\]]+)\]/i);
        if (voiceMatch && voiceMatch[1]) {
            result.voice = voiceMatch[1].trim();
        }

        // Extract instruments
        const instrumentsMatch = prompt.match(/\[#inst:([^\]]+)\]/i);
        if (instrumentsMatch && instrumentsMatch[1]) {
            result.instruments = instrumentsMatch[1].trim();
        }

        return result;
    };

    // Extract tags from prompt text
    const extractTags = (prompt: string) => {
        // Collect all potential tags from the parsed data
        const newTags = new Set<string>();
        const parsed = parseSunoPrompt(prompt);

        // Add genres as tags
        if (parsed.genre) {
            parsed.genre.forEach(g => newTags.add(g));
        }

        // Add moods as tags
        if (parsed.mood) {
            parsed.mood.forEach(m => newTags.add(m));
        }

        // Add other relevant tags
        if (parsed.voice) {
            newTags.add(parsed.voice.toLowerCase());
        }

        // Also look for common music terms in the main prompt text
        const commonMusicTerms = [
            'electronic', 'rock', 'pop', 'hip hop', 'rap', 'jazz', 'classical',
            'ambient', 'trap', 'lo-fi', 'synthwave', 'vaporwave', 'techno', 'house',
            'chill', 'energetic', 'dreamy', 'dark', 'upbeat', 'melancholy'
        ];

        commonMusicTerms.forEach(term => {
            if (prompt.toLowerCase().includes(term)) {
                newTags.add(term);
            }
        });

        setTags(Array.from(newTags));
        setParsedPromptData(parsed);
    };

    // Handle prompt text changes
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newPrompt = e.target.value;
        setPromptText(newPrompt);

        if (newPrompt.length > 10) {
            extractTags(newPrompt);
        }
    };

    // Add or remove tags
    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag.toLowerCase())) {
            setTags([...tags, tag.toLowerCase()]);
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast({
                title: 'Authentication required',
                description: 'You must be signed in to submit a prompt',
                variant: 'destructive',
            });
            return;
        }

        if (!title || !promptText) {
            toast({
                title: 'Missing required fields',
                description: 'Please fill in all required fields',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setUploadProgress(10);

        try {
            // Upload cover image if provided
            let coverImageUrl = '';
            if (coverImage) {
                const fileExt = coverImage.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `prompt-covers/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('prompts')
                    .upload(filePath, coverImage);

                if (uploadError) {
                    throw uploadError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('prompts')
                    .getPublicUrl(filePath);

                coverImageUrl = publicUrl;
            }

            setUploadProgress(50);

            // Create prompt record
            const { error: insertError } = await supabase
                .from('prompts')
                .insert({
                    title,
                    prompt_text: promptText,
                    cover_image_url: coverImageUrl || null,
                    type: 'music_audio',
                    tags,
                    user_id: user.id,
                    artist_id: selectedArtist || null,
                    metadata: {
                        suno: parsedPromptData
                    },
                    is_paid: false,
                    price: 0,
                    is_featured: false,
                });

            if (insertError) {
                throw insertError;
            }

            setUploadProgress(100);

            toast({
                title: 'Prompt submitted successfully',
                description: 'Your music prompt has been uploaded',
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error submitting prompt:', error);
            toast({
                title: 'Error submitting prompt',
                description: 'There was a problem uploading your prompt',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch artists for dropdown
    React.useEffect(() => {
        const fetchArtists = async () => {
            try {
                const { data, error } = await supabase
                    .from('artists')
                    .select('id, name')
                    .eq('verified', true)
                    .order('name');

                if (error) {
                    console.error('Error fetching artists:', error);
                    return;
                }

                if (data) {
                    setArtists(data);
                }
            } catch (err) {
                console.error('Error in fetchArtists:', err);
            }
        };

        fetchArtists();
    }, []);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Submit AI Music Prompt</CardTitle>
                <CardDescription>
                    Share your Suno AI music prompts with the community
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a title for your music prompt"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="prompt">AI Music Prompt *</Label>
                            <Textarea
                                id="prompt"
                                value={promptText}
                                onChange={handlePromptChange}
                                placeholder="Paste your Suno AI prompt here..."
                                className="min-h-[150px]"
                                disabled={isLoading}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Include all parameters like [#gen:], [#mood:], [#bpm:], [#key:], [#voice:], [#inst:] for best results
                            </p>
                        </div>

                        {artists.length > 0 && (
                            <div className="space-y-2">
                                <Label htmlFor="artist">Artist (Optional)</Label>
                                <Select
                                    value={selectedArtist}
                                    onValueChange={setSelectedArtist}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an artist (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">No specific artist</SelectItem>
                                        {artists.map((artist) => (
                                            <SelectItem key={artist.id} value={artist.id}>
                                                {artist.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="cover-image">Cover Image (Optional)</Label>
                            <div className="flex items-center gap-4">
                                {coverImagePreview ? (
                                    <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                                        <img
                                            src={coverImagePreview}
                                            alt="Cover preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80"
                                            onClick={() => {
                                                setCoverImage(null);
                                                setCoverImagePreview('');
                                            }}
                                            disabled={isLoading}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="cover-image-upload"
                                        className="flex flex-col items-center justify-center w-32 h-32 border border-dashed rounded-md cursor-pointer hover:bg-muted/50"
                                    >
                                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                        <span className="text-xs text-muted-foreground text-center">
                                            Upload Cover
                                            <br />
                                            (Max 5MB)
                                        </span>
                                        <input
                                            id="cover-image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="sr-only"
                                            disabled={isLoading}
                                        />
                                    </label>
                                )}
                                <div className="text-sm text-muted-foreground">
                                    Upload a cover image to make your prompt more engaging. Square images work best (1:1 ratio).
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 text-muted-foreground hover:text-foreground"
                                            disabled={isLoading}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex mt-2">
                                <Input
                                    placeholder="Add a tag"
                                    className="flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTag((e.target as HTMLInputElement).value);
                                            (e.target as HTMLInputElement).value = '';
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="ml-2"
                                    onClick={() => {
                                        const input = document.querySelector('input[placeholder="Add a tag"]') as HTMLInputElement;
                                        if (input.value) {
                                            addTag(input.value);
                                            input.value = '';
                                        }
                                    }}
                                    disabled={isLoading}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {parsedPromptData.genre && parsedPromptData.genre.length > 0 && (
                            <Alert>
                                <Music className="h-4 w-4" />
                                <AlertDescription>
                                    <span className="font-medium">Detected music parameters: </span>
                                    {parsedPromptData.genre && (
                                        <span className="mr-2">Genre: {parsedPromptData.genre.join(', ')}</span>
                                    )}
                                    {parsedPromptData.mood && (
                                        <span className="mr-2">Mood: {parsedPromptData.mood.join(', ')}</span>
                                    )}
                                    {parsedPromptData.bpm && (
                                        <span className="mr-2">BPM: {parsedPromptData.bpm}</span>
                                    )}
                                    {parsedPromptData.key && (
                                        <span className="mr-2">Key: {parsedPromptData.key}</span>
                                    )}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading || !title || !promptText}
                        className="bg-gradient-primary"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Processing...'}
                            </>
                        ) : (
                            <>
                                <Music className="mr-2 h-4 w-4" />
                                Submit Music Prompt
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default MusicPromptSubmissionForm;
