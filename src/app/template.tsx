'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * @fileoverview "Digital De-Sequencing" Page Transition.
 * 
 * This component handles the high-tech transition between pages.
 * It simulates a biological data re-assembly process using staggered
 * grid animations and chromatic aberration.
 */

const GRID_SIZE = 8; // 8x8 grid for performance

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    setIsMounting(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative min-h-screen overflow-hidden"
      >
        {/* The Digital De-Sequencing Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] grid grid-cols-8 grid-rows-8">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 1, scale: 1 },
                animate: { 
                  opacity: 0, 
                  scale: 0.8,
                  transition: { 
                    duration: 0.8, 
                    delay: (i % 8 + Math.floor(i / 8)) * 0.05,
                    ease: [0.23, 1, 0.32, 1]
                  } 
                },
                exit: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.6, 
                    delay: (i % 8 + Math.floor(i / 8)) * 0.03,
                    ease: "easeInOut" 
                  } 
                }
              }}
              className="bg-black/80 backdrop-blur-sm border-[0.5px] border-purple-500/20 flex items-center justify-center overflow-hidden"
            >
              {/* Random Base Pair "A, T, C, G" flashes */}
              <motion.span 
                className="text-[10px] font-mono text-purple-400/40 select-none"
                animate={{ 
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: 2,
                  delay: Math.random() * 0.8
                }}
              >
                {['A', 'T', 'C', 'G'][Math.floor(Math.random() * 4)]}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Content Animation */}
        <motion.div
          variants={{
            initial: { opacity: 0, filter: "blur(10px) brightness(1.5)" },
            animate: { 
              opacity: 1, 
              filter: "blur(0px) brightness(1)",
              transition: { duration: 1.2, ease: "easeOut" }
            },
            exit: { 
              opacity: 0, 
              filter: "blur(20px) contrast(2)",
              transition: { duration: 0.6, ease: "easeIn" }
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
