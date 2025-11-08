"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
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

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const cursorClasses = cn("custom-cursor", {
    "link-hover": isHoveringLink,
  });

  return (
    <div className={cursorClasses}>
      <div
        className="cursor-outline fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-300"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      ></div>
      <div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      ></div>
    </div>
  );
};
