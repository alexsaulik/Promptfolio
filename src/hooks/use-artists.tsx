import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export interface Artist {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    avatar_url?: string;
    followers: number;
    prompts_count: number;
    plays: number;
    featured: boolean;
    recent_tracks: string[];
    social_links: any; // Changed from Record<string, string> to any to match Json type
    genre: string[];
    created_at: string;
    updated_at: string;
}

export function useArtists() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [featuredArtist, setFeaturedArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchArtists = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('artists')
                .select('*')
                .order('featured', { ascending: false })
                .order('followers', { ascending: false });

            if (fetchError) {
                throw fetchError;
            }

            if (data) {
                const featured = data.find(artist => artist.featured);
                const regular = data.filter(artist => !artist.featured);

                setFeaturedArtist(featured || null);
                setArtists(regular);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch artists';
            setError(errorMessage);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const createArtist = async (artistData: Omit<Artist, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error: insertError } = await supabase
                .from('artists')
                .insert([artistData])
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            if (data) {
                toast({
                    title: "Success",
                    description: "Artist created successfully",
                });

                // Refresh the list
                await fetchArtists();
                return data;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create artist';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
            throw err;
        }
    };

    const updateArtist = async (id: string, updates: Partial<Artist>) => {
        try {
            const { data, error: updateError } = await supabase
                .from('artists')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (updateError) {
                throw updateError;
            }

            if (data) {
                toast({
                    title: "Success",
                    description: "Artist updated successfully",
                });

                // Refresh the list
                await fetchArtists();
                return data;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update artist';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
            throw err;
        }
    };

    const deleteArtist = async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from('artists')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw deleteError;
            }

            toast({
                title: "Success",
                description: "Artist deleted successfully",
            });

            // Refresh the list
            await fetchArtists();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete artist';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
            throw err;
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    return {
        artists,
        featuredArtist,
        loading,
        error,
        createArtist,
        updateArtist,
        deleteArtist,
        refetch: fetchArtists,
    };
}
