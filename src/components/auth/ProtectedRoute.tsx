import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    message?: string;
}

export function ProtectedRoute({
    children,
    redirectTo = "/auth",
    message = "Please log in to access your dashboard"
}: ProtectedRouteProps) {
    const { isLoaded, isSignedIn } = useUser();

    // Show loading spinner while checking auth
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Redirect to auth if not signed in
    if (!isSignedIn) {
        const searchParams = new URLSearchParams();
        if (message) {
            searchParams.set("message", message);
        }
        const redirectUrl = `${redirectTo}?${searchParams.toString()}`;
        return <Navigate to={redirectUrl} replace />;
    }

    return <>{children}</>;
}
