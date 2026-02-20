"use client";

/**
 * @fileoverview SphereCarousel Component
 * 
 * A 3D interactive carousel that displays science notes in a spherical arrangement.
 * Features:
 * - 3D CSS transforms for a true spatial feel.
 * - Responsive design (switches to a standard carousel on mobile).
 * - Focused vs. Non-focused card states with distinct visual styles (Glassmorphism).
 * - Interactive buttons for viewing notes, PDFs, and Quizlet sets.
 */

import { useState, useEffect, useCallback } from "react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { QuizletModal } from "./quizlet-modal";

/**
 * Individual Note definition
 */
type Note = {
  topic: string;
  notesUrl: string;
  pagePath: string;
  pdfUrl: string;
  quizletSetId: string;
};

/**
 * Props for the NoteCard component
 */
type NoteCardProps = {
  note: Note;
  isFocused: boolean;
  onQuizletClick: (quizletSetId: string) => void;
  onRotateClick?: () => void;
};

/**
 * NoteCard Component
 * Renders an individual note with its actions.
 */
function NoteCard({ note, isFocused, onQuizletClick, onRotateClick }: NoteCardProps) {
  return (
    <div className="relative w-full h-full group">
      {/* 
          A background glow/border layer.
          Focused cards get an animated rainbow border.
          Non-focused cards get a very subtle tiny border.
      */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-3xl z-0 transition-all duration-500",
          isFocused ? "animated-glowing-border opacity-50" : "bg-transparent border-[0.5px] border-white/5 opacity-40"
        )}
      ></div>
      
      {/* 
          Main Card Container
          Focused: Standard glassy card.
          Non-focused: "Fully black" look with glass transparency and blur.
      */}
      <Card
        className={cn(
          "w-full h-full rounded-[1.4rem] relative z-10 flex flex-col justify-between transition-all duration-500",
          isFocused 
            ? "bg-card/60 backdrop-blur-lg border border-white/10" 
            : "bg-black/70 backdrop-blur-md border-[0.5px] border-white/10 opacity-60 group-hover:opacity-100"
        )}
      >
        {/* 
            INTERACTION LAYER: 
            This transparent div sits on top of non-focused cards to capture clicks for rotation.
            It is REMOVED when the card is focused so that buttons become clickable.
        */}
        {!isFocused && onRotateClick && (
          <div 
            className="absolute inset-0 z-[100] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRotateClick();
            }}
          />
        )}

        <CardHeader className="flex flex-col items-center text-center p-4">
          <CardTitle className="uppercase text-xl md:text-2xl font-headline tracking-normal">
            {note.topic}
          </CardTitle>
        </CardHeader>

        {/* 
            Buttons Container
            px-12 is used to make the buttons narrower (edges closer together).
        */}
        <CardContent className="flex flex-col items-center gap-3 px-12">
          {note.pagePath ? (
            <Button
              asChild
              variant="outline"
              className={cn("w-full btn-hover-pop bg-transparent border-white/20 hover:bg-white/10", !isFocused && "pointer-events-none")}
            >
              <Link
                href={note.pagePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Notes
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full btn-hover-pop bg-transparent">
              View Notes
            </Button>
          )}

          {note.pdfUrl ? (
            <Button
              asChild
              variant="outline"
              className={cn("w-full btn-hover-pop bg-transparent border-white/20 hover:bg-white/10", !isFocused && "pointer-events-none")}
            >
              <Link
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF Link
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full btn-hover-pop bg-transparent">
              PDF Link
            </Button>
          )}

          {note.quizletSetId ? (
            <Button
              variant="outline"
              className={cn("w-full btn-hover-pop bg-transparent border-white/20 hover:bg-white/10", !isFocused && "pointer-events-none")}
              onClick={(e) => {
                e.stopPropagation();
                handleQuizletClick(note.quizletSetId);
              }}
            >
              Quizlet
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full btn-hover-pop bg-transparent">
              Quizlet
            </Button>
          )}
        </CardContent>
        <CardFooter className="h-6"></CardFooter>
      </Card>
    </div>
  );
}

/**
 * SphereCarousel Component
 * Manages the 3D rotation and mobile fallback for the notes collection.
 */
export function SphereCarousel({ notes, onTopicChange }: { notes: Note[], onTopicChange: (topic: string) => void }) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [api, setApi] = useState<CarouselApi>()
  const [isQuizletModalOpen, setIsQuizletModalOpen] = useState(false);
  const [selectedQuizletSetId, setSelectedQuizletSetId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Handle hydration to ensure window/navigator are available
  useEffect(() => {
    setHasMounted(true);
  }, []);

  /**
   * Opens the Quizlet study set modal.
   */
  const handleQuizletClick = (quizletSetId: string) => {
    setSelectedQuizletSetId(quizletSetId);
    setIsQuizletModalOpen(true);
  };

  // 3D Geometry calculations for the spherical arrangement
  const totalPanels = notes.length;
  const panelAngle = 360 / totalPanels;
  const cardWidth = 240; 
  const cardGap = 30; 
  const circumference = totalPanels * (cardWidth + cardGap);
  // Calculate radius so that cards are spaced evenly in a circle
  const radius = Math.max(250, circumference / (2 * Math.PI));

  // Motion values for smooth 3D rotation transitions
  const rotationY = useMotionValue(0);
  const springyRotationY = useSpring(rotationY, { stiffness: 200, damping: 40 });

  // Sync focused topic with parent component
  useEffect(() => {
    if (notes[index]) {
      onTopicChange(notes[index].topic);
    }
  }, [index, notes, onTopicChange]);

  // Handle responsive layout shifts
  useEffect(() => {
    if (!hasMounted) return;
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [hasMounted]);

  // Sync index for mobile carousel
  useEffect(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
    const handleSelect = () => setIndex(api.selectedScrollSnap());
    api.on('select', handleSelect);
    return () => api.off('select', handleSelect);
  }, [api]);

  /**
   * Rotates the sphere smoothly to a specific note index.
   */
  const handleRotateTo = useCallback((newIndex: number) => {
    const currentIndex = index;
    if (newIndex === currentIndex) return;

    // Determine shortest rotation direction
    let diff = newIndex - currentIndex;
    if (Math.abs(diff) > totalPanels / 2) {
      if (diff > 0) diff -= totalPanels;
      else diff += totalPanels;
    }
    
    setIndex(newIndex);
    rotationY.set(rotationY.get() - diff * panelAngle);
  }, [index, rotationY, totalPanels, panelAngle]);

  const handlePrev = useCallback(() => {
    const newIndex = (index - 1 + totalPanels) % totalPanels;
    handleRotateTo(newIndex);
  }, [index, totalPanels, handleRotateTo]);

  const handleNext = useCallback(() => {
    const newIndex = (index + 1) % totalPanels;
    handleRotateTo(newIndex);
  }, [index, totalPanels, handleRotateTo]);

  // Add keyboard support for navigating the carousel
  useEffect(() => {
    if (!hasMounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, hasMounted]);

  if (!hasMounted) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-[260px] h-[380px] md:h-[400px]" />
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        // Mobile Fallback: Standard horizontal carousel
        <div className="w-full flex flex-col items-center justify-center">
          <Carousel setApi={setApi} className="w-full max-w-[280px]">
            <CarouselContent>
              {notes.map((note, i) => (
                <CarouselItem key={i}>
                  <div className="p-1 h-[420px]">
                    <NoteCard note={note} isFocused={i === index} onQuizletClick={handleQuizletClick} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="btn-hover-pop -left-2" />
            <CarouselNext className="btn-hover-pop -right-2" />
          </Carousel>
        </div>
      ) : (
        // Desktop: Interactive 3D Sphere
        <div className="w-full flex flex-col items-center justify-center h-full">
          <div
            className="relative w-full h-[500px]"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              className="w-full h-full absolute"
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
                    className="absolute w-[240px] h-[360px] p-2 top-10 left-0 right-0 mx-auto"
                    style={{
                      transform: `rotateY(${i * panelAngle}deg) translateZ(${radius}px)`,
                      zIndex: isFocused ? 50 : 1, // Focused card is always logically on top
                      backfaceVisibility: "hidden", // Prevents cards on the 'back' of the sphere from blocking clicks
                    }}
                  >
                    <NoteCard 
                      note={note} 
                      isFocused={isFocused} 
                      onQuizletClick={handleQuizletClick} 
                      onRotateClick={() => handleRotateTo(i)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}
      <QuizletModal 
        isOpen={isQuizletModalOpen}
        onOpenChange={setIsQuizletModalOpen}
        quizletSetId={selectedQuizletSetId}
      />
    </>
  );
}
