import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Beaker, Briefcase, Home, LogOut, Menu, Search, Settings, Sparkles, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/explore');
        }
    };

    // Check user role
    useEffect(() => {
        if (user) {
            supabase
                .from('users')
                .select('role')
                .eq('clerk_user_id', user.id)
                .single()
                .then(({ data }) => {
                    if (data) {
                        setUserRole(data.role);
                    }
                });
        }
    }, [user]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <div className="relative">
                        <Sparkles className="h-8 w-8 text-primary animate-glow-pulse" />
                        <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full animate-ping" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                        Promptfolio
                    </span>
                </Link>

                {/* Desktop Navigation - Premium, sectioned Lab dropdown */}
                <nav className="hidden md:flex items-center space-x-6">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to="/explore" className="text-sm font-medium hover:text-primary transition-colors">
                                    Explore
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>Marketplace: All prompts & bundles</TooltipContent>
                        </Tooltip>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-sm font-medium px-2 flex items-center">
                                    <Beaker className="mr-2 h-4 w-4" /> Lab
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-64">
                                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">Prompt Workflows</div>
                                <DropdownMenuItem asChild>
                                    <Link to="/lab/workflows" className="flex items-center gap-2"><Beaker className="h-4 w-4 text-primary" /> Workflows</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/lab/models" className="flex items-center gap-2"><Settings className="h-4 w-4 text-code" /> Models</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/lab/packs" className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> Packs</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/lab/install" className="flex items-center gap-2"><Settings className="h-4 w-4 text-muted-foreground" /> Install Guide</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">Music Creation</div>
                                <DropdownMenuItem asChild>
                                    <Link to="/lab/music" className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-music" /> Music Prompts</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/music-studio" className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-music" /> Music Studio</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to="/tools/pdf-analyzer" className="text-sm font-medium hover:text-primary transition-colors">
                                    PDF Analyzer
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>Analyze and extract from PDFs</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to="/artists" className="text-sm font-medium hover:text-primary transition-colors">
                                    Artists
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>Discover top AI creators, musicians, and visual artists</TooltipContent>
                        </Tooltip>
                        {isSignedIn && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                                        Dashboard
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>Your creator dashboard</TooltipContent>
                            </Tooltip>
                        )}
                    </TooltipProvider>
                </nav>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search prompts, artists, workflows..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                    </form>
                </div>

                {/* Auth & Actions - Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {isLoaded && isSignedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.imageUrl} alt={user?.firstName || "User"} />
                                        <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard" className="cursor-pointer">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to={`/${user?.username || user?.id}`} className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                {userRole === 'admin' && (
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/artists" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Admin Panel
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <SignOutButton>
                                        <div className="flex items-center cursor-pointer w-full">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </div>
                                    </SignOutButton>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/auth">Sign In</Link>
                            </Button>
                            <Button variant="hero" size="sm" asChild>
                                <Link to="/auth">Create Promptfolio</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
                    <div className="container py-4 space-y-4">
                        {/* Mobile Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search prompts..."
                                className="pl-10 bg-muted/50"
                            />
                        </div>

                        {/* Mobile Navigation - Sectioned Lab dropdown */}
                        <nav className="flex flex-col space-y-3">
                            <Link
                                to="/explore"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home className="h-4 w-4" />
                                <span>Explore</span>
                            </Link>
                            {/* Lab Dropdown (mobile, sectioned) */}
                            <details>
                                <summary className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2 cursor-pointer">
                                    <Beaker className="h-4 w-4" />
                                    <span>Lab</span>
                                </summary>
                                <div className="ml-6 flex flex-col space-y-2 mt-2">
                                    <div className="text-xs font-semibold text-muted-foreground px-2 pt-2">Prompt Workflows</div>
                                    <Link to="/lab/workflows" className="p-2 hover:text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Beaker className="h-4 w-4 text-primary" /> Workflows</Link>
                                    <Link to="/lab/models" className="p-2 hover:text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Settings className="h-4 w-4 text-code" /> Models</Link>
                                    <Link to="/lab/packs" className="p-2 hover:text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Briefcase className="h-4 w-4 text-primary" /> Packs</Link>
                                    <Link to="/lab/install" className="p-2 hover:text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Settings className="h-4 w-4 text-muted-foreground" /> Install Guide</Link>
                                    <div className="text-xs font-semibold text-muted-foreground px-2 pt-4">Music Creation</div>
                                    <Link to="/lab/music" className="p-2 hover:text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Sparkles className="h-4 w-4 text-music" /> Music Prompts</Link>
                                    <Link to="/music-studio" className="p-2 hover:text-primary flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Sparkles className="h-4 w-4 text-music" /> Music Studio</Link>
                                </div>
                            </details>
                            <Link
                                to="/tools/pdf-analyzer"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Search className="h-4 w-4" />
                                <span>PDF Analyzer</span>
                            </Link>
                            <Link
                                to="/artists"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                <span>Artists</span>
                            </Link>
                            <Link
                                to="/dashboard"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Briefcase className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/profile"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </nav>

                        {/* Mobile Auth */}
                        {isLoaded && isSignedIn ? (
                            <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
                                <Link
                                    to={`/${user?.username || user?.id}`}
                                    className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                    <span>My Profile</span>
                                </Link>
                                <SignOutButton>
                                    <div className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2 cursor-pointer">
                                        <LogOut className="h-4 w-4" />
                                        <span>Sign Out</span>
                                    </div>
                                </SignOutButton>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2 pt-4 border-border/40">
                                <Button variant="ghost" size="sm" className="justify-start" asChild>
                                    <Link to="/auth">Sign In</Link>
                                </Button>
                                <Button variant="hero" size="sm" asChild>
                                    <Link to="/auth">Create Promptfolio</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
