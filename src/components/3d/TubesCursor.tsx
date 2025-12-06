'use client';

export default function TubesCursor() {
    return (
        <canvas
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
