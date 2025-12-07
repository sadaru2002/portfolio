'use client';

import { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [phase, setPhase] = useState<'hello' | 'blur' | 'done'>('hello');
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        // Phase 1: Hello animation (2.5 seconds - slightly faster)
        const helloTimer = setTimeout(() => {
            setPhase('blur');
        }, 2500);

        // Phase 2: Blur overlay (0.5 second) - faster transition
        const blurTimer = setTimeout(() => {
            setPhase('done');
            onLoadingComplete();
        }, 3000);

        return () => {
            clearTimeout(helloTimer);
            clearTimeout(blurTimer);
        };
    }, [onLoadingComplete]);

    if (phase === 'done') return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
                background: phase === 'hello' ? '#000' : 'transparent',
                backdropFilter: phase === 'blur' ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: phase === 'blur' ? 'blur(20px)' : 'none',
                opacity: phase === 'blur' ? 0 : 1,
                transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                willChange: 'opacity, backdrop-filter',
                transform: 'translate3d(0, 0, 0)', // Force GPU layer
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                perspective: 1000,
            }}
        >
            {phase === 'hello' && (
                <>
                    {/* Dark background */}
                    <div className="absolute inset-0 bg-black" />

                    {/* Subtle glow effects */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                                radial-gradient(ellipse at 50% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 40%),
                                radial-gradient(ellipse at 30% 30%, rgba(0, 200, 255, 0.05) 0%, transparent 30%),
                                radial-gradient(ellipse at 70% 70%, rgba(138, 43, 226, 0.05) 0%, transparent 30%)
                            `
                        }}
                    />

                    {/* Hello SVG Animation */}
                    <div className="relative z-10 w-full max-w-[700px] px-5 flex justify-center items-center">
                        <svg
                            viewBox="0 0 1230.94 414.57"
                            className="w-full max-w-[600px]"
                            style={{
                                fill: 'none',
                                strokeLinecap: 'round',
                                strokeMiterlimit: 10,
                                strokeWidth: '35px',
                                strokeDasharray: '5800px',
                                strokeDashoffset: '5800px',
                                animation: 'drawHello 2.5s linear forwards',
                                filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 255, 255, 0.5))',
                                willChange: 'stroke-dashoffset',
                                transform: 'translate3d(0, 0, 0)',
                            }}
                        >
                            <defs>
                                <linearGradient id="helloGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00ffff" />
                                    <stop offset="40%" stopColor="#00ddff" />
                                    <stop offset="70%" stopColor="#00aaff" />
                                    <stop offset="100%" stopColor="#8a5fff" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
                                transform="translate(311.08 476.02)"
                                stroke="url(#helloGradient)"
                            />
                        </svg>
                    </div>

                    {/* CSS Keyframes */}
                    <style>
                        {`
                            @keyframes drawHello {
                                0% { stroke-dashoffset: 5800; }
                                100% { stroke-dashoffset: 0; }
                            }
                            .loading-container * {
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                            }
                        `}
                    </style>
                </>
            )}

            {phase === 'blur' && (
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(15px)',
                        WebkitBackdropFilter: 'blur(15px)',
                        animation: 'fadeOut 0.5s ease-out forwards',
                        willChange: 'opacity',
                        transform: 'translate3d(0, 0, 0)',
                    }}
                />
            )}

            <style>
                {`
                    @keyframes fadeOut {
                        0% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
}
