'use client';

import Link from 'next/link';
import { Github, FileText, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { SearchCommand } from './search-command';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/biology', label: 'BIOLOGY' },
];

const actionItems = [
    { href: 'https://github.com/gtdsura/skience', icon: Github, label: 'GitHub' },
    { href: 'https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing', icon: FileText, label: 'Document' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isNavItemActive = (item: { href: string }) => {
    if (item.href === '/') {
      return pathname === '/';
    }
    if (item.href === '/biology') {
      return pathname.startsWith('/biology') || pathname.startsWith('/notes');
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
    <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    <header className="flex justify-between items-center p-4 md:p-6 relative z-50">
      <h1 className="text-2xl font-bold tracking-widest uppercase transition-transform duration-200 ease-in-out hover:scale-110">
        <Link href="/" className="text-gradient-rainbow" data-text="Skience">Skience</Link>
      </h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        {navItems.map((item) => {
          const isActive = isNavItemActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium uppercase transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {item.label}
            </Link>
          );
        })}
        
        <div className="flex items-center gap-1">
            {actionItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                </Link>
            ))}
            <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
            >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </button>
        </div>
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
          {navItems.map((item) => {
            const isActive = isNavItemActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className={cn(
                  'p-2 rounded-lg',
                  isActive ? 'bg-accent text-accent-foreground' : ''
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex gap-4">
            <button onClick={() => { setSearchOpen(true); toggleMenu(); }} className="p-3 rounded-full hover:bg-accent border">
              <Search className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Search</span>
            </button>
            <Link href="https://github.com/gtdsura/skience" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-accent border">
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-accent border">
              <FileText className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Document</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}
