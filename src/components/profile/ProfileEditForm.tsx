import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AvatarUpload } from '@/components/upload/AvatarUpload';
import { Loader2 } from 'lucide-react';

const profileSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    bio: z.string().optional(),
    role: z.enum(['viewer', 'creator', 'admin']).optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
    user: {
        id: string;
        username: string;
        bio?: string;
        role: string;
        avatar_url?: string;
    };
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function ProfileEditForm({ user, onSuccess, onCancel }: ProfileEditFormProps) {
    const { user: clerkUser } = useUser();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || '');

    const form = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: user.username,
            bio: user.bio || '',
            role: user.role as any,
        },
    });

    const onSubmit = async (data: ProfileForm) => {
        if (!clerkUser) {
            toast({
                title: "Error",
                description: "You must be signed in to update your profile",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const { error } = await supabase
                .from('users')
                .update({
                    username: data.username,
                    bio: data.bio,
                    avatar_url: avatarUrl,
                    ...(data.role && { role: data.role })
                })
                .eq('clerk_user_id', clerkUser.id);

            if (error) {
                throw error;
            }

            toast({
                title: "Success!",
                description: "Your profile has been updated successfully",
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update your profile information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Profile Picture</h3>
                                <p className="text-sm text-muted-foreground">Upload your avatar</p>
                            </div>

                            <AvatarUpload
                                currentAvatarUrl={avatarUrl}
                                onAvatarChange={setAvatarUrl}
                                bucket="artists"
                                accept="image/*"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your username..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about yourself..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A short description about yourself
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user.role === 'admin' && (
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="viewer">Viewer</SelectItem>
                                                    <SelectItem value="creator">Creator</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Your role determines what actions you can perform
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

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
                                        Updating...
                                    </>
                                ) : (
                                    'Update Profile'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
