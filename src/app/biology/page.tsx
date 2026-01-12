
'use client';

import { useState } from 'react';
import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";
import { Particles } from '@/components/particles';
import { motion } from 'framer-motion';

const notes = [
  {
    topic: "CHARACTERISTICS OF LIVING THINGS",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asdasdasdasdas",
    pagePath: "/notes/characteristics-of-living-things",
    pdfUrl:
      "https://drive.google.com/file/d/1RndRzd5c9SqLzLB2fHY7G-qU_MF_cJCK/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1122717082/characteristics-of-living-things-flash-cards/?i=47oq46&x=1jqt",
  },
  {
    topic: "ORGANIC MOLECULES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs",
    pagePath: "/notes/organic-molecules",
    pdfUrl:
      "https://drive.google.com/file/d/1rXuJKTBlGPTY4VM1ARgOs3PxLg-ZGTbB/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1122717715/organic-molecules-flash-cards/?i=47oq46&x=1jqt",
  },
  {
    topic: "ENZYMES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf",
    pagePath: "/notes/enzymes",
    pdfUrl:
      "https://drive.google.com/file/d/1SmnvQUmyvFglrKm-m9f1rOoRxX_Mz-Bw/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1122718833/enzymes-flash-cards/?i=47oq46&x=1jqt",
  },
  {
    topic: "THE CELL",
    notesUrl: "https://drinks-hunt-3eb.craft.me/BWwKgb2BT5sgbZ",
    pagePath: "/notes/the-cell",
    pdfUrl:
      "https://drive.google.com/file/d/1glJUa7ZrClzV2Eot0zlqg9qUYDGyMbxD/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1120255848/the-cell-flash-cards/",
  },
  {
    topic: "CELLULAR TRANSPORT",
    notesUrl: "https://drinks-hunt-3eb.craft.me/FChuDvbuWVFkSs",
    pagePath: "/notes/cellular-transport",
    pdfUrl:
      "https://drive.google.com/file/d/1YO6cD4_1jZcq-3fHRWeuFS7cKQb2FAl3/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1111521452/cellular-transport-flash-cards/",
  },
  {
    topic: "CELL ENERGY",
    notesUrl: "https://drinks-hunt-3eb.craft.me/yE51rTLi4yFyDq",
    pagePath: "/notes/cell-energy",
    pdfUrl:
      "https://drive.google.com/file/d/1JjaQbMdjr51LIH3vbyZA9b6_BTKUxsl7/view?usp=sharing",
    quizletUrl: "https://quizlet.com/1120258987/cell-energy-flash-cards/",
  },
  {
    topic: "CELL DIVISION",
    notesUrl: "https://drinks-hunt-3eb.craft.me/zBqAP1zBPsOXHk",
    pagePath: "/notes/cell-division",
    pdfUrl:
      "https://drive.google.com/file/d/1_t3qS_3c2k3EkXEXUOKxt9EFxMw_EiB4/view?usp=drive_link",
    quizletUrl: "https://quizlet.com/1120243601/cell-divisionreproduction-flash-cards/",
  },
];

export default function BiologyPage() {
  const [currentTopic, setCurrentTopic] = useState(notes[0].topic);

  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none relative">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
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
    </div>
  );
}
