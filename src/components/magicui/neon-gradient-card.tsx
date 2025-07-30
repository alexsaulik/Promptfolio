"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface NeonGradientCardProps {
    children: React.ReactNode;
    className?: string;
    borderSize?: number;
    borderRadius?: number;
    neonColors?: {
        firstColor: string;
        secondColor: string;
    };
}

export const NeonGradientCard = ({
    children,
    className,
    borderSize = 5,
    borderRadius = 20,
    neonColors = { firstColor: "#ff00aa", secondColor: "#00FFF1" }
}: NeonGradientCardProps) => {
    return (
        <div
            className={cn(
                "group relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-black/[0.96] px-8 py-12",
                className
            )}
            style={{
                borderRadius: borderRadius,
            }}
        >
            {/* Radial gradient background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        `radial-gradient(circle at 50% 50%, #000 25%, transparent 100%)`,
                    zIndex: 10,
                }}
            />

            {/* Border gradients */}
            <div
                className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(60deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
                    filter: 'blur(10px)',
                    borderRadius: `calc(${borderRadius}px - 2px)`,
                    padding: borderSize,
                    WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Border Glow */}
            <div
                className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(60deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
                    filter: 'blur(20px)',
                    borderRadius: `calc(${borderRadius}px - 2px)`,
                    padding: borderSize,
                    WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Content Container */}
            <div className="relative z-20">{children}</div>
        </div>
    );
};
