import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { knowledgeBase } from '@/lib/knowledge-base';
import { AlertCircle, Brain, CheckCircle, FileText, Upload, Zap } from 'lucide-react';
import { useCallback, useState } from 'react';

// PDF parsing function using browser-compatible approach
const parsePDF = async (file: File): Promise<string> => {
    try {
        // For now, we'll extract basic file info and let user provide content
        // In a real implementation, you'd use a service like PDF.js or a backend API
        const fileInfo = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: new Date(file.lastModified).toISOString()
        };

        console.log('PDF file info:', fileInfo);

        // Return a placeholder that indicates manual content input is needed
        return `PDF File: ${file.name}
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
Modified: ${new Date(file.lastModified).toLocaleDateString()}

[PDF text extraction requires manual input or backend service]
[Please copy and paste the PDF content below]`;

    } catch (error) {
        throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};// AI-powered content extraction (using patterns and keywords)
const extractKnowledgeFromText = (text: string, filename: string) => {
    const sections = [];

    // Split by common section headers
    const sectionRegex = /(?:^|\n)(#{1,6}\s+.*?|[A-Z][A-Z\s]{10,}|(?:\d+\.?\s+)?[A-Z][a-z].*?(?=\n\n|\n[A-Z]|\n\d+\.|\n#{1,6}|$))/gm;
    const matches = text.match(sectionRegex) || [];

    // Extract techniques (look for patterns)
    const techniqueKeywords = [
        'prompting', 'technique', 'method', 'approach', 'strategy',
        'chain-of-thought', 'few-shot', 'zero-shot', 'role-based',
        'meta-prompting', 'instruction', 'context', 'template'
    ];

    // Extract modalities
    const modalityKeywords = [
        'text', 'image', 'audio', 'video', 'code', 'visual', 'language',
        'generation', 'synthesis', 'multimodal', 'cross-modal'
    ];

    // Extract best practices
    const practiceKeywords = [
        'best practice', 'guideline', 'recommendation', 'tip',
        'optimization', 'improvement', 'quality', 'performance'
    ];

    // Analyze content for automatic categorization
    const extractCategories = (content: string) => {
        const categories = [];
        if (techniqueKeywords.some(keyword => content.toLowerCase().includes(keyword))) {
            categories.push('technique');
        }
        if (practiceKeywords.some(keyword => content.toLowerCase().includes(keyword))) {
            categories.push('best-practice');
        }
        if (content.toLowerCase().includes('research') || content.toLowerCase().includes('study')) {
            categories.push('research');
        }
        if (content.toLowerCase().includes('example') || content.toLowerCase().includes('case')) {
            categories.push('case-study');
        }
        return categories;
    };

    const extractModalities = (content: string) => {
        const found = modalityKeywords.filter(keyword =>
            content.toLowerCase().includes(keyword)
        );
        return found.length > 0 ? found : ['text'];
    };

    const extractTechniques = (content: string) => {
        return techniqueKeywords.filter(keyword =>
            content.toLowerCase().includes(keyword)
        );
    };

    // Process the full text
    const fullAnalysis = {
        categories: extractCategories(text),
        modalities: extractModalities(text),
        techniques: extractTechniques(text),
        estimatedSections: matches.length,
        wordCount: text.split(/\s+/).length,
        hasExamples: text.toLowerCase().includes('example'),
        hasCode: /```|`[^`]+`|\bcode\b/i.test(text),
        hasImages: text.toLowerCase().includes('image') || text.toLowerCase().includes('visual')
    };

    return {
        fullText: text,
        analysis: fullAnalysis,
        suggestedMetadata: {
            title: filename.replace('.pdf', ''),
            category: fullAnalysis.categories[0] || 'research',
            tags: [...new Set([...fullAnalysis.techniques, ...fullAnalysis.modalities])],
            modalities: fullAnalysis.modalities,
            techniques: fullAnalysis.techniques
        }
    };
};

export const PDFAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [analysis, setAnalysis] = useState<any>(null);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState(false);

    // Metadata form
    const [metadata, setMetadata] = useState({
        title: '',
        category: '',
        tags: '',
        modalities: '',
        techniques: '',
        customContent: ''
    });

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError('');
            setSuccess(false);
        } else {
            setError('Please select a valid PDF file');
        }
    }, []);

    const analyzePDF = async () => {
        if (!selectedFile) return;

        setProcessing(true);
        setProgress(0);
        setError('');

        try {
            setProgress(20);

            // Extract text from PDF
            const text = await parsePDF(selectedFile);
            setProgress(50);

            // Analyze content
            const result = extractKnowledgeFromText(text, selectedFile.name);
            setProgress(80);

            setExtractedText(result.fullText);
            setAnalysis(result.analysis);

            // Auto-populate metadata
            setMetadata({
                title: result.suggestedMetadata.title,
                category: result.suggestedMetadata.category,
                tags: result.suggestedMetadata.tags.join(', '),
                modalities: result.suggestedMetadata.modalities.join(', '),
                techniques: result.suggestedMetadata.techniques.join(', '),
                customContent: ''
            });

            setProgress(100);
            setSuccess(true);
        } catch (err) {
            setError(`Failed to analyze PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setProcessing(false);
        }
    };

    const addToKnowledgeBase = () => {
        if (!metadata.title || !metadata.customContent) {
            setError('Please provide both a title and content');
            return;
        }

        try {
            // Add to knowledge base
            const document = knowledgeBase.addDocument({
                title: metadata.title,
                category: metadata.category || 'research',
                content: metadata.customContent,
                lastUpdated: new Date().toISOString(),
                tags: metadata.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                modalities: metadata.modalities.split(',').map(mod => mod.trim()).filter(Boolean),
                techniques: metadata.techniques.split(',').map(tech => tech.trim()).filter(Boolean)
            });

            // Auto-extract knowledge entries from the content
            const content = metadata.customContent;
            if (content.length > 500) {
                // Extract sections as knowledge entries
                const sections = content.split(/\n\n+/).filter(section =>
                    section.trim().length > 100 &&
                    (section.toLowerCase().includes('technique') ||
                        section.toLowerCase().includes('method') ||
                        section.toLowerCase().includes('approach') ||
                        section.toLowerCase().includes('practice'))
                );

                const entries = sections.slice(0, 10).map(section => ({
                    title: section.split('\n')[0].substring(0, 100) + (section.split('\n')[0].length > 100 ? '...' : ''),
                    content: section.trim(),
                    category: 'technique' as const,
                    modality: content.toLowerCase().includes('code') ? 'code' as const :
                        content.toLowerCase().includes('image') ? 'image' as const : 'text' as const,
                    difficulty: 'intermediate' as const,
                    tags: metadata.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                }));

                if (entries.length > 0) {
                    knowledgeBase.extractEntries(document.id, entries);
                }
            }

            setSuccess(true);
            setError('');

            // Reset form
            setSelectedFile(null);
            setExtractedText('');
            setAnalysis(null);
            setMetadata({
                title: '',
                category: '',
                tags: '',
                modalities: '',
                techniques: '',
                customContent: ''
            });

        } catch (err) {
            setError(`Failed to add to knowledge base: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    }; return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        PDF Knowledge Extractor
                    </CardTitle>
                    <CardDescription>
                        Upload and analyze PDF documents to extract knowledge for your research base
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="pdf-upload">Select PDF File</Label>
                        <Input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            disabled={processing}
                        />
                    </div>

                    {selectedFile && (
                        <Alert>
                            <FileText className="h-4 w-4" />
                            <AlertDescription>
                                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Analyze Button */}
                    {selectedFile && !extractedText && (
                        <Button
                            onClick={analyzePDF}
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? (
                                <>
                                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                                    Analyzing PDF...
                                </>
                            ) : (
                                <>
                                    <Brain className="w-4 h-4 mr-2" />
                                    Analyze PDF Content
                                </>
                            )}
                        </Button>
                    )}

                    {/* Progress */}
                    {processing && (
                        <div className="space-y-2">
                            <Progress value={progress} className="w-full" />
                            <p className="text-sm text-muted-foreground text-center">
                                {progress < 30 ? 'Reading PDF...' :
                                    progress < 60 ? 'Extracting text...' :
                                        progress < 90 ? 'Analyzing content...' : 'Finalizing...'}
                            </p>
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Success Display */}
                    {success && extractedText && (
                        <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>PDF analyzed successfully!</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysis && (
                <Card>
                    <CardHeader>
                        <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{analysis.wordCount.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Words</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{analysis.estimatedSections}</div>
                                <div className="text-sm text-muted-foreground">Sections</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{analysis.techniques.length}</div>
                                <div className="text-sm text-muted-foreground">Techniques</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Detected Features:</span>
                                {analysis.hasExamples && <Badge variant="secondary">Examples</Badge>}
                                {analysis.hasCode && <Badge variant="secondary">Code</Badge>}
                                {analysis.hasImages && <Badge variant="secondary">Images</Badge>}
                            </div>

                            {analysis.modalities.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Modalities:</span>
                                    {analysis.modalities.map((mod: string) => (
                                        <Badge key={mod} variant="outline">{mod}</Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Metadata Editor */}
            {extractedText && (
                <Card>
                    <CardHeader>
                        <CardTitle>Knowledge Base Metadata</CardTitle>
                        <CardDescription>
                            Review and edit the extracted information before adding to knowledge base
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Document Title</Label>
                                <Input
                                    id="title"
                                    value={metadata.title}
                                    onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                                    placeholder="Document title"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={metadata.category}
                                    onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
                                    placeholder="research, technique, guide"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    value={metadata.tags}
                                    onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
                                    placeholder="prompt engineering, AI"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="modalities">Modalities</Label>
                                <Input
                                    id="modalities"
                                    value={metadata.modalities}
                                    onChange={(e) => setMetadata({ ...metadata, modalities: e.target.value })}
                                    placeholder="text, image, code"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="techniques">Techniques</Label>
                                <Input
                                    id="techniques"
                                    value={metadata.techniques}
                                    onChange={(e) => setMetadata({ ...metadata, techniques: e.target.value })}
                                    placeholder="chain-of-thought, few-shot"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="custom-content">PDF Content (Paste your PDF text here)</Label>
                            <Textarea
                                id="custom-content"
                                value={metadata.customContent}
                                onChange={(e) => setMetadata({ ...metadata, customContent: e.target.value })}
                                placeholder="Copy and paste the content from your PDF here..."
                                rows={12}
                                className="font-mono text-sm"
                            />
                            <p className="text-sm text-muted-foreground">
                                Copy and paste text from your PDF here for analysis
                            </p>
                        </div>

                        {extractedText && (
                            <div className="space-y-2">
                                <Label>File Information</Label>
                                <Textarea
                                    value={extractedText}
                                    readOnly
                                    rows={4}
                                    className="font-mono text-xs bg-muted"
                                />
                            </div>
                        )}

                        <Button onClick={addToKnowledgeBase} className="w-full">
                            <Upload className="w-4 h-4 mr-2" />
                            Add to Knowledge Base
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
