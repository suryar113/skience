"use client";

/**
 * @fileoverview Enhanced Unified 3D SphereCarousel Component
 * 
 * Features:
 * - Glassy black styling for cards.
 * - HUD-inspired focused card with scanlines and glow.
 * - Optimized glow boundaries to fit the card shape vertically.
 * - Vibrant rainbow gradient with motion-driven pulsing.
 * - Dynamic radius calculation responsive to all screen sizes.
 * - Throttled keyboard controls (WASD + Arrows).
 */

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QuizletModal } from "./quizlet-modal";

type Note = {
  topic: string;
  notesUrl: string;
  pagePath: string;
  pdfUrl: string;
  quizletSetId: string;
};

type NoteCardProps = {
  note: Note;
  isFocused: boolean;
  onQuizletClick: (quizletSetId: string) => void;
  onRotateClick?: () => void;
};

function NoteCard({ note, isFocused, onQuizletClick, onRotateClick }: NoteCardProps) {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    // Glow appears immediately when focused as requested
    setShowGlow(isFocused);
  }, [isFocused]);

  return (
    <div className="relative w-full h-full group">
      {/* HUD Glow for focused card - Softened ellipse edges for organic feel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showGlow ? {
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.03, 1],
        } : { opacity: 0 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "absolute -inset-y-16 -inset-x-8 z-0 pointer-events-none animated-glowing-border blur-[100px]",
          "rounded-[3rem]",
          !isFocused && "hidden"
        )}
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)'
        }}
      />
      
      <Card
        className={cn(
          "w-full h-full rounded-[2rem] relative z-10 flex flex-col justify-between transition-all duration-500 overflow-hidden border-white/5",
          isFocused 
            ? "bg-black/50 backdrop-blur-3xl border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]" 
            : "bg-black/80 backdrop-blur-md opacity-40 group-hover:opacity-100"
        )}
      >
        {/* Subtle Scanline Texture for focused HUD effect */}
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20"></div>
        )}

        {/* Clickable overlay to rotate to this card if not focused */}
        {!isFocused && onRotateClick && (
          <div 
            className="absolute inset-0 z-[100] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRotateClick();
            }}
          />
        )}

        <CardHeader className="flex flex-col items-center text-center p-6 pb-2">
          <CardTitle 
            className={cn(
              "uppercase font-headline transition-all duration-500 leading-tight text-center tracking-wider",
              isFocused 
                ? "text-2xl md:text-3xl text-foreground drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]" 
                : "text-lg md:text-xl text-muted-foreground/50"
            )}
          >
            {note.topic}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-3 px-6 md:px-10 pb-8">
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "w-full h-11 btn-hover-pop bg-white/5 border-white/10 hover:bg-white/10 rounded-2xl transition-all font-body tracking-wide group",
              !isFocused && "pointer-events-none opacity-50"
            )}
          >
            {note.pagePath ? (
              <Link href={note.pagePath} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                 <span>VIEW NOTES</span>
              </Link>
            ) : (
              <span className="opacity-50">VIEW NOTES</span>
            )}
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "w-full h-11 btn-hover-pop bg-white/5 border-white/10 hover:bg-white/10 rounded-2xl transition-all font-body tracking-wide group",
              !isFocused && "pointer-events-none opacity-50"
            )}
          >
            {note.pdfUrl ? (
              <Link href={note.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                 <span>PDF LINK</span>
              </Link>
            ) : (
              <span className="opacity-50">PDF LINK</span>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full h-11 btn-hover-pop bg-white/5 border-white/10 hover:bg-white/10 rounded-2xl transition-all font-body tracking-wide group",
              !isFocused && "pointer-events-none opacity-50"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onQuizletClick(note.quizletSetId);
            }}
            disabled={!note.quizletSetId}
          >
            <span>QUIZLET</span>
          </Button>
        </CardContent>
        <CardFooter className="h-4"></CardFooter>
      </Card>
    </div>
  );
}

export function SphereCarousel({ notes, onTopicChange }: { notes: any[], onTopicChange: (topic: string) => void }) {
  const [index, setIndex] = useState(0);
  const [isQuizletModalOpen, setIsQuizletModalOpen] = useState(false);
  const [selectedQuizletSetId, setSelectedQuizletSetId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  const lastRotationTime = useRef(0);
  const ROTATION_COOLDOWN = 350;

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== 'undefined') {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const handleQuizletOpen = (quizletSetId: string) => {
    setSelectedQuizletSetId(quizletSetId);
    setIsQuizletModalOpen(true);
  };

  const totalPanels = notes.length;
  const panelAngle = 360 / totalPanels;

  const radius = useMemo(() => {
    if (typeof window === 'undefined' || windowDimensions.width === 0) return 400;
    const { width, height } = windowDimensions;
    const baseSize = Math.min(width, height);
    const isMobile = width < 768;
    const multiplier = isMobile ? 0.85 : 0.6;
    const minRadius = isMobile ? 300 : 500;
    return Math.max(minRadius, baseSize * multiplier);
  }, [windowDimensions]);

  const rotationY = useMotionValue(0);
  const springyRotationY = useSpring(rotationY, { stiffness: 150, damping: 40 });

  useEffect(() => {
    if (notes[index]) onTopicChange(notes[index].topic);
  }, [index, notes, onTopicChange]);

  useEffect(() => {
    if (!hasMounted) return;
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasMounted]);

  const handleRotateTo = useCallback((newIndex: number) => {
    const currentIndex = index;
    if (newIndex === currentIndex) return;
    
    let diff = newIndex - currentIndex;
    if (Math.abs(diff) > totalPanels / 2) {
      if (diff > 0) diff -= totalPanels;
      else diff += totalPanels;
    }
    
    setIndex(newIndex);
    rotationY.set(rotationY.get() - diff * panelAngle);
  }, [index, rotationY, totalPanels, panelAngle]);

  const handlePrev = useCallback(() => {
    const now = Date.now();
    if (now - lastRotationTime.current < ROTATION_COOLDOWN) return;
    lastRotationTime.current = now;
    handleRotateTo((index - 1 + totalPanels) % totalPanels);
  }, [index, totalPanels, handleRotateTo]);

  const handleNext = useCallback(() => {
    const now = Date.now();
    if (now - lastRotationTime.current < ROTATION_COOLDOWN) return;
    lastRotationTime.current = now;
    handleRotateTo((index + 1) % totalPanels);
  }, [index, totalPanels, handleRotateTo]);

  useEffect(() => {
    if (!hasMounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "arrowleft" || key === "a" || key === "s") handlePrev();
      else if (key === "arrowright" || key === "w" || key === "d") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, hasMounted]);

  if (!hasMounted) return null;

  return (
    <>
      <div className="w-full flex-1 flex flex-col items-center justify-center h-full relative">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible" style={{ perspective: "3000px" }}>
          <motion.div
            className="w-full h-full absolute flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", rotateY: springyRotationY }}
          >
            {notes.map((note, i) => {
              const isFocused = i === index;
              return (
                <motion.div
                  key={note.topic}
                  className="absolute w-[240px] h-[360px] md:w-[300px] h-[440px] p-2 md:p-4"
                  style={{
                    transform: `rotateY(${i * panelAngle}deg) translateZ(${radius}px)`,
                    zIndex: isFocused ? 50 : 1,
                  }}
                >
                  <NoteCard 
                    note={note} 
                    isFocused={isFocused} 
                    onQuizletClick={handleQuizletOpen} 
                    onRotateClick={() => handleRotateTo(i)} 
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 flex items-center justify-center z-[60] pointer-events-none">
          <Button variant="ghost" size="icon" onClick={handlePrev} className="pointer-events-auto h-14 w-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/20 shadow-xl transition-all active:scale-90">
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 flex items-center justify-center z-[60] pointer-events-none">
          <Button variant="ghost" size="icon" onClick={handleNext} className="pointer-events-auto h-14 w-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/20 shadow-xl transition-all active:scale-90">
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <QuizletModal isOpen={isQuizletModalOpen} onOpenChange={setIsQuizletModalOpen} quizletSetId={selectedQuizletSetId} />
    </>
  );
}
