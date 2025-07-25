import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Beaker, Briefcase, Home, LogOut, Menu, Search, Settings, Sparkles, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const { isLoaded, isSignedIn, user } = useUser();

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

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Explore
                    </Link>
                    <Link to="/lab" className="text-sm font-medium hover:text-primary transition-colors">
                        Lab
                    </Link>
                    <Link to="/artists" className="text-sm font-medium hover:text-primary transition-colors">
                        Artists
                    </Link>
                    {isSignedIn && (
                        <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search prompts, artists, workflows..."
                            className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                    </div>
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

                        {/* Mobile Navigation */}
                        <nav className="flex flex-col space-y-3">
                            <Link
                                to="/"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home className="h-4 w-4" />
                                <span>Explore</span>
                            </Link>
                            <Link
                                to="/lab"
                                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Beaker className="h-4 w-4" />
                                <span>Lab</span>
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
