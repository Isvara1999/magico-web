/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        bone: '#F9F8F4',
        brand: '#005333',
        gold: '#D4AF37',
        dark: '#1A1A1A',
        charcoal: '#2D2D2D',
      },
      fontFamily: {
        serif: ['"Marcellus"', 'serif'],
        sans: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        'premium': '12px',
      },
      letterSpacing: {
        widest: '0.2em',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }
    }
  },
  plugins: [],
}