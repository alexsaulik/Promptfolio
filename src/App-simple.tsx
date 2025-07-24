import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";

const SimpleApp = () => {
    return (
        <TooltipProvider>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={
                        <div className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                                <p className="text-gray-600">This page is not available in the simple version.</p>
                            </div>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    );
};

export default SimpleApp;
