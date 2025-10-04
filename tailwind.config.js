/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin 12s linear infinite reverse',
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-delay-1': 'fadeIn 1s ease-in-out 0.3s both',
        'fade-in-delay-2': 'fadeIn 1s ease-in-out 0.6s both',
        'fade-in-delay-3': 'fadeIn 1s ease-in-out 0.9s both',
        'fade-in-delay-4': 'fadeIn 1s ease-in-out 1.2s both',
        'fade-in-delay-5': 'fadeIn 1s ease-in-out 1.5s both',
        'shine': 'shine 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

