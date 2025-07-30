"use client";

import { cn } from "@/lib/utils";
import { motion, type Transition } from "framer-motion";
import React from "react";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    delay?: number;
    colorFrom?: string;
    colorTo?: string;
    transition?: Transition;
    style?: React.CSSProperties;
    reverse?: boolean;
    initialOffset?: number;
    borderWidth?: number;
}

export const BorderBeam = ({
    className,
    size = 50,
    duration = 6,
    delay = 0,
    colorFrom,
    colorTo,
    transition,
    style,
    reverse = false,
    initialOffset = 0,
    borderWidth = 1,
}: BorderBeamProps) => {
    const id = React.useId();

    return (
        <div
            className={cn(
                "absolute inset-0 opacity-90 pointer-events-none overflow-hidden",
                className
            )}
            style={style}
        >
            <motion.div
                aria-hidden
                initial={{
                    rotate: 0,
                    pathLength: 0,
                    pathOffset: reverse ? 1 - initialOffset / 100 : initialOffset / 100
                }}
                animate={{
                    rotate: 360,
                    pathLength: 1,
                    pathOffset: reverse ? 0 : 1
                }}
                transition={transition ?? {
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -inset-1/4 w-[150%] h-[150%]"
            >
                <svg
                    viewBox="0 0 100 100"
                    className="absolute w-full h-full overflow-visible"
                >
                    <defs>
                        <linearGradient
                            id={`border-beam-gradient-${id}`}
                            className="from-purple-500 to-primary"
                        >
                            <stop offset="0%" className="stop-color-from" />
                            <stop offset="100%" className="stop-color-to" />
                        </linearGradient>
                    </defs>
                    <rect
                        width={100}
                        height={100}
                        pathLength={1}
                        strokeWidth={borderWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke={`url(#border-beam-gradient-${id})`}
                        className="scale-[0.8] origin-center fill-transparent"
                        rx={size / 10}
                    />
                </svg>
            </motion.div>
        </div>
    );
};
