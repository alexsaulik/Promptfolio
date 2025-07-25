import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                                Privacy Policy
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Last updated: July 25, 2025
                            </p>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Information We Collect</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-invert max-w-none">
                                    <p className="text-muted-foreground">
                                        We collect information you provide directly to us, such as when you create an account, upload prompts, make purchases, or contact us for support. This includes:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>Personal information (name, email address, username)</li>
                                        <li>Payment information (processed securely through third-party providers)</li>
                                        <li>Content you create and upload (prompts, images, descriptions)</li>
                                        <li>Communications with us and other users</li>
                                        <li>Usage data and analytics</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>How We Use Your Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        We use the information we collect to:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>Provide, maintain, and improve our services</li>
                                        <li>Process transactions and send related information</li>
                                        <li>Send technical notices, updates, and support messages</li>
                                        <li>Respond to your comments and questions</li>
                                        <li>Prevent fraud and ensure platform security</li>
                                        <li>Analyze usage patterns to improve user experience</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Information Sharing</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>With your explicit consent</li>
                                        <li>To service providers who assist in our operations</li>
                                        <li>To comply with legal obligations or court orders</li>
                                        <li>To protect our rights, property, or safety</li>
                                        <li>In connection with a merger, acquisition, or sale of assets</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Data Security</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, regular security audits, and employee training on data protection.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Your Rights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Depending on your location, you may have the following rights regarding your personal information:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>Access and receive a copy of your personal data</li>
                                        <li>Rectify or update inaccurate information</li>
                                        <li>Delete your personal information (right to be forgotten)</li>
                                        <li>Restrict or object to processing of your data</li>
                                        <li>Data portability</li>
                                        <li>Withdraw consent where processing is based on consent</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Cookies and Tracking</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We use cookies and similar tracking technologies to improve your experience on our platform. These help us remember your preferences, analyze site traffic, and provide personalized content. You can control cookie settings through your browser preferences.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Children's Privacy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Contact Us</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
