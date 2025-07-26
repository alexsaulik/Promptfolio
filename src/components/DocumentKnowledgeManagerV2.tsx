import {
    BookOpen,
    Database,
    File,
    FileIcon,
    FileSpreadsheet,
    FileText,
    MessageSquare,
    Plus,
    Search,
    Trash2,
    Upload
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { KnowledgeBase, useDocumentKnowledge } from '../hooks/use-document-knowledge';
import { toast } from '../hooks/use-toast';
import DocumentChat from './DocumentChat';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

interface DocumentKnowledgeManagerProps {
    onKnowledgeSelect?: (knowledgeBase: KnowledgeBase | null) => void;
    className?: string;
}

export const DocumentKnowledgeManager = ({ onKnowledgeSelect, className }: DocumentKnowledgeManagerProps) => {
    const {
        knowledgeBases,
        isProcessing,
        uploadProgress,
        processFiles,
        searchKnowledge,
        setKnowledgeBases
    } = useDocumentKnowledge();

    const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<KnowledgeBase | null>(null);
    const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [newKbName, setNewKbName] = useState('');
    const [newKbDescription, setNewKbDescription] = useState('');

    // Get file icon based on type
    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <FileText className="w-4 h-4 text-red-500" />;
            case 'docx':
                return <File className="w-4 h-4 text-blue-500" />;
            case 'txt':
            case 'md':
                return <FileText className="w-4 h-4 text-gray-500" />;
            case 'json':
                return <FileIcon className="w-4 h-4 text-yellow-500" />;
            case 'csv':
                return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
            default:
                return <FileIcon className="w-4 h-4 text-gray-400" />;
        }
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    // Handle drag and drop
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        try {
            const kbName = `Knowledge Base ${Date.now()}`;
            await processFiles(files, kbName);
            toast({
                title: "Success",
                description: `Created knowledge base "${kbName}" with ${files.length} documents.`
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to process files. Please try again.",
                variant: "destructive"
            });
        }
    }, [processFiles]);

    // Handle file upload
    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        try {
            const fileArray = Array.from(files);
            const kbName = `Knowledge Base ${Date.now()}`;
            await processFiles(fileArray, kbName);
            toast({
                title: "Success",
                description: `Created knowledge base "${kbName}" with ${fileArray.length} documents.`
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to process files. Please try again.",
                variant: "destructive"
            });
        }
    };

    // Create new knowledge base
    const handleCreateKnowledgeBase = async () => {
        if (!newKbName.trim()) return;

        // For now, create an empty knowledge base
        const newKb: KnowledgeBase = {
            id: `kb_${Date.now()}`,
            name: newKbName.trim(),
            description: newKbDescription.trim(),
            sources: [],
            chunks: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true
        };

        setKnowledgeBases([...knowledgeBases, newKb]);
        setNewKbName('');
        setNewKbDescription('');
        setIsCreateDialogOpen(false);

        toast({
            title: "Success",
            description: `Created knowledge base "${newKb.name}".`
        });
    };

    // Delete knowledge base
    const handleDeleteKnowledgeBase = (id: string) => {
        setKnowledgeBases(knowledgeBases.filter(kb => kb.id !== id));
        toast({
            title: "Success",
            description: "Knowledge base deleted."
        });
    };

    // Toggle knowledge base active state
    const handleToggleKnowledgeBase = (id: string) => {
        setKnowledgeBases(knowledgeBases.map(kb =>
            kb.id === id ? { ...kb, isActive: !kb.isActive } : kb
        ));
    };

    // Open chat for knowledge base
    const handleOpenChat = (kb: KnowledgeBase) => {
        setSelectedKnowledgeBase(kb);
        setIsChatDialogOpen(true);
    };

    // Filter knowledge bases based on search
    const filteredKnowledgeBases = knowledgeBases.filter(kb =>
        kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kb.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Upload Area */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload Documents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium mb-2">
                            Drag & drop your documents here
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Supports PDF, DOCX, TXT, JSON, CSV files
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.docx,.txt,.md,.json,.csv"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                            id="file-upload"
                        />
                        <Button asChild variant="outline">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                Choose Files
                            </label>
                        </Button>
                    </div>

                    {isProcessing && (
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Processing documents...</span>
                                <span>{uploadProgress}% complete</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Knowledge Bases List */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            Knowledge Bases ({knowledgeBases.length})
                        </CardTitle>
                        <div className="flex gap-2">
                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create New
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create Knowledge Base</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="kb-name">Name</Label>
                                            <Input
                                                id="kb-name"
                                                value={newKbName}
                                                onChange={(e) => setNewKbName(e.target.value)}
                                                placeholder="My Knowledge Base"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="kb-description">Description</Label>
                                            <Textarea
                                                id="kb-description"
                                                value={newKbDescription}
                                                onChange={(e) => setNewKbDescription(e.target.value)}
                                                placeholder="Describe what this knowledge base contains..."
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleCreateKnowledgeBase} disabled={!newKbName.trim()}>
                                            Create
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search */}
                    <div className="flex items-center gap-2 mb-4">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search knowledge bases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    {/* Knowledge Bases Grid */}
                    {filteredKnowledgeBases.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No knowledge bases yet. Upload some documents to get started!</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-96">
                            <div className="grid gap-4">
                                {filteredKnowledgeBases.map((kb) => (
                                    <Card key={kb.id} className="relative">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-medium">{kb.name}</h3>
                                                        <Badge variant={kb.isActive ? 'default' : 'secondary'}>
                                                            {kb.isActive ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </div>
                                                    {kb.description && (
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {kb.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span>{kb.sources.length} documents</span>
                                                        <span>{kb.chunks.length} chunks</span>
                                                        <span>Created {new Date(kb.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={kb.isActive}
                                                        onCheckedChange={() => handleToggleKnowledgeBase(kb.id)}
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleOpenChat(kb)}
                                                        disabled={kb.sources.length === 0}
                                                    >
                                                        <MessageSquare className="w-4 h-4 mr-2" />
                                                        Chat
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Knowledge Base</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete "{kb.name}"? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <div className="flex justify-end gap-2">
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteKnowledgeBase(kb.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>

                                            {/* Document List */}
                                            {kb.sources.length > 0 && (
                                                <div className="mt-3 pt-3 border-t">
                                                    <div className="space-y-1">
                                                        {kb.sources.slice(0, 3).map((source) => (
                                                            <div key={source.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                {getFileIcon(source.type)}
                                                                <span>{source.name}</span>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {formatFileSize(source.fileSize)}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                        {kb.sources.length > 3 && (
                                                            <div className="text-xs text-muted-foreground">
                                                                +{kb.sources.length - 3} more documents
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>

            {/* Document Chat Dialog */}
            <Dialog open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Chat with {selectedKnowledgeBase?.name}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedKnowledgeBase && (
                        <DocumentChat knowledgeBase={selectedKnowledgeBase} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DocumentKnowledgeManager;
