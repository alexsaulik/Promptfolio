"use client";

import { AuroraText } from "./aurora-text";

export function AuroraTextDemo() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-background rounded-lg">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center">
                Ship <AuroraText>beautiful</AuroraText> UI
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                <div className="p-4 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">
                        <span className="aurora-text aurora-pink-purple inline-block">
                            Music Creation
                        </span>
                    </h2>
                    <p className="text-muted-foreground">
                        Generate AI music with Suno and other cutting-edge models.
                    </p>
                </div>

                <div className="p-4 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">
                        <span className="aurora-text aurora-blue aurora-slow inline-block">
                            Visual Art
                        </span>
                    </h2>
                    <p className="text-muted-foreground">
                        Create stunning visuals with state-of-the-art image models.
                    </p>
                </div>

                <div className="p-4 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">
                        <span className="aurora-text aurora-rainbow aurora-fast inline-block">
                            Code Generation
                        </span>
                    </h2>
                    <p className="text-muted-foreground">
                        Turn your ideas into code with AI-powered development tools.
                    </p>
                </div>
            </div>
        </div>
    );
}
