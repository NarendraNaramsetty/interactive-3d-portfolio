import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Menu, X, ArrowUpRight, Home, User, Briefcase, Cpu, Award, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { activeSection, setActiveSection } = usePortfolioStore();
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
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'Story', icon: User },
    { id: 'timeline', label: 'Internships', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'credentials', label: 'Milestones', icon: Award },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);
    setActiveSection(id);
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
              className="p-2 rounded-xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300 shadow-sm"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark backdrop overlay that dims the background and closes the menu when clicked */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-[2px] md:hidden"
            />

            {/* Stylish pop-up navigation card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className="fixed top-20 right-6 z-50 w-[calc(100vw-3rem)] max-w-[340px] bg-white/95 backdrop-blur-xl border border-zinc-200/60 shadow-2xl rounded-2xl p-5 md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/50">
                <span className="font-outfit text-xs uppercase font-extrabold tracking-wider text-zinc-400">
                  Navigation
                </span>
                {/* Available for roles badge */}
                <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-medium font-outfit">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>Active & Available</span>
                </div>
              </div>

              {/* Navigation List */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 w-full text-left font-outfit group ${
                        isActive
                          ? 'bg-[#FF6B35]/10 text-[#FF6B35] shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isActive ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'bg-zinc-100 text-zinc-400 group-hover:text-zinc-650'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold">{item.label}</span>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDot"
                          className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Call To Action Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-200/50">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:shadow-[0_4px_12px_rgba(255,107,53,0.25)] text-white text-sm font-bold font-outfit transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5 opacity-80" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
