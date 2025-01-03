/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f2',
          600: '#5d0606',
          700: '#4d0505'
        }
      }
    },
  },
  plugins: [],
};