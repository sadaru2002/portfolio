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
        <section id="skills" className="py-12 sm:py-20 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-14"
                >
                    <h4 className="text-cyan-400 font-bold tracking-widest mb-3 sm:mb-4 uppercase text-xs sm:text-sm">
                        My Skills
                    </h4>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
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
                    className="flex justify-center mb-8 sm:mb-14 overflow-x-auto scrollbar-hide px-2"
                >
                    <div
                        ref={dockRef}
                        className="inline-flex items-end rounded-2xl sm:rounded-[2rem] px-2 sm:px-4 py-2 sm:py-3"
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
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
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
                                            width={24}
                                            height={24}
                                            className="pointer-events-none w-5 h-5 sm:w-7 sm:h-7"
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
                    <Marquee pauseOnHover speed={35}>
                        {marqueeRow1.map((tech) => (
                            <TechCard key={tech.name} tech={tech} />
                        ))}
                    </Marquee>
                </div>

                {/* Second row */}
                <div>
                    <Marquee reverse pauseOnHover speed={40}>
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
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-14 px-4 sm:px-6"
            >
                {['AI/ML', 'Cloud Architecture', 'DevOps', 'UI/UX Design', 'System Design'].map((skill) => (
                    <span
                        key={skill}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-white/60 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                    >
                        {skill}
                    </span>
                ))}
            </motion.div>

            {/* Professional Certifications Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-14 sm:mt-20 max-w-6xl mx-auto"
            >
                <div className="text-center mb-6 sm:mb-10">
                    <span
                        className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider mb-3 sm:mb-4"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            color: '#00f0ff'
                        }}
                    >
                        ✦ Verified Credentials
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Professional{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Certifications
                        </span>
                    </h3>
                </div>

                <div className="relative">
                    {/* Cinematic Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-10 w-32 z-20 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.8) 30%, transparent 100%)' }}
                    />
                    <div className="absolute right-0 top-0 bottom-10 w-32 z-20 pointer-events-none"
                        style={{ background: 'linear-gradient(270deg, #000000 0%, rgba(0,0,0,0.8) 30%, transparent 100%)' }}
                    />

                    {/* Horizontal Scroll Container */}
                    <div
                        className="flex gap-8 overflow-x-auto pb-10 px-8 cert-scroll-container"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {[
                            { title: "Back-End Apps with Node.js & Express", issuer: "IBM", color: "#00f0ff", href: "https://www.coursera.org/account/accomplishments/records/37MN17QKX34E", img: "/cert-1.png" },
                            { title: "Developing Front-End Apps with React", issuer: "IBM", color: "#8b5cf6", href: "https://www.coursera.org/account/accomplishments/records/BXB9N2XQMXZ3", img: "/cert-2.png" },
                            { title: "Machine Learning with Python", issuer: "IBM", color: "#ec4899", href: "https://www.coursera.org/account/accomplishments/records/BN5J3LCJ6WED", img: "/cert-3.png" },
                            { title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle", color: "#fb923c", href: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=3F67FB56DBCB9318F975F2D70147FCA29CEF643E1309DC12B45600FEB27F33F5", img: "/cert-4.png" },
                            { title: "AWS Cloud Technical Essentials", issuer: "AWS", color: "#00e800", href: "https://www.coursera.org/account/accomplishments/records/7BL4KITYIBMJ", img: "/cert-5.png" }
                        ].map((cert, i) => (
                            <motion.a
                                key={i}
                                href={cert.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -16, scale: 1.04, rotateY: 5 }}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer flex-shrink-0"
                                style={{
                                    width: '340px',
                                    background: 'linear-gradient(160deg, rgba(15, 25, 45, 0.95) 0%, rgba(5, 10, 25, 0.98) 100%)',
                                    border: `2px solid transparent`,
                                    backgroundClip: 'padding-box',
                                    boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 2px ${cert.color}22, inset 0 1px 0 rgba(255,255,255,0.05)`
                                }}
                            >
                                {/* Animated Border Gradient */}
                                <div className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                                    style={{
                                        background: `linear-gradient(135deg, ${cert.color}, transparent 50%, ${cert.color})`,
                                        filter: 'blur(1px)'
                                    }}
                                />

                                {/* Glow Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                                    style={{
                                        background: `radial-gradient(ellipse at 50% -20%, ${cert.color}40, transparent 60%)`,
                                        filter: 'blur(20px)'
                                    }}
                                />

                                {/* Certificate Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image src={cert.img} alt={cert.title} fill className="object-cover object-top group-hover:scale-115 transition-transform duration-1000 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                    {/* Premium Floating Badge */}
                                    <motion.div
                                        className="absolute top-4 right-4 px-5 py-2.5 rounded-full text-xs font-bold"
                                        whileHover={{ scale: 1.1 }}
                                        style={{
                                            background: `linear-gradient(135deg, ${cert.color}50, ${cert.color}20)`,
                                            color: cert.color,
                                            border: `2px solid ${cert.color}`,
                                            boxShadow: `0 0 30px ${cert.color}60, inset 0 0 20px ${cert.color}20`,
                                            backdropFilter: 'blur(10px)'
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: cert.color }} />
                                            {cert.issuer}
                                        </span>
                                    </motion.div>

                                    {/* Floating Particles */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 overflow-hidden">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className="absolute w-1 h-1 rounded-full animate-float"
                                                style={{
                                                    background: cert.color,
                                                    left: `${20 + j * 15}%`,
                                                    top: `${30 + j * 10}%`,
                                                    animationDelay: `${j * 0.2}s`,
                                                    boxShadow: `0 0 10px ${cert.color}`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative">
                                    <h5 className="text-white font-bold text-lg leading-tight mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                                        {cert.title}
                                    </h5>
                                    <div className="flex items-center gap-3 text-white/60 text-sm">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                                            style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
                                            <svg className="w-4 h-4" style={{ color: cert.color }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">Verified</span>
                                        </div>
                                        <span className="text-xs text-white/30">•</span>
                                        <span className="text-xs text-white/40">Click to view</span>
                                    </div>
                                </div>

                                {/* Bottom Accent Glow Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                                        boxShadow: `0 0 20px ${cert.color}, 0 0 40px ${cert.color}50`
                                    }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Floating Scroll Hint Arrow */}
                    <motion.div
                        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="flex items-center gap-2 px-4 py-3 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(139,92,246,0.15))',
                                border: '1px solid rgba(0,240,255,0.3)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <span className="text-cyan-400 text-xs font-medium">Scroll</span>
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
