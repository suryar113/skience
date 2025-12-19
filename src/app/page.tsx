
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-rainbow" data-text="Welcome to Skience">Welcome to Skience</h2>
        <div className="group relative">
            <Button size="lg" asChild variant="outline" className="bg-background hover:bg-accent btn-hover-pop">
              <Link href="/biology">Explore Biology Notes</Link>
            </Button>
        </div>
      </main>

      <footer className="text-center p-6">
        <p className="text-sm text-gradient-rainbow" data-text="you better study">you better study</p>
      </footer>
    </div>
  );
}
