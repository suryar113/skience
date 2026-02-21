"use client";

/**
 * @fileoverview Fully Responsive Unified 3D SphereCarousel Component
 * 
 * A 3D interactive carousel optimized for both Desktop and Mobile devices.
 * The geometry (radius, card size, and spacing) adapts dynamically to screen width and height.
 * 
 * Features:
 * - Fluid Responsive Geometry: Cards "come together" as the screen shrinks on all devices.
 * - Mobile Spacing Parity: Transitions smoothly from large mobile to standard desktop spacing.
 * - Glassy Black Style: bg-black/75, backdrop blur, and thin borders for non-focused cards.
 * - Refined Typography: 'tracking-wider' letter spacing and balanced font scaling.
 * - Throttled Controls: 350ms cooldown for keyboard (WASD + Arrows) and button interactions.
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

/**
 * NoteCard Component
 * 
 * Renders an individual card with a 3D focused state and a glassy black non-focused state.
 */
function NoteCard({ note, isFocused, onQuizletClick, onRotateClick }: NoteCardProps) {
  return (
    <div className="relative w-full h-full group">
      {/* Animated glow effect behind the focused card */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-[2rem] z-0 transition-all duration-500",
          isFocused ? "animated-glowing-border opacity-30 blur-md" : "bg-transparent opacity-0"
        )}
      ></div>
      
      <Card
        className={cn(
          "w-full h-full rounded-[1.8rem] relative z-10 flex flex-col justify-between transition-all duration-500 overflow-hidden",
          isFocused 
            ? "bg-card/60 backdrop-blur-xl border-white/20 shadow-2xl" 
            : "bg-black/75 backdrop-blur-md border-[0.5px] border-white/5 opacity-40 group-hover:opacity-100"
        )}
      >
        {/* Rotation trigger for non-focused cards */}
        {!isFocused && onRotateClick && (
          <div 
            className="absolute inset-0 z-[100] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRotateClick();
            }}
          />
        )}

        <CardHeader className="flex flex-col items-center text-center p-4 md:p-6 pb-2">
          <CardTitle 
            className={cn(
              "uppercase font-headline tracking-wider transition-all duration-500 leading-tight",
              isFocused 
                ? "text-xl md:text-2xl text-foreground drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]" 
                : "text-base md:text-lg text-muted-foreground/60"
            )}
          >
            {note.topic}
          </CardTitle>
        </CardHeader>

        {/* Responsive Content: px-6 on mobile, px-12 on desktop for narrower feel */}
        <CardContent className="flex flex-col items-center gap-2 md:gap-3 px-6 md:px-12 pb-6 md:pb-8">
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "w-full h-9 md:h-10 btn-hover-pop bg-transparent border-white/10 hover:bg-white/10 rounded-2xl transition-all",
              !isFocused && "pointer-events-none"
            )}
          >
            {note.pagePath ? (
              <Link href={note.pagePath} target="_blank" rel="noopener noreferrer">
                View Notes
              </Link>
            ) : (
              <span className="opacity-50">View Notes</span>
            )}
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "w-full h-9 md:h-10 btn-hover-pop bg-transparent border-white/10 hover:bg-white/10 rounded-2xl transition-all",
              !isFocused && "pointer-events-none"
            )}
          >
            {note.pdfUrl ? (
              <Link href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                PDF Link
              </Link>
            ) : (
              <span className="opacity-50">PDF Link</span>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full h-9 md:h-10 btn-hover-pop bg-transparent border-white/10 hover:bg-white/10 rounded-2xl transition-all",
              !isFocused && "pointer-events-none"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onQuizletClick(note.quizletSetId);
            }}
            disabled={!note.quizletSetId}
          >
            Quizlet
          </Button>
        </CardContent>
        <CardFooter className="h-2 md:h-4"></CardFooter>
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

  // Cooldown logic to prevent rapid spinning (Throttling)
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

  /**
   * FLUID DYNAMIC RADIUS CALCULATION:
   * Scales based on viewport dimensions to ensure the sphere is responsive.
   * Mobile multiplier is higher (0.8) to keep cards visible in narrow viewports.
   * Desktop multiplier is lower (0.55) for a spacious 3D feel.
   * The cards "come together" naturally as the screen size (baseSize) decreases.
   */
  const radius = useMemo(() => {
    if (typeof window === 'undefined' || windowDimensions.width === 0) return 400;
    const { width, height } = windowDimensions;
    const baseSize = Math.min(width, height);
    
    const isMobile = width < 768;
    const multiplier = isMobile ? 0.8 : 0.55;
    const minRadius = isMobile ? 280 : 450;

    const calculatedRadius = baseSize * multiplier;
    return Math.max(minRadius, calculatedRadius);
  }, [windowDimensions]);

  const rotationY = useMotionValue(0);
  const springyRotationY = useSpring(rotationY, { stiffness: 180, damping: 35 });

  useEffect(() => {
    if (notes[index]) {
      onTopicChange(notes[index].topic);
    }
  }, [index, notes, onTopicChange]);

  useEffect(() => {
    if (!hasMounted) return;
    const handleResize = () => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasMounted]);

  const handleRotateTo = useCallback((newIndex: number) => {
    const currentIndex = index;
    if (newIndex === currentIndex) return;

    let diff = newIndex - currentIndex;
    // Find shortest path around the circle
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

    const newIndex = (index - 1 + totalPanels) % totalPanels;
    handleRotateTo(newIndex);
  }, [index, totalPanels, handleRotateTo]);

  const handleNext = useCallback(() => {
    const now = Date.now();
    if (now - lastRotationTime.current < ROTATION_COOLDOWN) return;
    lastRotationTime.current = now;

    const newIndex = (index + 1) % totalPanels;
    handleRotateTo(newIndex);
  }, [index, totalPanels, handleRotateTo]);

  /**
   * Keyboard Controls:
   * Throttled support for Arrows and WASD.
   * W, D, ArrowRight -> Move forward.
   * A, S, ArrowLeft -> Move backward.
   */
  useEffect(() => {
    if (!hasMounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "arrowleft" || key === "a" || key === "s") {
        handlePrev();
      } 
      else if (key === "arrowright" || key === "w" || key === "d") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, hasMounted]);

  if (!hasMounted) return null;

  return (
    <>
      <div className="w-full flex-1 flex flex-col items-center justify-center h-full relative">
        {/* Main 3D Container - Scaled perspective for depth */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-visible"
          style={{ perspective: "4000px" }}
        >
          <motion.div
            className="w-full h-full absolute flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              rotateY: springyRotationY,
            }}
          >
            {notes.map((note, i) => {
              const isFocused = i === index;
              return (
                <motion.div
                  key={note.topic}
                  // Fluid Card Sizing: Adapts based on screen width breakpoint
                  className="absolute w-[220px] h-[340px] md:w-[280px] h-[400px] p-2 md:p-4"
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

        {/* Navigation Overlays (Always visible for touch/click support) */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 flex items-center justify-center z-[60] pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="pointer-events-auto h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 hover:bg-white/10"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 flex items-center justify-center z-[60] pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="pointer-events-auto h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 hover:bg-white/10"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <QuizletModal 
        isOpen={isQuizletModalOpen}
        onOpenChange={setIsQuizletModalOpen}
        quizletSetId={selectedQuizletSetId}
      />
    </>
  );
}
