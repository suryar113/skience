'use client';

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { motion } from 'framer-motion';
import { notes } from '@/lib/notes-data';

export default function BiologyPage() {
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);

  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative overflow-hidden">
      <div className="absolute top-0 -left-1/4 w-[32rem] h-[32rem] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-[32rem] h-[32rem] bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob [animation-delay:4s]"></div>
      
      <SiteHeader />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-6"
      >
        <SphereCarousel notes={notes} onTopicChange={handleTopicChange} />
      </motion.main>
      
      {/* <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow" data-text="you better study">you better study</p>
      </footer> */}
    </div>
  );
}
