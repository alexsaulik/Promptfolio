"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BorderBeamDemo() {
    return (
        <Card className="relative w-full max-w-md mx-auto overflow-hidden">
            <CardHeader>
                <CardTitle>AI Music Studio</CardTitle>
                <CardDescription>
                    Create and manage your AI-generated music projects
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="prompt">Prompt</Label>
                            <Input
                                id="prompt"
                                placeholder="Enter your music generation prompt"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="style">Style</Label>
                            <Input
                                id="style"
                                placeholder="Describe the musical style"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Preview</Button>
                <Button>Generate</Button>
            </CardFooter>
            <BorderBeam
                duration={8}
                size={100}
                className="from-purple-500 to-orange-500"
            />
        </Card>
    );
}
