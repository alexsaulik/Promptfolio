import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Sparkles } from "lucide-react";

export default function TitleEffectsDemo() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                                Title Effects Demo
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Preview all available title effects and animations
                            </p>
                        </div>

                        <div className="space-y-16">
                            {/* 1. Basic Gradient */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">1. Basic Gradient</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 2. Rainbow Gradient */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">2. Rainbow Gradient</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 3. Glow Pulse Animation */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">3. Glow Pulse Animation</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-glow-pulse mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + animate-glow-pulse
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 4. Float Animation */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">4. Float Animation</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-float mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + animate-float
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 5. Bounce Effect */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">5. Bounce Effect</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-bounce mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + animate-bounce
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 6. Drop Shadow */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">6. Drop Shadow</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent drop-shadow-2xl mb-4 [filter:drop-shadow(0_0_20px_rgba(147,51,234,0.5))]">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + drop-shadow-2xl + custom glow
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 7. 3D Perspective */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">7. 3D Perspective</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="[perspective:1000px]">
                                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4 transition-transform hover:scale-110 [transform:rotateX(15deg)_rotateY(-5deg)]">
                                            Your Amazing Title
                                        </h1>
                                    </div>
                                    <code className="text-sm text-muted-foreground">
                                        3D transform + hover:scale-110
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 8. Neon Glow */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">8. Neon Glow</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 animate-glow-pulse [text-shadow:0_0_5px_currentColor,0_0_10px_currentColor,0_0_20px_currentColor,0_0_40px_currentColor]">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        text-primary + multi-layer text-shadow + animate-glow-pulse
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 9. Scale on Hover */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">9. Scale on Hover</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + hover:scale-105 transition-transform duration-300
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 10. Letter Spacing + Glow */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">10. Letter Spacing + Glow</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent tracking-widest animate-glow-pulse mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + tracking-widest + animate-glow-pulse
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 11. Fade In Animation */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">11. Fade In Animation</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-fade-in mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + animate-fade-in
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 12. Scale In Animation */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">12. Scale In Animation</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-scale-in mb-4">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        ... + animate-scale-in
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 13. Combined Effects */}
                            <Card className="bg-card/50 border-primary/20 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4 text-primary">🌟 13. Combined Effects (Recommended)</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="relative">
                                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-all duration-300 tracking-wide mb-4 cursor-pointer [text-shadow:0_0_20px_rgba(147,51,234,0.3)]">
                                            Your Amazing Title
                                        </h1>
                                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg animate-pulse -z-10"></div>
                                    </div>
                                    <code className="text-sm text-muted-foreground">
                                        Multi-color gradient + glow-pulse + hover:scale + text-shadow + background glow
                                    </code>
                                </CardContent>
                            </Card>

                            {/* 14. Typewriter Effect (Simulated) */}
                            <Card className="bg-card/50 border-border/50 p-8">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-4">14. Typewriter Effect</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4 overflow-hidden border-r-2 border-primary mx-auto w-fit whitespace-nowrap animate-pulse">
                                        Your Amazing Title
                                    </h1>
                                    <code className="text-sm text-muted-foreground">
                                        Typewriter animation with cursor (simplified)
                                    </code>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="text-center space-y-6">
                                <h2 className="text-2xl font-bold text-primary mb-6">Choose Your Favorite!</h2>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Button className="bg-gradient-to-r from-primary to-primary-glow">
                                        <Heart className="h-4 w-4 mr-2" />
                                        Apply to All Pages
                                    </Button>
                                    <Button variant="outline">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Preview More
                                    </Button>
                                    <Button variant="outline">
                                        <Sparkles className="h-4 w-4 mr-2 animate-glow-pulse" />
                                        Mix & Match
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
