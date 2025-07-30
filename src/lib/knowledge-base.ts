export interface ResearchDocument {
    id: string;
    title: string;
    category: string;
    lastUpdated: string;
    content: string;
    tags: string[];
    modalities: string[];
    techniques: string[];
}

export interface KnowledgeEntry {
    id: string;
    title: string;
    content: string;
    category: 'technique' | 'modality' | 'best-practice' | 'case-study' | 'research';
    modality: 'text' | 'image' | 'audio' | 'video' | 'code' | 'multimodal';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    examples?: string[];
    relatedTechniques?: string[];
    sourceDocument?: string;
}

export class KnowledgeBase {
    private documents: ResearchDocument[] = [];
    private entries: KnowledgeEntry[] = [];

    constructor() {
        this.loadFromStorage();
        this.initializeWithResearch();
    }

    // Initialize with your prompt engineering research
    private initializeWithResearch(): void {
        // Only initialize if no documents exist
        if (this.documents.length === 0) {
            this.addPromptEngineeringResearch();
        }
    }

    private addPromptEngineeringResearch(): void {
        // Add your research document
        const researchDoc = this.addDocument({
            title: 'Prompt Engineering Techniques Across AI Modalities',
            category: 'Research',
            lastUpdated: new Date().toISOString(),
            content: `# Prompt Engineering Techniques Across AI Modalities

## Executive Summary
This research document provides comprehensive analysis of prompt engineering techniques across text, image, audio, video, and code generation modalities, based on current best practices and emerging methodologies.

## Text Generation Techniques

### Chain-of-Thought (CoT) Prompting
Step-by-step reasoning approach that breaks down complex problems into manageable components.

### Few-Shot Learning
Providing examples to establish patterns and expected output formats.

### Tree-of-Thought
Advanced reasoning technique that explores multiple solution paths simultaneously.

### Role-Based Prompting
Instructing the AI to adopt specific personas or professional roles for specialized outputs.

## Image Generation Techniques

### Descriptive Prompting
Detailed visual descriptions including style, composition, lighting, and artistic elements.

### Negative Prompting
Explicitly stating what should NOT appear in the generated image.

### Style Transfer Prompting
Referencing specific artistic styles, artists, or visual aesthetics.

### Technical Parameter Integration
Combining creative descriptions with technical specifications (aspect ratios, quality settings).

## Audio Generation Techniques

### Genre and Style Specification
Clear definition of musical genres, instruments, and production styles.

### Mood and Emotion Prompting
Describing the emotional tone and atmosphere desired in the audio.

### Technical Audio Prompting
Specifying tempo, key signatures, and production techniques.

## Video Generation Techniques

### Narrative Structure Prompting
Describing scene progression, transitions, and storytelling elements.

### Visual Continuity Prompting
Ensuring consistency across frames and sequences.

### Motion and Cinematography Prompting
Specifying camera movements, shot types, and visual dynamics.

## Code Generation Techniques

### Specification-Driven Prompting
Clear functional requirements and expected behaviors.

### Example-Based Code Prompting
Providing code examples and patterns for reference.

### Architecture and Design Pattern Prompting
Requesting specific design patterns and architectural approaches.

### Testing and Documentation Integration
Including requirements for tests and documentation in prompts.

## Cross-Modal Best Practices

### Context Preservation
Maintaining consistent context across different modalities in multi-modal workflows.

### Progressive Refinement
Iterative improvement through feedback loops and prompt optimization.

### Parameter Optimization
Fine-tuning model parameters for specific use cases and quality requirements.

### Quality Assessment
Establishing metrics and evaluation criteria for different modalities.

## Advanced Techniques

### Meta-Prompting
Prompts that generate other prompts for specific tasks.

### Conditional Logic Integration
Building decision trees and conditional flows into prompts.

### Multi-Agent Prompting
Coordinating multiple AI agents for complex, multi-step tasks.

### Contextual Memory Management
Strategies for maintaining long-term context in extended interactions.`,
            tags: ['prompt engineering', 'AI modalities', 'best practices', 'techniques', 'research'],
            modalities: ['text', 'image', 'audio', 'video', 'code', 'multimodal'],
            techniques: ['chain-of-thought', 'few-shot', 'tree-of-thought', 'role-based', 'meta-prompting']
        });

        // Extract detailed knowledge entries
        this.extractEntries(researchDoc.id, [
            {
                title: 'Chain-of-Thought Prompting',
                content: 'A reasoning technique that guides AI models through explicit step-by-step problem-solving processes. Particularly effective for mathematical problems, logical reasoning, and complex analysis tasks. Works by making the reasoning process transparent and sequential.',
                category: 'technique',
                modality: 'text',
                difficulty: 'intermediate',
                tags: ['reasoning', 'step-by-step', 'problem-solving', 'logic'],
                examples: [
                    'Let\'s work through this step by step: First, identify the key variables...',
                    'To solve this problem, I need to: 1) Analyze the data, 2) Find patterns, 3) Draw conclusions',
                    'Breaking this down: Step 1 - Understand the requirements, Step 2 - Design the solution...'
                ],
                relatedTechniques: ['Tree-of-Thought', 'Few-Shot Learning']
            },
            {
                title: 'Few-Shot Learning',
                content: 'Technique that provides 2-5 examples in the prompt to help the model understand the desired output format, style, and approach. Extremely effective for establishing patterns and consistency across outputs.',
                category: 'technique',
                modality: 'multimodal',
                difficulty: 'beginner',
                tags: ['examples', 'learning', 'context', 'patterns'],
                examples: [
                    'Example 1: Input: "sad" → Output: "😢"\nExample 2: Input: "happy" → Output: "😊"\nNow convert: "excited" →',
                    'Here are examples of good commit messages:\n- feat: add user authentication\n- fix: resolve login timeout issue\nWrite a commit message for adding a search feature:'
                ],
                relatedTechniques: ['Chain-of-Thought', 'Role-Based Prompting']
            },
            {
                title: 'Negative Prompting for Images',
                content: 'Technique used in image generation to explicitly exclude unwanted elements from the generated image. Essential for achieving high-quality, focused visual outputs by preventing common artifacts and unwanted features.',
                category: 'technique',
                modality: 'image',
                difficulty: 'beginner',
                tags: ['image generation', 'quality control', 'exclusion', 'artifacts'],
                examples: [
                    'Positive: "Beautiful sunset over mountains" Negative: "blurry, low quality, watermark, text"',
                    'Positive: "Professional headshot" Negative: "multiple faces, distorted features, hands, extra limbs"'
                ],
                relatedTechniques: ['Descriptive Prompting', 'Style Transfer']
            },
            {
                title: 'Role-Based Prompting',
                content: 'Technique that instructs the AI to adopt a specific professional role, persona, or expertise level. This contextualizes responses and ensures appropriate tone, terminology, and depth of knowledge for the intended audience.',
                category: 'technique',
                modality: 'text',
                difficulty: 'beginner',
                tags: ['persona', 'role-playing', 'context', 'expertise'],
                examples: [
                    'Act as a senior software engineer and review this code...',
                    'You are a marketing specialist. Create a campaign strategy for...',
                    'Respond as a patient teacher explaining complex concepts to a beginner...'
                ],
                relatedTechniques: ['Few-Shot Learning', 'Chain-of-Thought']
            },
            {
                title: 'Progressive Refinement',
                content: 'Iterative approach to prompt optimization where initial outputs are analyzed and prompts are systematically improved through multiple rounds of testing and refinement. Essential for achieving production-quality results.',
                category: 'best-practice',
                modality: 'multimodal',
                difficulty: 'advanced',
                tags: ['optimization', 'iteration', 'quality improvement', 'testing'],
                examples: [
                    'Round 1: Basic prompt → Analyze output → Round 2: Add specificity → Test → Round 3: Fine-tune parameters',
                    'Start broad: "Write code" → Refine: "Write Python function" → Optimize: "Write Python function with error handling and docstrings"'
                ],
                relatedTechniques: ['Meta-Prompting', 'Quality Assessment']
            },
            {
                title: 'Meta-Prompting',
                content: 'Advanced technique where prompts are designed to generate other prompts. Particularly useful for creating specialized prompts for specific domains or automating prompt creation workflows.',
                category: 'technique',
                modality: 'text',
                difficulty: 'advanced',
                tags: ['automation', 'prompt generation', 'meta-learning', 'workflow'],
                examples: [
                    'Create a prompt that will help generate creative marketing slogans for tech startups...',
                    'Design a prompt template for code review that can be customized for different programming languages...'
                ],
                relatedTechniques: ['Progressive Refinement', 'Multi-Agent Prompting']
            }
        ]);
    }

    // Add research document
    addDocument(document: Omit<ResearchDocument, 'id'>): ResearchDocument {
        const newDoc: ResearchDocument = {
            ...document,
            id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        this.documents.push(newDoc);
        this.saveToStorage();
        return newDoc;
    }

    // Extract knowledge entries from document
    extractEntries(documentId: string, entries: Omit<KnowledgeEntry, 'id' | 'sourceDocument'>[]): KnowledgeEntry[] {
        const newEntries = entries.map(entry => ({
            ...entry,
            id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sourceDocument: documentId
        }));

        this.entries.push(...newEntries);
        this.saveToStorage();
        return newEntries;
    }

    // Search knowledge base
    search(query: string, filters?: {
        category?: string;
        modality?: string;
        difficulty?: string;
        tags?: string[];
    }): KnowledgeEntry[] {
        let results = this.entries;

        // Text search
        if (query) {
            const searchTerms = query.toLowerCase().split(' ');
            results = results.filter(entry =>
                searchTerms.some(term =>
                    entry.title.toLowerCase().includes(term) ||
                    entry.content.toLowerCase().includes(term) ||
                    entry.tags.some(tag => tag.toLowerCase().includes(term))
                )
            );
        }

        // Apply filters
        if (filters) {
            if (filters.category) {
                results = results.filter(entry => entry.category === filters.category);
            }
            if (filters.modality) {
                results = results.filter(entry => entry.modality === filters.modality);
            }
            if (filters.difficulty) {
                results = results.filter(entry => entry.difficulty === filters.difficulty);
            }
            if (filters.tags && filters.tags.length > 0) {
                results = results.filter(entry =>
                    filters.tags!.some(tag => entry.tags.includes(tag))
                );
            }
        }

        return results;
    }

    // Get techniques by modality
    getTechniquesByModality(modality: string): KnowledgeEntry[] {
        return this.entries.filter(entry =>
            entry.modality === modality && entry.category === 'technique'
        );
    }

    // Get related techniques
    getRelatedTechniques(techniqueId: string): KnowledgeEntry[] {
        const technique = this.entries.find(entry => entry.id === techniqueId);
        if (!technique || !technique.relatedTechniques) return [];

        return this.entries.filter(entry =>
            technique.relatedTechniques!.includes(entry.title)
        );
    }

    // Get all documents
    getDocuments(): ResearchDocument[] {
        return this.documents;
    }

    // Get all entries
    getEntries(): KnowledgeEntry[] {
        return this.entries;
    }

    // Generate content using knowledge base
    generateContent(topic: string, modality: string): string {
        const relevantEntries = this.search(topic, { modality });

        if (relevantEntries.length === 0) {
            return `No specific knowledge found for ${topic} in ${modality} modality.`;
        }

        let content = `# ${topic} - ${modality.charAt(0).toUpperCase() + modality.slice(1)} Techniques\n\n`;

        relevantEntries.forEach(entry => {
            content += `## ${entry.title}\n\n`;
            content += `${entry.content}\n\n`;

            if (entry.examples && entry.examples.length > 0) {
                content += `### Examples:\n`;
                entry.examples.forEach(example => {
                    content += `- ${example}\n`;
                });
                content += '\n';
            }
        });

        return content;
    }

    private loadFromStorage(): void {
        try {
            const docs = localStorage.getItem('promptfolio-research-documents');
            const entries = localStorage.getItem('promptfolio-knowledge-entries');

            if (docs) this.documents = JSON.parse(docs);
            if (entries) this.entries = JSON.parse(entries);
        } catch (error) {
            console.error('Failed to load knowledge base from storage:', error);
        }
    }

    private saveToStorage(): void {
        try {
            localStorage.setItem('promptfolio-research-documents', JSON.stringify(this.documents));
            localStorage.setItem('promptfolio-knowledge-entries', JSON.stringify(this.entries));
        } catch (error) {
            console.error('Failed to save knowledge base to storage:', error);
        }
    }
}

export const knowledgeBase = new KnowledgeBase();
