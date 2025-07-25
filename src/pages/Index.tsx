import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { PromptCategoriesGrid } from "@/components/sections/PromptCategoriesGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Index() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <HeroSection />
            <PromptCategoriesGrid />
            <TestimonialsSection />
            <Footer />
        </div>
    );
}
