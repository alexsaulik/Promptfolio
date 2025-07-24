import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useModels } from "@/hooks/use-models";
import { useWorkflows } from "@/hooks/use-workflows";
import { Calendar, Download, Eye, Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface UserAssetsProps {
    userId: string | null;
}

export const UserAssets = ({ userId }: UserAssetsProps) => {
    const { workflows, loading: workflowsLoading } = useWorkflows({ userId: userId || undefined });
    const { models, loading: modelsLoading } = useModels({ userId: userId || undefined });

    if (!userId) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">Please sign in to view your assets</p>
            </div>
        );
    }

    const loading = workflowsLoading || modelsLoading;
    const hasAssets = workflows.length > 0 || models.length > 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading your assets...</span>
            </div>
        );
    }

    if (!hasAssets) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No assets uploaded yet</p>
                <p className="text-sm text-muted-foreground">Start by uploading your first workflow, model, or pack</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Workflows Section */}
            {workflows.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">My Workflows ({workflows.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {workflows.map((workflow) => (
                            <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-4">
                                    {workflow.cover_image_url && (
                                        <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                                            <img
                                                src={workflow.cover_image_url}
                                                alt={workflow.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between">
                                            <h4 className="font-semibold truncate flex-1">{workflow.title}</h4>
                                            <Badge variant="outline" className="ml-2 shrink-0">
                                                {workflow.difficulty}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {workflow.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {workflow.views_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Download className="h-3 w-3" />
                                                {workflow.downloads_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart className="h-3 w-3" />
                                                {workflow.likes_count}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {workflow.tags.slice(0, 2).map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {workflow.tags.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{workflow.tags.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(workflow.created_at).toLocaleDateString()}
                                            </div>
                                            <Button asChild size="sm" variant="outline">
                                                <Link to={`/workflow/${workflow.slug}`}>View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Models Section */}
            {models.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">My Models ({models.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {models.map((model) => (
                            <Card key={model.id} className="group hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-4">
                                    {model.cover_image_url && (
                                        <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                                            <img
                                                src={model.cover_image_url}
                                                alt={model.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between">
                                            <h4 className="font-semibold truncate flex-1">{model.title}</h4>
                                            <Badge variant="outline" className="ml-2 shrink-0">
                                                {model.model_type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {model.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Badge variant="secondary" className="text-xs">
                                                {model.framework}
                                            </Badge>
                                            <span>v{model.version}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {model.views_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Download className="h-3 w-3" />
                                                {model.downloads_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart className="h-3 w-3" />
                                                {model.likes_count}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {model.tags.slice(0, 2).map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {model.tags.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{model.tags.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(model.created_at).toLocaleDateString()}
                                            </div>
                                            <Button asChild size="sm" variant="outline">
                                                <Link to={`/model/${model.slug}`}>View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
