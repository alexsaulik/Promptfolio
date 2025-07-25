import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Download, Filter, Search, Terminal, Zap } from "lucide-react";
import { useState } from "react";

const CodeDevelopment = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for code prompts
    const codePrompts = [
        {
            id: '1',
            title: 'React Component Generator',
            slug: 'react-component-generator',
            description: 'Generate modern React components with TypeScript and best practices',
            type: 'code' as const,
            price: 39.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'reactMaster',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 6234,
                downloads: 1123,
                likes: 456
            },
            tags: ['react', 'typescript', 'components']
        },
        {
            id: '2',
            title: 'API Documentation Writer',
            slug: 'api-documentation-writer',
            description: 'Automatically generate comprehensive API documentation',
            type: 'code' as const,
            price: 0,
            isPaid: false,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'docMaster',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 4521,
                downloads: 834,
                likes: 234
            },
            tags: ['documentation', 'api', 'automation']
        },
        {
            id: '3',
            title: 'Python Script Optimizer',
            slug: 'python-script-optimizer',
            description: 'Optimize Python code for performance and readability',
            type: 'code' as const,
            price: 24.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'pythonPro',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 5123,
                downloads: 923,
                likes: 298
            },
            tags: ['python', 'optimization', 'performance']
        },
        {
            id: '4',
            title: 'Database Schema Designer',
            slug: 'database-schema-designer',
            description: 'Generate efficient database schemas with relationships',
            type: 'code' as const,
            price: 29.99,
            isPaid: true,
            coverImageUrl: '/placeholder.svg',
            creator: {
                username: 'dbArchitect',
                avatarUrl: '/placeholder.svg'
            },
            stats: {
                views: 3876,
                downloads: 567,
                likes: 189
            },
            tags: ['database', 'schema', 'sql']
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Code className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-code bg-clip-text text-transparent">
                                Code & Development
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Accelerate your development with AI-powered code generation, optimization, and documentation prompts
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                <span>Production Ready</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span>Best Practices</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span>Multiple Languages</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search programming languages, frameworks, or tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>

                            <div className="flex gap-3 w-full lg:w-auto">
                                <Select defaultValue="popular">
                                    <SelectTrigger className="w-full lg:w-[160px] h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                        <SelectItem value="downloads">Most Downloaded</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="icon" className="h-12 w-12">
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Programming Languages */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Popular Technologies</h2>
                        <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'SQL', 'Go', 'Rust'].map((tech) => (
                                <Badge key={tech} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Code Prompts</h2>
                            <p className="text-muted-foreground">
                                Showing {codePrompts.length} development prompts
                            </p>
                        </div>

                        {/* Prompts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {codePrompts.map((prompt, index) => (
                                <div key={prompt.id} className={`animate-fade-in animate-fade-in-delay-${index + 1}`}>
                                    <PromptCard prompt={prompt} />
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-8">
                            <Button variant="outline" size="lg">
                                Load More Code Prompts
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CodeDevelopment;
