"use client"

import { motion } from "framer-motion"

/**
 * @fileoverview Bio-Digital Loading Transition (Idea 3)
 * 
 * Implements a global staggered exit/entrance effect when navigating routes.
 * Features a digital "membrane" wipe using vertical slices with tech textures.
 */

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="fixed inset-0 z-[100] bg-background flex flex-col pointer-events-none"
      >
        <div className="flex-1 flex">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.08 * i,
              }}
              style={{ originY: 0 }}
              className="flex-1 bg-white/5 backdrop-blur-3xl border-r border-white/5 relative overflow-hidden"
            >
              {/* Internal tech-grid for the digital look */}
              <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
              
              {/* Digital data stream effect */}
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: Math.random() }}
                className="absolute inset-x-0 h-1/4 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  )
}