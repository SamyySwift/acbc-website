/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a192f',
        secondary: {
          DEFAULT: '#d4af37',
          light: '#f3d473',
        },
        background: '#f9f9f9',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        'nav-height': '80px',
      }
    },
  },
  plugins: [],
}
