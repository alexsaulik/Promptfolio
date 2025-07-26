import { LocalLlamaChat } from '@/components/LocalLlamaChat';
import { ModelLibrary } from '@/components/ModelLibrary';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Brain,
    Clock,
    Cpu,
    Download,
    ExternalLink,
    HardDrive,
    Library,
    Server,
    Shield,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export const LocalAI = () => {
    const [activeTab, setActiveTab] = useState('chat');

    const features = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "100% Private",
            description: "Your data never leaves your machine. Complete privacy and control."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "No API delays. Instant responses with local processing power."
        },
        {
            icon: <HardDrive className="w-6 h-6" />,
            title: "No Usage Limits",
            description: "Generate unlimited content without rate limits or costs."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Always Available",
            description: "Work offline anytime. No internet connection required."
        }
    ];

    const supportedModels = [
        { name: "Llama 3.1 8B", size: "4.7GB", description: "Best balance of speed and quality" },
        { name: "Llama 3.1 70B", size: "40GB", description: "Highest quality responses" },
        { name: "Code Llama", size: "3.8GB", description: "Specialized for code generation" },
        { name: "Mistral 7B", size: "4.1GB", description: "Fast and efficient" },
        { name: "Neural Chat", size: "4.1GB", description: "Optimized for conversations" },
        { name: "Orca Mini", size: "1.9GB", description: "Lightweight option" }
    ];

    const installationSteps = [
        {
            step: 1,
            title: "Install Ollama",
            description: "Download and install Ollama from ollama.ai",
            command: "Visit https://ollama.ai and download for Windows"
        },
        {
            step: 2,
            title: "Pull a Model",
            description: "Download your preferred model",
            command: "ollama pull llama3.1"
        },
        {
            step: 3,
            title: "Start Ollama",
            description: "Run the Ollama service",
            command: "ollama serve"
        },
        {
            step: 4,
            title: "Test Connection",
            description: "Your model is ready to use!",
            command: "Use the chat interface above"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="flex justify-center">
                        <div className="relative">
                            <Brain className="w-16 h-16 text-primary" />
                            <div className="absolute -bottom-1 -right-1">
                                <Server className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Local AI Integration</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Run powerful AI models directly on your machine. Complete privacy, unlimited usage,
                        and lightning-fast responses with your local Llama installation.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="flex justify-center text-primary mb-2">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="chat" className="flex items-center">
                            <Brain className="w-4 h-4 mr-2" />
                            Live Chat
                        </TabsTrigger>
                        <TabsTrigger value="library" className="flex items-center">
                            <Library className="w-4 h-4 mr-2" />
                            Model Library
                        </TabsTrigger>
                        <TabsTrigger value="models" className="flex items-center">
                            <Cpu className="w-4 h-4 mr-2" />
                            Quick Models
                        </TabsTrigger>
                        <TabsTrigger value="setup" className="flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Setup
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="chat" className="space-y-6">
                        <LocalLlamaChat />
                    </TabsContent>

                    <TabsContent value="library" className="space-y-6">
                        <ModelLibrary />
                    </TabsContent>

                    <TabsContent value="models" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Supported Models</CardTitle>
                                <CardDescription>
                                    Choose from a variety of models optimized for different tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {supportedModels.map((model, index) => (
                                        <Card key={index} className="border-2">
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">{model.name}</CardTitle>
                                                    <Badge variant="outline">{model.size}</Badge>
                                                </div>
                                                <CardDescription>{model.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => {
                                                        const command = `ollama pull ${model.name.toLowerCase().replace(/\s+/g, '')}`;
                                                        navigator.clipboard.writeText(command);
                                                    }}
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Copy Install Command
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="setup" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Quick Setup Guide</CardTitle>
                                <CardDescription>
                                    Get your local AI up and running in just a few minutes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {installationSteps.map((step) => (
                                        <div key={step.step} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                                                {step.step}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-lg">{step.title}</h3>
                                                <p className="text-muted-foreground mb-2">{step.description}</p>
                                                <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                                                    {step.command}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                        💡 Pro Tips
                                    </h4>
                                    <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                                        <li>• Start with Llama 3.1 8B for the best balance of speed and quality</li>
                                        <li>• Ensure you have at least 8GB RAM for smooth operation</li>
                                        <li>• Use SSD storage for faster model loading</li>
                                        <li>• GPU acceleration is optional but recommended for larger models</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* External Resources */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Additional Resources</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-auto p-4 flex items-center justify-start">
                                        <ExternalLink className="w-5 h-5 mr-3" />
                                        <div className="text-left">
                                            <div className="font-semibold">Ollama Documentation</div>
                                            <div className="text-sm text-muted-foreground">Official setup guides</div>
                                        </div>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex items-center justify-start">
                                        <ExternalLink className="w-5 h-5 mr-3" />
                                        <div className="text-left">
                                            <div className="font-semibold">Model Library</div>
                                            <div className="text-sm text-muted-foreground">Browse available models</div>
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default LocalAI;
