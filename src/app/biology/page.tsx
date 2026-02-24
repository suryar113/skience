'use client';

/**
 * @fileoverview Biology Notes Main Selection Page.
 * 
 * Displays the 3D SphereCarousel in an immersive scientific atmosphere.
 */

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { motion } from 'framer-motion';
import { notes } from '@/lib/notes-data';
import { Microscope, Atom, Dna } from 'lucide-react';

export default function BiologyPage() {
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);

  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="flex flex-col min-h-screen h-screen bg-background text-foreground select-none relative overflow-hidden">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none"></div>
      
      {/* Ambient Blobs */}
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-blob [animation-delay:4s]"></div>
      
      {/* Floating Bio-Particles for Depth */}
      <motion.div animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-10 text-purple-400/10 pointer-events-none"><Atom size={80} /></motion.div>
      <motion.div animate={{ y: [0, 20, 0], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-20 text-blue-400/10 pointer-events-none"><Dna size={120} /></motion.div>
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute top-1/2 right-1/3 text-pink-400/10 pointer-events-none"><Microscope size={60} /></motion.div>

      <SiteHeader />

      <motion.main
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 h-full overflow-hidden relative z-10"
      >
        <SphereCarousel notes={notes} onTopicChange={handleTopicChange} />
      </motion.main>
    </div>
  );
}
