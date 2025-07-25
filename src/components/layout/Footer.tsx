import { Github, Mail, MessageCircle, Sparkles, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                                Promptfolio
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            The ultimate marketplace for AI prompts, creative assets, and digital toolkits.
                        </p>
                        <div className="flex space-x-4">
                            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Explore */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Explore</h3>
                        <div className="space-y-2 text-sm">
                            <Link to="/music-prompts" className="text-muted-foreground hover:text-primary transition-colors block">
                                Music Prompts
                            </Link>
                            <Link to="/prompts/image" className="text-muted-foreground hover:text-primary transition-colors block">
                                Image Generation
                            </Link>
                            <Link to="/prompts/code" className="text-muted-foreground hover:text-primary transition-colors block">
                                Code & Development
                            </Link>
                            <Link to="/prompts/text" className="text-muted-foreground hover:text-primary transition-colors block">
                                Text & Writing
                            </Link>
                            <Link to="/artists" className="text-muted-foreground hover:text-primary transition-colors block">
                                Featured Artists
                            </Link>
                        </div>
                    </div>

                    {/* Lab */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">PromptfolioLab</h3>
                        <div className="space-y-2 text-sm">
                            <Link to="/lab/workflows" className="text-muted-foreground hover:text-primary transition-colors block">
                                ComfyUI Workflows
                            </Link>
                            <Link to="/ai-models" className="text-muted-foreground hover:text-primary transition-colors block">
                                AI Models
                            </Link>
                            <Link to="/lab/packs" className="text-muted-foreground hover:text-primary transition-colors block">
                                Creative Packs
                            </Link>
                            <Link to="/lab/install" className="text-muted-foreground hover:text-primary transition-colors block">
                                Installation Guide
                            </Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Support</h3>
                        <div className="space-y-2 text-sm">
                            <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors block">
                                Help Center
                            </Link>
                            <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors block">
                                Documentation
                            </Link>
                            <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors block">
                                Community
                            </Link>
                            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors block">
                                Contact Us
                            </Link>
                            <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors block">
                                Pricing
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-muted-foreground">
                        © 2024 Promptfolio. All rights reserved.
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
