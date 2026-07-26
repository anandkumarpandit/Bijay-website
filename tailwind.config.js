/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nepal: {
          crimson: "#DC143C",
          blue: "#003893",
          gold: "#F59E0B",
          emerald: "#10B981"
        },
        glass: {
          surface: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.12)",
          highlight: "rgba(255, 255, 255, 0.2)",
          card: "rgba(15, 23, 42, 0.65)",
          dark: "rgba(7, 11, 22, 0.85)"
        }
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
        heavy: '32px'
      },
      boxShadow: {
        'glass-glow': '0 0 35px -5px rgba(220, 20, 60, 0.3), 0 0 15px -5px rgba(0, 56, 147, 0.4)',
        'glass-card': '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.4)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.4)',
      },
      fontFamily: {
        sans: ['Mukta', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
