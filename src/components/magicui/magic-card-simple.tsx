"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
}

export const MagicCard = ({
    children,
    className,
}: MagicCardProps) => {
    return (
        <div className={cn("magic-card", className)}>
            <div className="magic-card-spotlight" />
            <div className="magic-card-border" />
            <div className="relative">{children}</div>
        </div>
    );
};
