import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalLlama } from '@/hooks/use-local-llama';
import {
    Bot,
    Brain,
    CheckCircle,
    Clock,
    Code,
    Cpu,
    Download,
    ExternalLink,
    HardDrive,
    Image,
    Star,
    XCircle,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ModelInfo {
    name: string;
    displayName: string;
    description: string;
    category: 'general' | 'code' | 'creative' | 'reasoning';
    size: string;
    parameters: string;
    strengths: string[];
    useCase: string;
    speed: 'fast' | 'medium' | 'slow';
    quality: 'good' | 'better' | 'best';
    memoryUsage: string;
    installCommand: string;
    isInstalled?: boolean;
}

const MODEL_DATABASE: ModelInfo[] = [
    {
        name: 'llama3.2:latest',
        displayName: 'Llama 3.2',
        description: 'Meta\'s latest Llama model with improved reasoning and general knowledge capabilities.',
        category: 'general',
        size: '4.7GB',
        parameters: '8B',
        strengths: ['General reasoning', 'Conversation', 'Question answering', 'Summarization'],
        useCase: 'Best all-around model for most tasks. Great balance of speed and quality.',
        speed: 'fast',
        quality: 'better',
        memoryUsage: '6-8GB RAM',
        installCommand: 'ollama pull llama3.2'
    },
    {
        name: 'llama3.1:70b',
        displayName: 'Llama 3.1 70B',
        description: 'Large-scale Llama model with exceptional reasoning and knowledge depth.',
        category: 'reasoning',
        size: '40GB',
        parameters: '70B',
        strengths: ['Complex reasoning', 'Advanced math', 'Deep analysis', 'Expert knowledge'],
        useCase: 'For complex tasks requiring deep reasoning. Best quality but slower.',
        speed: 'slow',
        quality: 'best',
        memoryUsage: '48GB+ RAM',
        installCommand: 'ollama pull llama3.1:70b'
    },
    {
        name: 'codellama:latest',
        displayName: 'Code Llama',
        description: 'Specialized Llama model fine-tuned for code generation and programming tasks.',
        category: 'code',
        size: '3.8GB',
        parameters: '7B',
        strengths: ['Code generation', 'Code completion', 'Debugging', 'Code explanation'],
        useCase: 'Perfect for programming tasks, code review, and technical documentation.',
        speed: 'fast',
        quality: 'better',
        memoryUsage: '5-7GB RAM',
        installCommand: 'ollama pull codellama'
    },
    {
        name: 'mistral:latest',
        displayName: 'Mistral 7B',
        description: 'Efficient and fast model with good performance across various tasks.',
        category: 'general',
        size: '4.1GB',
        parameters: '7B',
        strengths: ['Fast responses', 'Good reasoning', 'Efficient', 'Multilingual'],
        useCase: 'Great for quick responses and when you need speed over maximum quality.',
        speed: 'fast',
        quality: 'good',
        memoryUsage: '5-6GB RAM',
        installCommand: 'ollama pull mistral'
    },
    {
        name: 'neural-chat:latest',
        displayName: 'Neural Chat',
        description: 'Conversational model optimized for natural dialogue and chat interactions.',
        category: 'general',
        size: '4.1GB',
        parameters: '7B',
        strengths: ['Natural conversation', 'Dialogue', 'Personality', 'Engagement'],
        useCase: 'Ideal for chatbots, virtual assistants, and interactive applications.',
        speed: 'fast',
        quality: 'good',
        memoryUsage: '5-6GB RAM',
        installCommand: 'ollama pull neural-chat'
    },
    {
        name: 'orca-mini:latest',
        displayName: 'Orca Mini',
        description: 'Lightweight model that performs well despite its small size.',
        category: 'general',
        size: '1.9GB',
        parameters: '3B',
        strengths: ['Lightweight', 'Fast', 'Low memory', 'Good for testing'],
        useCase: 'Perfect for testing, limited hardware, or when you need minimal resource usage.',
        speed: 'fast',
        quality: 'good',
        memoryUsage: '3-4GB RAM',
        installCommand: 'ollama pull orca-mini'
    }
];

export const ModelLibrary = () => {
    const { getAvailableModels, checkOllamaStatus } = useLocalLlama();
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [isOllamaRunning, setIsOllamaRunning] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const checkStatus = async () => {
            const status = await checkOllamaStatus();
            setIsOllamaRunning(status);

            if (status) {
                const models = await getAvailableModels();
                setAvailableModels(models);
            }
        };

        checkStatus();
    }, []);

    // Mark installed models
    const modelsWithStatus = MODEL_DATABASE.map(model => ({
        ...model,
        isInstalled: availableModels.includes(model.name)
    }));

    const filteredModels = selectedCategory === 'all'
        ? modelsWithStatus
        : modelsWithStatus.filter(model => model.category === selectedCategory);

    const getSpeedIcon = (speed: string) => {
        switch (speed) {
            case 'fast': return <Zap className="w-4 h-4 text-green-500" />;
            case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'slow': return <Clock className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getQualityStars = (quality: string) => {
        const stars = quality === 'best' ? 3 : quality === 'better' ? 2 : 1;
        return Array.from({ length: 3 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < stars ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
        ));
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'general': return <Brain className="w-5 h-5" />;
            case 'code': return <Code className="w-5 h-5" />;
            case 'creative': return <Image className="w-5 h-5" />;
            case 'reasoning': return <Cpu className="w-5 h-5" />;
            default: return <Bot className="w-5 h-5" />;
        }
    };

    const copyInstallCommand = (command: string) => {
        navigator.clipboard.writeText(command);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <div className="text-center">
                        <CardTitle className="text-3xl flex items-center justify-center mb-2">
                            <Bot className="w-8 h-8 mr-3 text-primary" />
                            Model Library
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Comprehensive guide to available Ollama models with detailed specifications and recommendations
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>

            {/* Connection Status */}
            {!isOllamaRunning && (
                <Alert>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                        Ollama is not running. Model installation status may not be accurate.
                        <br />
                        <strong>Start Ollama:</strong> Run <code>ollama serve</code> in your terminal
                    </AlertDescription>
                </Alert>
            )}

            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All Models</TabsTrigger>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
                    <TabsTrigger value="creative">Creative</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedCategory} className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Models</p>
                                        <p className="text-2xl font-bold">{MODEL_DATABASE.length}</p>
                                    </div>
                                    <Bot className="w-8 h-8 text-primary" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Installed</p>
                                        <p className="text-2xl font-bold">{availableModels.length}</p>
                                    </div>
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Avg Size</p>
                                        <p className="text-2xl font-bold">6.8GB</p>
                                    </div>
                                    <HardDrive className="w-8 h-8 text-blue-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Categories</p>
                                        <p className="text-2xl font-bold">4</p>
                                    </div>
                                    <Cpu className="w-8 h-8 text-purple-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Model Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredModels.map((model) => (
                            <Card key={model.name} className={`h-full ${model.isInstalled ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' : ''}`}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2">
                                            {getCategoryIcon(model.category)}
                                            <div>
                                                <CardTitle className="text-lg">{model.displayName}</CardTitle>
                                                <CardDescription className="text-sm">
                                                    {model.parameters} parameters • {model.size}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        {model.isInstalled && (
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Installed
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground">{model.description}</p>

                                    {/* Performance Metrics */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            {getSpeedIcon(model.speed)}
                                            <span className="text-sm">Speed</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {getQualityStars(model.quality)}
                                            <span className="text-sm ml-1">Quality</span>
                                        </div>
                                    </div>

                                    {/* Memory Usage */}
                                    <div className="flex items-center space-x-2">
                                        <HardDrive className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">{model.memoryUsage}</span>
                                    </div>

                                    {/* Use Case */}
                                    <div className="bg-muted/50 rounded-lg p-3">
                                        <p className="text-sm font-medium mb-1">Best For:</p>
                                        <p className="text-sm text-muted-foreground">{model.useCase}</p>
                                    </div>

                                    {/* Strengths */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">Strengths:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {model.strengths.map((strength, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {strength}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Install Button */}
                                    <Button
                                        variant={model.isInstalled ? "outline" : "default"}
                                        size="sm"
                                        className="w-full"
                                        onClick={() => copyInstallCommand(model.installCommand)}
                                        disabled={!isOllamaRunning}
                                    >
                                        {model.isInstalled ? (
                                            <>
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Copy Command
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4 mr-2" />
                                                Copy Install Command
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Installation Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Quick Installation Guide</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Install a Model</h3>
                            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                                ollama pull model-name
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Replace "model-name" with any model name from the cards above
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Hardware Recommendations</h3>
                            <ul className="text-sm space-y-1">
                                <li>• <strong>8GB RAM:</strong> Small models (3B-7B)</li>
                                <li>• <strong>16GB RAM:</strong> Medium models (7B-13B)</li>
                                <li>• <strong>32GB+ RAM:</strong> Large models (70B+)</li>
                                <li>• <strong>SSD Storage:</strong> Faster model loading</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
