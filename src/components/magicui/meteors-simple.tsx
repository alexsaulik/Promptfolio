"use client";

import { cn } from "../../lib/utils";

export const Meteors = ({
    number = 20,
    className,
}: {
    number?: number;
    className?: string;
}) => {
    const meteorites = [...Array(number)].map((_, i) => (
        <span
            key={`meteor-${i}`}
            className={cn(
                "absolute top-0 left-0 h-0.5 w-0.5 animate-meteor rounded-full bg-slate-500 shadow-sm",
                "before:absolute before:top-1/2 before:h-px before:w-12 before:-translate-y-1/2 before:bg-gradient-to-r before:from-slate-500 before:to-transparent"
            )}
        ></span>
    ));

    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)}>
            {meteorites}
        </div>
    );
};
