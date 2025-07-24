import { PromptCard } from "@/components/prompts/PromptCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data for featured prompts
const featuredPrompts = [
    {
        id: "1",
        title: "Cinematic Lo-Fi Hip Hop Generator",
        description: "Create atmospheric lo-fi beats with cinematic elements, perfect for study sessions and relaxation.",
        type: "music" as const,
        price: 12.99,
        isPremium: true,
        coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        audioPreview: "/audio/lofi-preview.mp3",
        creator: {
            username: "beatmaster_ai",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
            isVerified: true,
        },
        stats: {
            likes: 2847,
            downloads: 1204,
            views: 8392,
        },
        tags: ["lo-fi", "hip-hop", "cinematic", "atmospheric", "study"],
    },
    {
        id: "2",
        title: "Fantasy Character Portrait Generator",
        description: "Generate detailed fantasy character portraits with customizable features, armor, and magical elements.",
        type: "image" as const,
        price: 8.99,
        isPremium: true,
        coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        creator: {
            username: "fantasyforge",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            isVerified: true,
        },
        stats: {
            likes: 3921,
            downloads: 2156,
            views: 12847,
        },
        tags: ["fantasy", "character", "portrait", "rpg", "digital-art"],
    },
    {
        id: "3",
        title: "React Component Builder",
        description: "Generate clean, type-safe React components with best practices and modern patterns.",
        type: "code" as const,
        price: 15.99,
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        creator: {
            username: "codewhisper",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            isVerified: true,
        },
        stats: {
            likes: 1892,
            downloads: 756,
            views: 5432,
        },
        tags: ["react", "typescript", "components", "frontend", "development"],
    },
    {
        id: "4",
        title: "Brand Story Generator",
        description: "Craft compelling brand narratives that resonate with your target audience and drive engagement.",
        type: "text" as const,
        price: 0,
        coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        creator: {
            username: "storyteller_pro",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
            isVerified: false,
        },
        stats: {
            likes: 1247,
            downloads: 3891,
            views: 9654,
        },
        tags: ["marketing", "branding", "storytelling", "copywriting", "business"],
    },
    {
        id: "5",
        title: "Synthwave Retrowave Creator",
        description: "Generate nostalgic 80s synthwave tracks with authentic vintage sounds and modern production.",
        type: "music" as const,
        price: 9.99,
        coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        creator: {
            username: "neon_sounds",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            isVerified: true,
        },
        stats: {
            likes: 2156,
            downloads: 891,
            views: 6743,
        },
        tags: ["synthwave", "80s", "retro", "electronic", "vintage"],
    },
    {
        id: "6",
        title: "Minimalist Logo Designer",
        description: "Create clean, modern logos with perfect typography and balanced compositions.",
        type: "image" as const,
        price: 6.99,
        coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
        creator: {
            username: "minimal_design",
            avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face",
            isVerified: false,
        },
        stats: {
            likes: 1674,
            downloads: 1234,
            views: 4891,
        },
        tags: ["logo", "minimalist", "design", "branding", "typography"],
    },
];

export function FeaturedSection() {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-4 bg-muted/20">
            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Featured Prompts
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Discover trending and high-quality prompts curated by our community
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPrompts.map((prompt, index) => (
                        <div
                            key={prompt.id}
                            className={`animate-fade-in [animation-delay:${index * 0.1}s]`}
                        >
                            <PromptCard prompt={prompt} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-primary hover:text-primary-glow font-medium text-lg transition-colors"
                        onClick={() => navigate('/explore')}
                    >
                        View All Featured Prompts →
                    </Button>
                </div>
            </div>
        </section>
    );
}
