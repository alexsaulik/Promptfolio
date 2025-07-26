import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CustomInstruction, InstructionTemplate, useCustomInstructions } from '@/hooks/use-custom-instructions';
import { toast } from "@/hooks/use-toast";
import {
    BookOpen,
    Brain,
    Code,
    Copy,
    FileText,
    Music,
    Palette,
    Pause,
    Play,
    Plus,
    Search,
    Settings,
    Trash2,
    Wand2
} from 'lucide-react';
import { useState } from 'react';

interface CustomInstructionsManagerProps {
    onInstructionSelect?: (instruction: CustomInstruction | null) => void;
    className?: string;
}

export const CustomInstructionsManager = ({ onInstructionSelect, className }: CustomInstructionsManagerProps) => {
    const {
        instructions,
        templates,
        activeInstruction,
        createInstruction,
        createFromTemplate,
        updateInstruction,
        deleteInstruction,
        activateInstruction,
        deactivateInstruction,
        getInstructionsByCategory,
        searchInstructions,
        exportInstructions,
        importInstructions
    } = useCustomInstructions();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
    const [editingInstruction, setEditingInstruction] = useState<CustomInstruction | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<InstructionTemplate | null>(null);
    const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});

    // Get category icon
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'prompt-engineering': return <Wand2 className="w-4 h-4" />;
            case 'creative-writing': return <FileText className="w-4 h-4" />;
            case 'code-assistant': return <Code className="w-4 h-4" />;
            case 'image-analysis': return <Palette className="w-4 h-4" />;
            case 'music-production': return <Music className="w-4 h-4" />;
            default: return <Brain className="w-4 h-4" />;
        }
    };

    // Filter instructions
    const filteredInstructions = () => {
        let filtered = instructions;

        if (searchQuery) {
            filtered = searchInstructions(searchQuery);
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(instruction => instruction.category === selectedCategory);
        }

        return filtered;
    };

    // Handle create instruction
    const handleCreateInstruction = (formData: FormData) => {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const systemPrompt = formData.get('systemPrompt') as string;
        const category = formData.get('category') as CustomInstruction['category'];
        const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim());

        if (!name || !systemPrompt) {
            toast({
                title: "Error",
                description: "Name and system prompt are required",
                variant: "destructive"
            });
            return;
        }

        const newInstruction = createInstruction({
            name,
            description,
            systemPrompt,
            category,
            isActive: false,
            tags
        });

        toast({
            title: "Success",
            description: `Custom instruction "${name}" created successfully`
        });

        setIsCreateDialogOpen(false);
    };

    // Handle create from template
    const handleCreateFromTemplate = (formData: FormData) => {
        if (!selectedTemplate) return;

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        const newInstruction = createFromTemplate(
            selectedTemplate.id,
            templateVariables,
            { name, description }
        );

        toast({
            title: "Success",
            description: `Instruction created from template: ${selectedTemplate.name}`
        });

        setIsTemplateDialogOpen(false);
        setSelectedTemplate(null);
        setTemplateVariables({});
    };

    // Handle activate/deactivate
    const handleToggleActivation = (instruction: CustomInstruction) => {
        if (activeInstruction?.id === instruction.id) {
            deactivateInstruction();
            onInstructionSelect?.(null);
            toast({
                title: "Deactivated",
                description: "Custom instruction deactivated"
            });
        } else {
            activateInstruction(instruction.id);
            onInstructionSelect?.(instruction);
            toast({
                title: "Activated",
                description: `Now using: ${instruction.name}`
            });
        }
    };

    // Handle delete
    const handleDelete = (instruction: CustomInstruction) => {
        deleteInstruction(instruction.id);
        toast({
            title: "Deleted",
            description: `Instruction "${instruction.name}" deleted`
        });
    };

    return (
        <div className={className}>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Custom Instructions
                            </CardTitle>
                            <CardDescription>
                                Create specialized AI assistants for different tasks
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Templates
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                    <DialogHeader>
                                        <DialogTitle>Create from Template</DialogTitle>
                                        <DialogDescription>
                                            Choose a template and customize it for your needs
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ScrollArea className="max-h-[60vh]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                                            {templates.map((template) => (
                                                <Card
                                                    key={template.id}
                                                    className={`cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                                                        }`}
                                                    onClick={() => setSelectedTemplate(template)}
                                                >
                                                    <CardHeader className="pb-3">
                                                        <CardTitle className="flex items-center gap-2 text-sm">
                                                            {getCategoryIcon(template.category)}
                                                            {template.name}
                                                        </CardTitle>
                                                        <CardDescription className="text-xs">
                                                            {template.description}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="pt-0">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {template.category}
                                                        </Badge>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>

                                        {selectedTemplate && (
                                            <div className="p-4 border-t">
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleCreateFromTemplate(new FormData(e.currentTarget));
                                                }}>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="template-name">Name</Label>
                                                            <Input
                                                                id="template-name"
                                                                name="name"
                                                                defaultValue={selectedTemplate.name}
                                                                placeholder="Custom name for this instruction"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="template-description">Description</Label>
                                                            <Input
                                                                id="template-description"
                                                                name="description"
                                                                defaultValue={selectedTemplate.description}
                                                                placeholder="Description of what this does"
                                                            />
                                                        </div>

                                                        {selectedTemplate.variables.map((variable) => (
                                                            <div key={variable.name}>
                                                                <Label htmlFor={variable.name}>{variable.description}</Label>
                                                                {variable.type === 'select' ? (
                                                                    <Select
                                                                        value={templateVariables[variable.name] || variable.defaultValue}
                                                                        onValueChange={(value) =>
                                                                            setTemplateVariables(prev => ({ ...prev, [variable.name]: value }))
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {variable.options?.map((option) => (
                                                                                <SelectItem key={option} value={option}>
                                                                                    {option}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                ) : (
                                                                    <Input
                                                                        id={variable.name}
                                                                        value={templateVariables[variable.name] || variable.defaultValue}
                                                                        onChange={(e) =>
                                                                            setTemplateVariables(prev => ({ ...prev, [variable.name]: e.target.value }))
                                                                        }
                                                                        placeholder={variable.description}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}

                                                        <DialogFooter>
                                                            <Button type="submit">Create Instruction</Button>
                                                        </DialogFooter>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Create Custom Instruction</DialogTitle>
                                        <DialogDescription>
                                            Define how the AI should behave for specific tasks
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleCreateInstruction(new FormData(e.currentTarget));
                                    }}>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="name">Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="e.g., Photography Prompt Expert"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    id="description"
                                                    name="description"
                                                    placeholder="Brief description of what this instruction does"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="category">Category</Label>
                                                <Select name="category" defaultValue="custom">
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="prompt-engineering">Prompt Engineering</SelectItem>
                                                        <SelectItem value="creative-writing">Creative Writing</SelectItem>
                                                        <SelectItem value="code-assistant">Code Assistant</SelectItem>
                                                        <SelectItem value="image-analysis">Image Analysis</SelectItem>
                                                        <SelectItem value="music-production">Music Production</SelectItem>
                                                        <SelectItem value="custom">Custom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                                <Input
                                                    id="tags"
                                                    name="tags"
                                                    placeholder="photography, creative, professional"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="systemPrompt">System Prompt *</Label>
                                                <Textarea
                                                    id="systemPrompt"
                                                    name="systemPrompt"
                                                    placeholder="You are an expert in... Your role is to... Always provide..."
                                                    rows={8}
                                                    required
                                                />
                                            </div>

                                            <DialogFooter>
                                                <Button type="submit">Create Instruction</Button>
                                            </DialogFooter>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Search instructions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="prompt-engineering">Prompt Engineering</SelectItem>
                                <SelectItem value="creative-writing">Creative Writing</SelectItem>
                                <SelectItem value="code-assistant">Code Assistant</SelectItem>
                                <SelectItem value="image-analysis">Image Analysis</SelectItem>
                                <SelectItem value="music-production">Music Production</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active Instruction */}
                    {activeInstruction && (
                        <Card className="mb-6 border-primary bg-primary/5">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <CardTitle className="text-sm">Currently Active</CardTitle>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleToggleActivation(activeInstruction)}
                                    >
                                        <Pause className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center gap-2 mb-2">
                                    {getCategoryIcon(activeInstruction.category)}
                                    <span className="font-medium">{activeInstruction.name}</span>
                                    <Badge variant="secondary">{activeInstruction.category}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{activeInstruction.description}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Instructions List */}
                    <ScrollArea className="h-[400px]">
                        <div className="space-y-3">
                            {filteredInstructions().map((instruction) => (
                                <Card key={instruction.id} className="group">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    {getCategoryIcon(instruction.category)}
                                                    <span className="font-medium">{instruction.name}</span>
                                                    <Badge variant="outline" className="text-xs">
                                                        {instruction.category}
                                                    </Badge>
                                                    {instruction.useCount > 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Used {instruction.useCount} times
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{instruction.description}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {instruction.tags.map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleToggleActivation(instruction)}
                                                    title={activeInstruction?.id === instruction.id ? "Deactivate" : "Activate"}
                                                >
                                                    {activeInstruction?.id === instruction.id ? (
                                                        <Pause className="w-4 h-4" />
                                                    ) : (
                                                        <Play className="w-4 h-4" />
                                                    )}
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(instruction.systemPrompt);
                                                        toast({ title: "Copied", description: "System prompt copied to clipboard" });
                                                    }}
                                                    title="Copy prompt"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" title="Delete">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Instruction</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{instruction.name}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <div className="flex justify-end space-x-2 mt-4">
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(instruction)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </div>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Empty State */}
                    {filteredInstructions().length === 0 && (
                        <div className="text-center py-8">
                            <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Instructions Found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filter'
                                    : 'Create your first custom instruction to get started'
                                }
                            </p>
                            {!searchQuery && selectedCategory === 'all' && (
                                <Button onClick={() => setIsCreateDialogOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create First Instruction
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
