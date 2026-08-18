/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0908",
        surface: {
          DEFAULT: "#14110F",
          muted: "#1B1714",
          card: "rgba(20, 17, 15, 0.65)",
          glass: "rgba(255, 255, 255, 0.03)",
        },
        gold: {
          50: "#FAF6EF",
          100: "#F4EBDC",
          200: "#E8D5B5",
          300: "#DBBE8E",
          400: "#CFAA67",
          500: "#D4AF37", // Imperial Gold
          600: "#B89228",
          700: "#8C6D1B",
          800: "#614A11",
          900: "#362908",
          shimmer: "#F3E3C3",
          amber: "#C5A880",
        },
        cream: {
          50: "#FDFAF7",
          100: "#F9F4EE",
          200: "#F2E8DC",
          300: "#E7D6C4",
          400: "#D4C2AD",
          500: "#C2AE97",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        arabic: ['"Amiri"', '"Aref Ruqaa"', 'serif'],
        kufi: ['"Reem Kufi"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.35em',
      },
      animation: {
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
    },
  },
  plugins: [],
};