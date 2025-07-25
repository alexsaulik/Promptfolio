"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SimpleFlickeringGridProps {
    className?: string;
    squareSize?: number;
    gridGap?: number;
    color?: string;
    maxOpacity?: number;
    flickerChance?: number;
}

export function SimpleFlickeringGrid({
    className,
    squareSize = 4,
    gridGap = 6,
    color = "#8B5CF6",
    maxOpacity = 0.3,
    flickerChance = 0.1,
}: SimpleFlickeringGridProps) {
    const [squares, setSquares] = useState<number[]>([]);
    const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateGrid = () => {
            if (!containerRef.current) return;

            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight;

            const cols = Math.ceil(containerWidth / (squareSize + gridGap)) + 2; // +2 for overflow
            const rows = Math.ceil(containerHeight / (squareSize + gridGap)) + 2; // +2 for overflow

            setDimensions({ rows, cols });

            // Initialize squares with random opacities
            const totalSquares = rows * cols;
            const initialSquares = Array.from({ length: totalSquares }, () =>
                Math.random() * maxOpacity
            );
            setSquares(initialSquares);
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);

        return () => window.removeEventListener('resize', calculateGrid);
    }, [squareSize, gridGap, maxOpacity]);

    useEffect(() => {
        if (squares.length === 0) return;

        // Animation loop
        const interval = setInterval(() => {
            setSquares(prev =>
                prev.map(opacity => {
                    if (Math.random() < flickerChance) {
                        return Math.random() * maxOpacity;
                    }
                    return opacity;
                })
            );
        }, 150);

        return () => clearInterval(interval);
    }, [flickerChance, maxOpacity, squares.length]); return (
        <div
            ref={containerRef}
            className={cn("fixed inset-0 pointer-events-none", className)}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${dimensions.cols}, ${squareSize}px)`,
                gridTemplateRows: `repeat(${dimensions.rows}, ${squareSize}px)`,
                gap: `${gridGap}px`,
                transform: `translate(-${squareSize / 2}px, -${squareSize / 2}px)`, // Offset to center
            }}
        >
            {squares.map((opacity, index) => (
                <div
                    key={index}
                    className="transition-opacity duration-100"
                    style={{
                        width: `${squareSize}px`,
                        height: `${squareSize}px`,
                        backgroundColor: color,
                        opacity: opacity,
                    }}
                />
            ))}
        </div>
    );
}
