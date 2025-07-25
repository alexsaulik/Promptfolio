import { useState } from "react";

interface SimpleCompareProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
    className?: string;
}

export function SimpleCompare({
    beforeImage,
    afterImage,
    beforeLabel,
    afterLabel,
    className = ""
}: SimpleCompareProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    return (
        <div
            className={`relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing ${className}`}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* After Image (Background) */}
            <div className="w-full h-full">
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden transition-all"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-md backdrop-blur-sm">
                {beforeLabel}
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-md backdrop-blur-sm">
                {afterLabel}
            </div>
        </div>
    );
}
