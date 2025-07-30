import { ResearchManager } from '@/components/ResearchManager';

export const Research = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Research Hub</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Manage your research documents, upload PDFs, and extract knowledge for prompt engineering
                </p>
            </div>

            <ResearchManager />
        </div>
    );
};
