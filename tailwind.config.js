/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, yarn-inspired color palette that crocheters will love
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5EBE0',
        },
        rose: {
          DEFAULT: '#D4A5A5',
          light: '#E8C5C5',
          dark: '#B88A8A',
        },
        sage: {
          DEFAULT: '#A8B5A0',
          light: '#C5D1BF',
          dark: '#8A9B82',
        },
        lavender: {
          DEFAULT: '#C5B9D6',
          light: '#DDD5E8',
          dark: '#A89BBF',
        },
        warmBrown: {
          DEFAULT: '#8B7355',
          light: '#A89176',
          dark: '#6E5A43',
        },
        deepPurple: {
          DEFAULT: '#6B4E71',
          light: '#8A6D90',
          dark: '#533B58',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
