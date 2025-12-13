'use client';

import { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import TechStack from '@/components/TechStack';
import About from '@/components/About';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import ChatBot from '@/components/ChatBot';

// Load 3D components on client only with loading states
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black -z-10" />
});
const TubesCursor = dynamic(() => import('@/components/3d/TubesCursor'), {
  ssr: false,
  loading: () => null
});
const Robot3D = dynamic(() => import('@/components/3d/Robot3D'), {
  ssr: false,
  loading: () => null // Don't show anything while loading
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const hasCompleted = useRef(false);

  const handleLoadingComplete = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    window.scrollTo(0, 0);
    setIsLoading(false);

    // Start the blur-to-clear transition immediately
    setIntroComplete(true);

    // Show content faster - reduced delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        setContentVisible(true);
      }, 600);
    });
  }, []);

  return (
    <>
      {/* Scene ALWAYS renders - Black Hole background visible through all sections */}
      <Scene introComplete={introComplete} />

      {/* Tubes cursor - renders after content is visible for smoother loading */}
      {contentVisible && <TubesCursor />}

      {/* Loading screen on top */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main content - sections are transparent to show black hole */}
      <main
        className="min-h-screen relative"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isLoading ? 'opacity' : 'auto',
        }}
      >
        {/* Robot appears after content is visible */}
        <div style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '0.3s',
          willChange: contentVisible ? 'auto' : 'opacity',
        }}>
          <Robot3D onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
        </div>

        {/* ChatBot - opens when clicking robot */}
        <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Navbar fades in smoothly - FIXED position */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '0.2s',
          zIndex: 60000,
          pointerEvents: contentVisible ? 'auto' : 'none',
          willChange: contentVisible ? 'auto' : 'opacity, transform',
        }}>
          <Navbar />
        </div>

        {/* Hero - fully transparent to show black hole */}
        <Hero contentVisible={contentVisible} />

        {/* Other sections - subtle glassy overlay - black hole 70% visible */}
        <div className="relative">
          {/* Light glassy backdrop - reduced blur for performance */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(2, 4, 16, 0.4)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          <div className="relative z-10">
            <Portfolio />
            <TechStack />
            <About />
            <Contact />

            <footer className="py-8 text-center text-gray-500 text-sm relative z-10 border-t border-white/5">
              <p>© 2025 Thilina Sandaruwan. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
