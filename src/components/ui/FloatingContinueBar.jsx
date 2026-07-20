import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { ChevronRight, ArrowUp, Sparkles } from 'lucide-react';

const sectionSequence = [
  { id: 'hero', target: 'about', label: 'Continue to Story' },
  { id: 'about', target: 'timeline', label: 'Continue to Internships' },
  { id: 'timeline', target: 'flagship', label: 'Continue to AI Platform' },
  { id: 'flagship', target: 'skills', label: 'Continue to Skill Galaxy' },
  { id: 'skills', target: 'other-projects', label: 'Continue to Projects' },
  { id: 'other-projects', target: 'credentials', label: 'Continue to Milestones' },
  { id: 'credentials', target: 'contact', label: 'Continue to Connect' },
  { id: 'contact', target: 'hero', label: 'Return to Top' },
];

export const FloatingContinueBar = () => {
  const { activeSection, setActiveSection } = usePortfolioStore();

  // Find current section config
  const currentConfig = sectionSequence.find(s => s.id === activeSection) || sectionSequence[0];
  const currentIndex = sectionSequence.findIndex(s => s.id === activeSection);
  const isLastSection = activeSection === 'contact';

  const handleContinueClick = () => {
    setActiveSection(currentConfig.target);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center space-x-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
    >
      {/* Page step indicator */}
      <span className="text-[10px] font-mono font-bold text-zinc-400 px-1">
        0{currentIndex + 1} / 0{sectionSequence.length}
      </span>

      {/* Sleek reduced size orange button */}
      <motion.button
        onClick={handleContinueClick}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF6B35] to-[#FF8C42] text-white font-outfit font-bold text-xs tracking-wide shadow-[0_4px_14px_rgba(255,107,53,0.4)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.6)] border border-white/20 transition-all duration-300 select-none overflow-hidden"
      >
        <Sparkles className="w-3 h-3 text-orange-100 group-hover:rotate-12 transition-transform duration-200" />
        <span className="drop-shadow-sm font-outfit font-bold text-xs">
          {currentConfig.label}
        </span>
        <div className="p-0.5 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#FF6B35] transition-all duration-300">
          {isLastSection ? (
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>
      </motion.button>
    </motion.div>
  );
};

export default FloatingContinueBar;
