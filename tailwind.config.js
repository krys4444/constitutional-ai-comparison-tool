export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anthropic': {
          50: '#fef5f1',
          100: '#fde9df',
          200: '#fbd0bf',
          300: '#f7ad94',
          400: '#f28967',
          500: '#D97757',
          600: '#c15438',
          700: '#a1422d',
          800: '#853a28',
          900: '#6f3326',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
