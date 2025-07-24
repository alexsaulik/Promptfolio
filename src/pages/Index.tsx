import { CategorySection } from "@/components/sections/CategorySection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Index() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <CategorySection />
            <FeaturedSection />
        </div>
    );
}
