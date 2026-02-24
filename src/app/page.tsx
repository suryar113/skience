'use client';

/**
 * @fileoverview Enhanced Landing page for Skience.
 * 
 * Features:
 * - Animated background blobs with an added Tech-Grid layer.
 * - Floating Bio-Particles for atmospheric depth.
 * - Rainbow gradient headline with tracking and drop-shadows.
 * - Glassmorphic Call-to-action button with custom 21px radius.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { motion } from 'framer-motion';
import { Microscope, Atom, Dna } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative overflow-hidden">
      {/* Visual background decorative elements */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none"></div>
      
      {/* Ambient Blobs */}
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-blob [animation-delay:4s]"></div>

      {/* Floating Bio-Particles */}
      <motion.div animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-10 text-purple-400/20"><Atom size={120} /></motion.div>
      <motion.div animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-20 text-blue-400/20"><Dna size={160} /></motion.div>
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute top-1/2 right-1/3 text-pink-400/20"><Microscope size={100} /></motion.div>

      <SiteHeader />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6 relative z-10"
      >
        <h2 
          className="text-6xl md:text-8xl font-bold mb-8 text-gradient-rainbow font-headline tracking-wide drop-shadow-2xl" 
        >
          Welcome to Skience
        </h2>
        
        <p className="max-w-2xl text-muted-foreground text-lg mb-10 font-body leading-relaxed">
          An interactive website for modern science notes. 
          Explore, visualize, and master biology through an immersive experience.
        </p>
        
        <Button size="lg" asChild variant="outline" className="bg-white/5 backdrop-blur-xl hover:bg-white/10 btn-hover-pop group relative text-xl px-12 py-8 rounded-[21px] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
            <Link href="/biology" className="flex items-center gap-3">
              <span>Explore Biology</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </Link>
        </Button>
      </motion.main>
    </div>
  );
}
