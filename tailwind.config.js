/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#FFFFFF', // Pure White background
          900: '#FFF8F2', // Warm secondary background
          800: '#F5F5F7', // Light gray background
          700: '#E4E4E7', // Zinc borders
          600: '#666666', // Secondary text
        },
        accent: {
          indigo: '#FF6B35', // Premium Orange
          teal: '#FF8C42', // Orange Glow
          purple: '#F4B400', // Gold
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
