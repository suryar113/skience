'use client';

/**
 * @fileoverview Biology Notes Main Selection Page.
 * 
 * Displays the 3D SphereCarousel where users can browse topics.
 * 
 * Logic:
 * - Manages the 'currentTopic' state based on carousel selection.
 * - Ensures the layout allows the carousel to fill the vertical length of the screen.
 */

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { motion } from 'framer-motion';
import { notes } from '@/lib/notes-data';

export default function BiologyPage() {
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);

  /**
   * Update current topic when the carousel rotates to a new card.
   * This can be used for contextual headers or background changes.
   */
  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="flex flex-col min-h-screen h-screen bg-background text-foreground select-none relative overflow-hidden">
      {/* Ambient background animations for a biological/scientific feel */}
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:4s]"></div>
      
      <SiteHeader />

      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 h-full overflow-hidden"
      >
        {/* 
            The SphereCarousel 
            - Now width and height aware.
            - Spacing scales dynamically with the screen dimensions.
        */}
        <SphereCarousel notes={notes} onTopicChange={handleTopicChange} />
      </motion.main>
    </div>
  );
}
