import { Particles } from '@/components/magicui/particles';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useAIAssistant } from '@/hooks/use-ai-assistant';
import {
    Bot,
    Brain,
    HelpCircle,
    Lightbulb,
    Loader2,
    Send,
    Sparkles,
    User,
    Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AssistantMessage {
    id: string;
    type: 'user' | 'assistant' | 'suggestion';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}

export const AIAssistantWidget = () => {
    const { getAIAssistance, getSuggestedQuestions } = useAIAssistant();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<AssistantMessage[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [streamingResponse, setStreamingResponse] = useState('');
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize with welcome message and suggestions
    useEffect(() => {
        const siteContext = {
            currentPage: location.pathname,
            userRole: 'user' as const,
            recentActions: [],
            preferences: {}
        };

        const suggestions = getSuggestedQuestions(siteContext);
        setSuggestedQuestions(suggestions);

        if (messages.length === 0) {
            setMessages([{
                id: 'welcome',
                type: 'assistant',
                content: `👋 Hi! I'm your Promptfolio AI assistant. I can help you navigate the platform, understand AI models, and maximize your creative potential.\n\nWhat would you like to know?`,
                timestamp: new Date()
            }]);
        }
    }, [location.pathname, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, streamingResponse]);

    const handleSendMessage = async () => {
        if (!currentInput.trim() || isLoading) return;

        const userMessage: AssistantMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: currentInput.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const query = currentInput.trim();
        setCurrentInput('');
        setIsLoading(true);
        setStreamingResponse('');

        try {
            const siteContext = {
                currentPage: location.pathname,
                userRole: 'user' as const,
                recentActions: messages.slice(-3).map(m => m.content),
                preferences: {}
            };

            // Add placeholder for assistant response
            const assistantMessage: AssistantMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: '',
                timestamp: new Date(),
                isStreaming: true
            };
            setMessages(prev => [...prev, assistantMessage]);

            let fullResponse = '';
            await getAIAssistance(
                query,
                siteContext,
                (chunk: string) => {
                    fullResponse += chunk;
                    setStreamingResponse(fullResponse);

                    // Update the last message
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = {
                            ...updated[updated.length - 1],
                            content: fullResponse,
                            isStreaming: true
                        };
                        return updated;
                    });
                }
            );

            // Finalize the message
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: fullResponse,
                    isStreaming: false
                };
                return updated;
            });

        } catch (error) {
            console.error('AI Assistant error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                type: 'assistant',
                content: "I'm sorry, I encountered an error. Please make sure your local AI is running and try again.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
            setStreamingResponse('');
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setCurrentInput(suggestion);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* Floating Assistant Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <div className="relative">
                            <ShimmerButton className="relative rounded-full w-16 h-16 p-0">
                                <div className="relative z-10 flex items-center justify-center w-full h-full">
                                    <Bot className="w-8 h-8 text-white" />
                                </div>
                            </ShimmerButton>
                            <div className="absolute -top-1 -right-1">
                                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                            </div>
                            <Particles
                                className="absolute inset-0 w-16 h-16 rounded-full"
                                quantity={30}
                                ease={80}
                                color="#ffffff"
                                refresh
                            />
                        </div>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[500px] sm:w-[600px] p-0 flex flex-col">
                        <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                                            <Brain className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                                    </div>
                                    <div>
                                        <SheetTitle className="text-xl">AI Assistant</SheetTitle>
                                        <SheetDescription>
                                            Powered by your local Llama model
                                        </SheetDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Online
                                </Badge>
                            </div>
                        </SheetHeader>

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] rounded-lg p-4 ${message.type === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted border border-border/50'
                                                }`}>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    {message.type === 'user' ? (
                                                        <User className="w-4 h-4" />
                                                    ) : (
                                                        <Bot className="w-4 h-4 text-primary" />
                                                    )}
                                                    <span className="text-xs opacity-70">
                                                        {formatTime(message.timestamp)}
                                                    </span>
                                                </div>
                                                <div className="whitespace-pre-wrap text-sm">
                                                    {message.isStreaming && isLoading ? (
                                                        <div className="text-sm">
                                                            {message.content}
                                                        </div>
                                                    ) : (
                                                        message.content
                                                    )}
                                                    {message.isStreaming && isLoading && (
                                                        <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* Suggested Questions */}
                            {suggestedQuestions.length > 0 && messages.length <= 1 && (
                                <div className="p-4 border-t bg-muted/30">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm font-medium">Suggested Questions</span>
                                    </div>
                                    <div className="space-y-2">
                                        {suggestedQuestions.slice(0, 3).map((suggestion, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                className="w-full justify-start text-left h-auto p-3 text-sm"
                                                onClick={() => handleSuggestionClick(suggestion)}
                                            >
                                                <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                                {suggestion}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-4 border-t bg-background">
                                <div className="flex space-x-2">
                                    <Textarea
                                        placeholder="Ask me anything about Promptfolio..."
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="min-h-[60px] resize-none"
                                        disabled={isLoading}
                                    />
                                    <div className="flex flex-col space-y-2">
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!currentInput.trim() || isLoading}
                                            className="h-[60px] px-4"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                    <span>Press Enter to send, Shift+Enter for new line</span>
                                    <div className="flex items-center space-x-1">
                                        <Sparkles className="w-3 h-3" />
                                        <span>AI-powered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};
