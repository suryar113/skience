"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Note = {
  topic: string;
  notesUrl: string;
  pdfUrl: string;
  quizletUrl: string;
};

type NoteCardProps = {
  note: Note;
  isFocused: boolean;
  notes: Note[];
};

function NoteCard({ note, isFocused, notes }: NoteCardProps) {
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
          "w-full h-full rounded-[1.4rem] border-0 relative z-10 flex flex-col justify-between text-center",
          !isFocused && "opacity-50"
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
              className={cn(!isFocused && "pointer-events-none")}
            >
              <Link
                href={note.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-green"
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
              className={cn(!isFocused && "pointer-events-none")}
            >
              <Link
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-orange"
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
              className={cn(!isFocused && "pointer-events-none")}
            >
              <Link
                href={note.quizletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-purple"
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
          <p className="text-xs text-muted-foreground">
            Topic {notes.findIndex((n) => n.topic === note.topic) + 1} of{" "}
            {notes.length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export function SphereCarousel({ notes }: { notes: Note[] }) {
  const [index, setIndex] = useState(0);
  const totalPanels = notes.length;

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + totalPanels) % totalPanels);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % totalPanels);
  };

  const carouselRotation = useMemo(() => {
    return - (index * 360) / totalPanels;
  }, [index, totalPanels]);

  const panelAngle = 360 / totalPanels;
  const radius = 400 / (2 * Math.tan(Math.PI / totalPanels));

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8">
       <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-rainbow uppercase" data-text="Biology Notes">
        Biology Notes
      </h2>
      <div
        className="relative w-[300px] h-[400px]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full absolute transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${carouselRotation}deg)`,
          }}
        >
          {notes.map((note, i) => {
            const isFocused = i === index;
            return (
              <div
                key={note.topic}
                className="absolute w-[300px] h-[400px] p-4 transition-opacity duration-300"
                style={{
                  transform: `rotateY(${i * panelAngle}deg) translateZ(${radius}px)`,
                }}
              >
                <NoteCard note={note} isFocused={isFocused} notes={notes} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous note">
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next note">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
