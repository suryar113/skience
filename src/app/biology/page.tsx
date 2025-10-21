'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, X, RotateCw, BrainCircuit } from 'lucide-react';

const notes = [
  {
    topic: 'CHARACTERISTICS OF LIVING THINGS',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/asdasdasdasdas',
    pdfUrl: 'https://drive.google.com/drive/folders/1Xdo1VFXf9z6dhP_b2iU_Om4dImFpqbu6?usp=sharing',
    flashcards: [
        { question: 'What are the 7 characteristics of living things?', answer: 'Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition' },
        { question: 'Define Respiration.', answer: 'The chemical reactions in cells that break down nutrient molecules and release energy for metabolism.' },
        { question: 'What is Sensitivity?', answer: 'The ability to detect or sense stimuli in the internal or external environment and to make appropriate responses.' },
        { question: 'Define Growth.', answer: 'A permanent increase in size and dry mass by an increase in cell number or cell size or both.' },
        { question: 'What is Excretion?', answer: 'Removal from organisms of the waste products of metabolism, toxic materials, and substances in excess of requirements.' },
        { question: 'What is Nutrition?', answer: 'The intake of nutrients from which organisms derive energy for growth and maintain life.' },
        { question: 'Differentiate between sexual and asexual reproduction.', answer: 'Sexual reproduction involves two parents and produces genetically unique offspring, while asexual reproduction involves a single parent and produces genetically identical offspring.' },
        { question: 'What is movement in plants called?', answer: 'Tropism, which is a growth response to a stimulus like light (phototropism) or gravity (gravitropism).' },
    ]
  },
  {
    topic: 'ORGANIC MOLECULES',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs',
    pdfUrl: 'https://drive.google.com/drive/folders/160OPAQYfAuRNVn-jtAW35uyzMExr93UR?usp=sharing',
    flashcards: [
        { question: 'What are the main types of organic molecules?', answer: 'Carbohydrates, Proteins, Lipids, and Nucleic Acids.' },
        { question: 'What are the building blocks of proteins?', answer: 'Amino acids.' },
        { question: 'What is the function of carbohydrates?', answer: 'To provide a primary source of energy for the body.' },
        { question: 'What are lipids?', answer: 'Fats, oils, and waxes that are insoluble in water. They are used for energy storage and insulation.' },
        { question: 'What are the two types of nucleic acids?', answer: 'Deoxyribonucleic acid (DNA) and Ribonucleic acid (RNA).' },
        { question: 'What is the monomer of carbohydrates?', answer: 'Monosaccharides (e.g., glucose, fructose).' },
        { question: 'How are proteins denatured?', answer: 'By extreme changes in temperature or pH, which cause them to lose their shape and function.' },
        { question: 'What is the role of DNA?', answer: 'It stores the genetic instructions for the development, functioning, growth, and reproduction of all known organisms and many viruses.' },
    ]
  },
  {
    topic: 'ENZYMES',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf',
    pdfUrl: 'https://drive.google.com/drive/folders/1P6jHR7n_gQww9U2vr5ZJXlIPeMrjXc4r?usp=sharing',
    flashcards: [
        { question: 'What is an enzyme?', answer: 'A biological catalyst, typically a protein, that speeds up biochemical reactions.' },
        { question: 'What is the "lock and key" hypothesis?', answer: 'A model explaining that the shape of an enzyme\'s active site is a perfect complement to the shape of its specific substrate.' },
        { question: 'How does temperature affect enzyme activity?', answer: 'Activity increases with temperature up to an optimal point, beyond which the enzyme denatures and activity decreases rapidly.' },
        { question: 'What is an active site?', answer: 'The specific region of an enzyme where a substrate binds and the chemical reaction occurs.' },
        { question: 'What is the "induced fit" model?', answer: 'A modification of the lock-and-key model, suggesting the active site changes shape slightly to bind the substrate more securely.' },
        { question: 'How does pH affect enzyme activity?', answer: 'Each enzyme has an optimal pH range. Extreme pH values can cause the enzyme to denature and lose its activity.' },
        { question: 'What is a substrate?', answer: 'The molecule upon which an enzyme acts.' },
        { question: 'Can an enzyme be reused?', answer: 'Yes, enzymes are not consumed in the reactions they catalyze, so they can be used over and over again.' },
    ]
  },
  { topic: 'THE CELL', notesUrl: '#', pdfUrl: '#', flashcards: [
      { question: 'What is the powerhouse of the cell?', answer: 'Mitochondria, which generate most of the cell\'s supply of adenosine triphosphate (ATP).' },
      { question: 'What contains the genetic material in a eukaryotic cell?', answer: 'The Nucleus.' },
      { question: 'What is the function of the cell membrane?', answer: 'It is a semi-permeable barrier that controls what substances enter and leave the cell.' },
      { question: 'What is cytoplasm?', answer: 'The jelly-like substance filling the cell, where organelles are suspended.' },
      { question: 'What is the function of ribosomes?', answer: 'They are responsible for protein synthesis.' },
      { question: 'What is the difference between a plant cell and an animal cell?', answer: 'Plant cells have a cell wall, chloroplasts, and a large central vacuole, which are absent in animal cells.' },
      { question:- 'What do chloroplasts do?', answer: 'They are the site of photosynthesis in plant cells.' },
      { question: 'What is the cell wall made of in plants?', answer: 'Cellulose, which provides structural support.' },
  ]},
];

type Flashcard = {
    question: string;
    answer: string;
}

export default function BiologyPage() {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [activeFlashcards, setActiveFlashcards] = useState<{ topic: string; cards: Flashcard[] } | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean[]>([]);


  const handleSurpriseMe = () => {
    const validNotes = notes.filter(note => note.notesUrl !== '#');
    if (validNotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * validNotes.length);
      setSelectedUrl(validNotes[randomIndex].notesUrl);
    }
  };

  const handleShowFlashcards = (topic: string, cards: Flashcard[]) => {
    setActiveFlashcards({ topic, cards });
    setShowAnswer(new Array(cards.length).fill(false));
  };
  
  const toggleAnswer = (index: number) => {
    const newShowAnswer = [...showAnswer];
    newShowAnswer[index] = !newShowAnswer[index];
    setShowAnswer(newShowAnswer);
  };

  const closeDialogs = () => {
    setSelectedUrl(null);
    setActiveFlashcards(null);
  }

  return (
    <Dialog onOpenChange={(open) => !open && closeDialogs()}>
      <div className="flex flex-col min-h-screen p-4 md:p-8 bg-background text-foreground">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold tracking-widest uppercase">Skience</h1>
          <nav className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">HOME</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/biology">BIOLOGY</Link>
            </Button>
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-4xl flex justify-end mb-4">
                <DialogTrigger asChild>
                    <Button onClick={handleSurpriseMe}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Surprise Me
                    </Button>
                </DialogTrigger>
            </div>
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle className="text-center uppercase tracking-widest">BIOLOGY NOTES</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%] uppercase">TOPIC</TableHead>
                    <TableHead className="w-[15%] text-center uppercase border-l">NOTES LINK</TableHead>
                    <TableHead className="w-[15%] text-center uppercase border-l">PDF</TableHead>
                    <TableHead className="w-[10%] text-center uppercase border-l">Flashcards</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notes.map((note) => (
                    <TableRow key={note.topic}>
                      <TableCell>{note.topic}</TableCell>
                      <TableCell className="text-center border-l">
                        {note.notesUrl !== '#' ? (
                          <DialogTrigger asChild>
                            <Button variant="link" onClick={() => setSelectedUrl(note.notesUrl)}>
                              LINK
                            </Button>
                          </DialogTrigger>
                        ) : (
                          <Button variant="link" disabled>LINK</Button>
                        )}
                      </TableCell>
                      <TableCell className="text-center border-l">
                        <Button variant="link" asChild>
                          <Link href={note.pdfUrl} target="_blank">PDF</Link>
                        </Button>
                      </TableCell>
                       <TableCell className="text-center border-l">
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleShowFlashcards(note.topic, note.flashcards)}>
                                <BrainCircuit className="h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>

        <footer className="text-center mt-16">
          <p className="text-sm text-muted-foreground uppercase">howd u use this to study and still fail</p>
        </footer>
      </div>
      {selectedUrl && (
         <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
            <DialogTitle>Notes</DialogTitle>
             <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href={selectedUrl} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                   <span className="sr-only">Open in new tab</span>
                </Link>
              </Button>
              <DialogClose className="h-8 w-8 flex items-center justify-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-1 p-0 m-0">
            <iframe
              src={selectedUrl}
              title="Note Content"
              className="w-full h-full border-0"
            />
          </div>
        </DialogContent>
      )}
      {activeFlashcards && (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Flashcards for {activeFlashcards.topic}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                {activeFlashcards.cards.map((card, index) => (
                    <Card key={index} className="cursor-pointer" onClick={() => toggleAnswer(index)}>
                        <CardContent className="p-4">
                           <div className="h-32 flex items-center justify-center text-center">
                            {showAnswer[index] ? <p>{card.answer}</p> : <p className="font-semibold">{card.question}</p>}
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
