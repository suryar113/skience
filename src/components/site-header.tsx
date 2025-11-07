
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SiteHeader() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <header className="flex justify-between items-center p-6">
      <h1 className="text-2xl font-bold tracking-widest uppercase">
        <Link href="/" className="text-gradient-rainbow">Skience</Link>
      </h1>
      <nav className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl animated-glowing-border z-0"></div>
          <Button variant="outline" size="sm" asChild className="relative z-10 bg-background">
            <Link href="/">HOME</Link>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl animated-glowing-border z-0"></div>
          <Button variant="outline" size="sm" asChild className="relative z-10 bg-background">
            <Link href="/biology">BIOLOGY</Link>
          </Button>
        </div>
        <div className="relative">
            <div className="absolute -inset-1 rounded-2xl animated-glowing-border z-0"></div>
            <Button variant="outline" size="icon" asChild className="relative z-10 bg-background">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Github className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl animated-glowing-border z-0"></div>
          <Button variant="outline" size="icon" onClick={toggleTheme} className="relative z-10 bg-background">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
