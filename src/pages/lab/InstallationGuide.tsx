import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    CheckCircle,
    Copy,
    Download,
    ExternalLink,
    Info,
    Laptop,
    MonitorSpeaker,
    Play,
    Settings,
    Smartphone,
    Sparkles,
    Terminal,
    Zap
} from "lucide-react";

export default function InstallationGuide() {
    const platforms = [
        {
            name: "Windows",
            icon: MonitorSpeaker,
            description: "Windows 10/11 installation guide",
            requirements: ["Windows 10 or later", "8GB RAM minimum", "NVIDIA GTX 1060 or better", "20GB free space"]
        },
        {
            name: "macOS",
            icon: Laptop,
            description: "macOS installation guide",
            requirements: ["macOS 11.0 or later", "8GB RAM minimum", "Apple Silicon or Intel", "15GB free space"]
        },
        {
            name: "Linux",
            icon: Terminal,
            description: "Linux installation guide",
            requirements: ["Ubuntu 20.04+ or equivalent", "8GB RAM minimum", "NVIDIA GTX 1060 or better", "20GB free space"]
        },
        {
            name: "Mobile",
            icon: Smartphone,
            description: "Mobile app installation",
            requirements: ["iOS 14+ or Android 8+", "2GB RAM minimum", "5GB free space", "Internet connection"]
        }
    ];

    const installSteps = [
        {
            step: 1,
            title: "Download Promptfolio",
            description: "Get the latest version from our official website",
            code: "curl -fsSL https://install.promptfolio.com | sh",
            important: true
        },
        {
            step: 2,
            title: "Install Dependencies",
            description: "Install required system dependencies",
            code: "promptfolio install --deps",
            important: false
        },
        {
            step: 3,
            title: "Initialize Workspace",
            description: "Set up your creative workspace",
            code: "promptfolio init my-workspace",
            important: false
        },
        {
            step: 4,
            title: "Verify Installation",
            description: "Check that everything is working correctly",
            code: "promptfolio doctor",
            important: true
        }
    ];

    const troubleshooting = [
        {
            issue: "Installation fails with permission error",
            solution: "Run with elevated privileges: sudo promptfolio install",
            severity: "error"
        },
        {
            issue: "GPU not detected or compatible",
            solution: "Install latest GPU drivers and restart system",
            severity: "warning"
        },
        {
            issue: "Python version incompatibility",
            solution: "Use Python 3.8+ or install via conda environment",
            severity: "info"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <div className="relative flex justify-center mb-6">
                                <div className="relative">
                                    <Download className="h-16 w-16 text-primary animate-glow-pulse" />
                                    <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full animate-ping" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-glow-pulse hover:scale-105 transition-transform duration-300 cursor-pointer mb-6">
                                Installation Guide
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Get started with Promptfolio in minutes. Complete installation guide for all platforms.
                            </p>
                        </div>

                        {/* Quick Start Alert */}
                        <Alert className="mb-8 border-primary/20 bg-primary/5">
                            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
                            <AlertDescription className="text-primary">
                                <strong>Quick Start:</strong> Run our one-line installer for automatic setup on most systems.
                            </AlertDescription>
                        </Alert>
                    </div>
                </section>

                {/* Platform Selection */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Platform</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {platforms.map((platform) => {
                                const Icon = platform.icon;
                                return (
                                    <Card key={platform.name} className="bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                                        <CardHeader className="text-center">
                                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 relative group-hover:bg-primary/20 transition-colors">
                                                <Icon className="h-6 w-6 text-primary" />
                                                <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <CardTitle className="group-hover:text-primary transition-colors">
                                                {platform.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {platform.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-muted-foreground mb-2">Requirements:</div>
                                                {platform.requirements.map((req, index) => (
                                                    <div key={index} className="text-xs text-muted-foreground flex items-center">
                                                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                                        {req}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Installation Steps */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-4xl">
                        <Tabs defaultValue="quick-install" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-card/50">
                                <TabsTrigger value="quick-install" className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    Quick Install
                                </TabsTrigger>
                                <TabsTrigger value="manual-install" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Manual Install
                                </TabsTrigger>
                                <TabsTrigger value="docker" className="flex items-center gap-2">
                                    <MonitorSpeaker className="h-4 w-4" />
                                    Docker
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="quick-install" className="mt-8">
                                <Card className="bg-card/50 border-border/50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-primary animate-glow-pulse" />
                                            One-Line Installation
                                        </CardTitle>
                                        <CardDescription>
                                            Automatic installation with dependency management
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm relative group">
                                            <code className="text-primary">curl -fsSL https://install.promptfolio.com | sh</code>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Alert>
                                            <Info className="h-4 w-4" />
                                            <AlertDescription>
                                                This installer will automatically detect your system and install all necessary components.
                                            </AlertDescription>
                                        </Alert>

                                        <div className="flex gap-4">
                                            <Button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                                                <Play className="h-4 w-4 mr-2" />
                                                Run Installer
                                            </Button>
                                            <Button variant="outline">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                View on GitHub
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="manual-install" className="mt-8">
                                <div className="space-y-6">
                                    {installSteps.map((step) => (
                                        <Card key={step.step} className="bg-card/50 border-border/50">
                                            <CardHeader>
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step.important
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted text-muted-foreground"
                                                        }`}>
                                                        {step.step}
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-lg">{step.title}</CardTitle>
                                                        <CardDescription>{step.description}</CardDescription>
                                                    </div>
                                                    {step.important && (
                                                        <Badge className="ml-auto bg-primary/10 text-primary">
                                                            <Sparkles className="h-3 w-3 mr-1 animate-glow-pulse" />
                                                            Important
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm relative group">
                                                    <code className="text-primary">{step.code}</code>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="docker" className="mt-8">
                                <Card className="bg-card/50 border-border/50">
                                    <CardHeader>
                                        <CardTitle>Docker Installation</CardTitle>
                                        <CardDescription>
                                            Run Promptfolio in a containerized environment
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm relative group">
                                            <code className="text-primary">docker run -p 8080:8080 promptfolio/app:latest</code>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Alert>
                                            <Info className="h-4 w-4" />
                                            <AlertDescription>
                                                Docker installation includes all dependencies and runs in an isolated environment.
                                            </AlertDescription>
                                        </Alert>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Troubleshooting */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Troubleshooting</h2>

                        <div className="space-y-4">
                            {troubleshooting.map((item, index) => {
                                const severityStyles = {
                                    error: "border-red-500/20 bg-red-500/5",
                                    warning: "border-yellow-500/20 bg-yellow-500/5",
                                    info: "border-blue-500/20 bg-blue-500/5"
                                };

                                const severityIcons = {
                                    error: AlertTriangle,
                                    warning: AlertTriangle,
                                    info: Info
                                };

                                const Icon = severityIcons[item.severity as keyof typeof severityIcons];

                                return (
                                    <Alert key={index} className={severityStyles[item.severity as keyof typeof severityStyles]}>
                                        <Icon className="h-4 w-4" />
                                        <AlertDescription>
                                            <div className="font-medium mb-1">{item.issue}</div>
                                            <div className="text-sm text-muted-foreground">{item.solution}</div>
                                        </AlertDescription>
                                    </Alert>
                                );
                            })}
                        </div>

                        <Separator className="my-8" />

                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
                            <p className="text-muted-foreground mb-6">
                                Can't find what you're looking for? Our community is here to help.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Community Forum
                                </Button>
                                <Button variant="outline">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Discord Support
                                </Button>
                                <Button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                                    <Sparkles className="h-4 w-4 mr-2 animate-glow-pulse" />
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
