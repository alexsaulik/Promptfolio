import { useDocumentKnowledge } from './use-document-knowledge';
import { useLocalLlama } from './use-local-llama';

export interface DocumentInsight {
    id: string;
    documentId: string;
    type: 'summary' | 'keywords' | 'topics' | 'sentiment' | 'questions';
    content: string;
    confidence: number;
    createdAt: string;
}

export interface DocumentAnalysis {
    documentId: string;
    insights: DocumentInsight[];
    overallSummary: string;
    keyTopics: string[];
    suggestedQuestions: string[];
    complexity: 'simple' | 'moderate' | 'complex';
    readingTime: number; // in minutes
}

export const useDocumentAnalysis = () => {
    const { generateText } = useLocalLlama();
    const { knowledgeBases } = useDocumentKnowledge();

    const analyzeDocument = async (documentId: string, content: string): Promise<DocumentAnalysis> => {
        try {
            // Generate comprehensive summary
            const summaryPrompt = `Analyze this document and provide a comprehensive summary. Be concise but thorough.

Document Content:
${content}

Provide:
1. Main Summary (2-3 sentences)
2. Key Topics (list 3-5 main topics)
3. Complexity Level (simple/moderate/complex)
4. Suggested Questions (5 questions someone might ask about this content)

Format your response as JSON with fields: summary, topics, complexity, questions`;

            const analysisResponse = await generateText(summaryPrompt, 'llama3.2:latest', {
                temperature: 0.3,
                max_tokens: 800
            });

            // Parse AI response
            let parsedAnalysis;
            try {
                parsedAnalysis = JSON.parse(analysisResponse);
            } catch {
                // Fallback if JSON parsing fails
                parsedAnalysis = {
                    summary: analysisResponse.slice(0, 200) + '...',
                    topics: ['General Content', 'Document Analysis'],
                    complexity: 'moderate',
                    questions: ['What is the main topic?', 'What are the key points?']
                };
            }

            // Calculate reading time (average 200 words per minute)
            const wordCount = content.split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200);

            // Generate insights
            const insights: DocumentInsight[] = [
                {
                    id: `insight_summary_${Date.now()}`,
                    documentId,
                    type: 'summary',
                    content: parsedAnalysis.summary,
                    confidence: 0.9,
                    createdAt: new Date().toISOString()
                },
                {
                    id: `insight_topics_${Date.now()}`,
                    documentId,
                    type: 'topics',
                    content: parsedAnalysis.topics.join(', '),
                    confidence: 0.8,
                    createdAt: new Date().toISOString()
                }
            ];

            return {
                documentId,
                insights,
                overallSummary: parsedAnalysis.summary,
                keyTopics: parsedAnalysis.topics,
                suggestedQuestions: parsedAnalysis.questions,
                complexity: parsedAnalysis.complexity,
                readingTime
            };

        } catch (error) {
            console.error('Document analysis failed:', error);

            // Fallback analysis
            const wordCount = content.split(/\s+/).length;
            return {
                documentId,
                insights: [],
                overallSummary: 'Document analysis could not be completed automatically.',
                keyTopics: ['General Content'],
                suggestedQuestions: ['What is this document about?'],
                complexity: 'moderate' as const,
                readingTime: Math.ceil(wordCount / 200)
            };
        }
    };

    const batchAnalyzeKnowledgeBase = async (knowledgeBaseId: string) => {
        const knowledgeBase = knowledgeBases.find(kb => kb.id === knowledgeBaseId);
        if (!knowledgeBase) return [];

        const analyses: DocumentAnalysis[] = [];

        for (const source of knowledgeBase.sources) {
            const analysis = await analyzeDocument(source.id, source.extractedText);
            analyses.push(analysis);
        }

        return analyses;
    };

    const generateDocumentQuestions = async (content: string): Promise<string[]> => {
        const prompt = `Based on this document content, generate 10 intelligent questions that someone might ask to better understand the material. Make the questions specific and useful.

Document Content:
${content.slice(0, 2000)}...

Return only the questions, one per line, numbered 1-10.`;

        try {
            const response = await generateText(prompt, 'llama3.2:latest', {
                temperature: 0.7,
                max_tokens: 500
            });

            return response
                .split('\n')
                .filter(line => line.trim() && /^\d+\./.test(line.trim()))
                .map(line => line.replace(/^\d+\.\s*/, '').trim())
                .slice(0, 10);
        } catch (error) {
            console.error('Question generation failed:', error);
            return [
                'What is the main topic of this document?',
                'What are the key points discussed?',
                'Who is the target audience?',
                'What conclusions can be drawn?',
                'How does this relate to other topics?'
            ];
        }
    };

    const extractKeyTerms = async (content: string): Promise<string[]> => {
        const prompt = `Extract the 15 most important key terms, concepts, and technical terms from this document. Return only the terms, one per line.

Document Content:
${content.slice(0, 1500)}...

Return the key terms:`;

        try {
            const response = await generateText(prompt, 'llama3.2:latest', {
                temperature: 0.3,
                max_tokens: 300
            });

            return response
                .split('\n')
                .map(term => term.trim())
                .filter(term => term && term.length > 2)
                .slice(0, 15);
        } catch (error) {
            console.error('Key term extraction failed:', error);
            return [];
        }
    };

    return {
        analyzeDocument,
        batchAnalyzeKnowledgeBase,
        generateDocumentQuestions,
        extractKeyTerms
    };
};
