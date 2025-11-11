
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let mouseX = -100;
    let mouseY = -100;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
        cursorEl.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        requestAnimationFrame(animateCursor);
    };
    
    requestAnimationFrame(animateCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHoveringLink(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHoveringLink(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleWindowFocus = () => setIsVisible(true);
    const handleWindowBlur = () => setIsVisible(false);

    document.body.style.cursor = 'none';

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
      document.body.style.cursor = 'auto';
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const cursorClasses = cn("custom-cursor", {
    "link-hover": isHoveringLink,
    "hidden": !isVisible
  });

  return (
    <div ref={cursorRef} className={cn(cursorClasses, "pointer-events-none fixed top-0 left-0 z-[9999]")}>
      <div className="cursor-outline absolute -translate-x-1/2 -translate-y-1/2"></div>
      <div className="cursor-dot absolute -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};
