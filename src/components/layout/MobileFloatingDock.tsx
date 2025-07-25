import { FloatingDock } from "@/components/ui/floating-dock";
import { Beaker, Briefcase, Home, Search, Sparkles, User } from "lucide-react";

const navigationItems = [
    {
        title: "Home",
        icon: <Home className="h-full w-full" />,
        href: "/",
    },
    {
        title: "Explore",
        icon: <Search className="h-full w-full" />,
        href: "/explore",
    },
    {
        title: "Create",
        icon: <Sparkles className="h-full w-full" />,
        href: "/dashboard",
    },
    {
        title: "Artists",
        icon: <Briefcase className="h-full w-full" />,
        href: "/artists",
    },
    {
        title: "Labs",
        icon: <Beaker className="h-full w-full" />,
        href: "/labs",
    },
    {
        title: "Profile",
        icon: <User className="h-full w-full" />,
        href: "/profile",
    },
];

export function MobileFloatingDock() {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
            <FloatingDock
                items={navigationItems}
                mobileClassName="flex"
                desktopClassName="hidden"
            />
        </div>
    );
}
