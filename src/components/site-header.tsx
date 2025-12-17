
'use client';

import Link from 'next/link';
import { Moon, Sun, Github, FileText } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/biology', label: 'BIOLOGY' },
];

const actionItems = [
    { href: 'https://github.com/gtdsura/skience', icon: Github, label: 'GitHub' },
    { href: 'https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing', icon: FileText, label: 'Document' },
];

const Tab = ({ children, setPosition, isCurrent }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={cn("nav-pill-item", isCurrent ? "text-primary" : "")}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="nav-pill"
    />
  );
};

export function SiteHeader() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const allItems = [...navItems, ...actionItems, { label: 'theme-toggle' }];
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

  const resetPillToActive = () => {
    let activeIndex = navItems.findIndex(item => item.href === pathname);

    if (activeIndex === -1 && pathname.startsWith('/biology')) {
      activeIndex = navItems.findIndex(item => item.href === '/biology');
    } else if (activeIndex === -1) {
      activeIndex = navItems.findIndex(item => item.href === '/');
    }
    
    const activeLink = linkRefs.current[activeIndex];
    
    if (activeLink) {
        const { offsetLeft, clientWidth } = activeLink;
        setPosition({ left: offsetLeft, width: clientWidth, opacity: 1 });
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.className = storedTheme;
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
        resetPillToActive();
    }, 100);

    const handleResize = () => resetPillToActive();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          onMouseLeave={resetPillToActive}
          className="nav-pill-container"
        >
          {navItems.map((item, index) => (
            <Tab key={item.href} setPosition={setPosition} isCurrent={pathname === item.href}>
              <Link href={item.href} ref={el => linkRefs.current[index] = el ? el.parentElement : null}>{item.label}</Link>
            </Tab>
          ))}
          <li className='nav-pill-separator'></li>
          {actionItems.map((item, index) => (
             <Tab key={item.label} setPosition={setPosition} isCurrent={false}>
                <Link href={item.href} target="_blank" rel="noopener noreferrer" ref={el => linkRefs.current[navItems.length + index] = el ? el.parentElement : null}>
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                </Link>
             </Tab>
          ))}
          <Tab setPosition={setPosition} isCurrent={false}>
            <button onClick={toggleTheme} ref={el => linkRefs.current[navItems.length + actionItems.length] = el ? el.parentElement : null}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </Tab>
          <Cursor position={position} />
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
            <button
              key={item.href}
              className={cn(
                'btn-hover-pop',
                pathname === item.href && 'btn-active-pop'
              )}
              onClick={() => {
                window.location.href = item.href;
                toggleMenu();
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-4">
            <Link href="https://github.com/gtdsura/skience" target="_blank" rel="noopener noreferrer" className="btn-hover-pop p-2 rounded-full border border-input">
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://docs.google.com/document/d/1VG5CmHf8K85TarJBt-SRZz5yli5HhpcNfcsmavNd59A/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-hover-pop p-2 rounded-full border border-input">
              <FileText className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Document</span>
            </Link>
            <button onClick={toggleTheme} className="btn-hover-pop p-2 rounded-full border border-input">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
