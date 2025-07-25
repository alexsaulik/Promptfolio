import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, Eye, Shield } from "lucide-react";

export default function CookiePolicy() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "Required for the website to function properly",
      examples: ["Authentication", "Security", "Session management"],
      canDisable: false,
      icon: Shield
    },
    {
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website",
      examples: ["Page views", "User behavior", "Performance metrics"],
      canDisable: true,
      icon: Eye
    },
    {
      name: "Functional Cookies",
      description: "Enable enhanced functionality and personalization",
      examples: ["Language preferences", "Region settings", "Customization"],
      canDisable: true,
      icon: Settings
    },
    {
      name: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaigns",
      examples: ["Ad targeting", "Campaign tracking", "Social media integration"],
      canDisable: true,
      icon: Cookie
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Cookie className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                Cookie Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: July 25, 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies help us improve your experience by remembering your preferences and providing personalized content.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>How We Use Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We use cookies for several purposes:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                    <li>To keep you signed in to your account</li>
                    <li>To remember your preferences and settings</li>
                    <li>To analyze website traffic and optimize performance</li>
                    <li>To provide personalized content and recommendations</li>
                    <li>To detect and prevent fraud</li>
                    <li>To measure the effectiveness of our marketing campaigns</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Types of Cookies We Use</h2>
                {cookieTypes.map((cookie, index) => (
                  <Card key={index} className="bg-card/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <cookie.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{cookie.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{cookie.description}</p>
                          </div>
                        </div>
                        <Badge variant={cookie.canDisable ? "outline" : "secondary"}>
                          {cookie.canDisable ? "Optional" : "Required"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Examples:</h4>
                        <div className="flex flex-wrap gap-2">
                          {cookie.examples.map((example, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Third-Party Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We may also use third-party cookies from trusted partners to:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics:</strong> To analyze website usage and performance</li>
                    <li><strong>Payment Processors:</strong> To securely process transactions</li>
                    <li><strong>Social Media Platforms:</strong> To enable social sharing features</li>
                    <li><strong>Content Delivery Networks:</strong> To improve website speed and reliability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Managing Your Cookie Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    You have several options for managing cookies:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium mb-2">Browser Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Most browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium mb-2">Cookie Consent Manager</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        You can manage your cookie preferences at any time using our cookie consent manager.
                      </p>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Cookie Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Cookie Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Different types of cookies are stored for different periods:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                    <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                    <li><strong>Persistent Cookies:</strong> Stored for a specific period (typically 1-24 months)</li>
                    <li><strong>Authentication Cookies:</strong> Remain until you sign out or expire (usually 30 days)</li>
                    <li><strong>Analytics Cookies:</strong> Stored for 2 years to track long-term trends</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                  </p>
                  <p className="text-primary mt-2">
                    <a href="mailto:ai@alexsaulea.com" className="hover:text-primary-glow transition-colors">
                      ai@alexsaulea.com
                    </a>
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
