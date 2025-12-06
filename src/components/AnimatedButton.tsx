'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Download, Check, FileText } from 'lucide-react';

export default function AnimatedButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const dummyRef = useRef<HTMLDivElement>(null);
  const staticBorderRef = useRef<HTMLDivElement>(null);
  const animatedBorderRef = useRef<HTMLDivElement>(null);
  const completeBorderRef = useRef<HTMLDivElement>(null);
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (itemRef.current) {
      gsap.set(itemRef.current, { y: -24, opacity: 0 });
    }
    if (checkRef.current) {
      gsap.set(checkRef.current, { opacity: 0, scale: 0 });
    }
  }, []);

  const handleClick = useCallback(() => {
    if (isAnimating) return;
    
    const cart = cartRef.current;
    const dummy = dummyRef.current;
    const text = textRef.current;
    const item = itemRef.current;
    const staticBorder = staticBorderRef.current;
    const animatedBorder = animatedBorderRef.current;
    const completeBorder = completeBorderRef.current;
    const check = checkRef.current;

    if (!cart || !dummy || !text || !item || !staticBorder || !animatedBorder || !completeBorder || !check) return;
    
    setIsAnimating(true);
    
    const dummyRect = dummy.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    const distance = dummyRect.left - cartRect.left;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    tl
    .to(cart, {
      x: distance,
      duration: 0.22,
      ease: "power2.out"
    })
    .to(cart, {
      rotate: -20,
      yoyo: true,
      repeat: 1,
      duration: 0.11
    }, 0)
    .to(text, {
      opacity: 0,
      x: distance,
      duration: 0.22,
      filter: "blur(6px)"
    }, 0)
    .set(item, { opacity: 1 }, 0.1)
    .to(item, {
      y: 0,
      duration: 0.1,
      delay: 0.1
    })
    .to(staticBorder, {
      opacity: 1,
      duration: 0.1
    }, "<")
    .set(animatedBorder, {
      opacity: 0
    })
    .to(cart, {
      x: distance + 50,
      duration: 0.6,
      delay: 0.1
    })
    .to(cart, {
      rotate: -30,
      duration: 0.1
    }, "<")
    .to(completeBorder, {
      opacity: 1,
      duration: 0.22
    }, "<")
    .to(check, {
      opacity: 1,
      scale: 1.2,
      duration: 0.25,
      ease: "back.out(1.7)"
    }, "<")
    .set(text, { x: 0 })
    .set(cart, { x: -100, rotate: 0, opacity: 0 })
    .set(item, { y: -24, opacity: 0 })
    .to([staticBorder, completeBorder], {
      opacity: 0,
      duration: 0.5,
      delay: 1
    })
    .to(check, {
        opacity: 0,
        scale: 0,
        duration: 0.3
    }, "<")
    .set(cart, { x: 0, opacity: 1 })
    .to(text, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.22
    })
    .to(animatedBorder, {
      opacity: 1,
      duration: 1,
      ease: "power2.in"
    });
  }, [isAnimating]);

  return (
    <button 
      ref={buttonRef}
      onClick={handleClick}
      className="relative group w-40 h-12 bg-transparent cursor-pointer select-none"
    >
      {/* Borders */}
      <div ref={animatedBorderRef} className="absolute inset-0 rounded-full border border-accent/50 shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300" />
      <div ref={staticBorderRef} className="absolute inset-0 rounded-full border-2 border-white/20 opacity-0" />
      <div ref={completeBorderRef} className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0 shadow-[0_0_15px_rgba(74,222,128,0.5)]" />

      {/* Content Container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
        
        {/* Text */}
        <span ref={textRef} className="text-accent font-bold text-sm tracking-wider uppercase z-10">
          Engage CV
        </span>

        {/* Dummy for calculation (positioned where we want the cart to go) */}
        <div ref={dummyRef} className="absolute left-1/2 -translate-x-1/2 w-1 h-1 opacity-0 pointer-events-none" />

        {/* Cart (Download Icon) */}
        <div ref={cartRef} className="absolute right-4 z-20 text-accent">
          <Download size={18} />
          {/* Item (File) */}
          <div ref={itemRef} className="absolute -top-2 left-1/2 -translate-x-1/2 text-white">
            <FileText size={12} fill="currentColor" />
          </div>
        </div>

        {/* Check Icon */}
        <div ref={checkRef} className="absolute inset-0 flex items-center justify-center text-green-400 z-30">
          <Check size={24} strokeWidth={3} />
        </div>

      </div>
    </button>
  );
}
