import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { activeSection } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Story' },
    { id: 'timeline', label: 'Internships' },
    { id: 'skills', label: 'Galaxy' },
    { id: 'credentials', label: 'Milestones' },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-100/80 border-b border-zinc-200/60 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center cursor-pointer font-outfit font-extrabold tracking-wider group"
          >
            <span className="text-zinc-900 text-lg group-hover:text-accent-indigo transition-colors"></span>
            <span className="text-accent-teal text-xs px-1.5 py-0.5 ml-1 border border-accent-teal/20 rounded bg-accent-teal/5 font-mono group-hover:bg-accent-teal/10 transition-colors">
             
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 glass-panel px-3 py-1.5 rounded-full border border-zinc-200/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors font-outfit ${
                  activeSection === item.id ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-zinc-200 rounded-full border border-zinc-200/50 shadow-inner"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop Contact CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('contact')}
              className="group flex items-center space-x-1 font-outfit text-xs font-semibold px-4 py-2 border border-accent-indigo/20 rounded-lg bg-accent-indigo/5 text-accent-indigo hover:bg-accent-indigo hover:text-zinc-900 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] z-40 bg-[#FAFAFC]/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 md:hidden border-t border-obsidian-900"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xl font-semibold font-outfit ${
                  activeSection === item.id ? 'text-accent-indigo font-bold' : 'text-zinc-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center space-x-1 text-xl font-bold font-outfit text-accent-teal"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
