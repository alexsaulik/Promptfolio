import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CategorySection } from "@/components/sections/CategorySection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Index() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <HeroSection />
            <CategorySection />
            <FeaturedSection />
            <Footer />
        </div>
    );
}
