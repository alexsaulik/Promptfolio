import {
    BarChart3,
    Brain,
    Clock,
    FileText,
    HelpCircle,
    Lightbulb,
    RefreshCw,
    Sparkles,
    Tags
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { DocumentAnalysis, useDocumentAnalysis } from '../hooks/use-document-analysis';
import { DocumentSource, KnowledgeBase } from '../hooks/use-document-knowledge';
import { toast } from '../hooks/use-toast';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

interface DocumentInsightsProps {
    knowledgeBase: KnowledgeBase;
    className?: string;
}

export const DocumentInsights = ({ knowledgeBase, className }: DocumentInsightsProps) => {
    const [analyses, setAnalyses] = useState<DocumentAnalysis[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

    const { analyzeDocument, generateDocumentQuestions, extractKeyTerms } = useDocumentAnalysis();

    // Initialize analysis for all documents
    useEffect(() => {
        if (knowledgeBase.sources.length > 0 && analyses.length === 0) {
            handleAnalyzeAll();
        }
    }, [knowledgeBase.sources]);

    const handleAnalyzeAll = async () => {
        setIsAnalyzing(true);
        try {
            const newAnalyses: DocumentAnalysis[] = [];

            for (const source of knowledgeBase.sources) {
                const analysis = await analyzeDocument(source.id, source.extractedText);
                newAnalyses.push(analysis);
            }

            setAnalyses(newAnalyses);
            toast({
                title: "Analysis Complete",
                description: `Analyzed ${newAnalyses.length} documents successfully.`
            });
        } catch (error) {
            console.error('Analysis failed:', error);
            toast({
                title: "Analysis Failed",
                description: "Could not analyze documents. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleAnalyzeSingle = async (source: DocumentSource) => {
        setIsAnalyzing(true);
        try {
            const analysis = await analyzeDocument(source.id, source.extractedText);
            setAnalyses(prev => {
                const filtered = prev.filter(a => a.documentId !== source.id);
                return [...filtered, analysis];
            });
            toast({
                title: "Document Analyzed",
                description: `Analysis complete for "${source.name}".`
            });
        } catch (error) {
            console.error('Single analysis failed:', error);
            toast({
                title: "Analysis Failed",
                description: `Could not analyze "${source.name}".`,
                variant: "destructive"
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getComplexityColor = (complexity: 'simple' | 'moderate' | 'complex') => {
        switch (complexity) {
            case 'simple': return 'bg-green-100 text-green-800';
            case 'moderate': return 'bg-yellow-100 text-yellow-800';
            case 'complex': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const selectedAnalysis = selectedDocumentId
        ? analyses.find(a => a.documentId === selectedDocumentId)
        : null;

    const selectedSource = selectedDocumentId
        ? knowledgeBase.sources.find(s => s.id === selectedDocumentId)
        : null;

    // Calculate overall statistics
    const totalReadingTime = analyses.reduce((sum, a) => sum + a.readingTime, 0);
    const avgComplexity = analyses.length > 0
        ? analyses.filter(a => a.complexity === 'complex').length / analyses.length
        : 0;
    const allTopics = analyses.flatMap(a => a.keyTopics);
    const uniqueTopics = [...new Set(allTopics)];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Overview Statistics */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Knowledge Base Analytics
                        </CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAnalyzeAll}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? (
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Sparkles className="w-4 h-4 mr-2" />
                            )}
                            {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                            <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                            <div className="text-2xl font-bold">{knowledgeBase.sources.length}</div>
                            <div className="text-sm text-muted-foreground">Documents</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                            <div className="text-2xl font-bold">{totalReadingTime}</div>
                            <div className="text-sm text-muted-foreground">Min Read</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Tags className="w-8 h-8 mx-auto mb-2 text-green-600" />
                            <div className="text-2xl font-bold">{uniqueTopics.length}</div>
                            <div className="text-sm text-muted-foreground">Topics</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <div className="text-2xl font-bold">{Math.round(avgComplexity * 100)}%</div>
                            <div className="text-sm text-muted-foreground">Complex</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Document List with Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Document Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-96">
                            <div className="space-y-3">
                                {knowledgeBase.sources.map((source) => {
                                    const analysis = analyses.find(a => a.documentId === source.id);
                                    const isSelected = selectedDocumentId === source.id;

                                    return (
                                        <Card
                                            key={source.id}
                                            className={`cursor-pointer transition-colors ${isSelected ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                                                }`}
                                            onClick={() => setSelectedDocumentId(
                                                isSelected ? null : source.id
                                            )}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium truncate">{source.name}</h4>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            {analysis ? (
                                                                <>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={getComplexityColor(analysis.complexity)}
                                                                    >
                                                                        {analysis.complexity}
                                                                    </Badge>
                                                                    <Badge variant="secondary">
                                                                        {analysis.readingTime}m read
                                                                    </Badge>
                                                                    <Badge variant="outline">
                                                                        {analysis.keyTopics.length} topics
                                                                    </Badge>
                                                                </>
                                                            ) : (
                                                                <Skeleton className="h-5 w-20" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    {!analysis && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleAnalyzeSingle(source);
                                                            }}
                                                            disabled={isAnalyzing}
                                                        >
                                                            <Brain className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>

                                                {analysis && (
                                                    <div className="mt-3 pt-3 border-t">
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {analysis.overallSummary}
                                                        </p>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Detailed Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            {selectedSource ? `Insights: ${selectedSource.name}` : 'Select a Document'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedAnalysis && selectedSource ? (
                            <ScrollArea className="h-96">
                                <div className="space-y-6">
                                    {/* Summary */}
                                    <div>
                                        <h4 className="font-medium mb-2">Summary</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {selectedAnalysis.overallSummary}
                                        </p>
                                    </div>

                                    <Separator />

                                    {/* Key Topics */}
                                    <div>
                                        <h4 className="font-medium mb-3">Key Topics</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedAnalysis.keyTopics.map((topic, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Document Stats */}
                                    <div>
                                        <h4 className="font-medium mb-3">Document Statistics</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-muted rounded-lg">
                                                <div className="text-lg font-semibold">
                                                    {selectedAnalysis.readingTime}m
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Reading Time
                                                </div>
                                            </div>
                                            <div className="text-center p-3 bg-muted rounded-lg">
                                                <div className="text-lg font-semibold capitalize">
                                                    {selectedAnalysis.complexity}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Complexity
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Suggested Questions */}
                                    <div>
                                        <h4 className="font-medium mb-3 flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4" />
                                            Suggested Questions
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedAnalysis.suggestedQuestions.slice(0, 6).map((question, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors cursor-pointer"
                                                >
                                                    {question}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="h-96 flex items-center justify-center text-center">
                                <div>
                                    <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                                    <p className="text-muted-foreground">
                                        Select a document to view AI-powered insights and analysis
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DocumentInsights;
