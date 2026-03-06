'use client';

/**
 * @fileoverview Biology Notes Main Selection Page with View Toggle.
 * 
 * Displays the 3D SphereCarousel or a minimalist Table View.
 */

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { motion, AnimatePresence } from 'framer-motion';
import { notes } from '@/lib/notes-data';
import { Microscope, Atom, Dna, LayoutGrid, TableProperties, ExternalLink, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { QuizletModal } from '@/components/quizlet-modal';

export default function BiologyPage() {
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);
  const [viewMode, setViewMode] = useState<'carousel' | 'table'>('carousel');
  const [isQuizletModalOpen, setIsQuizletModalOpen] = useState(false);
  const [selectedQuizletSetId, setSelectedQuizletSetId] = useState<string | null>(null);

  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  const handleOpenQuizlet = (setId: string) => {
    setSelectedQuizletSetId(setId);
    setIsQuizletModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground select-none relative overflow-hidden">
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

      {/* View Toggle Button */}
      <div className="relative z-20 flex justify-center py-4 px-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setViewMode(viewMode === 'carousel' ? 'table' : 'carousel')}
          className="bg-black/40 backdrop-blur-xl border-white/10 rounded-full px-6 py-5 hover:bg-white/10 transition-all duration-300 group"
        >
          {viewMode === 'carousel' ? (
            <div className="flex items-center gap-3">
              <TableProperties className="w-4 h-4 text-blue-400" />
              <span className="font-headline tracking-widest text-sm">SWITCH TO TABLE VIEW</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-4 h-4 text-purple-400" />
              <span className="font-headline tracking-widest text-sm">SWITCH TO CAROUSEL</span>
            </div>
          )}
        </Button>
      </div>

      <motion.main
        initial={false}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10 overflow-hidden mb-12"
      >
        <AnimatePresence mode="wait">
          {viewMode === 'carousel' ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <SphereCarousel notes={notes} onTopicChange={handleTopicChange} />
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-5xl mx-auto h-full flex flex-col"
            >
              <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(122,0,255,0.15)] flex-1 flex flex-col relative">
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
                  <Table className="w-full border-separate border-spacing-0">
                    <TableHeader className="sticky top-0 z-[100] bg-black">
                      <TableRow className="hover:bg-transparent border-white/10">
                        <TableHead className="py-6 text-lg font-headline tracking-[0.2em] text-muted-foreground pl-8 bg-black">TOPIC</TableHead>
                        <TableHead className="py-6 w-32 text-lg font-headline tracking-[0.2em] text-muted-foreground text-center bg-black">NOTES</TableHead>
                        <TableHead className="py-6 w-32 text-lg font-headline tracking-[0.2em] text-muted-foreground text-center bg-black">PDF</TableHead>
                        <TableHead className="py-6 w-32 text-lg font-headline tracking-[0.2em] text-muted-foreground text-center pr-8 bg-black">QUIZLET</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notes.map((note) => (
                        <TableRow 
                          key={note.topic} 
                          className="hover-rainbow-row border-white/5 transition-all group relative"
                        >
                          <TableCell className="py-5 pl-8">
                            <span className="font-headline text-lg tracking-wider text-foreground transition-colors group-hover:text-white drop-shadow-sm">
                              {note.topic}
                            </span>
                          </TableCell>
                          <TableCell className="text-center w-32">
                            <Button asChild variant="ghost" className="h-10 w-10 p-0 hover:bg-purple-500/20 text-muted-foreground hover:text-purple-400 rounded-xl transition-all">
                              <Link href={note.pagePath} target="_blank">
                                <ExternalLink className="w-5 h-5" />
                              </Link>
                            </Button>
                          </TableCell>
                          <TableCell className="text-center w-32">
                            <Button asChild variant="ghost" className="h-10 w-10 p-0 hover:bg-blue-500/20 text-muted-foreground hover:text-blue-400 rounded-xl transition-all">
                              <Link href={note.pdfUrl} target="_blank">
                                <FileText className="w-5 h-5" />
                              </Link>
                            </Button>
                          </TableCell>
                          <TableCell className="text-center w-32 pr-8">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenQuizlet(note.quizletSetId)}
                              disabled={!note.quizletSetId}
                              className="h-10 w-10 p-0 hover:bg-yellow-500/20 text-muted-foreground hover:text-yellow-400 rounded-xl transition-all"
                            >
                              <GraduationCap className="w-5 h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <QuizletModal 
        isOpen={isQuizletModalOpen} 
        onOpenChange={setIsQuizletModalOpen} 
        quizletSetId={selectedQuizletSetId} 
      />
    </div>
  );
}
