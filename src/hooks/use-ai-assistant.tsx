import { useLocalLlama } from '@/hooks/use-local-llama';
import { useState } from 'react';

interface KnowledgeEntry {
    id: string;
    category: 'prompts' | 'tutorials' | 'features' | 'models' | 'workflows';
    title: string;
    content: string;
    tags: string[];
    embeddings?: number[];
}

interface SiteContext {
    currentPage: string;
    userRole: 'visitor' | 'user' | 'creator' | 'admin';
    recentActions: string[];
    preferences: Record<string, any>;
}

const PROMPTFOLIO_KNOWLEDGE: KnowledgeEntry[] = [
    {
        id: 'getting-started',
        category: 'tutorials',
        title: 'Getting Started with Promptfolio',
        content: `Promptfolio is your comprehensive AI creativity platform. Here's how to get started:

1. Explore Section: Browse thousands of high-quality prompts for different AI models
2. Labs Section: Access cutting-edge AI tools and workflows
3. Local AI: Run private AI models on your machine with Ollama
4. Models Hub: Compare and access 17+ AI models from GPT-4 to Kling 2.1 Pro
5. Create Account: Upload your own prompts and workflows
6. Join Community: Connect with other AI creators and artists`,
        tags: ['beginner', 'tutorial', 'overview', 'getting-started']
    },
    {
        id: 'local-ai-setup',
        category: 'tutorials',
        title: 'Setting Up Local AI',
        content: `Local AI with Ollama gives you 100% privacy and unlimited usage:

Setup Steps:
1. Download Ollama from ollama.ai
2. Install and run: ollama serve
3. Pull a model: ollama pull llama3.2
4. Visit /lab/local-ai in Promptfolio
5. Start chatting with your private AI

Recommended Models:
- Llama 3.2: Best balance (8B params, 4.7GB)
- Code Llama: For programming (7B params, 3.8GB)
- Mistral: Fast responses (7B params, 4.1GB)

Hardware Requirements:
- 8GB RAM minimum for small models
- 16GB RAM for better performance
- SSD storage recommended`,
        tags: ['local-ai', 'ollama', 'setup', 'privacy', 'tutorial']
    },
    {
        id: 'prompt-engineering',
        category: 'features',
        title: 'Advanced Prompt Engineering',
        content: `Master prompt engineering with Promptfolio's tools:

Prompt Structure:
1. Context: Set the scene and role
2. Task: Clearly define what you want
3. Format: Specify output format
4. Examples: Provide sample outputs
5. Constraints: Add limitations or rules

Best Practices:
- Be specific and detailed
- Use examples for complex tasks
- Iterate and refine prompts
- Test with different models
- Save successful prompts in your library

Promptfolio Features:
- Prompt templates and examples
- Model comparison tools
- Version control for prompts
- Community sharing and feedback`,
        tags: ['prompts', 'engineering', 'ai', 'techniques', 'best-practices']
    },
    {
        id: 'ai-models-guide',
        category: 'models',
        title: 'AI Models Comparison Guide',
        content: `Choose the right AI model for your task:

Text Generation:
- GPT-4 Turbo: Best overall quality, reasoning
- Claude 3.5 Sonnet: Excellent for analysis, writing
- Llama 3.1 405B: Open-source powerhouse
- Gemini Pro: Google's advanced model

Image Generation:
- DALL-E 3: High-quality, prompt adherence
- Midjourney: Artistic, creative styles
- Stable Diffusion XL: Open-source, customizable

Video Generation:
- Kling 2.1 Pro: Cinematic quality
- RunwayML: Professional video editing
- Pika Labs: Quick video generation

Code Generation:
- GitHub Copilot: IDE integration
- Code Llama: Local development
- Claude 3.5: Complex algorithms

Choose based on:
- Quality requirements
- Privacy needs
- Cost considerations
- Integration requirements`,
        tags: ['models', 'comparison', 'ai', 'selection', 'guide']
    },
    {
        id: 'creative-workflows',
        category: 'workflows',
        title: 'Creative AI Workflows',
        content: `Powerful workflows available in Promptfolio Labs:

ComfyUI Portrait Generator:
- Professional headshots
- Advanced lighting controls
- Background removal
- Style customization

Music Production Chain:
- AI music generation
- Mixing and mastering
- Genre adaptation
- Export to various formats

Video Upscaling Pipeline:
- 4K enhancement
- Noise reduction
- Frame interpolation
- Batch processing

Custom Workflow Creation:
1. Plan your pipeline
2. Connect AI tools
3. Set parameters
4. Test and iterate
5. Share with community

Benefits:
- Automated creative processes
- Consistent quality
- Time savings
- Professional results`,
        tags: ['workflows', 'creative', 'automation', 'comfyui', 'production']
    }
];

export const useAIAssistant = () => {
    const { generateText, generateStreamingText } = useLocalLlama();
    const [knowledge] = useState<KnowledgeEntry[]>(PROMPTFOLIO_KNOWLEDGE);

    const buildContextPrompt = (
        userQuery: string,
        siteContext: SiteContext,
        relevantKnowledge: KnowledgeEntry[]
    ): string => {
        const contextInfo = `
# Promptfolio AI Assistant Context

## Your Role
You are the official AI assistant for Promptfolio, a premium AI creativity platform. You help users navigate the platform, understand AI tools, and maximize their creative potential.

## Current Context
- Page: ${siteContext.currentPage}
- User Role: ${siteContext.userRole}
- Recent Actions: ${siteContext.recentActions.join(', ')}

## Available Knowledge
${relevantKnowledge.map(entry => `
### ${entry.title} (${entry.category})
${entry.content}
`).join('\n')}

## Your Guidelines
1. Be helpful, friendly, and knowledgeable
2. Always mention relevant Promptfolio features
3. Provide actionable advice and next steps
4. Encourage exploration of the platform
5. Keep responses concise but comprehensive
6. Use emojis sparingly but effectively
7. Reference specific pages and features when relevant

## User Query
${userQuery}

## Response Instructions
Provide a helpful response that:
- Directly answers the user's question
- References relevant Promptfolio features
- Suggests next steps or related features
- Maintains a friendly, expert tone
        `;

        return contextInfo;
    };

    const searchKnowledge = (query: string): KnowledgeEntry[] => {
        const queryLower = query.toLowerCase();
        return knowledge.filter(entry =>
            entry.title.toLowerCase().includes(queryLower) ||
            entry.content.toLowerCase().includes(queryLower) ||
            entry.tags.some(tag => tag.toLowerCase().includes(queryLower))
        ).slice(0, 3); // Top 3 most relevant
    };

    const getAIAssistance = async (
        userQuery: string,
        siteContext: SiteContext,
        onChunk?: (chunk: string) => void
    ): Promise<string> => {
        const relevantKnowledge = searchKnowledge(userQuery);
        const contextPrompt = buildContextPrompt(userQuery, siteContext, relevantKnowledge);

        if (onChunk) {
            let fullResponse = '';
            await generateStreamingText(
                contextPrompt,
                'llama3.2:latest',
                (chunk: string) => {
                    fullResponse += chunk;
                    onChunk(chunk);
                },
                { temperature: 0.7, max_tokens: 800 }
            );
            return fullResponse;
        } else {
            return await generateText(
                contextPrompt,
                'llama3.2:latest',
                { temperature: 0.7, max_tokens: 800 }
            );
        }
    };

    const getSuggestedQuestions = (siteContext: SiteContext): string[] => {
        const baseQuestions = [
            "How do I get started with Promptfolio?",
            "What's the difference between the AI models?",
            "How do I set up local AI?",
            "Can you help me with prompt engineering?",
            "What creative workflows are available?"
        ];

        const contextualQuestions: Record<string, string[]> = {
            '/explore': [
                "How do I find the best prompts for my project?",
                "What makes a good AI prompt?",
                "How do I use these prompts with different AI models?"
            ],
            '/lab': [
                "What AI tools are available in the Labs?",
                "How do I create custom workflows?",
                "Which model should I use for my project?"
            ],
            '/lab/local-ai': [
                "How do I install more models?",
                "What's the best model for coding?",
                "How do I optimize performance?"
            ]
        };

        return [
            ...baseQuestions,
            ...(contextualQuestions[siteContext.currentPage] || [])
        ].slice(0, 5);
    };

    return {
        getAIAssistance,
        getSuggestedQuestions,
        searchKnowledge,
        knowledge
    };
};
