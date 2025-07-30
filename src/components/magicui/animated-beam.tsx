"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface AnimatedBeamProps {
    className?: string;
    containerRef: React.RefObject<HTMLElement>;
    fromRef: React.RefObject<HTMLElement>;
    toRef: React.RefObject<HTMLElement>;
    curvature?: number;
    reverse?: boolean;
    duration?: number;
    delay?: number;
    pathColor?: string;
    pathWidth?: number;
    pathOpacity?: number;
    gradientStartColor?: string;
    gradientStopColor?: string;
    startXOffset?: number;
    startYOffset?: number;
    endXOffset?: number;
    endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
    className,
    containerRef,
    fromRef,
    toRef,
    curvature = 0,
    reverse = false,
    duration = 5,
    delay = 0,
    pathColor = "gray",
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = "#ffaa40",
    gradientStopColor = "#9c40ff",
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
}) => {
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState<number>(0);
    const [pathD, setPathD] = useState<string>("");
    const id = useRef<string>(`animated-beam-${Math.random().toString(36).substr(2, 9)}`);

    useEffect(() => {
        const calculatePath = () => {
            if (
                !containerRef.current ||
                !fromRef.current ||
                !toRef.current ||
                !pathRef.current
            )
                return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const fromRect = fromRef.current.getBoundingClientRect();
            const toRect = toRef.current.getBoundingClientRect();

            // Calculate centers of the elements relative to the container
            const fromX =
                fromRect.left +
                fromRect.width / 2 -
                containerRect.left +
                startXOffset;
            const fromY =
                fromRect.top +
                fromRect.height / 2 -
                containerRect.top +
                startYOffset;
            const toX =
                toRect.left + toRect.width / 2 - containerRect.left + endXOffset;
            const toY =
                toRect.top + toRect.height / 2 - containerRect.top + endYOffset;

            // Create a curved path using a quadratic Bezier curve
            const controlX = (fromX + toX) / 2;
            const controlY = (fromY + toY) / 2 - curvature;

            const pathString = `M${fromX},${fromY} Q${controlX},${controlY} ${toX},${toY}`;

            setPathD(pathString);
            setPathLength(pathRef.current.getTotalLength());
        };

        // Calculate immediately
        calculatePath();

        // And then on resize
        window.addEventListener("resize", calculatePath);
        return () => {
            window.removeEventListener("resize", calculatePath);
        };
    }, [
        containerRef,
        fromRef,
        toRef,
        curvature,
        startXOffset,
        startYOffset,
        endXOffset,
        endYOffset,
    ]);

    const gradientId = `gradient-${id.current}`;

    return (
        <svg
            className={`absolute left-0 top-0 h-full w-full pointer-events-none ${className || ""}`}
            style={{ overflow: "visible" }}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={gradientStartColor} />
                    <stop offset="100%" stopColor={gradientStopColor} />
                </linearGradient>
            </defs>

            {/* Static path for reference */}
            <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
            />

            {/* Animated gradient light */}
            <motion.path
                d={pathD}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={pathWidth * 1.25}
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength}
                initial={{ strokeDashoffset: reverse ? -pathLength : pathLength }}
                animate={{ strokeDashoffset: reverse ? pathLength : -pathLength }}
                transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </svg>
    );
};
