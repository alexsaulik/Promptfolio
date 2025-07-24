import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export interface Model {
    id: string;
    user_id: string;
    title: string;
    slug: string;
    description: string;
    model_type: string;
    framework: string;
    version: string;
    license: string;
    requirements?: string;
    price: number;
    is_paid: boolean;
    is_featured: boolean;
    tags: string[];
    file_urls: string[];
    cover_image_url?: string;
    views_count: number;
    downloads_count: number;
    likes_count: number;
    created_at: string;
    updated_at: string;
}

interface UseModelsOptions {
    userId?: string;
}

export const useModels = (options: UseModelsOptions = {}) => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchModels = async () => {
        try {
            setLoading(true);
            let query = supabase.from('models').select('*').order('created_at', { ascending: false });

            if (options.userId) {
                query = query.eq('user_id', options.userId);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;
            setModels(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, [options.userId]);

    const refetch = () => {
        fetchModels();
    };

    return { models, loading, error, refetch };
};

export const createModel = async (modelData: any) => {
    const { data, error } = await supabase
        .from('models')
        .insert([modelData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateModel = async (id: string, updates: Partial<Model>) => {
    const { data, error } = await supabase
        .from('models')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
