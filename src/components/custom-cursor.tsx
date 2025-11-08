
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const CursorIcon = ({ className }: { className?: string }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transform -rotate-12", className)}
    >
      <path
        d="M9.98911 1.01166C10.9892 -0.337222 13.0108 -0.337222 14.0109 1.01166L22.9883 12.0123C24.3101 13.6521 23.2354 16.25 21.0774 16.25H2.9226C0.764634 16.25 -0.310086 13.6521 1.01173 12.0123L9.98911 1.01166Z"
        fill="currentColor"
      />
    </svg>
  );

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
    
    // Hide system cursor
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
      <div className="cursor-outline absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300">
        <CursorIcon className="h-10 w-10 text-white" />
      </div>
      <div className="cursor-dot absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300">
        <CursorIcon className="h-6 w-6 text-black" />
      </div>
    </div>
  );
};
