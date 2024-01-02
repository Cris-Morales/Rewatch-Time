/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      height: {
        section: '95vh',
        card: '18rem',
        subsection: '90vh',
        form: '55vh',
      },
      fontFamily: {
        thunderman: ['Thunderman', 'san-serif'],
      },
      rounded: {
        home: 'border-radius: 9000px',
      },
      width: {
        card: '32rem',
        generatorForm: '45rem',
        authModal: '40rem',
        carousel: '97vw',
        navEdge: '10%',
      },
      minWidth: {
        card: '50%',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
};
