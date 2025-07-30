import { useEffect, useState } from 'react';
import { emailClient } from '../integrations/email/client';
import { linkedinClient } from '../integrations/linkedin/client';
import { notionClient } from '../integrations/notion/client';

export interface WorkflowStep {
    id: string;
    type: 'ai-generate' | 'linkedin-post' | 'notion-create' | 'email-send' | 'delay' | 'condition';
    name: string;
    config: Record<string, any>;
    position: { x: number; y: number };
    connections: string[]; // IDs of next steps
}

export interface Workflow {
    id: string;
    name: string;
    description: string;
    steps: WorkflowStep[];
    triggers: {
        type: 'manual' | 'schedule' | 'webhook' | 'document-upload';
        config: Record<string, any>;
    }[];
    isActive: boolean;
    createdAt: string;
    lastRun?: string;
    runCount: number;
}

export interface WorkflowExecution {
    id: string;
    workflowId: string;
    status: 'running' | 'completed' | 'failed' | 'paused';
    startedAt: string;
    completedAt?: string;
    currentStepId?: string;
    results: Record<string, any>;
    errors: string[];
}

export const useIntegrations = () => {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
    const [connections, setConnections] = useState({
        linkedin: false,
        notion: false,
        email: false
    });

    // Load workflows from storage
    useEffect(() => {
        const savedWorkflows = localStorage.getItem('promptfolio-workflows');
        if (savedWorkflows) {
            try {
                setWorkflows(JSON.parse(savedWorkflows));
            } catch (error) {
                console.error('Failed to load workflows:', error);
            }
        }

        // Check connection status
        checkConnections();
    }, []);

    // Check all integration connections
    const checkConnections = async () => {
        // Initialize from storage and handle pending auth
        linkedinClient.initializeFromStorage();
        await linkedinClient.handlePendingAuth();

        const linkedinConnected = linkedinClient.isAuthenticated();
        const notionConnected = notionClient.isAuthenticated();
        const emailConnected = emailClient.isConfigured();

        setConnections({
            linkedin: linkedinConnected,
            notion: notionConnected,
            email: emailConnected
        });
    };

    // Save workflows to storage
    const saveWorkflows = (newWorkflows: Workflow[]) => {
        setWorkflows(newWorkflows);
        localStorage.setItem('promptfolio-workflows', JSON.stringify(newWorkflows));
    };

    // Create new workflow
    const createWorkflow = (workflowData: Omit<Workflow, 'id' | 'createdAt' | 'runCount'>): Workflow => {
        const newWorkflow: Workflow = {
            ...workflowData,
            id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            runCount: 0
        };

        saveWorkflows([...workflows, newWorkflow]);
        return newWorkflow;
    };

    // Update workflow
    const updateWorkflow = (id: string, updates: Partial<Workflow>) => {
        const updatedWorkflows = workflows.map(workflow =>
            workflow.id === id ? { ...workflow, ...updates } : workflow
        );
        saveWorkflows(updatedWorkflows);
    };

    // Delete workflow
    const deleteWorkflow = (id: string) => {
        const updatedWorkflows = workflows.filter(workflow => workflow.id !== id);
        saveWorkflows(updatedWorkflows);
    };

    // Execute workflow
    const executeWorkflow = async (workflowId: string, inputData?: Record<string, any>): Promise<WorkflowExecution> => {
        const workflow = workflows.find(w => w.id === workflowId);
        if (!workflow) throw new Error('Workflow not found');

        const execution: WorkflowExecution = {
            id: `execution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            workflowId,
            status: 'running',
            startedAt: new Date().toISOString(),
            results: inputData || {},
            errors: []
        };

        setExecutions(prev => [...prev, execution]);

        try {
            // Find the first step (no incoming connections)
            const firstStep = workflow.steps.find(step =>
                !workflow.steps.some(otherStep => otherStep.connections.includes(step.id))
            );

            if (!firstStep) {
                throw new Error('No starting step found in workflow');
            }

            await executeStep(workflow, firstStep, execution);

            // Update execution status
            execution.status = 'completed';
            execution.completedAt = new Date().toISOString();

            // Update workflow run count
            updateWorkflow(workflowId, {
                runCount: workflow.runCount + 1,
                lastRun: new Date().toISOString()
            });

        } catch (error) {
            execution.status = 'failed';
            execution.errors.push(error instanceof Error ? error.message : 'Unknown error');
            execution.completedAt = new Date().toISOString();
        }

        // Update execution in state
        setExecutions(prev =>
            prev.map(exec => exec.id === execution.id ? execution : exec)
        );

        return execution;
    };

    // Execute individual workflow step
    const executeStep = async (workflow: Workflow, step: WorkflowStep, execution: WorkflowExecution): Promise<void> => {
        execution.currentStepId = step.id;

        try {
            let stepResult: any = {};

            switch (step.type) {
                case 'ai-generate':
                    stepResult = await executeAIGenerate(step, execution.results);
                    break;
                case 'linkedin-post':
                    stepResult = await executeLinkedInPost(step, execution.results);
                    break;
                case 'notion-create':
                    stepResult = await executeNotionCreate(step, execution.results);
                    break;
                case 'email-send':
                    stepResult = await executeEmailSend(step, execution.results);
                    break;
                case 'delay':
                    stepResult = await executeDelay(step);
                    break;
                case 'condition':
                    stepResult = await executeCondition(step, execution.results);
                    break;
                default:
                    throw new Error(`Unknown step type: ${step.type}`);
            }

            // Store step result
            execution.results[step.id] = stepResult;

            // Execute next steps
            for (const nextStepId of step.connections) {
                const nextStep = workflow.steps.find(s => s.id === nextStepId);
                if (nextStep) {
                    await executeStep(workflow, nextStep, execution);
                }
            }

        } catch (error) {
            throw new Error(`Step ${step.name} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    // Step execution functions
    const executeAIGenerate = async (step: WorkflowStep, context: Record<string, any>): Promise<any> => {
        const { prompt, model, variables } = step.config;

        // Replace variables in prompt
        let processedPrompt = prompt;
        if (variables) {
            for (const [key, value] of Object.entries(variables)) {
                processedPrompt = processedPrompt.replace(`{{${key}}}`, context[value] || value);
            }
        }

        // This would integrate with your AI system
        // For now, return a mock response
        return {
            content: `AI generated content for: ${processedPrompt}`,
            model,
            prompt: processedPrompt
        };
    };

    const executeLinkedInPost = async (step: WorkflowStep, context: Record<string, any>): Promise<any> => {
        const { content, imageUrl } = step.config;

        // Replace variables in content
        let processedContent = content;
        for (const [key, value] of Object.entries(context)) {
            if (typeof value === 'string') {
                processedContent = processedContent.replace(`{{${key}}}`, value);
            }
        }

        return await linkedinClient.createPost(processedContent, imageUrl);
    };

    const executeNotionCreate = async (step: WorkflowStep, context: Record<string, any>): Promise<any> => {
        const { databaseId, pageType, title, content } = step.config;

        // Process variables
        const processedTitle = title.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => context[key] || match);
        const processedContent = content.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => context[key] || match);

        switch (pageType) {
            case 'research':
                return await notionClient.createResearchPage(databaseId, processedTitle, processedContent, []);
            case 'content-calendar':
                return await notionClient.createContentCalendarEntry(databaseId, processedTitle, processedContent, 'LinkedIn', new Date());
            default:
                return await notionClient.createPage(databaseId, { Name: processedTitle }, []);
        }
    };

    const executeEmailSend = async (step: WorkflowStep, context: Record<string, any>): Promise<any> => {
        const { to, subject, template, variables } = step.config;

        // Process variables
        const processedSubject = subject.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => context[key] || match);
        const processedTo = to.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => context[key] || match);

        return await emailClient.sendAIEmail(template, processedTo, variables || {}, JSON.stringify(context));
    };

    const executeDelay = async (step: WorkflowStep): Promise<any> => {
        const { duration } = step.config; // duration in milliseconds
        await new Promise(resolve => setTimeout(resolve, duration));
        return { delayed: duration };
    };

    const executeCondition = async (step: WorkflowStep, context: Record<string, any>): Promise<any> => {
        const { condition, variable, operator, value } = step.config;

        const contextValue = context[variable];
        let result = false;

        switch (operator) {
            case 'equals':
                result = contextValue === value;
                break;
            case 'contains':
                result = String(contextValue).includes(value);
                break;
            case 'greater':
                result = Number(contextValue) > Number(value);
                break;
            case 'exists':
                result = contextValue !== undefined && contextValue !== null;
                break;
        }

        return { condition, result, variable, value: contextValue };
    };

    // Predefined workflow templates
    const getWorkflowTemplates = (): Partial<Workflow>[] => [
        {
            name: 'Content Research to LinkedIn',
            description: 'Research a topic, generate content, and post to LinkedIn',
            steps: [
                {
                    id: 'research',
                    type: 'ai-generate',
                    name: 'Research Topic',
                    config: {
                        prompt: 'Research the topic: {{topic}}. Provide key insights and trends.',
                        model: 'gpt-4',
                        variables: { topic: 'topic' }
                    },
                    position: { x: 100, y: 100 },
                    connections: ['generate-post']
                },
                {
                    id: 'generate-post',
                    type: 'ai-generate',
                    name: 'Generate LinkedIn Post',
                    config: {
                        prompt: 'Create an engaging LinkedIn post based on this research: {{research}}',
                        model: 'gpt-4',
                        variables: { research: 'research.content' }
                    },
                    position: { x: 300, y: 100 },
                    connections: ['post-linkedin', 'save-notion']
                },
                {
                    id: 'post-linkedin',
                    type: 'linkedin-post',
                    name: 'Post to LinkedIn',
                    config: {
                        content: '{{generate-post.content}}'
                    },
                    position: { x: 500, y: 50 },
                    connections: []
                },
                {
                    id: 'save-notion',
                    type: 'notion-create',
                    name: 'Save to Notion',
                    config: {
                        databaseId: '',
                        pageType: 'content-calendar',
                        title: 'LinkedIn Post: {{topic}}',
                        content: '{{generate-post.content}}'
                    },
                    position: { x: 500, y: 150 },
                    connections: []
                }
            ],
            triggers: [
                {
                    type: 'manual',
                    config: { variables: ['topic'] }
                }
            ],
            isActive: true
        },
        {
            name: 'Document Analysis to Knowledge Base',
            description: 'Analyze uploaded documents and create Notion knowledge base entries',
            steps: [
                {
                    id: 'analyze-doc',
                    type: 'ai-generate',
                    name: 'Analyze Document',
                    config: {
                        prompt: 'Analyze this document and extract key insights: {{document_content}}',
                        model: 'gpt-4',
                        variables: { document_content: 'document_content' }
                    },
                    position: { x: 100, y: 100 },
                    connections: ['create-knowledge']
                },
                {
                    id: 'create-knowledge',
                    type: 'notion-create',
                    name: 'Create Knowledge Entry',
                    config: {
                        databaseId: '',
                        pageType: 'research',
                        title: '{{document_title}}',
                        content: '{{analyze-doc.content}}'
                    },
                    position: { x: 300, y: 100 },
                    connections: ['send-notification']
                },
                {
                    id: 'send-notification',
                    type: 'email-send',
                    name: 'Send Notification',
                    config: {
                        to: '{{user_email}}',
                        subject: 'New knowledge base entry created',
                        template: 'content-notification',
                        variables: {
                            contentTitle: '{{document_title}}',
                            contentSummary: '{{analyze-doc.content}}'
                        }
                    },
                    position: { x: 500, y: 100 },
                    connections: []
                }
            ],
            triggers: [
                {
                    type: 'document-upload',
                    config: {}
                }
            ],
            isActive: true
        }
    ];

    return {
        workflows,
        executions,
        connections,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow,
        executeWorkflow,
        checkConnections,
        getWorkflowTemplates,

        // Integration methods
        linkedin: {
            connect: () => {
                const authUrl = linkedinClient.getAuthUrl();
                const popup = window.open(
                    authUrl,
                    'linkedin-auth',
                    'width=600,height=700,left=' +
                    (window.innerWidth / 2 - 300) + ',top=' +
                    (window.innerHeight / 2 - 350) +
                    ',scrollbars=yes,resizable=yes'
                );

                // Listen for popup completion
                const checkClosed = setInterval(() => {
                    if (popup?.closed) {
                        clearInterval(checkClosed);
                        // Check for auth completion
                        setTimeout(() => {
                            checkConnections();
                        }, 1000);
                    }
                }, 1000);
            },
            isConnected: () => connections.linkedin,
            post: (content: string) => linkedinClient.createPost(content),
            getProfile: () => linkedinClient.getProfile()
        },

        notion: {
            setToken: (token: string) => notionClient.setAccessToken(token),
            isConnected: () => connections.notion,
            getDatabases: () => notionClient.getDatabases(),
            createPage: (databaseId: string, properties: any) => notionClient.createPage(databaseId, properties)
        },

        email: {
            isConfigured: () => connections.email,
            send: (to: string, subject: string, html: string) => emailClient.sendEmail(to, subject, html),
            getTemplates: () => emailClient.getEmailTemplates(),
            schedule: (to: string, subject: string, html: string, time: Date) => emailClient.scheduleEmail(to, subject, html, time)
        }
    };
};
