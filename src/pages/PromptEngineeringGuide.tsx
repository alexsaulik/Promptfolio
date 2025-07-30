import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Code, Image, MessageSquare, Music, Target, TrendingUp, Zap } from 'lucide-react';

export default function PromptEngineeringGuide() {
    const techniques = [
        {
            title: "Chain-of-Thought Prompting",
            description: "Break complex problems into step-by-step reasoning processes",
            modality: "text",
            difficulty: "intermediate",
            icon: <Brain className="w-5 h-5" />,
            examples: [
                "Let's work through this step by step: First, identify the key variables...",
                "To solve this problem, I need to: 1) Analyze the data, 2) Find patterns, 3) Draw conclusions"
            ],
            useCases: ["Mathematical problems", "Logical reasoning", "Complex analysis", "Decision making"]
        },
        {
            title: "Few-Shot Learning",
            description: "Provide 2-5 examples to establish patterns and output formats",
            modality: "multimodal",
            difficulty: "beginner",
            icon: <Target className="w-5 h-5" />,
            examples: [
                'Example 1: Input: "sad" → Output: "😢"\\nExample 2: Input: "happy" → Output: "😊"\\nNow convert: "excited" →',
                "Here are examples of good commit messages:\\n- feat: add user authentication\\n- fix: resolve login timeout issue\\nWrite a commit message for adding a search feature:"
            ],
            useCases: ["Pattern recognition", "Format consistency", "Style transfer", "Quick adaptation"]
        },
        {
            title: "Negative Prompting",
            description: "Explicitly exclude unwanted elements from generated content",
            modality: "image",
            difficulty: "beginner",
            icon: <Image className="w-5 h-5" />,
            examples: [
                'Positive: "Beautiful sunset over mountains" Negative: "blurry, low quality, watermark, text"',
                'Positive: "Professional headshot" Negative: "multiple faces, distorted features, hands, extra limbs"'
            ],
            useCases: ["Image quality control", "Artifact prevention", "Style refinement", "Content filtering"]
        },
        {
            title: "Role-Based Prompting",
            description: "Assign specific professional roles or expertise levels to the AI",
            modality: "text",
            difficulty: "beginner",
            icon: <MessageSquare className="w-5 h-5" />,
            examples: [
                "Act as a senior software engineer and review this code...",
                "You are a marketing specialist. Create a campaign strategy for...",
                "Respond as a patient teacher explaining complex concepts to a beginner..."
            ],
            useCases: ["Expert consultation", "Specialized knowledge", "Tone adjustment", "Context setting"]
        },
        {
            title: "Progressive Refinement",
            description: "Iteratively improve prompts through systematic testing and optimization",
            modality: "multimodal",
            difficulty: "advanced",
            icon: <TrendingUp className="w-5 h-5" />,
            examples: [
                "Round 1: Basic prompt → Analyze output → Round 2: Add specificity → Test → Round 3: Fine-tune parameters",
                'Start broad: "Write code" → Refine: "Write Python function" → Optimize: "Write Python function with error handling and docstrings"'
            ],
            useCases: ["Quality optimization", "Production readiness", "Performance tuning", "Workflow improvement"]
        },
        {
            title: "Meta-Prompting",
            description: "Create prompts that generate other specialized prompts",
            modality: "text",
            difficulty: "advanced",
            icon: <Zap className="w-5 h-5" />,
            examples: [
                "Create a prompt that will help generate creative marketing slogans for tech startups...",
                "Design a prompt template for code review that can be customized for different programming languages..."
            ],
            useCases: ["Automation", "Prompt generation", "Workflow scaling", "Template creation"]
        }
    ];

    const modalityGuides = [
        {
            title: "Text Generation",
            icon: <MessageSquare className="w-6 h-6" />,
            color: "text-orange-500",
            techniques: ["Chain-of-Thought", "Few-Shot Learning", "Role-Based Prompting"],
            bestPractices: [
                "Use clear, specific instructions",
                "Provide context and constraints",
                "Specify desired tone and style",
                "Include output format requirements"
            ]
        },
        {
            title: "Image Generation",
            icon: <Image className="w-6 h-6" />,
            color: "text-green-500",
            techniques: ["Descriptive Prompting", "Negative Prompting", "Style Transfer"],
            bestPractices: [
                "Include detailed visual descriptions",
                "Specify style and artistic elements",
                "Use negative prompts for quality control",
                "Define composition and lighting"
            ]
        },
        {
            title: "Code Generation",
            icon: <Code className="w-6 h-6" />,
            color: "text-blue-500",
            techniques: ["Specification-Driven", "Example-Based", "Architecture Patterns"],
            bestPractices: [
                "Clearly define functional requirements",
                "Specify programming language and patterns",
                "Include testing and documentation needs",
                "Provide code examples and context"
            ]
        },
        {
            title: "Audio Generation",
            icon: <Music className="w-6 h-6" />,
            color: "text-pink-500",
            techniques: ["Genre Specification", "Mood Prompting", "Technical Parameters"],
            bestPractices: [
                "Define musical genre and style",
                "Specify mood and emotional tone",
                "Include technical parameters (tempo, key)",
                "Describe instrumentation and production"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Prompt Engineering Mastery Guide
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Research-backed techniques for mastering AI prompt engineering across all modalities.
                        Based on comprehensive analysis of current best practices and emerging methodologies.
                    </p>
                </div>

                <Tabs defaultValue="techniques" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="techniques">Core Techniques</TabsTrigger>
                        <TabsTrigger value="modalities">By Modality</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced Methods</TabsTrigger>
                    </TabsList>

                    <TabsContent value="techniques" className="space-y-6">
                        <div className="grid gap-6">
                            {techniques.map((technique, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {technique.icon}
                                                <div>
                                                    <CardTitle className="text-xl">{technique.title}</CardTitle>
                                                    <CardDescription>{technique.description}</CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge variant="outline">{technique.modality}</Badge>
                                                <Badge variant={technique.difficulty === 'beginner' ? 'default' :
                                                    technique.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                                                    {technique.difficulty}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Examples:</h4>
                                            <div className="space-y-2">
                                                {technique.examples.map((example, idx) => (
                                                    <div key={idx} className="p-3 bg-muted/50 rounded-md font-mono text-sm">
                                                        {example}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Best Use Cases:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {technique.useCases.map((useCase, idx) => (
                                                    <Badge key={idx} variant="secondary">{useCase}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="modalities" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {modalityGuides.map((guide, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className={guide.color}>
                                                {guide.icon}
                                            </div>
                                            <CardTitle>{guide.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Key Techniques:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {guide.techniques.map((tech, idx) => (
                                                    <Badge key={idx} variant="outline">{tech}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Best Practices:</h4>
                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                {guide.bestPractices.map((practice, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                                        {practice}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="w-5 h-5" />
                                        Multi-Agent Coordination
                                    </CardTitle>
                                    <CardDescription>
                                        Coordinate multiple AI agents for complex, multi-step tasks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Design agent communication protocols</li>
                                        <li>• Implement task distribution strategies</li>
                                        <li>• Create result aggregation workflows</li>
                                        <li>• Build quality control checkpoints</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        Contextual Memory Management
                                    </CardTitle>
                                    <CardDescription>
                                        Maintain consistent context across extended interactions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Implement long-term conversation memory</li>
                                        <li>• Create context summarization algorithms</li>
                                        <li>• Build relevance scoring systems</li>
                                        <li>• Design context retrieval strategies</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-5 h-5" />
                                        Parameter Optimization
                                    </CardTitle>
                                    <CardDescription>
                                        Fine-tune model parameters for optimal results
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Temperature tuning for creativity control</li>
                                        <li>• Max tokens optimization for length</li>
                                        <li>• Top-p and top-k parameter adjustment</li>
                                        <li>• Frequency penalty configuration</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        Quality Assessment
                                    </CardTitle>
                                    <CardDescription>
                                        Establish metrics and evaluation criteria
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Create output quality scoring systems</li>
                                        <li>• Implement automated evaluation metrics</li>
                                        <li>• Build user feedback collection</li>
                                        <li>• Design A/B testing frameworks</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Call to Action */}
                <Card className="text-center">
                    <CardContent className="pt-6">
                        <h3 className="text-2xl font-bold mb-2">Ready to Master Prompt Engineering?</h3>
                        <p className="text-muted-foreground mb-4">
                            Apply these research-backed techniques in our interactive prompt builder
                        </p>
                        <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                            Try the Prompt Builder
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
