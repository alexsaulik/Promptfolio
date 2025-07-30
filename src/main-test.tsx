import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const PUBLISHABLE_KEY = "pk_test_Y2hlZXJmdWwtbWFsbGFyZC0zNS5jbGVyay5hY2NvdW50cy5kZXYk";

function SimpleApp() {
    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
            <h1>Promptfolio Test</h1>
            <p>If you see this, React is working!</p>
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
