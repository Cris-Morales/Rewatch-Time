/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      height: {
        section: '95vh',
        card: '18rem',
        subsection: '90vh',
      },
      fontFamily: {
        thunderman: ['Thunderman', 'san-serif'],
      },
      rounded: {
        home: 'border-radius: 9000px',
      },
      width: {
        card: '32rem',
      },
    },
  },
  plugins: [],
};
