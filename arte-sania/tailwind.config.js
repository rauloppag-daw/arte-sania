/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      openreg: ["openreg", "Segoe UI", 'Arial'],
      openbold : ["openbold", "Arial Black"]
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

