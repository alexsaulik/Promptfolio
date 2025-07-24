import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export interface GalleryItem {
    id: string;
    artist_id: string;
    image_url: string;
    caption?: string;
    uploaded_by?: string;
    created_at: string;
    updated_at: string;
}

export const useGallery = (artistId?: string) => {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchGalleryItems = async () => {
        try {
            setLoading(true);
            let query = supabase.from('gallery').select('*');

            if (artistId) {
                query = query.eq('artist_id', artistId);
            }

            query = query.order('created_at', { ascending: false });

            const { data, error } = await query;

            if (error) throw error;
            setGalleryItems(data || []);
        } catch (err) {
            console.error('Error fetching gallery items:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch gallery items');
        } finally {
            setLoading(false);
        }
    };

    const createGalleryItem = async (itemData: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .insert([itemData])
                .select()
                .single();

            if (error) throw error;

            setGalleryItems(prev => [data, ...prev]);
            toast({
                title: "Success",
                description: "Image added to gallery successfully",
            });

            return data;
        } catch (err) {
            console.error('Error creating gallery item:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to add image to gallery',
                variant: "destructive",
            });
            throw err;
        }
    };

    const deleteGalleryItem = async (itemId: string) => {
        try {
            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', itemId);

            if (error) throw error;

            setGalleryItems(prev => prev.filter(item => item.id !== itemId));
            toast({
                title: "Success",
                description: "Image removed from gallery successfully",
            });
        } catch (err) {
            console.error('Error deleting gallery item:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to remove image from gallery',
                variant: "destructive",
            });
            throw err;
        }
    };

    const uploadGalleryImage = async (file: File, artistId: string, fileName?: string) => {
        try {
            const fileExt = file.name.split('.').pop();
            const finalFileName = fileName || `${Date.now()}.${fileExt}`;
            const filePath = `${artistId}/${finalFileName}`;

            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (err) {
            console.error('Error uploading gallery image:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchGalleryItems();
    }, [artistId]);

    return {
        galleryItems,
        loading,
        error,
        createGalleryItem,
        deleteGalleryItem,
        uploadGalleryImage,
        refetch: fetchGalleryItems,
    };
};
