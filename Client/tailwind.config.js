/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      // Custom Breakpoints
      'xsm': { 'max': '360px' },
      // => @media (max-width: 360px) { ... }

      'sm': { 'max': '700px' },
      // => @media (max-width: 700px) { ... }

      'table': { 'max': '1160px' },
      // => @media (max-width: 1160px) { ... }

      // Predefined Breakpoints
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}