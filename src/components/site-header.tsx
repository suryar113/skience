
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github, FileText } from 'lucide-react';
import { useState, useEffect, useRef, createRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/biology', label: 'BIOLOGY' },
  ];
  
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef(navItems.map(() => createRef<HTMLAnchorElement>()));
  const [gliderStyle, setGliderStyle] = useState({});

  useEffect(() => {
    document.documentElement.className = 'dark';
    setTheme('dark');
  }, []);

  const updateGlider = (element: HTMLElement | null) => {
    if (element && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = element;

        setGliderStyle({
            transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
            width: `${offsetWidth}px`,
            height: `${offsetHeight}px`,
            opacity: 1
        });
    }
  };

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.href === pathname);
    if (activeIndex !== -1) {
      const activeItem = itemRefs.current[activeIndex]?.current;
      // Timeout to ensure the element is rendered and has dimensions
      setTimeout(() => updateGlider(activeItem), 50);
    } else {
        setGliderStyle({ opacity: 0 });
    }
  }, [pathname, navItems]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

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
  }

  const NavLinks = () => (
    <>
      <div className="relative" ref={navRef}>
        <div className="glider" style={gliderStyle} />
        <div className="flex items-center gap-4">
          {navItems.map((item, index) => (
            <Button
              key={item.href}
              variant="outline"
              size="sm"
              asChild
              className='nav-button'
              onMouseEnter={(e) => updateGlider(e.currentTarget)}
              onMouseLeave={() => {
                const activeIndex = navItems.findIndex(i => i.href === pathname);
                if (activeIndex !== -1) {
                  updateGlider(itemRefs.current[activeIndex].current);
                } else {
                  setGliderStyle({ ...gliderStyle, opacity: 0 });
                }
              }}
            >
              <Link href={item.href} ref={itemRefs.current[index]}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </div>
      <Button variant="outline" size="icon" asChild className="btn-hover-pop">
        <Link href="https://github.com/gtdsura/skience" target="_blank" rel="noopener noreferrer">
          <Github className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild className="btn-hover-pop">
        <Link href="https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
          <FileText className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Document</span>
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
      <nav className="hidden md:flex items-center gap-4" onMouseLeave={() => {
         const activeIndex = navItems.findIndex(i => i.href === pathname);
         if (activeIndex !== -1) {
            updateGlider(itemRefs.current[activeIndex].current);
         }
      }}>
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
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="outline"
              size="sm"
              asChild
              className={cn(
                'btn-hover-pop',
                pathname === item.href && 'btn-active-pop'
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button variant="outline" size="icon" asChild className="btn-hover-pop">
            <Link href="https://github.com/gtdsura/skience" target="_blank" rel="noopener noreferrer">
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
           <Button variant="outline" size="icon" asChild className="btn-hover-pop">
            <Link href="https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <FileText className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Document</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={toggleTheme} className="btn-hover-pop">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
