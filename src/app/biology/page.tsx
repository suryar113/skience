
"use client";

import { SiteHeader } from "@/components/site-header";
import { SphereCarousel } from "@/components/sphere-carousel";

const notes = [
  {
    topic: "CHARACTERISTICS OF LIVING THINGS",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asdasdasdasdas",
    pdfUrl:
      "https://drive.google.com/drive/folders/1Xdo1VFXf9z6dhP_b2iU_Om4dImFpqbu6",
    quizletUrl: "",
  },
  {
    topic: "ORGANIC MOLECULES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/asfdsafadsfdsfs",
    pdfUrl:
      "https://drive.google.com/drive/folders/160OPAQYfAuRNVn-jtAW35uyzMExr93UR",
    quizletUrl: "",
  },
  {
    topic: "ENZYMES",
    notesUrl: "https://drinks-hunt-3eb.craft.me/fdgdfgdfgdfgdfgdf",
    pdfUrl:
      "https://drive.google.com/drive/folders/1P6jHR7n_gQww9U2vr5ZJXlIPeMrjXc4r",
    quizletUrl: "",
  },
  {
    topic: "THE CELL",
    notesUrl: "https://drinks-hunt-3eb.craft.me/BWwKgb2BT5sgbZ",
    pdfUrl:
      "https://drive.google.com/drive/folders/10BOS_ghIpDbgTZaoRsImsM8_0qWBruVo",
    quizletUrl: "",
  },
  {
    topic: "CELLULAR TRANSPORT",
    notesUrl: "https://drinks-hunt-3eb.craft.me/FChuDvbuWVFkSs",
    pdfUrl:
      "https://drive.google.com/drive/folders/1y4IBlejw7VUZzQNb6IaN8UY4dwgA9WxJ",
    quizletUrl: "https://quizlet.com/1111521452/cellular-transport-flash-cards/",
  },
  {
    topic: "CELL ENERGY",
    notesUrl: "https://drinks-hunt-3eb.craft.me/yE51rTLi4yFyDq",
    pdfUrl:
      "https://drive.google.com/drive/folders/1OFYuGjfqj8PzCHXg7T-COx3qrT5xGaDx",
    quizletUrl: "",
  },
  {
    topic: "GENETICS",
    notesUrl: "",
    pdfUrl: "",
    quizletUrl: "",
  },
];

export default function BiologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
        <SphereCarousel notes={notes} />
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow" data-text="you better study">you better study</p>
      </footer>
    </div>
  );
}
