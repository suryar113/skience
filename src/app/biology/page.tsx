'use client';

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { motion } from 'framer-motion';
import { notes } from '@/lib/notes-data';
import { StudyBuddy } from '@/components/study-buddy';

export default function BiologyPage() {
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);
  const [isStudyBuddyOpen, setIsStudyBuddyOpen] = useState(false);

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

      <div className="fixed bottom-6 right-6 z-50">
        <StudyBuddy 
          topic={currentTopic}
          isOpen={isStudyBuddyOpen} 
          onOpenChange={setIsStudyBuddyOpen} 
        />
        {!isStudyBuddyOpen && (
          <button
            onClick={() => setIsStudyBuddyOpen(true)}
            className="w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}
