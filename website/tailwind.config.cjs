const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f24848',
          50: '#feeded',
          100: '#fcdada',
          200: '#fab6b6',
          300: '#f79191',
          400: '#f56d6d',
          500: '#f24848',
          600: '#c23a3a',
          700: '#912b2b',
          800: '#611d1d',
          900: '#300e0e',
        },
        jumbo: {
          DEFAULT: '#282828',
          25: '#f6f6f6',
          50: '#eaeaea',
          100: '#e2e2e2',
          150: '#d4d4d4',
          200: '#a9a9a9',
          300: '#7e7e7e',
          400: '#535353',
          500: '#282828',
          600: '#202020',
          700: '#181818',
          800: '#101010',
          900: '#080808',
        },
        ...defaultTheme.colors,
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
