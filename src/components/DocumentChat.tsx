import { Bot, Brain, FileText, Lightbulb, MessageSquare, Search, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDocumentAnalysis } from '../hooks/use-document-analysis';
import { KnowledgeBase, useDocumentKnowledge } from '../hooks/use-document-knowledge';
import { useLocalLlama } from '../hooks/use-local-llama';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface ChatMessage {
    id: string;
    type: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    relatedDocuments?: string[];
    confidence?: number;
}

interface DocumentChatProps {
    knowledgeBase: KnowledgeBase;
    className?: string;
}

export const DocumentChat = ({ knowledgeBase, className }: DocumentChatProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const { searchKnowledge, buildDocumentContext } = useDocumentKnowledge();
    const { generateDocumentQuestions, extractKeyTerms } = useDocumentAnalysis();
    const { generateText } = useLocalLlama();

    // Initialize with welcome message and suggested questions
    useEffect(() => {
        const initializeChat = async () => {
            // Add welcome message
            const welcomeMessage: ChatMessage = {
                id: 'welcome',
                type: 'system',
                content: `Welcome to Document Chat! I can help you explore "${knowledgeBase.name}" with ${knowledgeBase.sources.length} documents. Ask me anything about the content.`,
                timestamp: new Date()
            };
            setMessages([welcomeMessage]);

            // Generate suggested questions from the first document
            if (knowledgeBase.sources.length > 0) {
                try {
                    const questions = await generateDocumentQuestions(
                        knowledgeBase.sources[0].extractedText
                    );
                    setSuggestedQuestions(questions.slice(0, 6));
                } catch (error) {
                    console.error('Failed to generate questions:', error);
                    setSuggestedQuestions([
                        'What is this document about?',
                        'What are the main topics covered?',
                        'Can you summarize the key points?'
                    ]);
                }
            }
        };

        initializeChat();
    }, [knowledgeBase]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (messageText?: string) => {
        const text = messageText || input;
        if (!text.trim() || isLoading) return;

        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: text.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Search for relevant document context
            const relevantChunks = searchKnowledge(text, knowledgeBase.id);
            const documentContext = buildDocumentContext(text, knowledgeBase.id);

            // Create enhanced prompt with document context
            const prompt = `You are a helpful AI assistant specializing in document analysis and Q&A. Answer the user's question based on the provided document context. Be accurate, helpful, and cite specific information when possible.

${documentContext}

User Question: ${text}

Please provide a comprehensive answer based on the document content above. If the documents don't contain enough information to fully answer the question, mention what information is available and what might be missing.`;

            const response = await generateText(prompt, 'llama3.2:latest', {
                temperature: 0.4,
                max_tokens: 800
            });

            // Add assistant response
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: response,
                timestamp: new Date(),
                relatedDocuments: relevantChunks.map(chunk => chunk.metadata.fileName).filter(Boolean),
                confidence: relevantChunks.length > 0 ? 0.8 : 0.4
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: 'I apologize, but I encountered an error while processing your question. Please try again.',
                timestamp: new Date(),
                confidence: 0
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestedQuestion = (question: string) => {
        handleSendMessage(question);
    };

    return (
        <Card className={className}>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Document Chat
                    <Badge variant="secondary" className="ml-auto">
                        {knowledgeBase.sources.length} docs
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Chat Messages */}
                <ScrollArea className="h-96 w-full border rounded-lg p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="flex gap-3">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarFallback>
                                        {message.type === 'user' ? (
                                            <User className="w-4 h-4" />
                                        ) : message.type === 'assistant' ? (
                                            <Bot className="w-4 h-4" />
                                        ) : (
                                            <Brain className="w-4 h-4" />
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">
                                            {message.type === 'user' ? 'You' :
                                                message.type === 'assistant' ? 'AI Assistant' : 'System'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {message.timestamp.toLocaleTimeString()}
                                        </span>
                                        {message.confidence !== undefined && (
                                            <Badge variant={message.confidence > 0.7 ? 'default' : 'secondary'} className="text-xs">
                                                {Math.round(message.confidence * 100)}% confident
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="text-sm leading-relaxed">
                                        {message.content}
                                    </div>
                                    {message.relatedDocuments && message.relatedDocuments.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {message.relatedDocuments.map((doc, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    <FileText className="w-3 h-3 mr-1" />
                                                    {doc}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarFallback>
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="text-sm text-muted-foreground">
                                        AI is thinking...
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Suggested Questions */}
                {suggestedQuestions.length > 0 && messages.length <= 1 && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Lightbulb className="w-4 h-4" />
                            Suggested Questions
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {suggestedQuestions.map((question, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className="text-left justify-start h-auto p-3 text-xs"
                                >
                                    {question}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                <Separator />

                {/* Input Area */}
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question about the documents..."
                        className="flex-1"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={() => handleSendMessage()}
                        disabled={!input.trim() || isLoading}
                    >
                        <Search className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default DocumentChat;
