'use client';

import { useEffect, useRef } from 'react';

export default function TubesCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set explicit canvas dimensions to viewport size (not document size)
        const updateCanvasSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Limit to WebGPU max texture size
            canvas.width = Math.min(width, 4096);
            canvas.height = Math.min(height, 4096);
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="tubes-cursor-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 40000,
                pointerEvents: 'none',
                opacity: 0.35,
            }}
        />
    );
}
