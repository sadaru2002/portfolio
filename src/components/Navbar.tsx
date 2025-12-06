'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '#home',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <path fill="currentColor" d="M18 6l12 10v14H6V16L18 6zm0 2.5L8 16.5V28h20V16.5L18 8.5z" />
        <rect fill="currentColor" x="14" y="20" width="8" height="10" />
      </svg>
    )
  },
  {
    label: 'Work',
    href: '#portfolio',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <rect fill="currentColor" x="6" y="10" width="24" height="18" rx="2" />
        <path fill="currentColor" d="M12 10V8a4 4 0 018 0v2h-2V8a2 2 0 00-4 0v2h-2z" />
      </svg>
    )
  },
  {
    label: 'About',
    href: '#about',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <circle fill="currentColor" cx="18" cy="12" r="5" />
        <path fill="currentColor" d="M18 19c-6 0-10 3-10 7v2h20v-2c0-4-4-7-10-7z" />
      </svg>
    )
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5">
        <rect fill="currentColor" x="6" y="9" width="24" height="18" rx="2" />
        <path fill="currentColor" fillRule="evenodd" d="M6 11l12 8 12-8v2l-12 8-12-8v-2z" clipRule="evenodd" />
      </svg>
    )
  }
];

const ITEM_WIDTH = 90;
const NAV_PADDING = 8;

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 4.5 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[50000]"
    >
      <div
        className="relative flex items-center rounded-full"
        style={{
          padding: `${NAV_PADDING}px`,
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: `
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 1.5px 2px 0px -1px rgba(255, 255, 255, 0.25),
            inset -1.5px -1.5px 0px -1px rgba(255, 255, 255, 0.15),
            inset -2px -6px 2px -5px rgba(255, 255, 255, 0.1),
            inset -0.5px -1px 3px 0px rgba(0, 0, 0, 0.15),
            inset -1px 2px 3px -1px rgba(0, 0, 0, 0.2),
            0px 1px 4px 0px rgba(0, 0, 0, 0.1),
            0px 8px 24px 0px rgba(0, 0, 0, 0.15)
          `
        }}
      >
        {/* Navigation Items */}
        <div className="flex items-center relative z-10">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveIndex(index)}
              className={`
                flex flex-col items-center justify-center rounded-full
                transition-all duration-200 no-underline
                ${activeIndex === index
                  ? 'text-white/90'
                  : 'text-white/50 hover:text-cyan-400/90'
                }
              `}
              style={{
                width: `${ITEM_WIDTH}px`,
                height: '64px'
              }}
            >
              <div className={`transition-transform duration-200 ${activeIndex !== index ? 'hover:scale-110' : ''
                }`}>
                {/* Clone element to increase size */}
                <div className="w-6 h-6">
                  {item.icon}
                </div>
              </div>
              <span className="text-xs font-medium mt-1.5 tracking-wide opacity-90">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Sliding indicator */}
        <div
          className="absolute rounded-full z-0 transition-transform duration-400 ease-out"
          style={{
            left: `${NAV_PADDING}px`,
            top: `${NAV_PADDING}px`,
            width: `${ITEM_WIDTH}px`,
            height: `calc(100% - ${NAV_PADDING * 2}px)`,
            transform: `translateX(${activeIndex * ITEM_WIDTH}px)`,
            background: 'rgba(255, 255, 255, 0.12)',
            boxShadow: `
              inset 0 0 0 1px rgba(255, 255, 255, 0.15),
              inset 1px 1px 0px -0.5px rgba(255, 255, 255, 0.3),
              inset -1px -1px 0px -0.5px rgba(255, 255, 255, 0.2),
              inset -1.5px -4px 2px -3px rgba(255, 255, 255, 0.15),
              inset -0.5px 1.5px 2px -1px rgba(0, 0, 0, 0.2),
              inset 0px -2.5px 1px -1.5px rgba(0, 0, 0, 0.1),
              0px 2px 6px 0px rgba(0, 0, 0, 0.08)
            `,
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </motion.nav>
  );
}
