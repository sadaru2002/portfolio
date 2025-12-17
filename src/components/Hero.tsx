'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

interface HeroProps {
  contentVisible?: boolean;
}

// Memoized transition config for performance
const smoothTransition = {
  duration: 0.4, // Faster for snappier feel
  ease: [0.4, 0, 0.2, 1] as const, // Standard ease-out
};

export default function Hero({ contentVisible = true }: HeroProps) {
  // Memoize animation variants to prevent recreation on each render
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }), []);

  const fadeInLeft = useMemo(() => ({
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }), []);

  return (
    <section id="home" className="relative min-h-screen flex items-center z-10">
      {/* Logo - positioned at top left of hero section, hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: contentVisible ? 1 : 0,
          y: contentVisible ? 0 : -20
        }}
        transition={{ ...smoothTransition, delay: 0.2 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        className="hidden sm:block absolute top-4 left-4 sm:top-6 sm:left-12 md:left-20 z-[100] cursor-pointer"
        style={{ willChange: 'transform, opacity' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Image src="/LOGO.png" alt="Logo" width={76} height={76} priority />
      </motion.div>
      {/* Left side - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: contentVisible ? 1 : 0,
          x: contentVisible ? 0 : -50
        }}
        transition={{ ...smoothTransition, delay: 0.05 }}
        className="w-full md:w-1/2 px-4 sm:pl-12 md:pl-20 pr-4 sm:pr-6"
        style={{ willChange: contentVisible ? 'auto' : 'transform, opacity' }}
      >
        {/* Main headline with name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] mb-4 sm:mb-6 tracking-tight"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 30
          }}
          transition={{ ...smoothTransition, delay: 0.05 }}
        >
          <span className="block text-white">I'M</span>
          <span className="block" style={{ color: '#00F0FF' }}>THILINA</span>
          <span className="block" style={{ color: '#00F0FF' }}>SANDARUWAN.</span>
        </motion.h1>

        {/* Developer & Creative Thinker tagline */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            x: contentVisible ? 0 : -20
          }}
          transition={{ ...smoothTransition, delay: 0.1 }}
        >
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: '#00F0FF' }}
          />
          <span className="text-gray-300 text-sm sm:text-sm md:text-base tracking-widest font-mono uppercase">
            Developer // Creative Thinker
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 20
          }}
          transition={{ ...smoothTransition, delay: 0.15 }}
        >
          Crafting immersive digital experiences where code meets creativity.
          Building the future, one pixel at a time.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 20
          }}
          transition={{ ...smoothTransition, delay: 0.2 }}
        >
          <a
            href="/cv.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 text-black font-bold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            style={{ backgroundColor: '#00F0FF' }}
          >
            DOWNLOAD CV
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Right side - Space for Black Hole (hidden on mobile) */}
      <div className="hidden md:block w-1/2 h-full" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ ...smoothTransition, delay: 0.25 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: '#00F0FF' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
