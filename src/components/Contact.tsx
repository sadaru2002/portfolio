'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-32 px-4 sm:px-6 md:px-20 relative z-10 flex flex-col items-center text-center">
      {/* Dark backdrop for readable text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(2,4,16,0.85) 0%, rgba(2,4,16,0.8) 50%, rgba(2,4,16,0.85) 100%)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white relative z-10"
      >
        Ready to <span className="text-accent">Launch?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-base sm:text-xl text-gray-300 max-w-2xl mb-8 sm:mb-12 relative z-10 px-2"
      >
        Have a project, an idea, or just curious if we're a good fit? Let's build something smart, beautiful, and future-ready.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <a href="mailto:lakmalsadaruwan411@gmail.com" className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-accent text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] mb-8 sm:mb-12 text-sm sm:text-base">
          Let's Connect
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="flex gap-4 sm:gap-6 relative z-10"
      >
        <a href="https://github.com/sadaru2002/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-white/5 rounded-full hover:bg-accent hover:text-black transition-all duration-300">
          <Github size={20} className="sm:w-6 sm:h-6" />
        </a>
        <a href="https://www.linkedin.com/in/thilina-sandaruwan-a95a02221/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-white/5 rounded-full hover:bg-accent hover:text-black transition-all duration-300">
          <Linkedin size={20} className="sm:w-6 sm:h-6" />
        </a>
      </motion.div>
    </section>
  );
}
