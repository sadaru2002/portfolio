'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children: ReactNode;
    duration?: string;
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = true,
    children,
    duration = '30s',
}: MarqueeProps) {
    return (
        <div
            className={cn(
                'group flex overflow-hidden',
                className
            )}
            style={{
                '--duration': duration,
                gap: '1.5rem'
            } as React.CSSProperties}
        >
            <div
                className={cn(
                    'flex shrink-0 items-center animate-marquee',
                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                    reverse && '[animation-direction:reverse]'
                )}
                style={{ gap: '1.5rem' }}
            >
                {children}
            </div>
            <div
                className={cn(
                    'flex shrink-0 items-center animate-marquee',
                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                    reverse && '[animation-direction:reverse]'
                )}
                style={{ gap: '1.5rem' }}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}
