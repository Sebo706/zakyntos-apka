/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sea: '#2f7f86',
        deepSea: '#1f5c64',
        foam: '#e6f7f5',
        sand: '#f5ead3',
        olive: '#6f8a57',
        coral: '#d96f56',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(31, 92, 100, 0.12)',
      },
    },
  },
  plugins: [],
};