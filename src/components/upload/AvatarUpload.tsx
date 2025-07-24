import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, User, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface AvatarUploadProps {
    currentAvatarUrl?: string;
    onAvatarChange: (url: string) => void;
    disabled?: boolean;
    bucket?: string;
    accept?: string;
}

export function AvatarUpload({
    currentAvatarUrl,
    onAvatarChange,
    disabled = false,
    bucket = 'artists',
    accept = 'image/*'
}: AvatarUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const uploadAvatar = async (file: File) => {
        try {
            setUploading(true);

            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Please select an image file');
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('File size must be less than 5MB');
            }

            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(data.path);

            onAvatarChange(publicUrlData.publicUrl);

            toast({
                title: "Success",
                description: "Avatar uploaded successfully",
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload avatar';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadAvatar(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            uploadAvatar(e.target.files[0]);
        }
    };

    const removeAvatar = () => {
        onAvatarChange('');
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {/* Avatar Preview */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        {currentAvatarUrl ? (
                            <img
                                src={currentAvatarUrl}
                                alt="Avatar preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-8 h-8 text-muted-foreground" />
                        )}
                    </div>
                    {currentAvatarUrl && !disabled && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 w-6 h-6"
                            onClick={removeAvatar}
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading || disabled}
                        className="mb-2"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Choose File'}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        JPG, PNG or GIF. Max size 5MB.
                    </p>
                </div>
            </div>

            {/* Drag & Drop Area */}
            <Card
                className={`border-2 border-dashed transition-colors ${dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-muted-foreground/50'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <CardContent className="p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        Drop an image here, or{' '}
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading || disabled}
                        >
                            browse files
                        </button>
                    </p>
                </CardContent>
            </Card>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading || disabled}
                aria-label="Select avatar image file"
            />
        </div>
    );
}
