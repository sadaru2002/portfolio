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

// Load 3D components on client only
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black -z-10" />
});
const TubesCursor = dynamic(() => import('@/components/3d/TubesCursor'), { ssr: false });
const Robot3D = dynamic(() => import('@/components/3d/Robot3D'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const hasCompleted = useRef(false);

  const handleLoadingComplete = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    window.scrollTo(0, 0);
    setIsLoading(false);

    // Start the blur-to-clear transition
    setIntroComplete(true);

    // Show content after a smooth delay (1.5s for blur to mostly clear)
    setTimeout(() => {
      setContentVisible(true);
    }, 1500);
  }, []);

  return (
    <>
      {/* Scene ALWAYS renders - Black Hole background visible through all sections */}
      <Scene introComplete={introComplete} />

      {/* Tubes cursor - renders immediately after loading */}
      {!isLoading && <TubesCursor />}

      {/* Loading screen on top */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main content - sections are transparent to show black hole */}
      <main
        className="min-h-screen relative"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Robot appears after content is visible */}
        <div style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 1s ease-out',
          transitionDelay: '0.5s'
        }}>
          <Robot3D />
        </div>

        {/* Navbar fades in smoothly - FIXED position */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transitionDelay: '0.3s',
          zIndex: 60000,
          pointerEvents: 'auto'
        }}>
          <Navbar />
        </div>

        {/* Hero - fully transparent to show black hole */}
        <Hero contentVisible={contentVisible} />

        {/* Other sections - subtle glassy overlay - black hole 70% visible */}
        <div className="relative">
          {/* Light glassy backdrop - minimal blur for clear black hole visibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(2, 4, 16, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          <div className="relative z-10">
            <Portfolio />
            <TechStack />
            <About />
            <Contact />

            <footer className="py-8 text-center text-gray-500 text-sm relative z-10 border-t border-white/5">
              <p>© {new Date().getFullYear()} Thilina Sandaruwan. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
