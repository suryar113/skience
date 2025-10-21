import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const notes = [
  { unit: 'UNIT 1', topic: 'CELLS', notesUrl: '#', pdfUrl: '#' },
  { unit: 'UNIT 2', topic: 'ORGANISM', notesUrl: '#', pdfUrl: '#' },
  { unit: 'UNIT 3', topic: 'POPULATION', notesUrl: '#', pdfUrl: '#' },
  { unit: 'UNIT 4', topic: 'EVOLUTION', notesUrl: '#', pdfUrl: '#' },
  { unit: 'UNIT 5', topic: 'ECOSYSTEM', notesUrl: '#', pdfUrl: '#' },
];

export default function BiologyPage() {
  return (
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
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-center uppercase tracking-widest">BIOLOGY NOTES</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%] uppercase">UNIT</TableHead>
                  <TableHead className="w-[50%] uppercase border-l">TOPIC</TableHead>
                  <TableHead className="w-[15%] text-center uppercase border-l">NOTES LINK</TableHead>
                  <TableHead className="w-[15%] text-center uppercase border-l">PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes.map((note) => (
                  <TableRow key={note.unit}>
                    <TableCell>
                      <Badge variant="outline">{note.unit}</Badge>
                    </TableCell>
                    <TableCell className="border-l">{note.topic}</TableCell>
                    <TableCell className="text-center border-l">
                      <Button variant="link" asChild>
                        <Link href={note.notesUrl}>LINK</Link>
                      </Button>
                    </TableCell>
                    <TableCell className="text-center border-l">
                      <Button variant="link" asChild>
                        <Link href={note.pdfUrl}>PDF</Link>
                      </Button>
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
  );
}
