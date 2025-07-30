import { PDFAnalyzer } from '@/components/PDFAnalyzer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText, Zap } from 'lucide-react';

export const PDFDemo = () => {
    return (
        <div className="container mx-auto px-6 py-8 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">PDF Knowledge Extractor</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Transform your PDF research documents into structured knowledge entries with AI-powered analysis
                </p>

                <div className="flex justify-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="gap-1">
                        <FileText className="w-3 h-3" />
                        PDF Reading
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                        <Brain className="w-3 h-3" />
                        Content Analysis
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                        <Zap className="w-3 h-3" />
                        Auto-extraction
                    </Badge>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">1. Upload PDF</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Select any PDF research document, paper, or guide you want to analyze
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">2. AI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Our system extracts text, identifies techniques, modalities, and key concepts
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">3. Knowledge Base</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Automatically categorized and searchable entries ready for use
                        </p>
                    </CardContent>
                </Card>
            </div>

            <PDFAnalyzer />

            <Card>
                <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>What the PDF analyzer can detect and extract</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Content Detection</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Prompt engineering techniques</li>
                                <li>• AI modalities (text, image, audio, video)</li>
                                <li>• Code examples and snippets</li>
                                <li>• Best practices and guidelines</li>
                                <li>• Research findings and case studies</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Auto-categorization</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Technique classification</li>
                                <li>• Difficulty level assessment</li>
                                <li>• Tag generation</li>
                                <li>• Modality identification</li>
                                <li>• Content structure analysis</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
