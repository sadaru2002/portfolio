'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);

        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (iframeRef.current && (window as any).SC) {
                widgetRef.current = (window as any).SC.Widget(iframeRef.current);

                widgetRef.current.bind((window as any).SC.Widget.Events.READY, () => {
                    widgetRef.current.setVolume(100);
                });

                widgetRef.current.bind((window as any).SC.Widget.Events.PLAY, () => {
                    setIsPlaying(true);
                });

                widgetRef.current.bind((window as any).SC.Widget.Events.PAUSE, () => {
                    setIsPlaying(false);
                });
            }
        };

        return () => {
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const togglePlay = () => {
        if (widgetRef.current) {
            widgetRef.current.toggle();
        }
    };

    const toggleMute = () => {
        if (widgetRef.current) {
            widgetRef.current.setVolume(isMuted ? 100 : 0);
            setIsMuted(!isMuted);
        }
    };

    if (!mounted) return null;

    return (
        <>
            {/* Hidden SoundCloud Widget */}
            <iframe
                ref={iframeRef}
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ziad-a-mahmoud/interstellar-main-theme-extra-extended-soundtrack-by-hans-zimmer&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
                style={{ position: 'absolute', visibility: 'hidden', width: 0, height: 0 }}
                allow="autoplay"
            />

            {/* Minimal Glassmorphism Player */}
            <div
                className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`
                    flex items-center gap-3 h-11 px-3
                    bg-black/50 backdrop-blur-md
                    border border-cyan-500/20 
                    rounded-full
                    shadow-lg shadow-cyan-500/10
                    transition-all duration-300 ease-out
                    ${isHovered ? 'pl-3 pr-4' : ''}
                    ${isPlaying ? 'border-cyan-400/40 shadow-cyan-400/20' : ''}
                `}>
                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className={`
                            w-7 h-7 rounded-full flex items-center justify-center
                            transition-all duration-200
                            ${isPlaying
                                ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                                : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                            }
                        `}
                    >
                        {isPlaying ? (
                            <Pause size={12} fill="currentColor" />
                        ) : (
                            <Play size={12} fill="currentColor" className="ml-0.5" />
                        )}
                    </button>

                    {/* Track Info */}
                    <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                        <p className="text-xs font-medium text-white/90 truncate">Interstellar</p>
                        <p className="text-[10px] text-cyan-400/70 truncate">Hans Zimmer</p>
                    </div>

                    {/* Mute Button */}
                    <button
                        onClick={toggleMute}
                        className={`
                            w-6 h-6 rounded-full flex items-center justify-center
                            text-cyan-400/60 hover:text-cyan-400
                            transition-all duration-300
                            ${isHovered ? 'opacity-100' : 'opacity-0 w-0'}
                        `}
                    >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>

                    {/* Minimal Sound Bars */}
                    {isPlaying && (
                        <div className="flex items-end gap-[2px] h-3">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-[3px] bg-cyan-400 rounded-sm origin-bottom"
                                    style={{
                                        animation: 'bar 0.5s ease-in-out infinite alternate',
                                        animationDelay: `${i * 0.15}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes bar {
                    0% { height: 4px; }
                    100% { height: 12px; }
                }
            `}</style>
        </>
    );
}
