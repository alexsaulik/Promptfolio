import { Globe } from "@/components/magicui/globe";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
    const navigate = useNavigate();

    return (
        <AuroraBackground className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Particles Background */}
            <Particles
                className="absolute inset-0 z-10"
                quantity={100}
                ease={80}
                color="#8B5CF6"
                refresh
            />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center space-y-8">
                <div className="space-y-4 animate-fade-in">
                    <TypingAnimation
                        className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight drop-shadow-2xl"
                        duration={50}
                    >
                        Your Creative Prompt Marketplace
                    </TypingAnimation>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                        Discover, create, and monetize AI prompts for music, images, code, and text.
                        Join thousands of creators building the future of AI-powered content.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in [animation-delay:0.2s]">
                    <ShimmerButton
                        className="group px-8 py-3"
                        onClick={() => navigate('/dashboard')}
                        shimmerColor="#ffffff"
                        background="rgba(138, 43, 226, 0.9)"
                        borderRadius="12px"
                    >
                        <span className="flex items-center text-white font-medium">
                            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                            Start Creating
                        </span>
                    </ShimmerButton>
                    <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 h-12 px-8 text-base" onClick={() => navigate('/explore')}>
                        Explore Prompts
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 animate-fade-in [animation-delay:0.4s]">
                    <div className="text-center space-y-2 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
                            <TrendingUp className="mr-2 h-6 w-6" />
                            <NumberTicker value={50000} />+
                        </div>
                        <p className="text-sm text-white/70">Active Prompts</p>
                    </div>
                    <div className="text-center space-y-2 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
                            <Users className="mr-2 h-6 w-6" />
                            <NumberTicker value={12000} />+
                        </div>
                        <p className="text-sm text-white/70">Creators</p>
                    </div>
                    <div className="text-center space-y-2 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
                            <Zap className="mr-2 h-6 w-6" />
                            <NumberTicker value={1000000} />+
                        </div>
                        <p className="text-sm text-white/70">Downloads</p>
                    </div>
                </div>

                {/* Global Community Globe */}
                <div className="flex flex-col items-center space-y-4 pt-12 animate-fade-in [animation-delay:0.6s]">
                    <h3 className="text-lg font-semibold text-white/80 backdrop-blur-sm bg-white/5 rounded-lg px-6 py-2 border border-white/10">
                        Join creators worldwide
                    </h3>
                    <div className="relative">
                        <Globe className="max-w-[300px] mx-auto" />
                    </div>
                </div>
            </div>
        </AuroraBackground>
    );
}
