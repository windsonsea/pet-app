/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#fef3ee', 100: '#fde4d7', 200: '#fbc5ae', 300: '#f79d7b', 400: '#f26b45', 500: '#ef4822', 600: '#e03118', 700: '#ba2216', 800: '#941d1a', 900: '#781c19' },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
    },
  },
  plugins: [],
};
