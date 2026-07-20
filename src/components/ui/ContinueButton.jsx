import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUp, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const ContinueButton = ({
  targetId,
  label = 'Continue',
  className = '',
  iconType = 'right' // 'right' | 'top'
}) => {
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);

  const handleClick = (e) => {
    e.preventDefault();
    if (!targetId) return;
    setActiveSection(targetId);
  };

  return (
    <div className={`w-full flex items-center justify-center py-6 z-30 ${className}`}>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="group relative inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF6B35] to-[#FF8C42] text-white font-outfit font-bold text-xs tracking-wider uppercase shadow-[0_6px_20px_rgba(255,107,53,0.4)] hover:shadow-[0_10px_28px_rgba(255,107,53,0.6)] border border-white/30 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden select-none"
      >
        {/* Animated Background Light Shimmer */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

        {/* Sparkle Icon */}
        <Sparkles className="w-3.5 h-3.5 text-orange-100 group-hover:rotate-45 transition-transform duration-300" />

        {/* Button Text */}
        <span className="relative z-10 font-extrabold drop-shadow-sm text-xs">
          {label}
        </span>

        {/* Arrow / Chevron */}
        <div className="relative z-10 p-1 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-[#FF6B35] transition-all duration-300 flex items-center justify-center">
          {iconType === 'top' ? (
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default ContinueButton;
