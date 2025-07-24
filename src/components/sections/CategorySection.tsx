import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Image, Music, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
    {
        name: "Music & Audio",
        icon: Music,
        description: "AI prompts for song lyrics, melodies, and audio generation",
        count: "12,500+ prompts",
        gradient: "bg-gradient-music",
        color: "music",
        link: "/explore/music-audio",
    },
    {
        name: "Visual Art",
        icon: Image,
        description: "Create stunning visuals, art, and design with AI",
        count: "18,200+ prompts",
        gradient: "bg-gradient-image",
        color: "image",
        link: "/explore/visual-art",
    },
    {
        name: "Code & Development",
        icon: Code,
        description: "Programming prompts, algorithms, and development tools",
        count: "8,900+ prompts",
        gradient: "bg-gradient-code",
        color: "code",
        link: "/explore/code-development",
    },
    {
        name: "Text & Writing",
        icon: Type,
        description: "Content creation, copywriting, and creative writing",
        count: "15,400+ prompts",
        gradient: "bg-gradient-text",
        color: "text",
        link: "/explore/text-writing",
    },
];

export function CategorySection() {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Explore by Category
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Find the perfect prompts for your creative projects across different AI domains
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <Card
                                key={category.name}
                                className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-elevated cursor-pointer animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => navigate(category.link)}
                            >
                                <CardContent className="p-6 space-y-4 relative z-10">
                                    {/* Icon with gradient background */}
                                    <div className={`w-12 h-12 rounded-xl ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {category.description}
                                        </p>
                                        <p className="text-xs font-medium text-primary">
                                            {category.count}
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Explore
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </CardContent>

                                {/* Hover overlay */}
                                <div className={`absolute inset-0 ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                            </Card>
                        );
                    })}
                </div>

                {/* View All Categories Button */}
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="group" onClick={() => navigate('/explore')}>
                        View All Categories
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
