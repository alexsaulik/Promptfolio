import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                                Terms of Service
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Last updated: July 25, 2025
                            </p>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Acceptance of Terms</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        By accessing and using Promptfolio, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Use License</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Permission is granted to temporarily download one copy of Promptfolio materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>Modify or copy the materials</li>
                                        <li>Use the materials for commercial purpose or for any public display</li>
                                        <li>Attempt to reverse engineer any software contained on the website</li>
                                        <li>Remove any copyright or other proprietary notations</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>User Accounts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>Safeguarding your password and account information</li>
                                        <li>All activities that occur under your account</li>
                                        <li>Notifying us immediately of any unauthorized use</li>
                                        <li>Ensuring your account information remains accurate</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Content Ownership and Rights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        When you upload content to Promptfolio, you retain ownership of your intellectual property rights. However, you grant us a worldwide, non-exclusive, royalty-free license to:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>Display, distribute, and promote your content on our platform</li>
                                        <li>Make derivative works for the purpose of displaying your content</li>
                                        <li>Use your content for promotional and marketing purposes</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Prohibited Uses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        You may not use our service:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                                        <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                                        <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                                        <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                                        <li>To submit false or misleading information</li>
                                        <li>To upload or transmit viruses or any other type of malicious code</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Payment Terms</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        For paid services and products:
                                    </p>
                                    <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                                        <li>All payments are processed securely through third-party payment providers</li>
                                        <li>Subscription fees are billed in advance on a recurring basis</li>
                                        <li>Refunds are handled according to our refund policy</li>
                                        <li>You are responsible for all taxes and fees</li>
                                        <li>Price changes will be communicated with 30 days notice</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Disclaimer</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied, statutory or otherwise.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Limitations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        In no event shall Promptfolio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Promptfolio's website.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Modifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Promptfolio may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 border-border/50">
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        If you have any questions about these Terms of Service, please contact us at:
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
