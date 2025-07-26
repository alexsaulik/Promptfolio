import { useState } from 'react';

export interface DocumentSource {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'txt' | 'md' | 'json' | 'csv';
    content: string;
    extractedText: string;
    uploadDate: string;
    fileSize: number;
}

export interface DocumentChunk {
    id: string;
    sourceId: string;
    content: string;
    chunkIndex: number;
    metadata: Record<string, any>;
}

export interface KnowledgeBase {
    id: string;
    name: string;
    description: string;
    sources: DocumentSource[];
    chunks: DocumentChunk[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

export const useDocumentKnowledge = () => {
    const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Simple text extraction for basic file types
    const extractTextFromFile = async (file: File): Promise<string> => {
        try {
            if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                return await file.text();
            }

            if (file.name.endsWith('.json')) {
                const text = await file.text();
                const json = JSON.parse(text);
                return JSON.stringify(json, null, 2);
            }

            if (file.name.endsWith('.csv')) {
                const text = await file.text();
                return text.replace(/,/g, ' | ');
            }

            // For PDF and DOCX, return placeholder for now
            if (file.name.endsWith('.pdf')) {
                return `[PDF Document: ${file.name}]\n\nThis is a PDF document. For full text extraction, PDF parsing libraries would be needed.`;
            }

            if (file.name.endsWith('.docx')) {
                return `[DOCX Document: ${file.name}]\n\nThis is a Word document. For full text extraction, DOCX parsing libraries would be needed.`;
            }

            // Default case
            return await file.text();
        } catch (error) {
            console.error('Text extraction error:', error);
            throw new Error(`Failed to extract text from ${file.name}`);
        }
    };

    // Process uploaded files
    const processFiles = async (files: File[], knowledgeBaseName: string) => {
        setIsProcessing(true);
        setUploadProgress(0);

        try {
            const sources: DocumentSource[] = [];
            const chunks: DocumentChunk[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setUploadProgress((i / files.length) * 100);

                const extractedText = await extractTextFromFile(file);

                const source: DocumentSource = {
                    id: `doc_${Date.now()}_${i}`,
                    name: file.name,
                    type: getFileType(file),
                    content: extractedText,
                    extractedText,
                    uploadDate: new Date().toISOString(),
                    fileSize: file.size
                };

                sources.push(source);

                // Create chunks from the text
                const textChunks = chunkText(extractedText, 500);
                textChunks.forEach((chunk, index) => {
                    chunks.push({
                        id: `chunk_${source.id}_${index}`,
                        sourceId: source.id,
                        content: chunk,
                        chunkIndex: index,
                        metadata: {
                            fileName: file.name,
                            fileType: getFileType(file)
                        }
                    });
                });
            }

            const knowledgeBase: KnowledgeBase = {
                id: `kb_${Date.now()}`,
                name: knowledgeBaseName,
                description: `Knowledge base with ${sources.length} documents`,
                sources,
                chunks,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true
            };

            setKnowledgeBases(prev => [...prev, knowledgeBase]);
            saveToLocalStorage([...knowledgeBases, knowledgeBase]);

            setUploadProgress(100);
            return knowledgeBase;
        } catch (error) {
            console.error('File processing error:', error);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    // Simple text chunking
    const chunkText = (text: string, chunkSize: number = 500): string[] => {
        const chunks: string[] = [];
        const sentences = text.split(/[.!?]+/).filter(Boolean);

        let currentChunk = '';
        for (const sentence of sentences) {
            if (currentChunk.length + sentence.length > chunkSize && currentChunk) {
                chunks.push(currentChunk.trim());
                currentChunk = sentence + '.';
            } else {
                currentChunk += sentence + '.';
            }
        }

        if (currentChunk) {
            chunks.push(currentChunk.trim());
        }

        return chunks;
    };

    // Get file type from file
    const getFileType = (file: File): DocumentSource['type'] => {
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) return 'pdf';
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) return 'docx';
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) return 'txt';
        if (file.name.endsWith('.md')) return 'md';
        if (file.type === 'application/json' || file.name.endsWith('.json')) return 'json';
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) return 'csv';
        return 'txt'; // default
    };

    // Search knowledge base
    const searchKnowledge = (query: string, knowledgeBaseId?: string): DocumentChunk[] => {
        const basesToSearch = knowledgeBaseId
            ? knowledgeBases.filter(kb => kb.id === knowledgeBaseId)
            : knowledgeBases;

        const results: DocumentChunk[] = [];
        const queryLower = query.toLowerCase();

        basesToSearch.forEach(kb => {
            if (!kb.isActive) return;

            const relevantChunks = kb.chunks.filter(chunk =>
                chunk.content.toLowerCase().includes(queryLower)
            );
            results.push(...relevantChunks);
        });

        // Sort by relevance (simple word count)
        return results.sort((a, b) => {
            const aMatches = (a.content.match(new RegExp(queryLower, 'gi')) || []).length;
            const bMatches = (b.content.match(new RegExp(queryLower, 'gi')) || []).length;
            return bMatches - aMatches;
        }).slice(0, 10);
    };

    // Build context from search results
    const buildDocumentContext = (query: string, knowledgeBaseId?: string): string => {
        const relevantChunks = searchKnowledge(query, knowledgeBaseId);

        if (relevantChunks.length === 0) {
            return '';
        }

        let context = '\n\n=== RELEVANT DOCUMENTS ===\n\n';
        relevantChunks.forEach((chunk, index) => {
            context += `Document ${index + 1}: ${chunk.content}\n\n`;
        });
        context += '=== END DOCUMENTS ===\n\n';

        return context;
    };

    // Local storage helpers
    const saveToLocalStorage = (bases: KnowledgeBase[]) => {
        try {
            localStorage.setItem('promptfolio-knowledge-bases', JSON.stringify(bases));
        } catch (error) {
            console.error('Failed to save knowledge bases:', error);
        }
    };

    const loadFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem('promptfolio-knowledge-bases');
            if (saved) {
                setKnowledgeBases(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Failed to load knowledge bases:', error);
        }
    };

    // Initialize on mount
    useState(() => {
        loadFromLocalStorage();
    });

    return {
        knowledgeBases,
        isProcessing,
        uploadProgress,
        processFiles,
        searchKnowledge,
        buildDocumentContext,
        setKnowledgeBases
    };
};
