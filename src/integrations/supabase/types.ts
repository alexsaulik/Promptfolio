export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instanciate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "12.2.12 (cd3cf9e)"
    }
    public: {
        Tables: {
            artists: {
                Row: {
                    avatar_url: string | null
                    bio: string | null
                    cover_image_url: string | null
                    created_at: string
                    description: string | null
                    featured: boolean | null
                    followers: number | null
                    formation_year: number | null
                    genre: string[] | null
                    id: string
                    location: string | null
                    monthly_listeners: number | null
                    name: string
                    photo_gallery: string[] | null
                    plays: number | null
                    prompts_count: number | null
                    recent_tracks: string[] | null
                    slug: string
                    social_links: Json | null
                    soundcloud_url: string | null
                    spotify_url: string | null
                    updated_at: string
                    verified: boolean | null
                    website_url: string | null
                    youtube_url: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    bio?: string | null
                    cover_image_url?: string | null
                    created_at?: string
                    description?: string | null
                    featured?: boolean | null
                    followers?: number | null
                    formation_year?: number | null
                    genre?: string[] | null
                    id?: string
                    location?: string | null
                    monthly_listeners?: number | null
                    name: string
                    photo_gallery?: string[] | null
                    plays?: number | null
                    prompts_count?: number | null
                    recent_tracks?: string[] | null
                    slug: string
                    social_links?: Json | null
                    soundcloud_url?: string | null
                    spotify_url?: string | null
                    updated_at?: string
                    verified?: boolean | null
                    website_url?: string | null
                    youtube_url?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    bio?: string | null
                    cover_image_url?: string | null
                    created_at?: string
                    description?: string | null
                    featured?: boolean | null
                    followers?: number | null
                    formation_year?: number | null
                    genre?: string[] | null
                    id?: string
                    location?: string | null
                    monthly_listeners?: number | null
                    name?: string
                    photo_gallery?: string[] | null
                    plays?: number | null
                    prompts_count?: number | null
                    recent_tracks?: string[] | null
                    slug?: string
                    social_links?: Json | null
                    soundcloud_url?: string | null
                    spotify_url?: string | null
                    updated_at?: string
                    verified?: boolean | null
                    website_url?: string | null
                    youtube_url?: string | null
                }
                Relationships: []
            }
            downloads: {
                Row: {
                    created_at: string
                    id: string
                    prompt_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    prompt_id: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    prompt_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "downloads_prompt_id_fkey"
                        columns: ["prompt_id"]
                        isOneToOne: false
                        referencedRelation: "prompts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "downloads_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            follows: {
                Row: {
                    created_at: string
                    followed_user_id: string
                    follower_id: string
                    id: string
                }
                Insert: {
                    created_at?: string
                    followed_user_id: string
                    follower_id: string
                    id?: string
                }
                Update: {
                    created_at?: string
                    followed_user_id?: string
                    follower_id?: string
                    id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "follows_followed_user_id_fkey"
                        columns: ["followed_user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "follows_follower_id_fkey"
                        columns: ["follower_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            gallery: {
                Row: {
                    artist_id: string
                    caption: string | null
                    created_at: string
                    id: string
                    image_url: string
                    updated_at: string
                    uploaded_by: string | null
                }
                Insert: {
                    artist_id: string
                    caption?: string | null
                    created_at?: string
                    id?: string
                    image_url: string
                    updated_at?: string
                    uploaded_by?: string | null
                }
                Update: {
                    artist_id?: string
                    caption?: string | null
                    created_at?: string
                    id?: string
                    image_url?: string
                    updated_at?: string
                    uploaded_by?: string | null
                }
                Relationships: []
            }
            models: {
                Row: {
                    cover_image_url: string | null
                    created_at: string
                    description: string
                    downloads_count: number
                    file_urls: string[] | null
                    framework: string
                    id: string
                    is_featured: boolean
                    is_paid: boolean
                    license: string
                    likes_count: number
                    model_type: string
                    price: number
                    requirements: string | null
                    slug: string
                    tags: string[] | null
                    title: string
                    updated_at: string
                    user_id: string
                    version: string
                    views_count: number
                }
                Insert: {
                    cover_image_url?: string | null
                    created_at?: string
                    description: string
                    downloads_count?: number
                    file_urls?: string[] | null
                    framework: string
                    id?: string
                    is_featured?: boolean
                    is_paid?: boolean
                    license: string
                    likes_count?: number
                    model_type: string
                    price?: number
                    requirements?: string | null
                    slug: string
                    tags?: string[] | null
                    title: string
                    updated_at?: string
                    user_id: string
                    version?: string
                    views_count?: number
                }
                Update: {
                    cover_image_url?: string | null
                    created_at?: string
                    description?: string
                    downloads_count?: number
                    file_urls?: string[] | null
                    framework?: string
                    id?: string
                    is_featured?: boolean
                    is_paid?: boolean
                    license?: string
                    likes_count?: number
                    model_type?: string
                    price?: number
                    requirements?: string | null
                    slug?: string
                    tags?: string[] | null
                    title?: string
                    updated_at?: string
                    user_id?: string
                    version?: string
                    views_count?: number
                }
                Relationships: []
            }
            packs: {
                Row: {
                    cover_image_url: string | null
                    created_at: string
                    description: string | null
                    download_url: string | null
                    id: string
                    price: number
                    prompt_ids: string[] | null
                    title: string
                    type: Database["public"]["Enums"]["pack_type"]
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    cover_image_url?: string | null
                    created_at?: string
                    description?: string | null
                    download_url?: string | null
                    id?: string
                    price?: number
                    prompt_ids?: string[] | null
                    title: string
                    type: Database["public"]["Enums"]["pack_type"]
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    cover_image_url?: string | null
                    created_at?: string
                    description?: string | null
                    download_url?: string | null
                    id?: string
                    price?: number
                    prompt_ids?: string[] | null
                    title?: string
                    type?: Database["public"]["Enums"]["pack_type"]
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "packs_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            prompts: {
                Row: {
                    artist_id: string | null
                    cover_image_url: string | null
                    created_at: string
                    downloads_count: number
                    id: string
                    is_featured: boolean
                    is_paid: boolean
                    likes_count: number
                    preview_url: string | null
                    price: number | null
                    prompt_text: string
                    slug: string
                    tags: string[] | null
                    title: string
                    type: Database["public"]["Enums"]["prompt_type"]
                    updated_at: string
                    user_id: string
                    views_count: number
                }
                Insert: {
                    artist_id?: string | null
                    cover_image_url?: string | null
                    created_at?: string
                    downloads_count?: number
                    id?: string
                    is_featured?: boolean
                    is_paid?: boolean
                    likes_count?: number
                    preview_url?: string | null
                    price?: number | null
                    prompt_text: string
                    slug: string
                    tags?: string[] | null
                    title: string
                    type: Database["public"]["Enums"]["prompt_type"]
                    updated_at?: string
                    user_id: string
                    views_count?: number
                }
                Update: {
                    artist_id?: string | null
                    cover_image_url?: string | null
                    created_at?: string
                    downloads_count?: number
                    id?: string
                    is_featured?: boolean
                    is_paid?: boolean
                    likes_count?: number
                    preview_url?: string | null
                    price?: number | null
                    prompt_text?: string
                    slug?: string
                    tags?: string[] | null
                    title?: string
                    type?: Database["public"]["Enums"]["prompt_type"]
                    updated_at?: string
                    user_id?: string
                    views_count?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "prompts_artist_id_fkey"
                        columns: ["artist_id"]
                        isOneToOne: false
                        referencedRelation: "artists"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "prompts_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            tracks: {
                Row: {
                    artist_id: string
                    created_at: string
                    duration: number | null
                    id: string
                    mp3_url: string
                    title: string
                    updated_at: string
                    uploaded_by: string | null
                }
                Insert: {
                    artist_id: string
                    created_at?: string
                    duration?: number | null
                    id?: string
                    mp3_url: string
                    title: string
                    updated_at?: string
                    uploaded_by?: string | null
                }
                Update: {
                    artist_id?: string
                    created_at?: string
                    duration?: number | null
                    id?: string
                    mp3_url?: string
                    title?: string
                    updated_at?: string
                    uploaded_by?: string | null
                }
                Relationships: []
            }
            users: {
                Row: {
                    avatar_url: string | null
                    bio: string | null
                    clerk_user_id: string
                    created_at: string
                    email: string
                    id: string
                    role: Database["public"]["Enums"]["user_role"]
                    updated_at: string
                    username: string
                }
                Insert: {
                    avatar_url?: string | null
                    bio?: string | null
                    clerk_user_id: string
                    created_at?: string
                    email: string
                    id?: string
                    role?: Database["public"]["Enums"]["user_role"]
                    updated_at?: string
                    username: string
                }
                Update: {
                    avatar_url?: string | null
                    bio?: string | null
                    clerk_user_id?: string
                    created_at?: string
                    email?: string
                    id?: string
                    role?: Database["public"]["Enums"]["user_role"]
                    updated_at?: string
                    username?: string
                }
                Relationships: []
            }
            views: {
                Row: {
                    created_at: string
                    id: string
                    ip_address: unknown | null
                    prompt_id: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    id?: string
                    ip_address?: unknown | null
                    prompt_id: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    id?: string
                    ip_address?: unknown | null
                    prompt_id?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "views_prompt_id_fkey"
                        columns: ["prompt_id"]
                        isOneToOne: false
                        referencedRelation: "prompts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "views_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            workflows: {
                Row: {
                    category: string
                    cover_image_url: string | null
                    created_at: string
                    description: string
                    difficulty: string
                    downloads_count: number
                    file_url: string | null
                    id: string
                    is_featured: boolean
                    is_paid: boolean
                    likes_count: number
                    price: number
                    slug: string
                    tags: string[] | null
                    title: string
                    updated_at: string
                    user_id: string
                    views_count: number
                }
                Insert: {
                    category: string
                    cover_image_url?: string | null
                    created_at?: string
                    description: string
                    difficulty?: string
                    downloads_count?: number
                    file_url?: string | null
                    id?: string
                    is_featured?: boolean
                    is_paid?: boolean
                    likes_count?: number
                    price?: number
                    slug: string
                    tags?: string[] | null
                    title: string
                    updated_at?: string
                    user_id: string
                    views_count?: number
                }
                Update: {
                    category?: string
                    cover_image_url?: string | null
                    created_at?: string
                    description?: string
                    difficulty?: string
                    downloads_count?: number
                    file_url?: string | null
                    id?: string
                    is_featured?: boolean
                    is_paid?: boolean
                    likes_count?: number
                    price?: number
                    slug?: string
                    tags?: string[] | null
                    title?: string
                    updated_at?: string
                    user_id?: string
                    views_count?: number
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            pack_type: "workflow" | "model" | "bundle" | "music_pack"
            prompt_type: "text" | "image" | "music" | "code" | "video"
            user_role: "viewer" | "creator" | "admin"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {
            pack_type: ["workflow", "model", "bundle", "music_pack"],
            prompt_type: ["text", "image", "music", "code", "video"],
            user_role: ["viewer", "creator", "admin"],
        },
    },
} as const
