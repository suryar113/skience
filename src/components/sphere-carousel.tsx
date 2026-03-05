"use client";

/**
 * @fileoverview Refined Unified 3D SphereCarousel Component
 * 
 * Features:
 * - Compact Card Dimensions: Optimized for shorter viewports and minimalist feel.
 * - Pure HUD Brackets: L-shaped corners using drop-shadows to avoid square highlights.
 * - Standardized Sizing: 240x340 desktop / 200x280 mobile.
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
  return (
    <div className="relative w-full h-full group overflow-visible">
      {/* HUD Brackets - Pure L-shapes with targeted drop-shadows */}
      {isFocused && (
        <div className="absolute -inset-6 z-[60] pointer-events-none overflow-visible">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white rounded-tl-xl" 
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white rounded-tr-xl" 
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-xl" 
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white rounded-br-xl" 
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }}
          />
        </div>
      )}

      <Card
        className={cn(
          "w-full h-full rounded-[2rem] relative z-10 flex flex-col justify-between transition-all duration-500 overflow-hidden border-white/5",
          isFocused 
            ? "bg-black/50 backdrop-blur-3xl border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]" 
            : "bg-black/80 backdrop-blur-md opacity-30 group-hover:opacity-100"
        )}
      >
        {/* Holographic Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isFocused ? {
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          } : { opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={cn(
            "absolute inset-2 z-0 pointer-events-none animated-glowing-border blur-[60px]",
            !isFocused && "hidden"
          )}
          style={{
            maskImage: 'radial-gradient(ellipse 85% 95% at center, black 0%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 95% at center, black 0%, transparent 95%)'
          }}
        />

        {/* HUD Scanline Texture */}
        {isFocused && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px] z-20"></div>
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

        <CardHeader className="flex flex-col items-center text-center p-4 pb-2 relative z-30">
          <CardTitle 
            className={cn(
              "uppercase font-headline transition-all duration-500 leading-tight text-center tracking-wider",
              isFocused 
                ? "text-lg md:text-xl text-foreground drop-shadow-[0_4px_20px_rgba(255,255,255,0.4)]" 
                : "text-base text-muted-foreground/40"
            )}
          >
            {note.topic}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-2.5 px-6 pb-4 relative z-30">
          <Button
            asChild
            variant="outline"
            className={cn(
              "w-full h-11 btn-hover-pop bg-white/5 border-white/10 hover:bg-white/10 rounded-xl transition-all font-body tracking-widest text-[11px]",
              !isFocused && "pointer-events-none opacity-50"
            )}
          >
            {note.pagePath ? (
              <Link href={note.pagePath} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                 VIEW NOTES
              </Link>
            ) : (
              <span className="opacity-50">VIEW NOTES</span>
            )}
          </Button>

          <Button
            asChild
            variant="outline"
            className={cn(
              "w-full h-11 btn-hover-pop bg-white/5 border-white/10 hover:bg-white/10 rounded-xl transition-all font-body tracking-widest text-[11px]",
              !isFocused && "pointer-events-none opacity-50"
            )}
          >
            {note.pdfUrl ? (
              <Link href={note.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                 PDF LINK
              </Link>
            ) : (
              <span className="opacity-50">PDF LINK</span>
            )}
          </Button>

          <Button
            variant="outline"
            className={cn(
              "w-full h-11 btn-hover-pop bg-white/5 border-white/10 hover:bg-white/10 rounded-xl transition-all font-body tracking-widest text-[11px]",
              !isFocused && "pointer-events-none opacity-50"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onQuizletClick(note.quizletSetId);
            }}
            disabled={!note.quizletSetId}
          >
            QUIZLET
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
    if (typeof window === 'undefined' || windowDimensions.width === 0) return 350;
    const { width, height } = windowDimensions;
    const isMobile = width < 768;
    const isShort = height < 700;
    
    // Adjust multiplier for vertically constrained screens
    const multiplier = isMobile ? 0.8 : (isShort ? 0.5 : 0.6);
    const baseSize = Math.min(width, height);
    const minRadius = isMobile ? 240 : (isShort ? 350 : 420); 
    
    return Math.max(minRadius, baseSize * multiplier);
  }, [windowDimensions]);

  const isShortScreen = windowDimensions.height < 700;

  const rotationY = useMotionValue(0);
  const springyRotationY = useSpring(rotationY, { stiffness: 120, damping: 30 });

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
      <div className="w-full flex-1 flex flex-col items-center justify-center h-full relative overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible" style={{ perspective: "4000px" }}>
          <motion.div
            className="w-full h-full absolute flex items-center justify-center overflow-visible"
            style={{ transformStyle: "preserve-3d", rotateY: springyRotationY }}
          >
            {notes.map((note, i) => {
              const isFocused = i === index;
              return (
                <motion.div
                  key={note.topic}
                  className={cn(
                    "absolute transition-[height] duration-500 overflow-visible",
                    "w-[200px] md:w-[240px]",
                    isShortScreen ? "h-[280px]" : "h-[340px]"
                  )}
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
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 flex items-center justify-center z-[70] pointer-events-none">
          <Button variant="ghost" size="icon" onClick={handlePrev} className="pointer-events-auto h-16 w-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/20 shadow-2xl transition-all active:scale-90">
            <ChevronLeft className="h-10 w-10" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 flex items-center justify-center z-[70] pointer-events-none">
          <Button variant="ghost" size="icon" onClick={handleNext} className="pointer-events-auto h-16 w-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/20 shadow-2xl transition-all active:scale-90">
            <ChevronRight className="h-10 w-10" />
          </Button>
        </div>
      </div>

      <QuizletModal isOpen={isQuizletModalOpen} onOpenChange={setIsQuizletModalOpen} quizletSetId={selectedQuizletSetId} />
    </>
  );
}
