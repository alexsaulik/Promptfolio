import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const PUBLISHABLE_KEY = "pk_test_Y2hlZXJmdWwtbWFsbGFyZC0zNS5jbGVyay5hY2NvdW50cy5kZXYk";

function SimpleApp() {
    return (
        <div className="p-5 text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Promptfolio Test</h1>
            <p className="text-lg">If you see this, React is working!</p>
            <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Test Button</button>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <SimpleApp />
        </ClerkProvider>
    </StrictMode>
);
