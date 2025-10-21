'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Skience</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Your centralized hub for high-quality science notes. Dive into biology, chemistry, and more, all in one place.
        </p>
        <Button size="lg" asChild>
          <Link href="/biology">Explore Biology Notes</Link>
        </Button>
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-muted-foreground">Empowering students with knowledge.</p>
      </footer>
    </div>
  );
}
