import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  glow = 'indigo', // 'indigo' | 'teal' | 'none'
  hoverEffect = true,
  ...props
}) => {
  const glowClasses = {
    indigo: 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.08),inset_0_1px_0_0_rgba(255,255,255,0.04)]',
    teal: 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.8),0_0_25px_rgba(20,184,166,0.08),inset_0_1px_0_0_rgba(255,255,255,0.04)]',
    none: 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.8)]',
  };

  const baseStyles = 'glass-card rounded-xl p-6 overflow-hidden';
  const hoverStyles = hoverEffect ? glowClasses[glow] : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
