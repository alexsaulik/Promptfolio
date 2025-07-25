import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Code, Image, Music, Type } from "lucide-react";

const features = [
    {
        Icon: Music,
        name: "Music & Audio",
        description: "AI prompts for music and sound generation",
        href: "/explore?category=music",
        cta: "Explore",
        className: "lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-music/15 to-music/5 rounded-lg" />
        ),
    },
    {
        Icon: Image,
        name: "Visual Art",
        description: "Create images and visual designs",
        href: "/explore?category=image",
        cta: "Create",
        className: "lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-image/15 to-image/5 rounded-lg" />
        ),
    },
    {
        Icon: Code,
        name: "Code Development",
        description: "Programming and development prompts",
        href: "/explore?category=code",
        cta: "Code",
        className: "lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-code/15 to-code/5 rounded-lg" />
        ),
    },
    {
        Icon: Type,
        name: "Text & Writing",
        description: "Content creation and copywriting",
        href: "/explore?category=text",
        cta: "Write",
        className: "lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-text/15 to-text/5 rounded-lg" />
        ),
    },
];

export function PromptCategoriesGrid() {
    return (
        <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                        Explore Categories
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Discover AI prompts across different creative fields
                    </p>
                </div>

                <BentoGrid className="max-w-3xl mx-auto grid-cols-2 gap-4">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
