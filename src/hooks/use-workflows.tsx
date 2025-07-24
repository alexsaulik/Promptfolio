import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export interface Workflow {
    id: string;
    user_id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    difficulty: string;
    price: number;
    is_paid: boolean;
    is_featured: boolean;
    tags: string[];
    file_url?: string;
    cover_image_url?: string;
    views_count: number;
    downloads_count: number;
    likes_count: number;
    created_at: string;
    updated_at: string;
}

interface UseWorkflowsOptions {
    userId?: string;
}

export const useWorkflows = (options: UseWorkflowsOptions = {}) => {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWorkflows = async () => {
        try {
            setLoading(true);
            let query = supabase.from('workflows').select('*').order('created_at', { ascending: false });

            if (options.userId) {
                query = query.eq('user_id', options.userId);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;
            setWorkflows(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkflows();
    }, [options.userId]);

    const refetch = () => {
        fetchWorkflows();
    };

    return { workflows, loading, error, refetch };
};

export const createWorkflow = async (workflowData: any) => {
    const { data, error } = await supabase
        .from('workflows')
        .insert([workflowData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    const { data, error } = await supabase
        .from('workflows')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
