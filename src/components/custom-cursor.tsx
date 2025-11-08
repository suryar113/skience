
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
        d="M4.28 3.321a2.173 2.173 0 0 1 3.28-.214l11.43 10.725a2.173 2.173 0 0 1-1.396 3.873H6.467a2.173 2.173 0 0 1-2.13-2.21l-.057-9.174Z"
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
