import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import narendraImage from '../../assets/narendra.jpg';

export const ProfileCard = () => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 8 degree maximum tilt for premium interactive feel
    const tiltX = (mouseY / (rect.height / 2)) * -8;
    const tiltY = (mouseX / (rect.width / 2)) * 8;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div className="relative w-full h-[380px] md:h-[500px] flex items-center justify-center select-none">
      {/* Background radial gradient glow (expands on hover) */}
      <div 
        className="absolute w-[240px] md:w-[320px] h-[240px] md:h-[320px] bg-gradient-to-tr from-[#FF6B35]/12 to-[#FF8C42]/8 rounded-full blur-[90px] pointer-events-none transition-transform duration-700 ease-out" 
        style={{ transform: hovered ? 'scale(1.18)' : 'scale(1.0)' }}
      />

      {/* Subtle Breathing Float Motion Container */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        {/* Interactive Tiltable Card Frame */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: hovered ? 'none' : 'transform 0.4s ease-out',
          }}
          className="relative w-[280px] h-[340px] md:w-[320px] md:h-[390px] rounded-2xl bg-white/80 backdrop-blur-md p-3 border border-white/60 shadow-[0_15px_35px_rgba(255,107,53,0.04)] hover:shadow-[0_25px_50px_rgba(255,107,53,0.08)] transition-all duration-300 cursor-pointer"
        >
          {/* Inner Image Shield with static borders */}
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-200/50 bg-zinc-50">
            {/* Narendra's HD profile image */}
            <img
              src={narendraImage}
              alt="Narendra Naramsetty"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: hovered ? 'scale(1.03)' : 'scale(1.0)' }}
            />

            {/* Static diagonal glass light reflections */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none mix-blend-overlay" />

            {/* Premium diagonal sweep light animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-90"
                style={{
                  animation: 'lightSweep 4.8s infinite ease-in-out',
                }}
              />
            </div>
          </div>

          {/* Premium Thin white glow ring highlight */}
          <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none mix-blend-overlay" />
          
          {/* Subtle Corner Tech Accents */}
          <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#FF6B35]/30 rounded-tl" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#FF6B35]/30 rounded-tr" />
          <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#FF6B35]/30 rounded-bl" />
          <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#FF6B35]/30 rounded-br" />
        </div>
      </motion.div>

      {/* Floating Sparkle Particles in background space */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sparkle 1 */}
        <div className="absolute top-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#FF6B35]/30 animate-pulse" />
        {/* Sparkle 2 */}
        <div className="absolute top-[68%] right-[12%] w-2 h-2 rounded-full bg-[#FF8C42]/20 animate-bounce-slow" />
        {/* Sparkle 3 */}
        <div className="absolute bottom-[18%] left-[28%] w-1 h-1 rounded-full bg-zinc-300/40 animate-pulse" />
        {/* Sparkle 4 */}
        <div className="absolute top-[12%] right-[26%] w-2 h-2 rounded-full bg-[#FF6B35]/15 animate-ping" />
      </div>

      {/* Custom keyframes style definitions */}
      <style>{`
        @keyframes lightSweep {
          0% { left: -100%; }
          28% { left: 160%; }
          100% { left: 160%; }
        }
        .animate-bounce-slow {
          animation: bounceSlow 6s infinite ease-in-out;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
