import { Marquee } from "@/components/magicui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        username: "@sarahdesigns",
        body: "Promptfolio has revolutionized my AI art workflow. The prompts are incredibly detailed and produce stunning results every time!",
        img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Marcus Rodriguez",
        username: "@musicmaker_ai",
        body: "As a music producer, finding quality AI music prompts was challenging until I discovered this platform. Game changer!",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Emily Watson",
        username: "@codewithemily",
        body: "The code generation prompts have saved me hours of work. Perfect for rapid prototyping and learning new frameworks.",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "David Kim",
        username: "@writerdavid",
        body: "Incredible platform for content creators. The writing prompts are sophisticated and help produce engaging copy.",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Luna Martinez",
        username: "@lunacreatess",
        body: "The community here is amazing! So many talented creators sharing high-quality prompts. Worth every penny.",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
        rating: 5,
    },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

function ReviewCard({ img, name, username, body, rating }: typeof testimonials[number]) {
    return (
        <Card className="w-80 border border-white/10 bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all duration-300 hover:scale-105 hover:border-purple-500/30">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-purple-400/20">
                        <AvatarImage src={img} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">{name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm text-white">{name}</p>
                        <p className="text-xs text-purple-200/80">{username}</p>
                    </div>
                    <div className="flex ml-auto">
                        {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{body}</p>
            </CardContent>
        </Card>
    );
}

export function TestimonialsSection() {
    return (
        <BackgroundBeamsWithCollision className="py-16 min-h-[600px] bg-gradient-to-b from-background via-muted/30 to-background">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3 drop-shadow-2xl">
                        Loved by Creators Worldwide
                    </h2>
                    <p className="text-muted-foreground/90 max-w-xl mx-auto text-lg backdrop-blur-sm">
                        Join thousands of satisfied creators who use Promptfolio to enhance their AI workflows
                    </p>
                </div>

                <div className="relative">
                    <Marquee pauseOnHover className="[--duration:25s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:25s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
}
