import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

export default function ShinyText({ text, disabled = false, speed = 3, className = '' }: ShinyTextProps) {
    const animationDuration = `${speed}s`;

    return (
        <span
            className={`relative inline-block overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-transparent via-white to-transparent bg-[length:200%_100%] animate-shine ${className}`}
            style={{
                backgroundRepeat: 'no-repeat',
                animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
            }}
        >
            <span className="text-inherit">{text}</span>
            <style>
                {`
                @keyframes shine {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                `}
            </style>
        </span>
    );
}
