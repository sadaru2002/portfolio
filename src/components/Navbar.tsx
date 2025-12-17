'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  sectionId: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    sectionId: 'home',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <path fill="currentColor" d="M18 6l12 10v14H6V16L18 6zm0 2.5L8 16.5V28h20V16.5L18 8.5z" />
        <rect fill="currentColor" x="14" y="20" width="8" height="10" />
      </svg>
    )
  },
  {
    label: 'Work',
    sectionId: 'portfolio',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <rect fill="currentColor" x="6" y="10" width="24" height="18" rx="2" />
        <path fill="currentColor" d="M12 10V8a4 4 0 018 0v2h-2V8a2 2 0 00-4 0v2h-2z" />
      </svg>
    )
  },
  {
    label: 'Skills',
    sectionId: 'skills',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <path fill="currentColor" d="M18 8a2 2 0 100-4 2 2 0 000 4zM18 32a2 2 0 100-4 2 2 0 000 4zM8 18a2 2 0 100-4 2 2 0 000 4zM28 18a2 2 0 100-4 2 2 0 000 4zM10.9 10.9a2 2 0 100-4 2 2 0 000 4zM25.1 25.1a2 2 0 100-4 2 2 0 000 4zM10.9 25.1a2 2 0 100-4 2 2 0 000 4zM25.1 10.9a2 2 0 100-4 2 2 0 000 4z" />
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    label: 'About',
    sectionId: 'about',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <circle fill="currentColor" cx="18" cy="12" r="5" />
        <path fill="currentColor" d="M18 19c-6 0-10 3-10 7v2h20v-2c0-4-4-7-10-7z" />
      </svg>
    )
  },
  {
    label: 'Contact',
    sectionId: 'contact',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <rect fill="currentColor" x="6" y="9" width="24" height="18" rx="2" />
        <path fill="currentColor" fillRule="evenodd" d="M6 11l12 8 12-8v2l-12 8-12-8v-2z" clipRule="evenodd" />
      </svg>
    )
  }
];

const ITEM_WIDTH = 78;
const ITEM_WIDTH_MOBILE = 56;
const NAV_PADDING = 8;

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isClickScrolling = useRef(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll spy using getBoundingClientRect for accurate detection
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const windowHeight = window.innerHeight;

      if (window.scrollY < 100) {
        setActiveIndex(0);
        return;
      }

      let bestMatch = 0;
      let bestVisibility = 0;

      for (let i = 0; i < navItems.length; i++) {
        const section = document.getElementById(navItems[i].sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / Math.min(rect.height, windowHeight);

          if (rect.top >= -100 && rect.top < windowHeight / 2 && visibility > 0.1) {
            bestMatch = i;
            break;
          }

          if (visibility > bestVisibility) {
            bestVisibility = visibility;
            bestMatch = i;
          }
        }
      }

      setActiveIndex(bestMatch);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (index: number, sectionId: string) => {
    isClickScrolling.current = true;
    setActiveIndex(index);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1500);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 4.5 }}
      className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-[50000] max-w-[95vw]"
    >
      <div
        className="relative flex items-center rounded-full overflow-x-auto scrollbar-hide"
        style={{
          padding: `${NAV_PADDING}px`,
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.3),
            inset 0 -1px 1px rgba(0, 0, 0, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.2)
          `,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          transform: 'perspective(1000px) rotateX(2deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="flex items-center relative z-10">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleClick(index, item.sectionId)}
              className={`
                flex flex-col items-center justify-center rounded-full
                transition-all duration-300 cursor-pointer relative
                ${activeIndex === index ? 'text-white' : 'text-white/50 hover:text-cyan-400'}
              `}
              style={{
                width: isMobile ? `${ITEM_WIDTH_MOBILE}px` : `${ITEM_WIDTH}px`,
                height: isMobile ? '52px' : '64px',
                background: 'transparent',
                border: 'none',
                transform: activeIndex === index ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                textShadow: activeIndex === index ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none'
              }}
            >
              <div
                className="transition-all duration-300 w-5 h-5 sm:w-6 sm:h-6"
                style={{
                  transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                  filter: activeIndex === index ? 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))' : 'none'
                }}
              >
                {item.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-medium mt-1 sm:mt-1.5 tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Smooth sliding indicator */}
        <motion.div
          className="absolute rounded-full z-0"
          animate={{ x: activeIndex * (isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH) }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
          style={{
            left: `${NAV_PADDING}px`,
            top: `${NAV_PADDING}px`,
            width: isMobile ? `${ITEM_WIDTH_MOBILE}px` : `${ITEM_WIDTH}px`,
            height: `calc(100% - ${NAV_PADDING * 2}px)`,
            background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.3),
              inset 0 -2px 4px rgba(0, 0, 0, 0.15),
              0 4px 12px rgba(0, 240, 255, 0.2),
              0 0 20px rgba(0, 240, 255, 0.1)
            `,
            border: '1px solid rgba(0, 240, 255, 0.3)'
          }}
        />
      </div>
    </motion.nav>
  );
}
