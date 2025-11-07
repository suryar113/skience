
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const notes = [
  {
    topic: "CHARACTERISTICS OF LIVING THINGS",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asdasdasdasdas",
    pdfUrl:
      "https://drive.google.com/drive/folders/1Xdo1VFXf9z6dhP_b2iU_Om4dImFpqbu6?usp=sharing",
    quizletUrl: "",
  },
  {
    topic: "ORGANIC MOLECULES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs",
    pdfUrl:
      "https://drive.google.com/drive/folders/160OPAQYfAuRNVn-jtAW35uyzMExr93UR?usp=sharing",
    quizletUrl: "",
  },
  {
    topic: "ENZYMES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf",
    pdfUrl:
      "https://drive.google.com/drive/folders/1P6jHR7n_gQww9U2vr5ZJXlIPeMrjXc4r?usp=sharing",
    quizletUrl: "",
  },
  {
    topic: "THE CELL",
    notesUrl: "https://drinks-hunt-3eb.craft.me/BWwKgb2BT5sgbZ",
    pdfUrl:
      "https://drive.google.com/drive/folders/10BOS_ghIpDbgTZaoRsImsM8_0qWBruVo?usp=sharing",
    quizletUrl: "",
  },
  {
    topic: "CELL TRANSPORT - COMING SOON",
    notesUrl: "",
    pdfUrl: "",
    quizletUrl: "",
  },
];

export default function BiologyPage() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center pt-8 md:pt-16">
        <Card className="w-full max-w-4xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-center uppercase tracking-widest text-gradient-blue">
              BIOLOGY NOTES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">
                    <BookOpen size={16} className="inline-block mr-2" />
                    TOPIC
                  </TableHead>
                  <TableHead className="w-[15%] text-right">
                    NOTES
                  </TableHead>
                  <TableHead className="w-[15%] text-right">
                    PDF
                  </TableHead>
                  <TableHead className="w-[20%] text-center">
                    QUIZLET
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes.map((note) => (
                  <TableRow key={note.topic}>
                    <TableCell className="font-medium">{note.topic}</TableCell>
                    <TableCell className="text-right">
                      {note.notesUrl ? (
                        <Button asChild>
                          <Link
                            href={note.notesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gradient-green"
                          >
                            View
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="link" disabled>
                          View
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {note.pdfUrl ? (
                        <Button asChild>
                          <Link
                            href={note.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gradient-orange"
                          >
                            Link
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="link" disabled>Link</Button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {note.quizletUrl ? (
                        <Button asChild>
                          <Link
                            href={note.quizletUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gradient-purple"
                          >
                            Link
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="link" disabled>Link</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-muted-foreground">you better study</p>
      </footer>
    </div>
  );
}
