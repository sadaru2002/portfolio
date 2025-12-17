'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-20 relative z-10 overflow-hidden">
      {/* Dark backdrop for About section - makes text clearly visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(2,4,16,0.92) 0%, rgba(2,4,16,0.88) 50%, rgba(2,4,16,0.92) 100%)',
          /* Removed backdrop blur for better scroll performance - using solid gradient instead */
        }}
      />

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-[2]">

        {/* Left Side - Profile Image with Liquid Glass Effect */}
        <motion.div
          style={{ y, rotate }}
          className="w-full md:w-1/2 relative perspective-1000"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-md"
          >
            {/* Liquid Glass Container */}
            <div className="relative z-10 group">
              {/* Animated Liquid Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-purple-500 to-accent rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-blob" />

              {/* Glass Card */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10" />

                <Image
                  src="/profile.png"
                  alt="Thilina Sandaruwan"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Glass Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 z-30 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-white/80">OPEN TO WORK</span>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-10 -right-10 w-32 h-32 border border-accent/20 rounded-full border-dashed z-0"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-10 -left-10 w-48 h-48 border border-purple-500/20 rounded-full border-dashed z-0"
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-accent" />
            <h4 className="text-accent font-bold tracking-widest uppercase text-sm">The Developer</h4>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Me.</span>
          </h2>

          <h3 className="text-2xl font-medium mb-6 text-gray-200">I&apos;m Thilina Sandaruwan.</h3>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I am a <span className="text-white font-medium">developer</span> by trade and an <span className="text-white font-medium">innovative thinker</span> by nature. For me, code isn&apos;t just about syntax — it&apos;s about solving problems with a creative mind.
            </p>
            <p>
              I don&apos;t believe in staying static; I am driven by a relentless curiosity to learn new things and constantly expand my frame of knowledge. I build digital experiences where <span className="text-white font-medium">technical logic</span> meets <span className="text-white font-medium">creative exploration</span>.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:lakmalsadaruwan411@gmail.com"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2 group-hover:text-black transition-colors">
                <Mail size={20} />
                Contact Me
              </span>
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              className="group px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-all flex items-center gap-2"
            >
              Download CV
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* CSS for the blob animation */}

    </section>
  );
}
