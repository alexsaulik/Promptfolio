import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { HeroSection } from "@/components/sections/HeroSection";
import { PromptCategoriesGrid } from "@/components/sections/PromptCategoriesGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Bot,
    Brain,
    Rocket,
    Shield,
    Sparkles,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    const [statsCount, setStatsCount] = useState({
        prompts: 0,
        models: 0,
        users: 0,
        workflows: 0
    });

    // Animate stats on load
    useEffect(() => {
        const targetStats = { prompts: 25000, models: 17, users: 50000, workflows: 1200 };
        const duration = 2000;
        const intervals = 50;
        const increment = duration / intervals;

        Object.keys(targetStats).forEach((key) => {
            const target = targetStats[key as keyof typeof targetStats];
            const step = target / intervals;
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                setStatsCount(prev => ({ ...prev, [key]: Math.floor(current) }));
            }, increment);
        });
    }, []);

    const aiCapabilities = [
        {
            title: "AI Assistant",
            description: "Your personal AI guide powered by local Llama models",
            icon: <Brain className="w-6 h-6" />,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            title: "100% Private AI",
            description: "Run powerful AI models locally with complete privacy",
            icon: <Shield className="w-6 h-6" />,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        {
            title: "Smart Workflows",
            description: "Professional AI workflows for creative projects",
            icon: <Rocket className="w-6 h-6" />,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Enhanced Hero Section */}
            <section className="relative">
                <HeroSection />

                {/* AI Features Section */}
                <div className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                <Brain className="w-4 h-4 mr-2" />
                                AI-Powered Platform
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Your Personal AI Assistant
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Get intelligent help, personalized recommendations, and expert guidance
                                powered by your local AI models.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {aiCapabilities.map((capability, index) => (
                                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300">
                                    <CardHeader>
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${capability.bgColor} ${capability.color}`}>
                                                {capability.icon}
                                            </div>
                                            <CardTitle className="text-lg">{capability.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{capability.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div className="text-center p-4 bg-card rounded-lg border">
                                <div className="text-2xl font-bold text-primary">{statsCount.prompts.toLocaleString()}+</div>
                                <div className="text-sm text-muted-foreground">AI Prompts</div>
                            </div>
                            <div className="text-center p-4 bg-card rounded-lg border">
                                <div className="text-2xl font-bold text-primary">{statsCount.models}+</div>
                                <div className="text-sm text-muted-foreground">AI Models</div>
                            </div>
                            <div className="text-center p-4 bg-card rounded-lg border">
                                <div className="text-2xl font-bold text-primary">{statsCount.users.toLocaleString()}+</div>
                                <div className="text-sm text-muted-foreground">Creators</div>
                            </div>
                            <div className="text-center p-4 bg-card rounded-lg border">
                                <div className="text-2xl font-bold text-primary">{statsCount.workflows.toLocaleString()}+</div>
                                <div className="text-sm text-muted-foreground">Workflows</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <ShimmerButton
                                className="bg-gradient-to-r from-purple-600 to-pink-600"
                                onClick={() => navigate('/lab/local-ai')}
                            >
                                <Bot className="w-5 h-5 mr-2" />
                                Try AI Assistant
                            </ShimmerButton>

                            <RainbowButton onClick={() => navigate('/explore')}>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Explore Prompts
                            </RainbowButton>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/lab')}
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                Labs & Tools
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <PromptCategoriesGrid />
            <TestimonialsSection />
            <Footer />
        </div>
    );
}
