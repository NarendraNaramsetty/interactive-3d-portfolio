import React from 'react';

export const Button = ({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'neon' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 active:scale-98 disabled:opacity-50 disabled:pointer-events-none font-outfit select-none';
  
  const variants = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md shadow-zinc-900/10 border border-transparent',
    secondary: 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200 shadow-sm',
    neon: 'relative bg-white text-accent-indigo hover:text-indigo-600 border border-accent-indigo/30 hover:border-accent-indigo hover:bg-accent-indigo/5 transition-all',
    ghost: 'bg-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : children}
    </button>
  );
};
export default Button;
