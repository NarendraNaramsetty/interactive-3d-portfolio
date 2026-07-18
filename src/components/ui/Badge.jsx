import React from 'react';

export const Badge = ({
  children,
  className = '',
  variant = 'indigo', // 'indigo' | 'teal' | 'purple' | 'success' | 'warning'
  ...props
}) => {
  const variants = {
    indigo: 'bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20 shadow-[0_0_10px_rgba(99,102,241,0.05)]',
    teal: 'bg-accent-teal/10 text-accent-teal border border-accent-teal/20 shadow-[0_0_10px_rgba(20,184,166,0.05)]',
    purple: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20 shadow-[0_0_10px_rgba(168,85,247,0.05)]',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-outfit ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
