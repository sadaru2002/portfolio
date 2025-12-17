'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
    const handleClick = () => {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
                opacity: 1, 
                y: 0
            }}
            transition={{ 
                opacity: { duration: 0.8, delay: 0.5 },
                y: { duration: 0.8, delay: 0.5 }
            }}
            whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
            }}
            className="hidden sm:block absolute top-6 left-12 md:left-20 z-[100] cursor-pointer"
            onClick={handleClick}
        >
            <motion.div
                animate={{
                    y: [0, -5, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image
                    src="/LOGO.png"
                    alt="Logo"
                    width={76}
                    height={76}
                    priority
                />
            </motion.div>
        </motion.div>
    );
}
