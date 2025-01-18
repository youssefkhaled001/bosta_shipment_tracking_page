/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'teal-light': '#F3FAFB',
        'background-footer-gradient': '#1DBDCD',
        'light-gray': '#E4E7EC',
        'shadow-gray': '#1D29390D',
        'text-dark-gray': '#111619',
        'text-light-gray': '#667085',
        'teal': '#0098A5',
        'red': '#E30613'
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}