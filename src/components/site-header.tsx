'use client';

import Link from 'next/link';
import { Github, FileText, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { SearchCommand } from './search-command';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/biology', label: 'Biology' },
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
    <header className="flex justify-between items-center p-4 md:p-6 relative z-40 bg-background/5 backdrop-blur-md border-b border-white/5">
      <h1 className="text-2xl font-bold transition-all duration-300 ease-in-out hover:scale-110 font-logo group">
        <Link href="/" className="text-gradient-rainbow drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" data-text="Skience">Skience</Link>
      </h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => {
          const isActive = isNavItemActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 rounded-md font-logo text-2xl transition-all duration-300 relative group',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 animated-glowing-border rounded-full" />
              )}
            </Link>
          );
        })}
        
        <div className="flex items-center gap-1 ml-4 border-l border-white/10 pl-4">
            {actionItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all duration-200"
                >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                </Link>
            ))}
            <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all duration-200 group flex items-center gap-2"
            >
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
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
        "fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 transition-opacity duration-300 ease-in-out md:hidden",
        { "opacity-100 visible": menuOpen, "opacity-0 invisible": !menuOpen }
      )}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className={cn(
                  'p-2 rounded-lg font-logo text-5xl transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex gap-6 mt-8">
            <button onClick={() => { setSearchOpen(true); toggleMenu(); }} className="p-4 rounded-full bg-white/5 border border-white/10">
              <Search className="h-6 w-6" />
            </button>
            <Link href="https://github.com/gtdsura/skience" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10">
              <Github className="h-6 w-6" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}
