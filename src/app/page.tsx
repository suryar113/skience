'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-purple">Welcome to Skience</h2>
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl animated-glowing-border z-0"></div>
          <Button size="lg" asChild className="relative z-10 bg-background hover:bg-background/90">
            <Link href="/biology" className="text-foreground">Explore Biology Notes</Link>
          </Button>
        </div>
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-muted-foreground">you better study</p>
      </footer>
    </div>
  );
}
