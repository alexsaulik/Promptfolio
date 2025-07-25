import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Award,
    Calendar,
    Heart,
    MessageCircle,
    MessageSquare,
    Share2,
    Star,
    ThumbsUp,
    Trophy,
    Users,
    Zap
} from "lucide-react";

export default function Community() {
    const featuredMembers = [
        {
            name: "Alex Rivera",
            username: "@alextheartist",
            avatar: "/api/placeholder/64/64",
            title: "Master Prompt Engineer",
            prompts: 145,
            followers: 2340,
            badge: "Top Creator"
        },
        {
            name: "Sarah Chen",
            username: "@sarahcreates",
            avatar: "/api/placeholder/64/64",
            title: "AI Art Specialist",
            prompts: 89,
            followers: 1890,
            badge: "Rising Star"
        },
        {
            name: "Mike Johnson",
            username: "@mikecodes",
            avatar: "/api/placeholder/64/64",
            title: "Code Prompt Guru",
            prompts: 67,
            followers: 1560,
            badge: "Expert"
        }
    ];

    const recentPosts = [
        {
            id: 1,
            author: "Jennifer Walsh",
            username: "@jenwalsh",
            avatar: "/api/placeholder/40/40",
            time: "2 hours ago",
            content: "Just published my new collection of cinematic portrait prompts! 🎬✨ Amazing results with the latest AI models. What do you think?",
            likes: 24,
            comments: 8,
            shares: 5,
            tags: ["Photography", "Portraits", "AI Art"]
        },
        {
            id: 2,
            author: "David Kim",
            username: "@davidcreates",
            avatar: "/api/placeholder/40/40",
            time: "4 hours ago",
            content: "Pro tip: When crafting prompts for code generation, always include the context and expected output format. Makes a huge difference! 💡",
            likes: 31,
            comments: 12,
            shares: 8,
            tags: ["Tips", "Code", "Best Practices"]
        },
        {
            id: 3,
            author: "Luna Rodriguez",
            username: "@lunaart",
            avatar: "/api/placeholder/40/40",
            time: "6 hours ago",
            content: "Experimenting with abstract art prompts - the results are mind-blowing! 🎨 AI creativity is getting more sophisticated every day.",
            likes: 18,
            comments: 6,
            shares: 3,
            tags: ["Abstract Art", "Creativity", "Inspiration"]
        }
    ];

    const upcomingEvents = [
        {
            title: "AI Prompt Engineering Workshop",
            date: "July 28, 2025",
            time: "2:00 PM PST",
            type: "Workshop",
            participants: 156
        },
        {
            title: "Community Creator Showcase",
            date: "August 2, 2025",
            time: "7:00 PM PST",
            type: "Event",
            participants: 243
        },
        {
            title: "Monthly Prompt Challenge",
            date: "August 5, 2025",
            time: "All Day",
            type: "Challenge",
            participants: 89
        }
    ];

    const achievements = [
        { icon: Star, title: "First Prompt", description: "Create your first prompt" },
        { icon: Heart, title: "Community Love", description: "Get 100 likes on a prompt" },
        { icon: Trophy, title: "Top Creator", description: "Reach 1000 downloads" },
        { icon: Award, title: "Expert", description: "Earn expert status" }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                            Join Our Community
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Connect with creators, share your work, and learn from the best in AI-powered creativity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                                <Users className="mr-2 h-4 w-4" />
                                Join Community
                            </Button>
                            <Button variant="outline" className="border-border/50">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Browse Discussions
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Community Stats */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-primary mb-2">12,450</div>
                                    <p className="text-sm text-muted-foreground">Active Members</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-accent mb-2">34,678</div>
                                    <p className="text-sm text-muted-foreground">Prompts Shared</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-music mb-2">89,123</div>
                                    <p className="text-sm text-muted-foreground">Community Posts</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-border/50 text-center">
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-image mb-2">456</div>
                                    <p className="text-sm text-muted-foreground">Events Hosted</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <Tabs defaultValue="feed" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="feed">Community Feed</TabsTrigger>
                                <TabsTrigger value="members">Featured Members</TabsTrigger>
                                <TabsTrigger value="events">Events</TabsTrigger>
                                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="feed" className="mt-8">
                                <div className="space-y-6">
                                    {recentPosts.map((post) => (
                                        <Card key={post.id} className="bg-card/50 border-border/50 backdrop-blur-sm">
                                            <CardContent className="p-6">
                                                <div className="flex items-start space-x-4">
                                                    <Avatar>
                                                        <AvatarImage src={post.avatar} />
                                                        <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <h4 className="font-semibold">{post.author}</h4>
                                                            <span className="text-sm text-muted-foreground">{post.username}</span>
                                                            <span className="text-sm text-muted-foreground">•</span>
                                                            <span className="text-sm text-muted-foreground">{post.time}</span>
                                                        </div>
                                                        <p className="text-muted-foreground mb-4">{post.content}</p>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {post.tags.map((tag) => (
                                                                <Badge key={tag} variant="outline" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                                            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                                                                <ThumbsUp className="h-4 w-4" />
                                                                <span>{post.likes}</span>
                                                            </button>
                                                            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span>{post.comments}</span>
                                                            </button>
                                                            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                                                                <Share2 className="h-4 w-4" />
                                                                <span>{post.shares}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="members" className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {featuredMembers.map((member, index) => (
                                        <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm text-center hover:bg-card/70 transition-all duration-300">
                                            <CardHeader>
                                                <div className="relative mx-auto">
                                                    <Avatar className="w-20 h-20 mx-auto mb-4">
                                                        <AvatarImage src={member.avatar} />
                                                        <AvatarFallback className="text-lg">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                                                        {member.badge}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-lg">{member.name}</CardTitle>
                                                <CardDescription>{member.username}</CardDescription>
                                                <p className="text-sm text-muted-foreground">{member.title}</p>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <div className="text-2xl font-bold text-primary">{member.prompts}</div>
                                                        <p className="text-xs text-muted-foreground">Prompts</p>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-accent">{member.followers}</div>
                                                        <p className="text-xs text-muted-foreground">Followers</p>
                                                    </div>
                                                </div>
                                                <Button className="w-full" variant="outline">
                                                    Follow
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="events" className="mt-8">
                                <div className="space-y-6">
                                    {upcomingEvents.map((event, index) => (
                                        <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <Calendar className="h-5 w-5 text-primary" />
                                                            <h3 className="font-semibold text-lg">{event.title}</h3>
                                                            <Badge variant="outline">{event.type}</Badge>
                                                        </div>
                                                        <p className="text-muted-foreground mb-2">{event.date} at {event.time}</p>
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Users className="h-4 w-4 mr-1" />
                                                            {event.participants} participants
                                                        </div>
                                                    </div>
                                                    <Button className="ml-4">
                                                        Join Event
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="achievements" className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {achievements.map((achievement, index) => (
                                        <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm">
                                            <CardHeader>
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-primary/10 p-3 rounded-lg">
                                                        <achievement.icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <CardTitle>{achievement.title}</CardTitle>
                                                        <CardDescription>{achievement.description}</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                {/* Community Guidelines */}
                <section className="py-16 px-4 bg-muted/20">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Community Guidelines</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Heart className="h-5 w-5 mr-2 text-primary" />
                                        Be Respectful
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Treat all community members with respect and kindness. We celebrate diversity and welcome creators from all backgrounds.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Share2 className="h-5 w-5 mr-2 text-accent" />
                                        Share Generously
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Share your knowledge, tips, and creative work. Help others learn and grow in their AI creative journey.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Star className="h-5 w-5 mr-2 text-music" />
                                        Quality Content
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Strive for quality in your prompts and contributions. Well-crafted content benefits the entire community.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Zap className="h-5 w-5 mr-2 text-image" />
                                        Stay Creative
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Push boundaries, experiment with new ideas, and inspire others with your innovative approaches to AI creativity.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
