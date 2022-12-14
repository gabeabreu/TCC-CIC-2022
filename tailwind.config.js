/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      visibility: ['group-hover'],
      backgroundImage: {
        'hero-background': "url('/assets/hero-background.svg')",
      },
      colors: {
        'mds-white': '#FDFDFD',
        'mds-red': '#D65745',
        'mds-dark-red': '#a53f32',
        'mds-cyan': '#83F0FF',
        'mds-purple': '#8F33E7',
        'mds-dark-purple': '#690BC1',
        'mds-pink': '#FF05E6',
        'mds-gray-100': '#A1A1A1',
        'mds-gray-200': '#626262',
        'mds-gray-300': '#2D2D2D',
        'mds-gray-400': '#19191B',
        'mds-gray-500': '#141118 ',
        'mds-black': '#0E0E0E ',
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('child', '& > *');
      addVariant('p', '& > p');
      addVariant('strong', '& > strong');
      addVariant('child-hover', '& > *:hover');
    },
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
