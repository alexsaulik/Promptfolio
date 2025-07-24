import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { AvatarUpload } from '@/components/upload/AvatarUpload';
import { Loader2, Music, X } from 'lucide-react';

const musicGenres = [
    'ambient', 'electronic', 'hip-hop', 'jazz', 'classical', 'rock', 'pop',
    'trap', 'lo-fi', 'cinematic', 'orchestral', 'acoustic', 'experimental',
    'house', 'techno', 'dubstep', 'reggae', 'blues', 'country', 'folk'
];

const createMusicPromptSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    prompt_text: z.string().min(10, 'Description must be at least 10 characters'),
    genre: z.string().min(1, 'Genre is required'),
    tempo: z.number().min(60).max(200).optional(),
    duration: z.string().optional(),
    instruments: z.string().optional(),
    mood: z.string().optional(),
    price: z.number().min(0, 'Price must be non-negative').optional(),
    is_paid: z.boolean().optional(),
    is_featured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
});

type CreateMusicPromptForm = z.infer<typeof createMusicPromptSchema>;

interface CreateMusicPromptFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CreateMusicPromptForm({ onSuccess, onCancel }: CreateMusicPromptFormProps) {
    const { user } = useUser();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentTag, setCurrentTag] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const form = useForm<CreateMusicPromptForm>({
        resolver: zodResolver(createMusicPromptSchema),
        defaultValues: {
            title: '',
            prompt_text: '',
            genre: '',
            tempo: 120,
            duration: '3:00',
            instruments: '',
            mood: '',
            price: 0,
            is_paid: false,
            is_featured: false,
            tags: [],
        },
    });

    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const addTag = () => {
        if (currentTag.trim()) {
            const currentTags = form.getValues('tags') || [];
            if (!currentTags.includes(currentTag.trim())) {
                const newTags = [...currentTags, currentTag.trim()];
                form.setValue('tags', newTags);
                setCurrentTag('');
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        const currentTags = form.getValues('tags') || [];
        const newTags = currentTags.filter(tag => tag !== tagToRemove);
        form.setValue('tags', newTags);
    };

    const onSubmit = async (data: CreateMusicPromptForm) => {
        if (!user) {
            toast({
                title: "Error",
                description: "You must be signed in to create music prompts",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            // Get current user from our users table
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('clerk_user_id', user.id)
                .maybeSingle();

            if (userError || !userData) {
                throw new Error('Unable to sync user data. Please try signing out and back in.');
            }

            const slug = generateSlug(data.title);

            // Create comprehensive tags including genre, mood, and user tags
            const allTags = [
                data.genre,
                ...(data.mood ? [data.mood] : []),
                ...(data.tags || [])
            ].filter(Boolean);

            // Create enhanced prompt text
            const enhancedPromptText = `${data.prompt_text}

Music Details:
- Genre: ${data.genre}
- Tempo: ${data.tempo} BPM
- Duration: ${data.duration}
${data.instruments ? `- Instruments: ${data.instruments}` : ''}
${data.mood ? `- Mood: ${data.mood}` : ''}`;

            // Create the music prompt
            const { data: newPrompt, error: promptError } = await supabase
                .from('prompts')
                .insert({
                    title: data.title,
                    slug,
                    prompt_text: enhancedPromptText,
                    type: 'music',
                    price: data.price || 0,
                    is_paid: data.is_paid || false,
                    is_featured: data.is_featured || false,
                    tags: allTags,
                    cover_image_url: coverImageUrl || null,
                    preview_url: previewUrl || null,
                    user_id: userData.id,
                })
                .select()
                .single();

            if (promptError) {
                throw promptError;
            }

            toast({
                title: "Success!",
                description: "Your music prompt has been created successfully",
            });

            form.reset();
            setCoverImageUrl('');
            setPreviewUrl('');

            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/music-prompts');
            }
        } catch (error) {
            console.error('Error creating music prompt:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create music prompt",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <CardTitle>Create Music Prompt</CardTitle>
                        <CardDescription>
                            Share your music creation ideas with the community
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Track Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Ambient Electronic Journey..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="prompt_text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Music Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the music style, arrangement, and creative direction..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide detailed instructions for creating this music
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        {/* Music-Specific Fields */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Music Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select genre" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {musicGenres.map((genre) => (
                                                        <SelectItem key={genre} value={genre}>
                                                            {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tempo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tempo (BPM)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="60"
                                                    max="200"
                                                    placeholder="120"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 120)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 3:30" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mood"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mood</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., dreamy, energetic, dark..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="instruments"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instruments & Elements</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., synthesizers, drums, guitar, vocals..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            List the main instruments or elements in this track
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        {/* Tags */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Additional Tags</FormLabel>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Add a tag..."
                                                    value={currentTag}
                                                    onChange={(e) => setCurrentTag(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            addTag();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" variant="outline" onClick={addTag}>
                                                    Add
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {(field.value || []).map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                        {tag}
                                                        <X
                                                            className="h-3 w-3 cursor-pointer"
                                                            onClick={() => removeTag(tag)}
                                                        />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <FormDescription>
                                            Add relevant tags to help users discover your music prompt
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        {/* Media Upload */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Media</h3>
                                <p className="text-sm text-muted-foreground">Add cover art and audio preview</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Cover Art</label>
                                    <AvatarUpload
                                        currentAvatarUrl={coverImageUrl}
                                        onAvatarChange={setCoverImageUrl}
                                        bucket="prompts"
                                        accept="image/*"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Audio Preview</label>
                                    <AvatarUpload
                                        currentAvatarUrl={previewUrl}
                                        onAvatarChange={setPreviewUrl}
                                        bucket="prompts"
                                        accept="audio/*"
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Pricing & Visibility */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Pricing & Visibility</h3>
                                <p className="text-sm text-muted-foreground">Set your prompt pricing and visibility options</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="is_paid"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Paid Prompt</FormLabel>
                                                <FormDescription>
                                                    Charge users to access this prompt
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="is_featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Featured</FormLabel>
                                                <FormDescription>
                                                    Highlight this prompt on the homepage
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {form.watch('is_paid') && (
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="0.00"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Set the price for accessing this music prompt
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <Separator />

                        {/* Actions */}
                        <div className="flex gap-3">
                            {onCancel && (
                                <Button type="button" variant="outline" onClick={onCancel}>
                                    Cancel
                                </Button>
                            )}
                            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Music className="w-4 h-4 mr-2" />
                                        Create Music Prompt
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
