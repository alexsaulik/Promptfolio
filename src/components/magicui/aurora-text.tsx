"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface AuroraTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    speed?: number;
}

export const AuroraText = ({
    children,
    className = "",
}: AuroraTextProps) => {
    return (
        <span
            className={cn(
                "aurora-text inline-block",
                className
            )}
        >
            {children}
        </span>
    );
};
