
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

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
    
    document.body.style.cursor = 'none';

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const cursorClasses = cn("custom-cursor", {
    "link-hover": isHoveringLink,
  });

  return (
    <div className={cn(cursorClasses, "pointer-events-none fixed top-0 left-0 z-[9999]")}
         style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
      <div className="cursor-outline absolute -translate-x-1/2 -translate-y-1/2"></div>
      <div className="cursor-dot absolute -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};
