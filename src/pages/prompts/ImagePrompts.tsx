import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Image, Star, Download, Eye, Heart } from "lucide-react";

export default function ImagePrompts() {
  const prompts = [
    {
      id: 1,
      title: "Cinematic Portrait Photography",
      description: "Professional portrait prompts for realistic character generation",
      author: "PhotoMaster",
      rating: 4.9,
      downloads: 1240,
      price: 12,
      image: "/api/placeholder/300/200",
      tags: ["Photography", "Portrait", "Cinematic", "Professional"]
    },
    {
      id: 2,
      title: "Fantasy Landscape Scenes",
      description: "Epic fantasy environments and magical landscapes",
      author: "WorldBuilder",
      rating: 4.8,
      downloads: 890,
      price: 15,
      image: "/api/placeholder/300/200",
      tags: ["Fantasy", "Landscape", "Environment", "Magic"]
    },
    {
      id: 3,
      title: "Abstract Art Generator",
      description: "Modern abstract art styles and compositions",
      author: "AbstractAI",
      rating: 4.7,
      downloads: 567,
      price: 8,
      image: "/api/placeholder/300/200",
      tags: ["Abstract", "Modern", "Art", "Creative"]
    },
    {
      id: 4,
      title: "Product Photography Pack",
      description: "Commercial product shots with perfect lighting",
      author: "CommercialPro",
      rating: 4.9,
      downloads: 1100,
      price: 20,
      image: "/api/placeholder/300/200",
      tags: ["Product", "Commercial", "Photography", "Lighting"]
    }
  ];

  const categories = [
    "All Categories",
    "Photography",
    "Digital Art",
    "Fantasy",
    "Sci-Fi",
    "Abstract",
    "Portraits",
    "Landscapes",
    "Architecture",
    "Product Design"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-image to-image-foreground bg-clip-text text-transparent mb-6">
                Image Generation Prompts
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover professional-grade prompts for creating stunning visual content with AI image generators like Midjourney, DALL-E, and Stable Diffusion.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search image prompts..." 
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Prompts Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prompts.map((prompt) => (
                <Card key={prompt.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-video bg-gradient-to-br from-image/20 to-image/5 flex items-center justify-center">
                      <Image className="h-12 w-12 text-image/40" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-image transition-colors">
                          {prompt.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          by {prompt.author}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-image">${prompt.price}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                          {prompt.rating}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {prompt.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Download className="h-4 w-4 mr-1" />
                        {prompt.downloads} downloads
                      </div>
                      <Button className="bg-gradient-to-r from-image to-image/80 text-image-foreground hover:shadow-lg hover:shadow-image/25 transition-all duration-300">
                        Get Prompt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="border-border/50">
                Load More Prompts
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Image Prompts?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card/50 border-border/50 text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-image/10 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-image" />
                  </div>
                  <CardTitle>Professional Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All prompts are tested and refined by professional artists and AI specialists.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-border/50 text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-image/10 rounded-lg flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-image" />
                  </div>
                  <CardTitle>Instant Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get immediate access to all prompt variations and bonus content.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-border/50 text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-image/10 rounded-lg flex items-center justify-center mb-4">
                    <Image className="h-6 w-6 text-image" />
                  </div>
                  <CardTitle>Multi-Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compatible with Midjourney, DALL-E, Stable Diffusion, and more.
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
