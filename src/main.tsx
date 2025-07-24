import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SimpleApp from "./App-simple.tsx";
import "./index.css";

const PUBLISHABLE_KEY = "pk_test_Y2hlZXJmdWwtbWFsbGFyZC0zNS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SimpleApp />
    </StrictMode>
);
