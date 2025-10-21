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
import { ExternalLink, X, RotateCw, Loader2, BrainCircuit } from 'lucide-react';
import { generateFlashcards, GenerateFlashcardsOutput } from '@/ai/flows/flashcard-flow';

const notes = [
  {
    topic: 'CHARACTERISTICS OF LIVING THINGS',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/asdasdasdasdas',
    pdfUrl: 'https://drive.google.com/drive/folders/1Xdo1VFXf9z6dhP_b2iU_Om4dImFpqbu6?usp=sharing',
  },
  {
    topic: 'ORGANIC MOLECULES',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs',
    pdfUrl: 'https://drive.google.com/drive/folders/160OPAQYfAuRNVn-jtAW35uyzMExr93UR?usp=sharing',
  },
  {
    topic: 'ENZYMES',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf',
    pdfUrl: 'https://drive.google.com/drive/folders/1P6jHR7n_gQww9U2vr5ZJXlIPeMrjXc4r?usp=sharing',
  },
  { topic: 'THE CELL', notesUrl: '#', pdfUrl: '#' },
];

export default function BiologyPage() {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [flashcardState, setFlashcardState] = useState<{
    topic: string;
    loading: boolean;
    data: GenerateFlashcardsOutput | null;
    error: string | null;
    showAnswer: boolean[];
  } | null>(null);

  const handleSurpriseMe = () => {
    const validNotes = notes.filter(note => note.notesUrl !== '#');
    if (validNotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * validNotes.length);
      setSelectedUrl(validNotes[randomIndex].notesUrl);
    }
  };

  const handleGenerateFlashcards = async (topic: string) => {
    setFlashcardState({ topic, loading: true, data: null, error: null, showAnswer: [] });
    try {
      const result = await generateFlashcards({ topic });
      setFlashcardState({ topic, loading: false, data: result, error: null, showAnswer: new Array(result.flashcards.length).fill(false) });
    } catch (e) {
      console.error(e);
      setFlashcardState({ topic, loading: false, data: null, error: 'Failed to generate flashcards.', showAnswer: [] });
    }
  };
  
  const toggleAnswer = (index: number) => {
    if (flashcardState) {
        const newShowAnswer = [...flashcardState.showAnswer];
        newShowAnswer[index] = !newShowAnswer[index];
        setFlashcardState({ ...flashcardState, showAnswer: newShowAnswer });
    }
  };

  const closeDialogs = () => {
    setSelectedUrl(null);
    setFlashcardState(null);
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
                            <Button variant="ghost" size="icon" onClick={() => handleGenerateFlashcards(note.topic)}>
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
      {flashcardState && (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Flashcards for {flashcardState.topic}</DialogTitle>
            </DialogHeader>
            {flashcardState.loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : flashcardState.error ? (
                <div className="text-destructive text-center h-64 flex items-center justify-center">{flashcardState.error}</div>
            ) : (
                <div className="space-y-4">
                    {flashcardState.data?.flashcards.map((card, index) => (
                        <Card key={index} className="cursor-pointer" onClick={() => toggleAnswer(index)}>
                            <CardContent className="p-4">
                               <div className="h-32 flex items-center justify-center text-center">
                                {flashcardState.showAnswer[index] ? <p>{card.answer}</p> : <p className="font-semibold">{card.question}</p>}
                               </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DialogContent>
      )}
    </Dialog>
  );
}
