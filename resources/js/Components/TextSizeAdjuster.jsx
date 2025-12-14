import React from 'react';

/**
 * Text Size Adjuster Component
 * - Allows users to increase/decrease text size
 * - Persists to localStorage
 * - Applies to entire page
 * - Keyboard accessible
 */
export function useTextSize() {
    const [textSize, setTextSize] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('textSize') || '16';
        }
        return '16';
    });

    React.useEffect(() => {
        document.documentElement.style.fontSize = `${textSize}px`;
        localStorage.setItem('textSize', textSize);
    }, [textSize]);

    const increaseSize = () => {
        setTextSize(prev => Math.min(Number(prev) + 2, 24));
    };

    const decreaseSize = () => {
        setTextSize(prev => Math.max(Number(prev) - 2, 12));
    };

    const resetSize = () => {
        setTextSize('16');
    };

    return { textSize, increaseSize, decreaseSize, resetSize };
}

export default function TextSizeAdjuster() {
    const { textSize, increaseSize, decreaseSize, resetSize } = useTextSize();

    return (
        <div className="flex items-center gap-2 p-4 bg-white border-2 border-gray-300 rounded-lg">
            <span className="text-sm font-semibold text-gray-700">Text Size:</span>
            <button
                onClick={decreaseSize}
                disabled={Number(textSize) <= 12}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-offset-2 focus:outline-none"
                aria-label="Decrease text size"
                title="Decrease text size (Minimum 12px)"
            >
                A−
            </button>
            <span className="text-sm font-semibold text-gray-900 min-w-[3rem] text-center">
                {textSize}px
            </span>
            <button
                onClick={increaseSize}
                disabled={Number(textSize) >= 24}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-offset-2 focus:outline-none"
                aria-label="Increase text size"
                title="Increase text size (Maximum 24px)"
            >
                A+
            </button>
            <button
                onClick={resetSize}
                className="px-3 py-2 bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold rounded-lg focus:ring-4 focus:ring-offset-2 focus:outline-none"
                aria-label="Reset text size to default"
                title="Reset text size to default (16px)"
            >
                Reset
            </button>
        </div>
    );
}
