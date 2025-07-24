import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export interface Prompt {
    id: string;
    title: string;
    slug: string;
    prompt_text: string;
    type: 'text' | 'image' | 'music' | 'code' | 'video';
    price: number;
    is_paid: boolean;
    is_featured: boolean;
    views_count: number;
    downloads_count: number;
    likes_count: number;
    tags: string[];
    cover_image_url?: string;
    preview_url?: string;
    created_at: string;
    updated_at: string;
    user?: {
        id: string;
        username: string;
        avatar_url?: string;
        role: string;
    };
    artist?: {
        id: string;
        name: string;
        slug: string;
        avatar_url?: string;
        genre?: string[];
    };
    user_id: string;
    artist_id?: string;
}

export function usePrompts(filters?: {
    featured?: boolean;
    type?: string;
    userId?: string;
    artistId?: string;
    tags?: string[];
}) {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPrompts();
    }, [filters]);

    const fetchPrompts = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('prompts')
                .select(`
          *,
          artist:artists(id, name, slug, avatar_url, genre)
        `)
                .order('created_at', { ascending: false });

            if (filters?.featured) {
                query = query.eq('is_featured', true);
            }

            if (filters?.type) {
                query = query.eq('type', filters.type as any);
            }

            if (filters?.userId) {
                query = query.eq('user_id', filters.userId);
            }

            if (filters?.artistId) {
                query = query.eq('artist_id', filters.artistId);
            }

            if (filters?.tags && filters.tags.length > 0) {
                query = query.overlaps('tags', filters.tags);
            }

            const { data, error } = await query;

            if (error) {
                throw error;
            }

            setPrompts(data || []);
        } catch (err) {
            console.error('Error fetching prompts:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
        } finally {
            setLoading(false);
        }
    };

    const createPrompt = async (promptData: {
        title: string;
        prompt_text: string;
        type: 'text' | 'image' | 'music' | 'code' | 'video';
        artist_id?: string;
        price: number;
        is_paid: boolean;
        is_featured: boolean;
        tags: string[];
        cover_image_url?: string;
        preview_url?: string;
        user_id: string;
    }) => {
        try {
            const slug = promptData.title
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();

            const { data, error } = await supabase
                .from('prompts')
                .insert({
                    ...promptData,
                    slug,
                })
                .select()
                .single();

            if (error) {
                throw error;
            }

            // Refresh the prompts list
            await fetchPrompts();

            return data;
        } catch (error) {
            console.error('Error creating prompt:', error);
            throw error;
        }
    };

    return { prompts, loading, error, refetch: fetchPrompts, createPrompt };
}

export function usePrompt(slug: string) {
    const [prompt, setPrompt] = useState<Prompt | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            fetchPrompt();
        }
    }, [slug]);

    const fetchPrompt = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('prompts')
                .select()
                .eq('slug', slug)
                .maybeSingle();

            if (error) {
                throw error;
            }

            setPrompt(data);
        } catch (err) {
            console.error('Error fetching prompt:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch prompt');
        } finally {
            setLoading(false);
        }
    };

    return { prompt, loading, error, refetch: fetchPrompt };
}
