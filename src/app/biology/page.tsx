'use client';

/**
 * @fileoverview Biology Notes Main Selection Page.
 * 
 * Displays the 3D SphereCarousel where users can browse different biology topics.
 * Includes global background animations to maintain a consistent theme.
 * 
 * Logic:
 * - Manages the 'currentTopic' state based on carousel rotation.
 * - Renders visual depth elements (animated blobs) to match the landing page.
 */

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { motion } from 'framer-motion';
import { notes } from '@/lib/notes-data';

export default function BiologyPage() {
  // Local state to track which topic is currently centered in the carousel
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);

  /**
   * Callback function passed to the SphereCarousel to update the header
   * when the user rotates the sphere.
   */
  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative overflow-hidden">
      {/* Background Blobs for depth and visual interest */}
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:4s]"></div>
      
      <SiteHeader />

      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-6"
      >
        {/* 
            The 3D Sphere Carousel Component
            Provides the core interactive experience for selecting biology notes.
        */}
        <SphereCarousel notes={notes} onTopicChange={handleTopicChange} />
      </motion.main>
    </div>
  );
}
