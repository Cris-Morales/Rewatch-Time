/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      height: {
        section: '90vh',
        card: '45vh',
        subsection: '85vh',
      },
      fontFamily: {
        thunderman: ['Thunderman', 'san-serif'],
      },
    },
  },
  plugins: [],
};
