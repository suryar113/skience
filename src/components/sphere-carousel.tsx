
"use client";

import { useState } from "react";
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

type Note = {
  topic: string;
  notesUrl: string;
  pdfUrl:string;
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
        <CardHeader>
          <CardTitle className="uppercase tracking-wider text-lg md:text-xl">
            {note.topic}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {note.notesUrl ? (
            <Button
              asChild
              variant="link"
              className={cn("text-gradient-green", !isFocused && "pointer-events-none")}
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
            <Button variant="link" disabled>
              View Notes
            </Button>
          )}
          {note.pdfUrl ? (
            <Button
              asChild
              variant="link"
              className={cn("text-gradient-orange", !isFocused && "pointer-events-none")}
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
            <Button variant="link" disabled>
              PDF Link
            </Button>
          )}
          {note.quizletUrl ? (
            <Button
              asChild
              variant="link"
              className={cn("text-gradient-purple", !isFocused && "pointer-events-none")}
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
            <Button variant="link" disabled>
              Quizlet
            </Button>
          )}
        </CardContent>
        <CardFooter className="justify-center">
        </CardFooter>
      </Card>
    </div>
  );
}

export function SphereCarousel({ notes }: { notes: Note[] }) {
  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const totalPanels = notes.length;
  const panelAngle = 360 / totalPanels;
  
  // Reduced radius to bring cards closer together
  const radius = totalPanels < 5 ? 200 : 300; 

  const handleClick = (newIndex: number) => {
    const currentIndex = index;
    if (newIndex === currentIndex) return;

    let diff = newIndex - currentIndex;
    // Shortest path logic
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
  
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8">
      <div
        className="relative w-[240px] h-[360px]" // Reduced card size
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full absolute transition-transform duration-1000 ease-in-out" // Slower, smoother transition
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
                className="absolute w-[240px] h-[360px] p-2 cursor-pointer" // Reduced card size
                style={{
                  transform: `rotateY(${
                    i * panelAngle
                  }deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleClick(i)}
              >
                <NoteCard
                  note={note}
                  isFocused={isFocused}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
