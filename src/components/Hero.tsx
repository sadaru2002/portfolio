'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

interface HeroProps {
  contentVisible?: boolean;
}

// Memoized transition config for performance
const smoothTransition = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94] as const, // Smooth cubic-bezier
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
      {/* Logo - positioned at top left of hero section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: contentVisible ? 1 : 0,
          y: contentVisible ? 0 : -20
        }}
        transition={{ ...smoothTransition, delay: 0.4 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        className="absolute top-6 left-12 md:left-20 z-[100] cursor-pointer"
        style={{ willChange: 'transform, opacity' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: 'transform' }}
        >
          <Image src="/LOGO.png" alt="Logo" width={76} height={76} priority />
        </motion.div>
      </motion.div>
      {/* Left side - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: contentVisible ? 1 : 0,
          x: contentVisible ? 0 : -50
        }}
        transition={{ ...smoothTransition, delay: 0.1 }}
        className="w-1/2 pl-12 md:pl-20 pr-6"
        style={{ willChange: contentVisible ? 'auto' : 'transform, opacity' }}
      >
        {/* Main headline with name */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] mb-6 tracking-tight"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 50
          }}
          transition={{ ...smoothTransition, delay: 0.2 }}
        >
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: contentVisible ? 1 : 0,
              y: contentVisible ? 0 : 30
            }}
            transition={{ ...smoothTransition, delay: 0.3 }}
          >
            I'M
          </motion.span>
          <motion.span
            className="block"
            style={{ color: '#00F0FF' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: contentVisible ? 1 : 0,
              y: contentVisible ? 0 : 30
            }}
            transition={{ ...smoothTransition, delay: 0.4 }}
          >
            THILINA
          </motion.span>
          <motion.span
            className="block"
            style={{ color: '#00F0FF' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: contentVisible ? 1 : 0,
              y: contentVisible ? 0 : 30
            }}
            transition={{ ...smoothTransition, delay: 0.5 }}
          >
            SANDARUWAN.
          </motion.span>
        </motion.h1>

        {/* Developer & Creative Thinker tagline */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            x: contentVisible ? 0 : -20
          }}
          transition={{ ...smoothTransition, delay: 0.6 }}
        >
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: '#00F0FF' }}
          />
          <span className="text-gray-300 text-sm md:text-base tracking-widest font-mono uppercase">
            Developer // Creative Thinker
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-gray-400 mb-8 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 20
          }}
          transition={{ ...smoothTransition, delay: 0.7 }}
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
          transition={{ ...smoothTransition, delay: 0.8 }}
        >
          <a
            href="/cv.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
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

      {/* Right side - Space for Black Hole */}
      <div className="w-1/2 h-full" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: contentVisible ? 1 : 0,
          y: contentVisible ? 0 : 20
        }}
        transition={{ ...smoothTransition, delay: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: contentVisible ? 1.2 : 0
          }}
          className="flex flex-col items-center gap-2"
          style={{ willChange: 'transform' }}
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: '#00F0FF' }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
