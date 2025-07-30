import { PDFAnalyzer } from '@/components/PDFAnalyzer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { knowledgeBase, type KnowledgeEntry, type ResearchDocument } from '@/lib/knowledge-base';
import { BookOpen, Brain, FileText, Search, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ResearchManager = () => {
    const [documents, setDocuments] = useState<ResearchDocument[]>([]);
    const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<KnowledgeEntry[]>([]);

    // Document upload form
    const [newDoc, setNewDoc] = useState({
        title: '',
        category: '',
        content: '',
        tags: '',
        modalities: '',
        techniques: ''
    });

    useEffect(() => {
        setDocuments(knowledgeBase.getDocuments());
        setEntries(knowledgeBase.getEntries());
    }, []);

    const handleSearch = () => {
        const results = knowledgeBase.search(searchQuery);
        setSearchResults(results);
    };

    const addResearchDocument = () => {
        const document = knowledgeBase.addDocument({
            title: newDoc.title,
            category: newDoc.category,
            content: newDoc.content,
            lastUpdated: new Date().toISOString(),
            tags: newDoc.tags.split(',').map(tag => tag.trim()),
            modalities: newDoc.modalities.split(',').map(mod => mod.trim()),
            techniques: newDoc.techniques.split(',').map(tech => tech.trim())
        });

        setDocuments(knowledgeBase.getDocuments());

        // Reset form
        setNewDoc({
            title: '',
            category: '',
            content: '',
            tags: '',
            modalities: '',
            techniques: ''
        });
    };

    const addPromptEngineeringResearch = () => {
        // Add your research document
        const document = knowledgeBase.addDocument({
            title: 'Prompt Engineering Techniques Across AI Modalities',
            category: 'Research',
            lastUpdated: new Date().toISOString(),
            content: `# Prompt Engineering Techniques Across AI Modalities

This comprehensive research document covers advanced prompt engineering techniques across multiple AI modalities including text, image, audio, video, and code generation.

## Key Areas Covered:
- Text Generation Techniques
- Image Synthesis Prompting
- Audio Generation Methods
- Video Creation Strategies
- Code Generation Approaches
- Multi-modal Integration
- Best Practices and Optimization

Please paste your research content here to populate the knowledge base.`,
            tags: ['prompt engineering', 'AI modalities', 'research', 'techniques'],
            modalities: ['text', 'image', 'audio', 'video', 'code', 'multimodal'],
            techniques: ['few-shot learning', 'chain-of-thought', 'tree-of-thought', 'prompt chaining']
        });

        // Extract sample knowledge entries
        knowledgeBase.extractEntries(document.id, [
            {
                title: 'Chain-of-Thought Prompting',
                content: 'A technique that guides AI models through step-by-step reasoning processes to improve complex problem-solving capabilities.',
                category: 'technique',
                modality: 'text',
                difficulty: 'intermediate',
                tags: ['reasoning', 'step-by-step', 'problem-solving'],
                examples: [
                    'Let\'s think step by step: First, identify the problem...',
                    'To solve this, I need to: 1) Analyze the data, 2) Find patterns, 3) Draw conclusions'
                ]
            },
            {
                title: 'Few-Shot Learning',
                content: 'Providing a few examples in the prompt to help the model understand the desired output format and style.',
                category: 'technique',
                modality: 'multimodal',
                difficulty: 'beginner',
                tags: ['examples', 'learning', 'context'],
                examples: [
                    'Example 1: Input -> Output',
                    'Example 2: Input -> Output',
                    'Now try: Your Input ->'
                ]
            }
        ]);

        setDocuments(knowledgeBase.getDocuments());
        setEntries(knowledgeBase.getEntries());
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Brain className="w-6 h-6" />
                    Research Knowledge Base
                </h2>
                <p className="text-muted-foreground">Manage and utilize your prompt engineering research</p>
            </div>

            <Tabs defaultValue="browse" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="browse">Browse</TabsTrigger>
                    <TabsTrigger value="search">Search</TabsTrigger>
                    <TabsTrigger value="upload">Upload Research</TabsTrigger>
                    <TabsTrigger value="pdf">PDF Analyzer</TabsTrigger>
                    <TabsTrigger value="quick-add">Quick Add</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Research Documents ({documents.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {documents.map(doc => (
                                    <div key={doc.id} className="p-3 border rounded-lg">
                                        <h4 className="font-medium">{doc.title}</h4>
                                        <p className="text-sm text-muted-foreground">{doc.category}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {doc.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {documents.length === 0 && (
                                    <p className="text-center text-muted-foreground py-4">
                                        No research documents yet
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Knowledge Entries ({entries.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                                {entries.map(entry => (
                                    <div key={entry.id} className="p-3 border rounded-lg">
                                        <h4 className="font-medium">{entry.title}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {entry.content}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="outline" className="text-xs">
                                                {entry.modality}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {entry.difficulty}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                                {entries.length === 0 && (
                                    <p className="text-center text-muted-foreground py-4">
                                        No knowledge entries yet
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="search" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="w-5 h-5" />
                                Search Knowledge Base
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Search techniques, modalities, or concepts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <Button onClick={handleSearch}>Search</Button>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="space-y-3">
                                    {searchResults.map(result => (
                                        <div key={result.id} className="p-4 border rounded-lg">
                                            <h4 className="font-medium">{result.title}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {result.content}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline">{result.modality}</Badge>
                                                <Badge variant="outline">{result.category}</Badge>
                                                <Badge variant="outline">{result.difficulty}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                Add Research Document
                            </CardTitle>
                            <CardDescription>
                                Add your research content to the knowledge base
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Document Title</Label>
                                <Input
                                    id="title"
                                    value={newDoc.title}
                                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                                    placeholder="Prompt Engineering Techniques Across AI Modalities"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={newDoc.category}
                                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                                    placeholder="Research, Guide, Best Practices"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={newDoc.content}
                                    onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                                    placeholder="Paste your research content here..."
                                    rows={10}
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                                    <Input
                                        id="tags"
                                        value={newDoc.tags}
                                        onChange={(e) => setNewDoc({ ...newDoc, tags: e.target.value })}
                                        placeholder="prompt engineering, AI, research"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="modalities">Modalities</Label>
                                    <Input
                                        id="modalities"
                                        value={newDoc.modalities}
                                        onChange={(e) => setNewDoc({ ...newDoc, modalities: e.target.value })}
                                        placeholder="text, image, audio, video"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="techniques">Techniques</Label>
                                    <Input
                                        id="techniques"
                                        value={newDoc.techniques}
                                        onChange={(e) => setNewDoc({ ...newDoc, techniques: e.target.value })}
                                        placeholder="chain-of-thought, few-shot"
                                    />
                                </div>
                            </div>

                            <Button onClick={addResearchDocument} className="w-full">
                                Add Research Document
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pdf" className="space-y-4">
                    <PDFAnalyzer />
                </TabsContent>

                <TabsContent value="quick-add" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Add: Your PDF Research</CardTitle>
                            <CardDescription>
                                Add your "Prompt Engineering Techniques Across AI Modalities" research
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={addPromptEngineeringResearch} className="w-full">
                                Add Prompt Engineering Research
                            </Button>
                            <p className="text-sm text-muted-foreground mt-2">
                                This will create a template for your PDF research. You can then edit and expand the content.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
