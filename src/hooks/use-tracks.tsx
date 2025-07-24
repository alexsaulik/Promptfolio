import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export interface Track {
    id: string;
    artist_id: string;
    title: string;
    mp3_url: string;
    duration?: number;
    uploaded_by?: string;
    created_at: string;
    updated_at: string;
}

export const useTracks = (artistId?: string) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchTracks = async () => {
        try {
            setLoading(true);
            let query = supabase.from('tracks').select('*');

            if (artistId) {
                query = query.eq('artist_id', artistId);
            }

            query = query.order('created_at', { ascending: false });

            const { data, error } = await query;

            if (error) throw error;
            setTracks(data || []);
        } catch (err) {
            console.error('Error fetching tracks:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch tracks');
        } finally {
            setLoading(false);
        }
    };

    const createTrack = async (trackData: Omit<Track, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error } = await supabase
                .from('tracks')
                .insert([trackData])
                .select()
                .single();

            if (error) throw error;

            setTracks(prev => [data, ...prev]);
            toast({
                title: "Success",
                description: "Track uploaded successfully",
            });

            return data;
        } catch (err) {
            console.error('Error creating track:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to upload track',
                variant: "destructive",
            });
            throw err;
        }
    };

    const deleteTrack = async (trackId: string) => {
        try {
            const { error } = await supabase
                .from('tracks')
                .delete()
                .eq('id', trackId);

            if (error) throw error;

            setTracks(prev => prev.filter(track => track.id !== trackId));
            toast({
                title: "Success",
                description: "Track deleted successfully",
            });
        } catch (err) {
            console.error('Error deleting track:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to delete track',
                variant: "destructive",
            });
            throw err;
        }
    };

    const uploadTrackFile = async (file: File, artistId: string, fileName?: string) => {
        try {
            const fileExt = file.name.split('.').pop();
            const finalFileName = fileName || `${Date.now()}.${fileExt}`;
            const filePath = `${artistId}/${finalFileName}`;

            const { error: uploadError } = await supabase.storage
                .from('tracks')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('tracks')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (err) {
            console.error('Error uploading track file:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchTracks();
    }, [artistId]);

    return {
        tracks,
        loading,
        error,
        createTrack,
        deleteTrack,
        uploadTrackFile,
        refetch: fetchTracks,
    };
};
