'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Microscope, Atom, Dna } from 'lucide-react';

/**
 * Interactive Hero Section with Mouse Parallax.
 * Isolated to a client component to allow the parent page to be a Server Component.
 */

export function HeroClient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const titleX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const titleY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const textX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const textY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const buttonX = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const buttonY = useTransform(springY, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const xPct = (e.clientX / innerWidth) - 0.5;
    const yPct = (e.clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full flex flex-col items-center justify-center"
    >
      {/* Floating Bio-Particles */}
      <motion.div animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-0 left-[-10%] text-purple-400/20 pointer-events-none"><Atom size={120} /></motion.div>
      <motion.div animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute bottom-0 right-[-10%] text-blue-400/20 pointer-events-none"><Dna size={160} /></motion.div>
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute top-1/2 right-[10%] text-pink-400/20 pointer-events-none"><Microscope size={100} /></motion.div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.h2 
          style={{ x: titleX, y: titleY, translateZ: 50 }}
          className="text-5xl md:text-8xl font-bold mb-8 text-gradient-rainbow font-headline tracking-wide drop-shadow-2xl" 
        >
          Welcome to Skience
        </motion.h2>
        
        <motion.p 
          style={{ x: textX, y: textY, translateZ: 30 }}
          className="max-w-2xl text-muted-foreground text-lg mb-10 font-body leading-relaxed px-4"
        >
          An interactive website for modern science notes. 
          Explore, visualize, and master biology through an immersive experience.
        </motion.p>
        
        <motion.div
          style={{ x: buttonX, y: buttonY, translateZ: 20 }}
        >
          <Button size="lg" asChild variant="outline" className="bg-white/5 backdrop-blur-xl hover:bg-white/10 btn-hover-pop group relative text-xl px-12 py-8 rounded-[21px] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 font-body">
              <Link href="/biology" className="flex items-center gap-3">
                <span>Explore Biology</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
