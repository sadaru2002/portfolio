'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Marquee } from './ui/Marquee';

interface TechIcon {
    name: string;
    icon: string;
    color: string;
}

// Dock icons (main ones)
const dockIcons: TechIcon[] = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#ffffff' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', color: '#FF9900' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
];

// Extended tech stack for marquee rows
const marqueeRow1: TechIcon[] = [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#4FC08D' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', color: '#764ABC' },
    { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#E10098' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', color: '#ffffff' },
    { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', color: '#CC6699' },
    { name: 'Webpack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg', color: '#8DD6F9' },
];

const marqueeRow2: TechIcon[] = [
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#FCC624' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#DC382D' },
    { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', color: '#009639' },
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', color: '#C21325' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#ffffff' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007ACC' },
    { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', color: '#4EAA25' },
    { name: 'npm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', color: '#CB3837' },
    { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', color: '#2D3748' },
];

const TechCard = ({ tech }: { tech: TechIcon }) => (
    <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shrink-0"
        style={{
            background: 'rgba(10, 15, 30, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
    >
        <Image
            src={tech.icon}
            alt={tech.name}
            width={22}
            height={22}
            className="pointer-events-none"
            unoptimized
        />
        <span className="text-sm text-white/90 font-medium whitespace-nowrap">{tech.name}</span>
    </div>
);

export default function TechStack() {
    const [mouseX, setMouseX] = useState<number | null>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dockRef.current) {
            const rect = dockRef.current.getBoundingClientRect();
            setMouseX(e.clientX - rect.left);
        }
    };

    const handleMouseLeave = () => {
        setMouseX(null);
    };

    const getIconStyle = (index: number) => {
        if (mouseX === null) {
            return { transform: 'scale(1) translateY(0)', margin: '0 4px' };
        }

        const iconWidth = 56;
        const iconCenter = index * iconWidth + iconWidth / 2;
        const distance = Math.abs(mouseX - iconCenter);
        const maxDistance = 120;

        if (distance > maxDistance) {
            return { transform: 'scale(1) translateY(0)', margin: '0 4px' };
        }

        const scale = 1 + (1 - distance / maxDistance) * 0.6;
        const translateY = -(1 - distance / maxDistance) * 16;
        const marginX = 4 + (1 - distance / maxDistance) * 10;

        return {
            transform: `scale(${scale}) translateY(${translateY}px)`,
            margin: `0 ${marginX}px`
        };
    };

    return (
        <section className="py-20 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h4 className="text-cyan-400 font-bold tracking-widest mb-4 uppercase text-sm">
                        My Skills
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        The Secret{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Sauce
                        </span>
                    </h2>
                </motion.div>

                {/* Main Dock */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-14"
                >
                    <div
                        ref={dockRef}
                        className="inline-flex items-end rounded-[2rem] px-4 py-3"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: `
                inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 1.5px 2px 0px -1px rgba(255, 255, 255, 0.15),
                0px 10px 40px rgba(0, 0, 0, 0.4)
              `
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {dockIcons.map((tech, index) => {
                            const style = getIconStyle(index);
                            return (
                                <div
                                    key={tech.name}
                                    className="relative flex flex-col items-center cursor-pointer group"
                                    style={{
                                        margin: style.margin,
                                        transition: 'margin 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
                                    }}
                                >
                                    {/* Tooltip */}
                                    <div
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-20"
                                        style={{ transition: 'opacity 0.15s ease' }}
                                    >
                                        <div
                                            className="px-3 py-1.5 rounded-md text-xs font-medium text-white whitespace-nowrap"
                                            style={{
                                                background: 'rgba(20, 20, 20, 0.95)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                            }}
                                        >
                                            {tech.name}
                                        </div>
                                        <div
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
                                            style={{
                                                background: 'rgba(20, 20, 20, 0.95)',
                                                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                            }}
                                        />
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{
                                            transform: style.transform,
                                            transformOrigin: 'bottom center',
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            transition: 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s ease',
                                        }}
                                    >
                                        <Image
                                            src={tech.icon}
                                            alt={tech.name}
                                            width={28}
                                            height={28}
                                            className="pointer-events-none"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Infinite Marquee Rows - Full Width */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
            >
                {/* First row */}
                <div className="mb-4">
                    <Marquee pauseOnHover duration="40s">
                        {marqueeRow1.map((tech) => (
                            <TechCard key={tech.name} tech={tech} />
                        ))}
                    </Marquee>
                </div>

                {/* Second row */}
                <div>
                    <Marquee reverse pauseOnHover duration="45s">
                        {marqueeRow2.map((tech) => (
                            <TechCard key={tech.name} tech={tech} />
                        ))}
                    </Marquee>
                </div>

                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10" />
            </motion.div>

            {/* Skills tags */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mt-14 px-6"
            >
                {['AI/ML', 'Cloud Architecture', 'DevOps', 'UI/UX Design', 'System Design'].map((skill) => (
                    <span
                        key={skill}
                        className="px-4 py-2 rounded-full text-sm text-white/60 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                    >
                        {skill}
                    </span>
                ))}
            </motion.div>
        </section>
    );
}
