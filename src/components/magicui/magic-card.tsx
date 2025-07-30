"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    gradientFrom?: string;
    gradientTo?: string;
}

export const MagicCard = ({
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
}: MagicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [{ x, y }, setMousePosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const handleMouseMovement = (e: MouseEvent) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        if (cardRef.current) {
            cardRef.current.addEventListener("mousemove", handleMouseMovement);
        }

        return () => {
            if (cardRef.current) {
                cardRef.current.removeEventListener("mousemove", handleMouseMovement);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={cn(
                "group relative overflow-hidden rounded-lg bg-background transition-all duration-200",
                className
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 100%)`,
                    opacity: hovered ? gradientOpacity : 0,
                }}
            />

            {/* Gradient border */}
            <div
                className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
                    padding: "1px",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />

            {/* Content */}
            <div className="relative">{children}</div>
        </div>
    );
};
