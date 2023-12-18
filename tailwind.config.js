/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      height: {
        section: '95vh',
        card: '45vh',
        subsection: '90vh',
      },
      fontFamily: {
        thunderman: ['Thunderman', 'san-serif'],
      },
      rounded: {
        home: 'border-radius: 9000px',
      },
    },
  },
  plugins: [],
};
