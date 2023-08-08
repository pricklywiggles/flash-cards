/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        stratos: {
          DEFAULT: '#00094D',
          50: '#41007A',
          100: '#350075',
          200: '#21006B',
          300: '#100061',
          400: '#020057',
          500: '#00094D',
          600: '#00103D',
          700: '#00132E',
          800: '#00111F',
          900: '#000B0F',
          950: '#000608'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      animation: {
        'pulse-slow': 'pulse 4.7s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: []
};
