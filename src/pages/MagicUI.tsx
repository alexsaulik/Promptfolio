import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AnimatedBeamDemo } from '@/components/magicui/AnimatedBeamDemo';
import { AuroraTextDemo } from '@/components/magicui/AuroraTextDemo';
import { BorderBeamDemo } from '@/components/magicui/BorderBeamDemo';
import { MagicCardDemo } from '@/components/magicui/MagicCardDemo';
import { MeteorsDemo } from '@/components/magicui/MeteorsDemo';
import { NeonGradientCardDemo } from '@/components/magicui/NeonGradientCardDemo';
import { ParticlesDemo } from '@/components/magicui/ParticlesDemo';

const MagicUI = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="mb-12">
                        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                            Magic UI Effects
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10">
                            Explore our premium interactive UI elements designed for the Promptfolio platform
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
                                    Animated Beam
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    An animated beam of light which travels between components, perfect for showing
                                    connections between AI services and Suno integration.
                                </p>
                                <AnimatedBeamDemo />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
                                    Border Beam
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    A pulsing border effect that adds premium visual appeal to cards and containers.
                                </p>
                                <BorderBeamDemo />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
                                    Magic Card
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    A spotlight effect that follows your mouse cursor and highlights borders on hover.
                                </p>
                                <MagicCardDemo />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
                                    Meteors
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    A meteor shower effect perfect for creating dynamic backgrounds.
                                </p>
                                <MeteorsDemo />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
                                    Neon Gradient Card
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    A beautiful neon card effect that adds futuristic glow to your content.
                                </p>
                                <NeonGradientCardDemo />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
                                    Particles
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Interactive particles that respond to mouse movement, creating an engaging backdrop.
                                </p>
                                <ParticlesDemo />
                            </div>
                        </div>

                        <div className="mt-16">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent mb-4">
                                Aurora Text
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                A beautiful aurora text effect that adds dynamic color gradients to your typography.
                            </p>
                            <div className="p-6 border rounded-lg">
                                <AuroraTextDemo />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MagicUI;
