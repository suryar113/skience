
"use client";

import { useState, useEffect } from "react";
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
import { ArrowLeft, ArrowRight } from "lucide-react";

type Note = {
  topic: string;
  notesUrl: string;
  pdfUrl: string;
  quizletUrl: string;
};

type NoteCardProps = {
  note: Note;
  isFocused: boolean;
};

function NoteCard({ note, isFocused }: NoteCardProps) {
  return (
    <div className="relative w-full h-full">
      <div
        className={cn(
          "absolute -inset-1 rounded-3xl z-0",
          isFocused ? "animated-glowing-border" : "bg-border"
        )}
      ></div>
      <Card
        className={cn(
          "w-full h-full rounded-[1.4rem] border-0 relative z-10 flex flex-col justify-between text-center transition-opacity duration-500",
          !isFocused && "opacity-60"
        )}
      >
        <CardHeader className="items-center">
          <CardTitle className="uppercase tracking-wider text-lg md:text-xl text-center">
            {note.topic}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {note.notesUrl ? (
            <Button
              asChild
              variant="outline"
              className={cn("btn-hover-pop", !isFocused && "pointer-events-none")}
            >
              <Link
                href={note.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Notes
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="btn-hover-pop">
              View Notes
            </Button>
          )}
          {note.pdfUrl ? (
            <Button
              asChild
              variant="outline"
              className={cn("btn-hover-pop", !isFocused && "pointer-events-none")}
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
            <Button variant="outline" disabled className="btn-hover-pop">
              PDF Link
            </Button>
          )}
          {note.quizletUrl ? (
            <Button
              asChild
              variant="outline"
              className={cn("btn-hover-pop", !isFocused && "pointer-events-none")}
            >
              <Link
                href={note.quizletUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quizlet
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="btn-hover-pop">
              Quizlet
            </Button>
          )}
        </CardContent>
        <CardFooter className="justify-center"></CardFooter>
      </Card>
    </div>
  );
}

export function SphereCarousel({ notes }: { notes: Note[] }) {
  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalPanels = notes.length;
  const panelAngle = 360 / totalPanels;
  const radius = totalPanels < 5 ? 200 : 300;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (newIndex: number) => {
    const currentIndex = index;
    if (newIndex === currentIndex) return;

    let diff = newIndex - currentIndex;
    if (Math.abs(diff) > totalPanels / 2) {
      if (diff > 0) {
        diff -= totalPanels;
      } else {
        diff += totalPanels;
      }
    }

    setIndex(newIndex);
    setRotation(rotation - diff * panelAngle);
  };

  const handlePrev = () => {
    const newIndex = (index - 1 + totalPanels) % totalPanels;
    handleClick(newIndex);
  };

  const handleNext = () => {
    const newIndex = (index + 1) % totalPanels;
    handleClick(newIndex);
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <div className="relative w-[240px] h-[360px]">
          <NoteCard note={notes[index]} isFocused={true} />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrev} className="btn-hover-pop">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} className="btn-hover-pop">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8">
      <div
        className="relative w-[240px] h-[360px]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full absolute transition-transform duration-1000 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {notes.map((note, i) => {
            const isFocused = i === index;
            return (
              <div
                key={note.topic}
                className={cn(
                  "absolute w-[240px] h-[360px] p-2",
                  !isFocused && "cursor-pointer"
                )}
                style={{
                  transform: `rotateY(${
                    i * panelAngle
                  }deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleClick(i)}
              >
                <NoteCard note={note} isFocused={isFocused} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
