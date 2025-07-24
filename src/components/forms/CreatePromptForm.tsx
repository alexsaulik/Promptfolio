import { useArtists } from '@/hooks/use-artists';
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
import { Loader2, X } from 'lucide-react';

const createPromptSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    prompt_text: z.string().min(1, 'Description is required'),
    type: z.enum(['text', 'image', 'music', 'code', 'video']),
    artist_id: z.string().optional(),
    price: z.number().min(0, 'Price must be non-negative').optional(),
    is_paid: z.boolean().optional(),
    is_featured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
});

type CreatePromptForm = z.infer<typeof createPromptSchema>;

interface CreatePromptFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CreatePromptForm({ onSuccess, onCancel }: CreatePromptFormProps) {
    const { user } = useUser();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { artists } = useArtists();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentTag, setCurrentTag] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const form = useForm<CreatePromptForm>({
        resolver: zodResolver(createPromptSchema),
        defaultValues: {
            title: '',
            prompt_text: '',
            type: 'text',
            artist_id: 'none',
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

    const onSubmit = async (data: CreatePromptForm) => {
        if (!user) {
            toast({
                title: "Error",
                description: "You must be signed in to create prompts",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            // Get current user from our users table - retry logic for sync
            let currentUser = null;
            let attempts = 0;
            const maxAttempts = 3;

            while (!currentUser && attempts < maxAttempts) {
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('id')
                    .eq('clerk_user_id', user.id)
                    .maybeSingle();

                if (userData) {
                    currentUser = userData;
                    break;
                }

                attempts++;

                if (attempts < maxAttempts) {
                    // Wait a bit and try again
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Try to create user if not found
                    if (!userData && userError?.code === 'PGRST116') {
                        try {
                            const { data: newUser } = await supabase
                                .from('users')
                                .insert({
                                    clerk_user_id: user.id,
                                    email: user.primaryEmailAddress?.emailAddress || '',
                                    username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || `user${Date.now()}`,
                                    avatar_url: user.imageUrl,
                                })
                                .select('id')
                                .single();

                            if (newUser) {
                                currentUser = newUser;
                                break;
                            }
                        } catch (insertError) {
                            console.log('Failed to create user, will retry:', insertError);
                        }
                    }
                }
            }

            if (!currentUser) {
                throw new Error('Unable to sync user data. Please try signing out and back in.');
            }

            const slug = generateSlug(data.title);

            // Create the prompt
            const { data: newPrompt, error: promptError } = await supabase
                .from('prompts')
                .insert({
                    title: data.title,
                    slug,
                    prompt_text: data.prompt_text,
                    type: data.type,
                    artist_id: data.artist_id === 'none' ? null : data.artist_id,
                    price: data.price || 0,
                    is_paid: data.is_paid || false,
                    is_featured: data.is_featured || false,
                    tags: data.tags || [],
                    cover_image_url: coverImageUrl || null,
                    preview_url: previewUrl || null,
                    user_id: currentUser.id,
                })
                .select()
                .single();

            if (promptError) {
                throw promptError;
            }

            toast({
                title: "Success!",
                description: "Your prompt has been created successfully",
            });

            form.reset();
            setCoverImageUrl('');
            setPreviewUrl('');

            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error creating prompt:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create prompt",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Prompt</CardTitle>
                <CardDescription>
                    Share your creative prompt with the community
                </CardDescription>
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
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your prompt title..." {...field} />
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
                                        <FormLabel>Prompt Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your prompt in detail..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide clear instructions or content for your prompt
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="text">Text & Writing</SelectItem>
                                                    <SelectItem value="image">Visual Art</SelectItem>
                                                    <SelectItem value="music">Music & Audio</SelectItem>
                                                    <SelectItem value="code">Code Development</SelectItem>
                                                    <SelectItem value="video">Video & Animation</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="artist_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Artist (Optional)</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select artist" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">No artist</SelectItem>
                                                    {artists && artists.length > 0 ? (
                                                        artists.map((artist) =>
                                                            artist?.id && artist?.name ? (
                                                                <SelectItem key={artist.id} value={artist.id}>
                                                                    {artist.name}
                                                                </SelectItem>
                                                            ) : null
                                                        )
                                                    ) : (
                                                        <SelectItem value="loading" disabled>Loading artists...</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Tags */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
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
                                            Add relevant tags to help users discover your prompt
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
                                <p className="text-sm text-muted-foreground">Add images or preview files</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Cover Image</label>
                                    <AvatarUpload
                                        currentAvatarUrl={coverImageUrl}
                                        onAvatarChange={setCoverImageUrl}
                                        bucket="prompts"
                                        accept="image/*"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Preview File</label>
                                    <AvatarUpload
                                        currentAvatarUrl={previewUrl}
                                        onAvatarChange={setPreviewUrl}
                                        bucket="prompts"
                                        accept="image/*,audio/*,video/*,.pdf,.txt,.md"
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
                                                Set the price for accessing this prompt
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
                            <Button type="submit" disabled={isSubmitting} className="flex-1">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Prompt'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
