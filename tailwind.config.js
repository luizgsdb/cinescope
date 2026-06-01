/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#bce7ff',
          300: '#8ed8ff',
          400: '#59c0ff',
          500: '#33a1ff',
          600: '#1b80f5',
          700: '#1467e1',
          800: '#1753b6',
          900: '#19488f',
        },
        night: {
          900: '#0a0a0f',
          800: '#101019',
          700: '#16161f',
          600: '#1d1d29',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
