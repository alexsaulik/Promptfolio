import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-music/10 via-transparent to-code/10" />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 animate-float">
                    <div className="h-16 w-16 bg-gradient-to-br from-music to-music/60 rounded-lg opacity-60 blur-sm" />
                </div>
                <div className="absolute top-40 right-20 animate-float [animation-delay:1s]">
                    <div className="h-12 w-12 bg-gradient-to-br from-code to-code/60 rounded-full opacity-70 blur-sm" />
                </div>
                <div className="absolute bottom-32 left-1/4 animate-float [animation-delay:2s]">
                    <div className="h-20 w-20 bg-gradient-to-br from-image to-image/60 rounded-2xl opacity-50 blur-sm" />
                </div>
                <div className="absolute bottom-20 right-1/3 animate-float [animation-delay:0.5s]">
                    <div className="h-14 w-14 bg-gradient-to-br from-text to-text/60 rounded-lg opacity-60 blur-sm" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
                <div className="space-y-4 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer leading-tight">
                        Your Creative Prompt
                        <br />
                        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Marketplace
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Discover, create, and monetize AI prompts for music, images, code, and text.
                        Join thousands of creators building the future of AI-powered content.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in [animation-delay:0.2s]">
                    <Button variant="hero" size="xl" className="group" onClick={() => navigate('/upload')}>
                        <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                        Start Creating
                    </Button>
                    <Button variant="outline" size="xl" className="bg-background/50 backdrop-blur-sm" onClick={() => navigate('/explore')}>
                        Explore Prompts
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 animate-fade-in [animation-delay:0.4s]">
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-primary">
                            <TrendingUp className="mr-2 h-6 w-6" />
                            50K+
                        </div>
                        <p className="text-sm text-muted-foreground">Active Prompts</p>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-primary">
                            <Users className="mr-2 h-6 w-6" />
                            12K+
                        </div>
                        <p className="text-sm text-muted-foreground">Creators</p>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-primary">
                            <Zap className="mr-2 h-6 w-6" />
                            1M+
                        </div>
                        <p className="text-sm text-muted-foreground">Downloads</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
