'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis 
            root 
            options={{ 
                lerp: 0.08, // Faster interpolation for snappier feel
                duration: 1.2, // Shorter duration
                smoothWheel: true,
                wheelMultiplier: 0.8, // Reduce scroll sensitivity
                touchMultiplier: 1.5,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
