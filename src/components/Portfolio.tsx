'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "CVMate(solo)",
    subtitle: "AI-Powered Resume Builder",
    description: "A modern, intelligent resume builder that combines professional design templates with AI-powered optimization using Google's Gemini AI for real-time analytics and intelligent keyword suggestions.",
    image: "/cvmate.png",
    techStack: ["Next.js 14", "TypeScript", "MongoDB", "Gemini AI", "Tailwind CSS"],
    features: ["Multiple Templates", "AI Optimization", "Resume Analytics", "PDF Export"],
    liveUrl: "https://cvmate-next.vercel.app",
    githubUrl: "https://github.com/sadaru2002/cvmate-next",
  },
  {
    id: 2,
    title: "AlphaForge(solo)",
    subtitle: "Algorithmic Trading System",
    description: "Institutional-grade automated trading platform for OANDA. Features multi-timeframe analysis, adaptive market regime detection, and Gemini AI validation for high-probability trading signals.",
    image: "/alphaforge.png",
    techStack: ["Python 3.11", "FastAPI", "React 18", "Docker", "Gemini Pro"],
    features: ["AI Signal Validation", "Multi-Timeframe", "Telegram Alerts", "Risk Management"],
    liveUrl: "https://alphaforge.vercel.app",
    githubUrl: "https://github.com/sadaru2002/AlphaForge",
  },
  {
    id: 3,
    title: "Portfolio(solo)",
    subtitle: "3D Interactive Portfolio",
    description: "portfolio website featuring immersive 3D graphics, WebGL shaders, interactive robot assistant, and smooth scroll animations. Built with cutting-edge web technologies.",
    image: "/portfolio.png",
    techStack: ["Next.js 15", "Three.js", "React Three Fiber", "Framer Motion", "WebGL"],
    features: ["3D Black Hole", "Interactive Robot", "Smooth Scroll", "Liquid Glass Effects"],
    githubUrl: "https://github.com/sadaru2002/Portfolio",
  },


  {
    id: 4,
    title: "Citizen Voice(Group)",
    subtitle: "Civic Tech Platform",
    description: "Full-stack web application enabling citizens to report public issues with structured forms, real-time chat, AI chatbot support, and map-based location selection for accountability.",
    image: "/citizenvoice.png",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Firebase", "Gemini API"],
    features: ["33+ Dynamic Forms", "Real-time Chat", "AI Chatbot", "PDF Receipts"],
    liveUrl: "https://citizen-voice-five.vercel.app/",
  }
];

// Animation variants - responsive for both layouts
const cardVariants = {
  collapsed: {
    flex: 1,
  },
  expanded: {
    flex: 4,
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
};

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const nextProject = () => {
    setActiveIndex(prev => prev === null ? 0 : (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex(prev => prev === null ? projects.length - 1 : (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="portfolio" className="relative min-h-screen py-20 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(2,4,16,0.95) 0%, rgba(2,4,16,0.9) 50%, rgba(2,4,16,0.85) 100%)',
          backdropFilter: 'blur(40px)',
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Now Showcasing</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Work</span>
        </motion.h2>
      </div>

      {/* Cards Container - Vertical on mobile, Horizontal on desktop */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 z-10">
        <div className="flex flex-col md:flex-row md:h-[70vh] md:min-h-[500px] gap-3 md:gap-3">
          {projects.map((project, index) => {
            const isActive = activeIndex === index;
            const isOther = activeIndex !== null && activeIndex !== index;

            return (
              <motion.div
                key={project.id}
                onClick={() => handleCardClick(index)}
                className="relative cursor-pointer overflow-hidden rounded-2xl min-h-[200px] md:min-h-0"
                variants={cardVariants}
                initial="collapsed"
                animate={isActive ? "expanded" : "collapsed"}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                }}
                style={{
                  border: `1px solid rgba(0, 240, 255, ${isActive ? 0.5 : 0.3})`,
                  boxShadow: isActive
                    ? '0 0 60px rgba(0, 240, 255, 0.3), inset 0 0 30px rgba(0, 240, 255, 0.1)'
                    : '0 0 30px rgba(0, 240, 255, 0.15)',
                  filter: isOther ? 'brightness(0.6) grayscale(0.3)' : 'brightness(1) grayscale(0)',
                }}
                whileHover={!isActive ? {
                  filter: 'brightness(1) grayscale(0)',
                  scale: 1.01
                } : {}}
              >
                {/* Glass overlay */}
                <div
                  className="absolute inset-0 z-40 pointer-events-none rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, transparent 50%, rgba(0,240,255,0.1) 100%)',
                    opacity: isActive ? 1 : 0.5,
                  }}
                />

                {/* Image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    style={{ filter: isActive ? 'blur(2px)' : 'none' }}
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                  }}
                />

                {/* Number */}
                <div className="absolute top-5 left-5 z-20">
                  <span
                    className="text-5xl font-extralight"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      opacity: isActive ? 0.3 : 0.6
                    }}
                  >
                    0{project.id}
                  </span>
                </div>

                {/* Vertical title (when collapsed) */}
                <motion.div
                  className="absolute z-20 font-bold text-lg text-cyan-400 whitespace-nowrap"
                  animate={{
                    left: isActive ? 20 : 24,
                    bottom: isActive ? 'auto' : 80,
                    top: isActive ? 60 : 'auto',
                    rotate: isActive ? 0 : -90,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  style={{
                    transformOrigin: 'left bottom',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  {project.title}
                </motion.div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 z-30"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                        className="p-6 rounded-xl"
                        style={{
                          background: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        <motion.h3 variants={itemVariants} className="text-3xl font-bold text-white mb-1">
                          {project.title}
                        </motion.h3>

                        <motion.p variants={itemVariants} className="text-cyan-400 text-lg mb-3">
                          {project.subtitle}
                        </motion.p>

                        <motion.p variants={itemVariants} className="text-white/60 text-sm mb-4 max-w-lg">
                          {project.description}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-5">
                          {project.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded border border-white/10"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span className="text-white/70 text-xs">{feature}</span>
                            </div>
                          ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-colors"
                            >
                              <ExternalLink size={14} />
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition-colors"
                            >
                              <Github size={14} />
                              Source
                            </a>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand button */}
                <motion.div
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center z-40 bg-black/40"
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: '0 0 12px rgba(0, 240, 255, 0.4)' }}
                >
                  <span className="text-cyan-400 text-xl font-light">+</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Nav arrows */}
        <button
          onClick={prevProject}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur border border-cyan-500/30 flex items-center justify-center text-white hover:bg-black/70 transition-all z-30"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextProject}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur border border-cyan-500/30 flex items-center justify-center text-white hover:bg-black/70 transition-all z-30"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center mt-8 gap-2 relative z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: activeIndex === index ? 48 : 32,
              backgroundColor: activeIndex === index ? '#00F0FF' : 'rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>
    </section>
  );
}
