"use client";

import { useEffect, useState } from "react";
import { Particles } from "./particles-simple";

export function ParticlesDemo() {
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        // Detect if the user prefers dark mode
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setColor(isDarkMode ? "#ffffff" : "#000000");

        // Listen for changes in color scheme
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setColor(e.matches ? "#ffffff" : "#000000");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
            <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none">
                Particles
            </span>
            <Particles className="absolute inset-0 z-0" />
        </div>
    );
}
