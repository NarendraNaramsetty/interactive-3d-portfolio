import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const { progress } = useProgress();
  const { loadingProgress, setLoadingProgress, isLoading } = usePortfolioStore();
  const [consoleMsg, setConsoleMsg] = useState('Booting system matrix...');

  // Programmatically increment loading progress as a fallback for procedural 3D scenes
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 5; // Increment by 5-14% at each step
      if (current >= 100) {
        current = 100;
        setLoadingProgress(100);
        clearInterval(interval);
      } else {
        setLoadingProgress(current);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [setLoadingProgress]);

  // Sync console messages with current load percentage
  useEffect(() => {
    if (loadingProgress < 15) {
      setConsoleMsg('Booting system matrix...');
    } else if (loadingProgress < 30) {
      setConsoleMsg('Initializing graphics engines...');
    } else if (loadingProgress < 45) {
      setConsoleMsg('Compiling custom vertex displacement shaders...');
    } else if (loadingProgress < 60) {
      setConsoleMsg('Injecting neural weight matrices...');
    } else if (loadingProgress < 75) {
      setConsoleMsg('Assembling 3D Skill Galaxy coordinates...');
    } else if (loadingProgress < 90) {
      setConsoleMsg('Synchronizing API WebSockets...');
    } else {
      setConsoleMsg('Secure connection established. Welcome recruiter.');
    }
  }, [loadingProgress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#FAFAFC] flex flex-col items-center justify-center px-6"
        >
          {/* Cyber matrix background lines */}
          <div className="absolute inset-0 cyber-grid opacity-10" />

          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
            {/* Morphing glow blob */}
            <div className="absolute w-60 h-60 bg-accent-indigo/10 blur-[80px] rounded-full -top-20 animate-pulse-slow" />
            
            {/* Initials Logo */}
            <div className="font-outfit font-extrabold tracking-wider text-xl md:text-2xl text-zinc-900 mb-6">
              Narendra Naramsetty Portfolio
            </div>

            {/* Glowing Outlined Progress bar */}
            <div className="w-full h-1 bg-obsidian-900 border border-zinc-200/50 rounded-full overflow-hidden mb-6 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-accent-indigo to-accent-teal shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Console Log statements simulation */}
            <div className="font-mono text-[10px] text-accent-teal/70 min-h-[16px] tracking-wide mb-2 uppercase">
              {consoleMsg}
            </div>

            {/* Percentage Display */}
            <div className="font-outfit text-xs text-zinc-500 font-semibold">
              SYSTEM INDEX LOADED: {loadingProgress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Preloader;
