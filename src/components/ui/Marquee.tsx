'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children: ReactNode;
    speed?: number;
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = true,
    children,
    speed = 40,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                'marquee-wrapper overflow-hidden w-full',
                pauseOnHover && 'hover-pause',
                className
            )}
        >
            <div
                className={cn(
                    'marquee-inner flex whitespace-nowrap',
                    reverse ? 'animate-marquee-reverse' : 'animate-marquee-forward'
                )}
                style={{ '--speed': `${speed}s` } as React.CSSProperties}
            >
                <div className="flex items-center gap-6 shrink-0 pr-6">
                    {children}
                </div>
                <div className="flex items-center gap-6 shrink-0 pr-6" aria-hidden="true">
                    {children}
                </div>
            </div>

            <style>{`
                .marquee-wrapper {
                    -webkit-mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent);
                    mask: linear-gradient(90deg, transparent, white 5%, white 95%, transparent);
                }
                
                .animate-marquee-forward {
                    animation: marquee-scroll var(--speed, 40s) linear infinite;
                }
                
                .animate-marquee-reverse {
                    animation: marquee-scroll-reverse var(--speed, 40s) linear infinite;
                }
                
                .hover-pause:hover .marquee-inner {
                    animation-play-state: paused;
                }
                
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes marquee-scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
