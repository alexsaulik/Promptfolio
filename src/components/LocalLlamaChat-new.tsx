import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useLocalLlama } from '@/hooks/use-local-llama';
import {
    Bot,
    CheckCircle,
    Cpu,
    Loader2,
    MessageSquare,
    Send,
    Settings,
    Trash2,
    User,
    XCircle,
    Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ChatMessage {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    model?: string;
    timestamp: Date;
}

export const LocalLlamaChat = () => {
    const {
        generateText,
        generateStreamingText,
        getAvailableModels,
        checkOllamaStatus,
        isLoading,
        error
    } = useLocalLlama();

    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentStreamingResponse, setCurrentStreamingResponse] = useState('');
    const [isStreamMode, setIsStreamMode] = useState(true);
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState('llama3.2:latest');
    const [isOllamaRunning, setIsOllamaRunning] = useState(false);
    const [temperature, setTemperature] = useState([0.7]);
    const [maxTokens, setMaxTokens] = useState([500]);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Check Ollama status on mount
    useEffect(() => {
        const checkStatus = async () => {
            const status = await checkOllamaStatus();
            setIsOllamaRunning(status);

            if (status) {
                const models = await getAvailableModels();
                setAvailableModels(models);
                if (models.length > 0 && !models.includes(selectedModel)) {
                    setSelectedModel(models[0]);
                }
            }
        };

        checkStatus();
    }, [selectedModel]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [chatHistory, currentStreamingResponse]);

    const handleSubmit = async () => {
        if (!prompt.trim()) return;

        // Add user message to chat history
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: prompt.trim(),
            timestamp: new Date()
        };

        setChatHistory(prev => [...prev, userMessage]);
        const currentPrompt = prompt.trim();
        setPrompt(''); // Clear input immediately

        try {
            if (isStreamMode) {
                setCurrentStreamingResponse('');

                // Add placeholder for assistant response
                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    content: '',
                    model: selectedModel,
                    timestamp: new Date()
                };
                setChatHistory(prev => [...prev, assistantMessage]);

                let fullResponse = '';
                await generateStreamingText(
                    currentPrompt,
                    selectedModel,
                    (chunk: string) => {
                        fullResponse += chunk;
                        setCurrentStreamingResponse(fullResponse);

                        // Update the last message in chat history
                        setChatHistory(prev => {
                            const updated = [...prev];
                            updated[updated.length - 1] = {
                                ...updated[updated.length - 1],
                                content: fullResponse
                            };
                            return updated;
                        });
                    },
                    {
                        temperature: temperature[0],
                        max_tokens: maxTokens[0]
                    }
                );
                setCurrentStreamingResponse('');
            } else {
                const result = await generateText(currentPrompt, selectedModel, {
                    temperature: temperature[0],
                    max_tokens: maxTokens[0]
                });

                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    content: result,
                    model: selectedModel,
                    timestamp: new Date()
                };

                setChatHistory(prev => [...prev, assistantMessage]);
            }
        } catch (err) {
            console.error('Generation error:', err);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const clearChat = () => {
        setChatHistory([]);
        setCurrentStreamingResponse('');
    };

    const examplePrompts = [
        "Write a creative short story about AI and humans working together",
        "Explain quantum computing in simple terms",
        "Create a recipe for a futuristic dish",
        "Write a poem about coding",
        "Explain the concept of recursion with an example"
    ];

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Bot className="w-8 h-8 text-primary" />
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${isOllamaRunning ? 'bg-green-500' : 'bg-red-500'
                                    }`} />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Local Llama Chat</CardTitle>
                                <CardDescription>
                                    Chat with your locally installed Llama model
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant={isOllamaRunning ? "default" : "destructive"}>
                                {isOllamaRunning ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Connected
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4 mr-1" />
                                        Disconnected
                                    </>
                                )}
                            </Badge>
                            {chatHistory.length > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearChat}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Clear Chat
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Connection Status */}
            {!isOllamaRunning && (
                <Alert>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                        Ollama is not running. Please start Ollama and make sure it's available at http://localhost:11434
                        <br />
                        <strong>Quick start:</strong> Run <code>ollama serve</code> in your terminal
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Area */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Chat History */}
                    <Card className="h-[500px] flex flex-col">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Conversation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col min-h-0">
                            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                                {chatHistory.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>Start a conversation with your local Llama model</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {chatHistory.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[80%] rounded-lg p-3 ${message.type === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted'
                                                    }`}>
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        {message.type === 'user' ? (
                                                            <User className="w-4 h-4" />
                                                        ) : (
                                                            <Bot className="w-4 h-4" />
                                                        )}
                                                        <span className="text-xs opacity-70">
                                                            {formatTime(message.timestamp)}
                                                        </span>
                                                        {message.model && (
                                                            <Badge variant="outline" className="text-xs">
                                                                {message.model}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="whitespace-pre-wrap">
                                                        {message.content}
                                                        {message.type === 'assistant' &&
                                                            message.id === chatHistory[chatHistory.length - 1]?.id &&
                                                            isLoading && (
                                                                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Input Area */}
                    <Card>
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="prompt">Your Message</Label>
                                    <Textarea
                                        id="prompt"
                                        placeholder="Ask me anything... (Press Enter to send, Shift+Enter for new line)"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="min-h-[80px] mt-2"
                                    />
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={!prompt.trim() || isLoading || !isOllamaRunning}
                                    className="w-full"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>

                                {error && (
                                    <Alert variant="destructive">
                                        <XCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Settings Sidebar */}
                <div className="space-y-4">
                    {/* Model Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <Settings className="w-5 h-5 mr-2" />
                                Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="model-select">Model</Label>
                                <Select value={selectedModel} onValueChange={setSelectedModel}>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableModels.map((model) => (
                                            <SelectItem key={model} value={model}>
                                                {model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Temperature: {temperature[0]}</Label>
                                <Slider
                                    value={temperature}
                                    onValueChange={setTemperature}
                                    max={2}
                                    min={0}
                                    step={0.1}
                                    className="mt-2"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Higher = more creative, Lower = more focused
                                </p>
                            </div>

                            <div>
                                <Label>Max Tokens: {maxTokens[0]}</Label>
                                <Slider
                                    value={maxTokens}
                                    onValueChange={setMaxTokens}
                                    max={2000}
                                    min={50}
                                    step={50}
                                    className="mt-2"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Maximum response length
                                </p>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Label>Response Mode</Label>
                                <Button
                                    variant={isStreamMode ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setIsStreamMode(true)}
                                    className="justify-start"
                                >
                                    <Zap className="w-4 h-4 mr-2" />
                                    Streaming
                                </Button>
                                <Button
                                    variant={!isStreamMode ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setIsStreamMode(false)}
                                    className="justify-start"
                                >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Standard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Example Prompts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Prompts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {examplePrompts.map((example, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPrompt(example)}
                                        className="text-left h-auto p-3 w-full justify-start"
                                    >
                                        {example}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Available Models */}
                    {availableModels.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                    <Cpu className="w-5 h-5 mr-2" />
                                    Available Models
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {availableModels.map((model) => (
                                        <div key={model} className="flex items-center justify-between">
                                            <Badge
                                                variant={model === selectedModel ? "default" : "outline"}
                                                className="cursor-pointer"
                                                onClick={() => setSelectedModel(model)}
                                            >
                                                {model}
                                            </Badge>
                                            {model === selectedModel && (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
