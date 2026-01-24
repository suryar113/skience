'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative overflow-hidden">
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500/20 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full filter blur-3xl opacity-60 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500/20 rounded-full filter blur-3xl opacity-60 animate-blob [animation-delay:4s]"></div>

      <SiteHeader />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-rainbow" data-text="Welcome to Skience">Welcome to Skience</h2>
        <Button size="lg" asChild variant="outline" className="bg-background hover:bg-accent btn-hover-pop group relative">
            <Link href="/biology">Explore Biology Notes</Link>
        </Button>
      </motion.main>

      <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow" data-text="you better study">you better study</p>
      </footer>
    </div>
  );
}
