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
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative">
      <SiteHeader />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden"
      >
        <SphereCarousel notes={notes} onTopicChange={handleTopicChange} />
      </motion.main>
      
      <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow" data-text="you better study">you better study</p>
      </footer>
    </div>
  );
}
