'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { useAuth } from '@/firebase';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

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
          {isUserLoading ? null : user ? (
            <Button variant="outline" size="sm" onClick={() => auth.signOut()}>
              LOGOUT
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">LOGIN</Link>
            </Button>
          )}
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-light mb-8 uppercase">theres only 4 buttons on the screen</h2>
        <Button variant="outline" asChild>
            <Link href="/biology">BIOLOGY FOR YOU NOOBS</Link>
        </Button>
      </main>

      <footer className="text-center mt-16">
        <p className="text-sm text-muted-foreground uppercase">howd u use this to study and still fail</p>
      </footer>
    </div>
  );
}
