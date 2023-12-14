/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      height: {
        section: '90vh',
        card: '45vh',
      },
    },
  },
  plugins: [],
};
