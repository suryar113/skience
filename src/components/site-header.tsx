
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github, FileText } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/biology', label: 'BIOLOGY' },
];

const actionItems = [
    { href: 'https://github.com/gtdsura/skience', icon: Github, label: 'GitHub' },
    { href: 'https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing', icon: FileText, label: 'Document' },
];

export function SiteHeader() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number } | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

  const calculatePillPosition = (element: HTMLElement | null) => {
    if (element && navRef.current) {
      setPillStyle({
        left: element.offsetLeft,
        width: element.clientWidth,
        opacity: 1,
      });
    }
  };
  
  const resetPillToActive = () => {
    const activeIndex = [...navItems, ...actionItems, {label: 'theme-toggle'}].findIndex(item => 'href' in item && item.href === pathname);
    const activeLink = linkRefs.current[activeIndex];
    
    if (activeLink) {
      calculatePillPosition(activeLink);
    } else if (pillStyle) {
        // If no active link (e.g. on a different page or no initial match), find HOME
        const homeIndex = navItems.findIndex(item => item.href === '/');
        const homeLink = linkRefs.current[homeIndex];
        if (homeLink) {
          calculatePillPosition(homeLink);
        } else {
          // Fallback: hide the pill if no active or home link found
          setPillStyle({ ...pillStyle, opacity: 0 });
        }
    }
  };

  useEffect(() => {
    document.documentElement.className = 'dark';
    setTheme('dark');
    
    const timer = setTimeout(() => {
        resetPillToActive();
    }, 100);

    // Recalculate on resize
    window.addEventListener('resize', resetPillToActive);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resetPillToActive);
    };
  }, [pathname]);


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
  };

  return (
    <header className="flex justify-between items-center p-4 md:p-6 relative z-50">
      <h1 className="text-2xl font-bold tracking-widest uppercase transition-transform duration-200 ease-in-out hover:scale-110">
        <Link href="/" className="text-gradient-rainbow" data-text="Skience">Skience</Link>
      </h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center">
        <ul
          ref={navRef}
          onMouseLeave={resetPillToActive}
          className="nav-pill-container"
        >
          {pillStyle && (
            <li
              className="nav-pill"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
              }}
            />
          )}
          {navItems.map((item, index) => (
            <li
              key={item.href}
              ref={el => linkRefs.current[index] = el}
              onMouseEnter={(e) => calculatePillPosition(e.currentTarget)}
              className={cn("nav-pill-item", { 'active': pathname === item.href})}
            >
              <Link href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className='nav-pill-separator'></li>
          {actionItems.map((item, index) => (
             <li
                key={item.label}
                ref={el => linkRefs.current[navItems.length + index] = el}
                onMouseEnter={(e) => calculatePillPosition(e.currentTarget)}
                className="nav-pill-item"
             >
                <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                </Link>
             </li>
          ))}
          <li
            ref={el => linkRefs.current[navItems.length + actionItems.length] = el}
            onMouseEnter={(e) => calculatePillPosition(e.currentTarget)}
            className="nav-pill-item"
          >
            <button onClick={toggleTheme}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </li>
        </ul>
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
