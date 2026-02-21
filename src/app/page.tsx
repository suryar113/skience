'use client';

/**
 * @fileoverview Landing page for Skience.
 * 
 * Features:
 * - Animated background blobs for a depth effect.
 * - Rainbow gradient headline with 'tracking-wide' for a modern aesthetic.
 * - Call-to-action button linking to the Biology page.
 * 
 * Logic:
 * Uses Framer Motion for entry animations and custom CSS for rainbow effects.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative overflow-hidden">
      {/* Visual background decorative elements - Ambient Blobs */}
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:4s]"></div>

      <SiteHeader />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6"
      >
        {/* 
            Main Headline
            - tracking-wide: adds the requested letter spacing for a modern look.
            - text-gradient-rainbow: custom utility class from globals.css.
        */}
        <h2 
          className="text-5xl md:text-7xl font-bold mb-8 text-gradient-rainbow font-headline tracking-wide" 
          data-text="Welcome to Skience"
        >
          Welcome to Skience
        </h2>
        
        {/* Call to action button with glassmorphism effects */}
        <Button size="lg" asChild variant="outline" className="bg-background/40 backdrop-blur-md hover:bg-accent btn-hover-pop group relative text-xl px-10 py-8 rounded-3xl border-white/10">
            <Link href="/biology">Explore Biology Notes</Link>
        </Button>
      </motion.main>
    </div>
  );
}
