import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const notes = [
  { name: 'Characteristics of Living Things', notesLink: '/characteristics-of-living-things', pdfLink: '/characteristics-of-living-things.pdf' },
  { name: 'Organic molecules', notesLink: '/organic-molecules', pdfLink: '/organic-molecules.pdf' },
  { name: 'Enzymes', notesLink: '/enzymes', pdfLink: '/enzymes.pdf' },
  { name: 'Cell', notesLink: 'Coming soon!', pdfLink: 'I said coming soon' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 bg-background">
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold tracking-widest uppercase">Skience</h1>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">HOME</Link>
          <Button variant="outline" size="sm">BIOLOGY</Button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center">
        <h2 className="text-4xl font-light mb-12 uppercase">hey there</h2>
        
        <div className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="uppercase">Science Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2 uppercase">Name of note</TableHead>
                    <TableHead className="w-1/4 text-center uppercase border-l">Notes Link</TableHead>
                    <TableHead className="w-1/4 text-center uppercase border-l">PDF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notes.map((note, index) => (
                    <TableRow key={index}>
                      <TableCell className="uppercase">{note.name}</TableCell>
                      <TableCell className="text-center border-l">
                        {note.notesLink.startsWith('Coming') ? (
                          <span className="text-muted-foreground uppercase">{note.notesLink}</span>
                        ) : (
                          <Button variant="ghost" asChild>
                            <Link href={note.notesLink} className="uppercase">
                              {note.notesLink.substring(1).replace(/-/g, ' ')}
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="text-center border-l">
                        {note.pdfLink.startsWith('I said') ? (
                          <span className="text-muted-foreground uppercase">{note.pdfLink}</span>
                        ) : (
                           <Button variant="ghost" asChild>
                            <Link href={note.pdfLink} className="uppercase">
                              pdf
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="text-center mt-16">
        <p className="text-sm text-muted-foreground uppercase">howd u use this to study and still fail</p>
      </footer>
    </div>
  );
}
