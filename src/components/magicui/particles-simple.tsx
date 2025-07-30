"use client";

import { cn } from "../../lib/utils";

export const Particles = ({
    className = "",
}: {
    className?: string;
}) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)}>
            <div className="particles-container">
                <span className="particle particle-1"></span>
                <span className="particle particle-2"></span>
                <span className="particle particle-3"></span>
                <span className="particle particle-4"></span>
                <span className="particle particle-5"></span>
                <span className="particle particle-6"></span>
                <span className="particle particle-7"></span>
                <span className="particle particle-8"></span>
            </div>
        </div>
    );
};
