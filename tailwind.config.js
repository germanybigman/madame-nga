/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F0',
        'cream-dark': '#F0E9DD',
        'cream-light': '#FDFBF7',
        forest: {
          DEFAULT: '#1B3A2F',
          light: '#2A5247',
          dark: '#0F2419',
        },
        terracotta: {
          DEFAULT: '#C65D3B',
          light: '#D67E5E',
          dark: '#A04A2E',
        },
        gold: {
          DEFAULT: '#C4A661',
          light: '#D9C28A',
          dark: '#A08543',
        },
        stone: {
          700: '#44403C',
          600: '#57534E',
          500: '#78716C',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
