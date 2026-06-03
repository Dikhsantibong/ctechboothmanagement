import React from 'react';

export default function BlobBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FFB7B2]/40 rounded-full blur-[80px] mix-blend-multiply animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#B5EAD7]/50 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-[#E2F0CB]/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#C7CEEA]/40 rounded-full blur-[60px] mix-blend-multiply animate-blob animation-delay-2000"></div>

            <style>
                {`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 10s infinite alternate;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                `}
            </style>
        </div>
    );
}
