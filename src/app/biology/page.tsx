'use client';

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { StudyBuddy } from "@/components/study-buddy";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const notes = [
  {
    topic: "CHARACTERISTICS OF LIVING THINGS",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asdasdasdasdas",
    pdfUrl:
      "https://drive.google.com/file/d/1RndRzd5c9SqLzLB2fHY7G-qU_MF_cJCK/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1122717082/characteristics-of-living-things-flash-cards/?i=47oq46&x=1jqt",
  },
  {
    topic: "ORGANIC MOLECULES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs",
    pdfUrl:
      "https://drive.google.com/file/d/1rXuJKTBlGPTY4VM1ARgOs3PxLg-ZGTbB/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1122717715/organic-molecules-flash-cards/?i=47oq46&x=1jqt",
  },
  {
    topic: "ENZYMES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf",
    pdfUrl:
      "https://drive.google.com/file/d/1SmnvQUmyvFglrKm-m9f1rOoRxX_Mz-Bw/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1122718833/enzymes-flash-cards/?i=47oq46&x=1jqt",
  },
  {
    topic: "THE CELL",
    notesUrl: "https://drinks-hunt-3eb.craft.me/BWwKgb2BT5sgbZ",
    pdfUrl:
      "https://drive.google.com/file/d/1glJUa7ZrClzV2Eot0zlqg9qUYDGyMbxD/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1120255848/the-cell-flash-cards/",
  },
  {
    topic: "CELLULAR TRANSPORT",
    notesUrl: "https://drinks-hunt-3eb.craft.me/FChuDvbuWVFkSs",
    pdfUrl:
      "https://drive.google.com/file/d/1YO6cD4_1jZcq-3fHRWeuFS7cKQb2FAl3/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1111521452/cellular-transport-flash-cards/",
  },
  {
    topic: "CELL ENERGY",
    notesUrl: "https://drinks-hunt-3eb.craft.me/yE51rTLi4yFyDq",
    pdfUrl:
      "https://drive.google.com/file/d/1JjaQbMdjr51LIH3vbyZA9b6_BTKUxsl7/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1120258987/cell-energy-flash-cards/",
  },
  {
    topic: "CELL DIVISION",
    notesUrl: "https://drinks-hunt-3eb.craft.me/zBqAP1zBPsOXHk",
    pdfUrl:
      "https://drive.google.com/file/d/1_t3qS_3c2k3EkXEXUOKxt9EFxMw_EiB4/view?usp=drive_link",
    quizletUrl: "https://quizlet.com/1120243601/cell-divisionreproduction-flash-cards/",
  },
];

export default function BiologyPage() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
        <SphereCarousel notes={notes} onTopicChange={setCurrentTopic} />
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow" data-text="you better study">you better study</p>
      </footer>
      
      <div className="fixed bottom-6 right-6 z-50">
        <StudyBuddy 
          isOpen={isChatOpen} 
          onOpenChange={setChatOpen}
          topic={currentTopic}
        />
        {!isChatOpen && (
          <Button
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg btn-hover-pop"
            onClick={() => setChatOpen(true)}
          >
            <Bot className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
