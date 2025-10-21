'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import { ExternalLink, X, RotateCw, BookOpen, FileText, Link as LinkIcon, HelpCircle } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

const notes = [
  {
    topic: 'CHARACTERISTICS OF LIVING THINGS',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/asdasdasdasdas',
    pdfUrl: 'https://drive.google.com/drive/folders/1Xdo1VFXf9z6dhP_b2iU_Om4dImFpqbu6?usp=sharing',
    quizletUrl: '#'
  },
  {
    topic: 'ORGANIC MOLECULES',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs',
    pdfUrl: 'https://drive.google.com/drive/folders/160OPAQYfAuRNVn-jtAW35uyzMExr93UR?usp=sharing',
    quizletUrl: '#'
  },
  {
    topic: 'ENZYMES',
    notesUrl: 'https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf',
    pdfUrl: 'https://drive.google.com/drive/folders/1P6jHR7n_gQww9U2vr5ZJXlIPeMrjXc4r?usp=sharing',
    quizletUrl: '#'
  },
  { topic: 'THE CELL', notesUrl: '#', pdfUrl: '#', quizletUrl: '#' },
];

export default function BiologyPage() {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSurpriseMe = () => {
    if (!isMounted) return;
    const validNotes = notes.filter(note => note.notesUrl !== '#');
    if (validNotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * validNotes.length);
      setSelectedUrl(validNotes[randomIndex].notesUrl);
    }
  };

  const closeDialogs = () => {
    setSelectedUrl(null);
  }

  return (
    <Dialog onOpenChange={(open) => !open && closeDialogs()}>
      <div className="flex flex-col min-h-screen p-4 md:p-6 bg-background text-foreground">
        <SiteHeader />

        <main className="flex-1 flex flex-col items-center pt-8 md:pt-16">
            <div className="w-full max-w-4xl flex justify-end mb-4">
                <DialogTrigger asChild>
                    <Button onClick={handleSurpriseMe}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Surprise Me
                    </Button>
                </DialogTrigger>
            </div>
          <Card className="w-full max-w-4xl rounded-3xl">
            <CardHeader>
              <CardTitle className="text-center uppercase tracking-widest text-gradient-blue">BIOLOGY NOTES</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]"><span className="flex items-center gap-2"><BookOpen size={16}/>TOPIC</span></TableHead>
                    <TableHead className="w-[15%]"><span className="flex items-center gap-2 text-gradient-green"><LinkIcon size={16}/>NOTES</span></TableHead>
                    <TableHead className="w-[15%]"><span className="flex items-center gap-2 text-gradient-orange"><FileText size={16}/>PDF</span></TableHead>
                    <TableHead className="w-[20%] text-center"><span className="flex items-center justify-center gap-2 text-gradient-purple"><HelpCircle size={16}/>QUIZLET</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notes.map((note) => (
                    <TableRow key={note.topic}>
                      <TableCell className="font-medium">{note.topic}</TableCell>
                      <TableCell>
                        {note.notesUrl !== '#' ? (
                          <DialogTrigger asChild>
                            <Button variant="link" onClick={() => setSelectedUrl(note.notesUrl)} className="text-gradient-green p-0">
                              View
                            </Button>
                          </DialogTrigger>
                        ) : (
                          <Button variant="link" disabled className="p-0">View</Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="link" className="p-0">
                          <Link href={note.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-gradient-orange">Link</Link>
                        </Button>
                      </TableCell>
                       <TableCell className="text-center">
                          <Button asChild variant="link" className="p-0">
                            <Link href={note.quizletUrl} target="_blank" rel="noopener noreferrer" className="text-gradient-purple">Link</Link>
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>

        <footer className="text-center p-6 mt-16">
          <p className="text-sm text-muted-foreground">you better study</p>
        </footer>
      </div>
      {selectedUrl && (
         <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 rounded-3xl">
          <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
            <DialogTitle>Notes Viewer</DialogTitle>
             <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href={selectedUrl} target="_blank" rel="noopener noreferrer">
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
    </Dialog>
  );
}
