
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-rainbow">Welcome to Skience</h2>
        <div className="relative group transition-transform duration-200 ease-in-out hover:scale-105">
          <div className="absolute -inset-1 rounded-3xl animated-glowing-border z-0"></div>
          <Button size="lg" asChild variant="outline" className="relative z-10 bg-background hover:bg-accent">
            <Link href="/biology">Explore Biology Notes</Link>
          </Button>
        </div>
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow">you better study</p>
      </footer>
    </div>
  );
}
