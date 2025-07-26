import { useState } from 'react';
import { CustomInstruction } from './use-custom-instructions';

interface LocalLlamaResponse {
    response: string;
    done: boolean;
    context?: number[];
}

interface LocalLlamaOptions {
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    customInstruction?: CustomInstruction | null;
    documentContext?: string;
}

const OLLAMA_BASE_URL = 'http://localhost:11434';

export const useLocalLlama = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Generate text with Ollama
    const generateText = async (
        prompt: string,
        model: string = 'llama3.2:latest',
        options: LocalLlamaOptions = {}
    ): Promise<string> => {
        setIsLoading(true);
        setError(null);

        try {
            // Build the final prompt with custom instruction and document context
            let finalPrompt = prompt;
            if (options.customInstruction) {
                finalPrompt = `${options.customInstruction.systemPrompt}\n\nUser Request: ${prompt}`;
            }
            if (options.documentContext) {
                finalPrompt = `${finalPrompt}${options.documentContext}`;
            }

            const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    prompt: finalPrompt,
                    stream: false,
                    options: {
                        temperature: options.temperature || 0.7,
                        top_p: options.top_p || 0.9,
                        num_predict: options.max_tokens || 500,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: LocalLlamaResponse = await response.json();
            return data.response;

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error('Local Llama API error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Generate streaming text with Ollama
    const generateStreamingText = async (
        prompt: string,
        model: string = 'llama3.2:latest',
        onChunk: (chunk: string) => void,
        options: LocalLlamaOptions = {}
    ): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Build the final prompt with custom instruction and document context
            let finalPrompt = prompt;
            if (options.customInstruction) {
                finalPrompt = `${options.customInstruction.systemPrompt}\n\nUser Request: ${prompt}`;
            }
            if (options.documentContext) {
                finalPrompt = `${finalPrompt}${options.documentContext}`;
            }

            const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    prompt: finalPrompt,
                    stream: true,
                    options: {
                        temperature: options.temperature || 0.7,
                        top_p: options.top_p || 0.9,
                        num_predict: options.max_tokens || 500,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('No response body reader available');
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n').filter(line => line.trim());

                for (const line of lines) {
                    try {
                        const data: LocalLlamaResponse = JSON.parse(line);
                        if (data.response) {
                            onChunk(data.response);
                        }
                        if (data.done) {
                            return;
                        }
                    } catch (e) {
                        // Skip malformed JSON lines
                        console.warn('Failed to parse JSON line:', line);
                    }
                }
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error('Local Llama streaming error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Get available models
    const getAvailableModels = async (): Promise<string[]> => {
        try {
            const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.models?.map((model: any) => model.name) || ['llama3.2:latest'];
        } catch (err) {
            console.error('Error fetching models:', err);
            return ['llama3.2:latest']; // Default to your installed model
        }
    };

    // Check if Ollama is running
    const checkOllamaStatus = async (): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:11434/api/tags');
            return response.ok;
        } catch {
            return false;
        }
    };

    return {
        generateText,
        generateStreamingText,
        getAvailableModels,
        checkOllamaStatus,
        isLoading,
        error
    };
};
