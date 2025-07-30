import { Client } from '@notionhq/client';

export interface NotionPage {
    id: string;
    title: string;
    url: string;
    createdAt: string;
    lastEdited: string;
    properties: Record<string, any>;
}

export interface NotionDatabase {
    id: string;
    title: string;
    properties: Record<string, any>;
}

export class NotionClient {
    private client: Client | null = null;
    private accessToken: string | null = null;

    constructor() {
        const token = import.meta.env.VITE_NOTION_ACCESS_TOKEN;
        if (token && token !== 'secret_your-notion-integration-token') {
            this.setAccessToken(token);
        }
    }

    setAccessToken(token: string) {
        this.accessToken = token;
        this.client = new Client({
            auth: token,
        });
    }

    // Get all databases accessible to the integration
    async getDatabases(): Promise<NotionDatabase[]> {
        if (!this.client) throw new Error('Notion client not initialized');

        const response = await this.client.search({
            filter: {
                property: 'object',
                value: 'database'
            }
        });

        return response.results.map((db: any) => ({
            id: db.id,
            title: db.title?.[0]?.plain_text || 'Untitled Database',
            properties: db.properties
        }));
    }

    // Create a new page in a database
    async createPage(databaseId: string, properties: Record<string, any>, content?: any[]): Promise<NotionPage> {
        if (!this.client) throw new Error('Notion client not initialized');

        const pageData: any = {
            parent: {
                database_id: databaseId
            },
            properties: this.formatProperties(properties)
        };

        if (content) {
            pageData.children = content;
        }

        const response = await this.client.pages.create(pageData);

        return {
            id: response.id,
            title: this.extractTitle(response.properties),
            url: response.url,
            createdAt: response.created_time,
            lastEdited: response.last_edited_time,
            properties: response.properties
        };
    }

    // Create a research page from AI analysis
    async createResearchPage(databaseId: string, topic: string, analysis: string, sources: string[]): Promise<NotionPage> {
        const properties = {
            Name: { title: [{ text: { content: `Research: ${topic}` } }] },
            Type: { select: { name: 'Research' } },
            Status: { select: { name: 'In Progress' } },
            Created: { date: { start: new Date().toISOString() } }
        };

        const content = [
            {
                object: 'block',
                type: 'heading_1',
                heading_1: {
                    rich_text: [{ type: 'text', text: { content: `Research: ${topic}` } }]
                }
            },
            {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                    rich_text: [{ type: 'text', text: { content: 'Analysis' } }]
                }
            },
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [{ type: 'text', text: { content: analysis } }]
                }
            },
            {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                    rich_text: [{ type: 'text', text: { content: 'Sources' } }]
                }
            },
            ...sources.map(source => ({
                object: 'block',
                type: 'bulleted_list_item',
                bulleted_list_item: {
                    rich_text: [{ type: 'text', text: { content: source } }]
                }
            }))
        ];

        return this.createPage(databaseId, properties, content);
    }

    // Create a content calendar entry
    async createContentCalendarEntry(
        databaseId: string,
        title: string,
        content: string,
        platform: string,
        scheduledDate: Date
    ): Promise<NotionPage> {
        const properties = {
            Name: { title: [{ text: { content: title } }] },
            Platform: { select: { name: platform } },
            Status: { select: { name: 'Draft' } },
            'Scheduled Date': { date: { start: scheduledDate.toISOString() } },
            'Content Type': { select: { name: 'Social Media Post' } }
        };

        const contentBlocks = [
            {
                object: 'block',
                type: 'heading_1',
                heading_1: {
                    rich_text: [{ type: 'text', text: { content: title } }]
                }
            },
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [{ type: 'text', text: { content: content } }]
                }
            }
        ];

        return this.createPage(databaseId, properties, contentBlocks);
    }

    // Update page properties
    async updatePage(pageId: string, properties: Record<string, any>): Promise<NotionPage> {
        if (!this.client) throw new Error('Notion client not initialized');

        const response = await this.client.pages.update({
            page_id: pageId,
            properties: this.formatProperties(properties)
        });

        return {
            id: response.id,
            title: this.extractTitle(response.properties),
            url: response.url,
            createdAt: response.created_time,
            lastEdited: response.last_edited_time,
            properties: response.properties
        };
    }

    // Get pages from a database with filters
    async getPages(databaseId: string, filter?: any, sorts?: any[]): Promise<NotionPage[]> {
        if (!this.client) throw new Error('Notion client not initialized');

        const response = await this.client.databases.query({
            database_id: databaseId,
            filter,
            sorts
        });

        return response.results.map((page: any) => ({
            id: page.id,
            title: this.extractTitle(page.properties),
            url: page.url,
            createdAt: page.created_time,
            lastEdited: page.last_edited_time,
            properties: page.properties
        }));
    }

    // Create a knowledge base entry from document analysis
    async createKnowledgeBaseEntry(
        databaseId: string,
        documentTitle: string,
        insights: string[],
        tags: string[]
    ): Promise<NotionPage> {
        const properties = {
            Name: { title: [{ text: { content: `Knowledge: ${documentTitle}` } }] },
            Type: { select: { name: 'Knowledge Base' } },
            Tags: { multi_select: tags.map(tag => ({ name: tag })) },
            Created: { date: { start: new Date().toISOString() } }
        };

        const content = [
            {
                object: 'block',
                type: 'heading_1',
                heading_1: {
                    rich_text: [{ type: 'text', text: { content: `Knowledge Base: ${documentTitle}` } }]
                }
            },
            {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                    rich_text: [{ type: 'text', text: { content: 'Key Insights' } }]
                }
            },
            ...insights.map(insight => ({
                object: 'block',
                type: 'bulleted_list_item',
                bulleted_list_item: {
                    rich_text: [{ type: 'text', text: { content: insight } }]
                }
            }))
        ];

        return this.createPage(databaseId, properties, content);
    }

    // Helper methods
    private formatProperties(properties: Record<string, any>): Record<string, any> {
        const formatted: Record<string, any> = {};

        for (const [key, value] of Object.entries(properties)) {
            if (typeof value === 'string') {
                formatted[key] = {
                    rich_text: [{ type: 'text', text: { content: value } }]
                };
            } else {
                formatted[key] = value;
            }
        }

        return formatted;
    }

    private extractTitle(properties: any): string {
        for (const prop of Object.values(properties) as any[]) {
            if (prop.type === 'title' && prop.title?.length > 0) {
                return prop.title[0].plain_text;
            }
        }
        return 'Untitled';
    }

    // Check if authenticated
    isAuthenticated(): boolean {
        return !!this.client;
    }

    // Test connection
    async testConnection(): Promise<boolean> {
        try {
            if (!this.client) return false;
            await this.client.users.me();
            return true;
        } catch (error) {
            console.error('Notion connection test failed:', error);
            return false;
        }
    }
}

export const notionClient = new NotionClient();
