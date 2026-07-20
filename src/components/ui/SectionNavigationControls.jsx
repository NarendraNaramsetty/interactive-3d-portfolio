import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUp, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const sectionSequence = [
  { id: 'hero', name: 'Home', nextLabel: 'Continue to Story' },
  { id: 'about', name: 'Story', nextLabel: 'Continue to Internships' },
  { id: 'timeline', name: 'Internships', nextLabel: 'Continue to AI Platform' },
  { id: 'flagship', name: 'Live AI Platform', nextLabel: 'Continue to Skill Galaxy' },
  { id: 'skills', name: 'Galaxy', nextLabel: 'Continue to Projects' },
  { id: 'other-projects', name: 'Projects', nextLabel: 'Continue to Milestones' },
  { id: 'credentials', name: 'Milestones', nextLabel: 'Continue to Connect' },
  { id: 'contact', name: 'Connect', nextLabel: 'Return to Top' },
];

export const SectionNavigationControls = () => {
  const { activeSection, setActiveSection } = usePortfolioStore();

  const currentIndex = sectionSequence.findIndex(s => s.id === activeSection);
  const currentSection = sectionSequence[currentIndex < 0 ? 0 : currentIndex];

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < sectionSequence.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      setActiveSection(sectionSequence[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setActiveSection(sectionSequence[currentIndex + 1].id);
    } else {
      setActiveSection(sectionSequence[0].id); // Loop back to Top
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.15)] select-none">
      {/* Previous Button */}
      {hasPrevious && (
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.06, x: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="group relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white font-outfit font-bold text-xs tracking-wider uppercase hover:bg-zinc-800 shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Previous</span>
        </motion.button>
      )}

      {/* Step Indicator Badge */}
      <span className="text-[10px] font-mono font-extrabold text-zinc-500 px-1 select-none">
        0{currentIndex + 1} / 0{sectionSequence.length}
      </span>

      {/* Continue / Next Button */}
      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.06, x: 2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="group relative flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF6B35] to-[#FF8C42] text-white font-outfit font-bold text-xs tracking-wider uppercase shadow-[0_4px_16px_rgba(255,107,53,0.4)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.6)] border border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <Sparkles className="w-3 h-3 text-orange-100 group-hover:rotate-45 transition-transform duration-300" />
        <span className="drop-shadow-sm">
          {hasNext ? 'Continue' : 'Return to Top'}
        </span>
        <div className="p-0.5 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#FF6B35] transition-all duration-300">
          {hasNext ? (
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default SectionNavigationControls;
