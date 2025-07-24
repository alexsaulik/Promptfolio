import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CreateMusicPromptForm } from "@/components/forms/CreateMusicPromptForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const CreateMusicPrompt = () => {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <Header />

                <main className="container py-12">
                    <CreateMusicPromptForm />
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
};

export default CreateMusicPrompt;
