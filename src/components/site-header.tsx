'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';

export function SiteHeader() {
  const { user, isUserLoading } = useUser();
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  const NavLinks = () => (
    <>
      <Button variant="outline" size="sm" asChild className="btn-hover-pop">
          <Link href="/">HOME</Link>
      </Button>
      <Button variant="outline" size="sm" asChild className="btn-hover-pop">
        <Link href="/biology">BIOLOGY</Link>
      </Button>
      {!isUserLoading && user && (
        <Button variant="outline" size="sm" asChild className="btn-hover-pop">
          <Link href="/dashboard">DASHBOARD</Link>
        </Button>
      )}
      {!isUserLoading && !user && (
        <>
          <Button variant="outline" size="sm" asChild className="btn-hover-pop">
            <Link href="/login">LOGIN</Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="btn-hover-pop">
            <Link href="/signup">SIGN UP</Link>
          </Button>
        </>
      )}
      {user && (
        <Button variant="outline" size="sm" onClick={handleSignOut} className="btn-hover-pop">
          SIGN OUT
        </Button>
      )}
      <Button variant="outline" size="icon" asChild className="btn-hover-pop">
        <Link href="https://github.com/gtdsura/skience" target="_blank" rel="noopener noreferrer">
          <Github className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
      <Button variant="outline" size="icon" onClick={toggleTheme} className="btn-hover-pop">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )

  return (
    <header className="flex justify-between items-center p-4 md:p-6 relative z-50">
      <h1 className="text-2xl font-bold tracking-widest uppercase transition-transform duration-200 ease-in-out hover:scale-110">
        <Link href="/" className="text-gradient-rainbow" data-text="Skience">Skience</Link>
      </h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        <NavLinks />
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="relative z-50 w-8 h-8 flex flex-col justify-around items-center"
          aria-label="Toggle menu"
        >
          <span className={cn("block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out", { "rotate-45 translate-y-[5px]": menuOpen })}></span>
          <span className={cn("block w-6 h-0.5 bg-foreground transition-opacity duration-300 ease-in-out", { "opacity-0": menuOpen })}></span>
          <span className={cn("block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out", { "-rotate-45 -translate-y-[5px]": menuOpen })}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background z-40 transition-opacity duration-300 ease-in-out md:hidden",
        { "opacity-100 visible": menuOpen, "opacity-0 invisible": !menuOpen }
      )}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
