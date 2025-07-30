"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface NeonGradientCardProps {
    children: React.ReactNode;
    className?: string;
}

export const NeonGradientCard = ({
    children,
    className,
}: NeonGradientCardProps) => {
    return (
        <div className={cn("neon-card", className)}>
            <div className="neon-card-bg" />
            <div className="neon-card-border" />
            <div className="neon-card-glow" />
            <div className="neon-card-content">{children}</div>
        </div>
    );
};
