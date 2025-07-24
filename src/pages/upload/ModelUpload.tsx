import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "@/components/upload/AvatarUpload";
import { Bot, DollarSign, FileText, Settings, Tag, Upload } from "lucide-react";
import { useState } from "react";

export default function ModelUpload() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        tags: "",
        price: "",
        isPremium: false,
        license: "",
        version: "",
        framework: "",
        modelFile: null,
        previewImage: null,
        documentation: ""
    });

    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Model upload:", { ...formData, tags });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6">
                        <Bot className="h-4 w-4" />
                        <span className="text-sm font-medium text-primary">Model Upload</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
                        Share Your AI Model
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Upload and share your trained AI models with the community. Earn from downloads and help others create amazing content.
                    </p>
                </div>
            </section>

            {/* Upload Form */}
            <section className="py-16 px-4 sm:px-8">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Model Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g., Realistic Portrait Generator"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="version">Version</Label>
                                        <Input
                                            id="version"
                                            placeholder="e.g., v1.0.0"
                                            value={formData.version}
                                            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your model, its capabilities, and use cases..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category *</Label>
                                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="image-generation">Image Generation</SelectItem>
                                                <SelectItem value="text-generation">Text Generation</SelectItem>
                                                <SelectItem value="audio-generation">Audio Generation</SelectItem>
                                                <SelectItem value="video-processing">Video Processing</SelectItem>
                                                <SelectItem value="style-transfer">Style Transfer</SelectItem>
                                                <SelectItem value="upscaling">Upscaling</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="framework">Framework</Label>
                                        <Select value={formData.framework} onValueChange={(value) => setFormData({ ...formData, framework: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select framework" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pytorch">PyTorch</SelectItem>
                                                <SelectItem value="tensorflow">TensorFlow</SelectItem>
                                                <SelectItem value="onnx">ONNX</SelectItem>
                                                <SelectItem value="huggingface">Hugging Face</SelectItem>
                                                <SelectItem value="comfyui">ComfyUI</SelectItem>
                                                <SelectItem value="automatic1111">Automatic1111</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Files Upload */}
                        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5" />
                                    File Uploads
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Model File *</Label>
                                    <AvatarUpload
                                        currentAvatarUrl=""
                                        onAvatarChange={(url) => setFormData({ ...formData, modelFile: url as any })}
                                        bucket="models"
                                        accept=".pkl,.pth,.safetensors,.ckpt,.bin,.h5"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Supported formats: .pkl, .pth, .safetensors, .ckpt, .bin, .h5
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Preview Image</Label>
                                    <AvatarUpload
                                        currentAvatarUrl=""
                                        onAvatarChange={(url) => setFormData({ ...formData, previewImage: url as any })}
                                        bucket="model-previews"
                                        accept="image/*"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Upload an example output or preview image for your model
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="documentation">Documentation URL</Label>
                                    <Input
                                        id="documentation"
                                        placeholder="https://github.com/yourname/model-docs"
                                        value={formData.documentation}
                                        onChange={(e) => setFormData({ ...formData, documentation: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags and Pricing */}
                        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Tags and Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a tag..."
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                        />
                                        <Button type="button" onClick={addTag} variant="outline">
                                            Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                                                {tag} ×
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price (USD)</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                className="pl-10"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Leave empty or set to 0 for free models
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="license">License</Label>
                                        <Select value={formData.license} onValueChange={(value) => setFormData({ ...formData, license: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select license" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cc0">CC0 (Public Domain)</SelectItem>
                                                <SelectItem value="cc-by">CC BY (Attribution)</SelectItem>
                                                <SelectItem value="cc-by-sa">CC BY-SA (Share Alike)</SelectItem>
                                                <SelectItem value="cc-by-nc">CC BY-NC (Non-Commercial)</SelectItem>
                                                <SelectItem value="mit">MIT License</SelectItem>
                                                <SelectItem value="apache">Apache 2.0</SelectItem>
                                                <SelectItem value="custom">Custom License</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="premium"
                                        checked={formData.isPremium}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
                                    />
                                    <Label htmlFor="premium">Mark as Premium Model</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Additional Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Allow Commercial Use</Label>
                                            <p className="text-sm text-muted-foreground">Allow users to use this model commercially</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Require Attribution</Label>
                                            <p className="text-sm text-muted-foreground">Require users to credit you when using this model</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit */}
                        <div className="flex gap-4">
                            <Button type="submit" className="flex-1" size="lg">
                                Upload Model
                            </Button>
                            <Button type="button" variant="outline" size="lg">
                                Save Draft
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
