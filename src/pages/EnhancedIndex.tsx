import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Meteors } from "@/components/magicui/meteors";
import { Particles } from "@/components/magicui/particles";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextReveal } from "@/components/magicui/text-reveal";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    Bot,
    Brain,
    Code,
    Palette,
    Rocket,
    Shield,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EnhancedIndex = () => {
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

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI Assistant",
            description: "Your personal AI guide powered by local Llama models. Get instant help, tutorials, and creative suggestions.",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            new: true
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "100% Private AI",
            description: "Run powerful AI models locally with Ollama. Complete privacy, unlimited usage, no data leaves your machine.",
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            hot: true
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "Creative Workflows",
            description: "Professional AI workflows for image generation, music production, and video enhancement.",
            color: "text-pink-500",
            bgColor: "bg-pink-500/10"
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: "Code Generation",
            description: "Advanced code generation with specialized models. From simple scripts to complex applications.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "17+ AI Models",
            description: "Access to cutting-edge models: GPT-4, Claude 3.5, Llama 3.1, DALL-E 3, Midjourney, and more.",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Creator Community",
            description: "Join thousands of AI creators sharing prompts, workflows, and creative techniques.",
            color: "text-cyan-500",
            bgColor: "bg-cyan-500/10"
        }
    ];

    const aiCapabilities = [
        {
            title: "Intelligent Site Navigation",
            description: "AI assistant helps users find exactly what they need",
            icon: <Target className="w-6 h-6" />
        },
        {
            title: "Personalized Recommendations",
            description: "Smart suggestions based on user behavior and preferences",
            icon: <TrendingUp className="w-6 h-6" />
        },
        {
            title: "Real-time Help & Tutorials",
            description: "Contextual assistance that adapts to current page and tasks",
            icon: <Rocket className="w-6 h-6" />
        }
    ];

    return (
        <div className="relative min-h-screen bg-background">
            <Header />

            {/* Hero Section with Warp Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <WarpBackground className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />
                </WarpBackground>
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color="#ffffff"
                    refresh
                />

                <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
                    <div className="mb-8">
                        <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Now with AI Assistant
                        </Badge>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Promptfolio
                    </h1>

                    <div className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        <TextReveal className="text-center">
                            The ultimate AI creativity platform with your personal AI assistant, private local models, and professional workflows.
                        </TextReveal>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <RainbowButton onClick={() => navigate('/explore')}>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Explore AI Prompts
                        </RainbowButton>

                        <ShimmerButton
                            className="bg-gradient-to-r from-purple-600 to-pink-600"
                            onClick={() => navigate('/lab/local-ai')}
                        >
                            <Bot className="w-5 h-5 mr-2" />
                            Try Local AI
                        </ShimmerButton>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate('/lab')}
                            className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        >
                            <Zap className="w-5 h-5 mr-2" />
                            Labs & Tools
                        </Button>
                    </div>

                    {/* Live Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <div className="text-3xl font-bold text-white">{statsCount.prompts.toLocaleString()}+</div>
                            <div className="text-sm text-muted-foreground">AI Prompts</div>
                        </div>
                        <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <div className="text-3xl font-bold text-white">{statsCount.models}+</div>
                            <div className="text-sm text-muted-foreground">AI Models</div>
                        </div>
                        <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <div className="text-3xl font-bold text-white">{statsCount.users.toLocaleString()}+</div>
                            <div className="text-sm text-muted-foreground">Creators</div>
                        </div>
                        <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <div className="text-3xl font-bold text-white">{statsCount.workflows.toLocaleString()}+</div>
                            <div className="text-sm text-muted-foreground">Workflows</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI-Powered Features */}
            <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <Brain className="w-4 h-4 mr-2" />
                            AI-Powered Platform
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Your Personal AI Assistant
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Get intelligent help, personalized recommendations, and expert guidance
                            powered by your local AI models. Complete privacy, unlimited usage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {aiCapabilities.map((capability, index) => (
                            <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                                <Meteors number={20} />
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            {capability.icon}
                                        </div>
                                        <CardTitle className="text-xl">{capability.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{capability.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button
                            size="lg"
                            onClick={() => navigate('/lab/local-ai')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            <Bot className="w-5 h-5 mr-2" />
                            Experience AI Assistant
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Everything You Need for AI Creativity
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            From prompt engineering to professional workflows,
                            discover the most comprehensive AI creativity platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="relative group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl ${feature.bgColor} ${feature.color}`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex space-x-1">
                                            {feature.new && (
                                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    NEW
                                                </Badge>
                                            )}
                                            {feature.hot && (
                                                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                    🔥 HOT
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Unleash Your AI Creativity?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join thousands of creators using AI to build the future of digital art,
                        content, and innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <RainbowButton onClick={() => navigate('/auth')}>
                            <Users className="w-5 h-5 mr-2" />
                            Join the Community
                        </RainbowButton>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate('/explore')}
                            className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Explore Now
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
