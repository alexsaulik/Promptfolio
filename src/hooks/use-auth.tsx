import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export interface SupabaseUser {
    id: string;
    clerk_user_id: string;
    email: string;
    username: string;
    role: 'viewer' | 'creator' | 'admin';
    avatar_url?: string;
    bio?: string;
    created_at: string;
    updated_at: string;
}

export function useAuth() {
    const { user: clerkUser, isLoaded, isSignedIn } = useUser();
    const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (isLoaded && isSignedIn && clerkUser) {
            syncUserWithSupabase();
        } else if (isLoaded && !isSignedIn) {
            setSupabaseUser(null);
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, clerkUser]);

    const syncUserWithSupabase = async () => {
        if (!clerkUser) return;

        try {
            // Check if user exists in Supabase
            const { data: existingUser, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('clerk_user_id', clerkUser.id)
                .maybeSingle();

            if (fetchError) {
                console.error('Error fetching user:', fetchError);
                setLoading(false);
                return;
            }

            if (existingUser) {
                setSupabaseUser(existingUser);
            } else {
                // Create new user in Supabase
                const newUser = {
                    clerk_user_id: clerkUser.id,
                    email: clerkUser.primaryEmailAddress?.emailAddress || '',
                    username: clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || `user${Date.now()}`,
                    avatar_url: clerkUser.imageUrl,
                    role: 'viewer' as const
                };

                const { data: createdUser, error: createError } = await supabase
                    .from('users')
                    .insert(newUser)
                    .select('*')
                    .single();

                if (createError) {
                    console.error('Error creating user:', createError);
                    // If user creation fails, still try to fetch existing user
                    const { data: retryUser } = await supabase
                        .from('users')
                        .select('*')
                        .eq('clerk_user_id', clerkUser.id)
                        .maybeSingle();

                    if (retryUser) {
                        setSupabaseUser(retryUser);
                    } else {
                        toast({
                            variant: "destructive",
                            title: "Error",
                            description: "Failed to sync user data. Please try again."
                        });
                    }
                } else {
                    setSupabaseUser(createdUser);
                }
            }
        } catch (error) {
            console.error('Error syncing user:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to sync user data. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        clerkUser,
        supabaseUser,
        isLoaded,
        isSignedIn,
        loading
    };
}
