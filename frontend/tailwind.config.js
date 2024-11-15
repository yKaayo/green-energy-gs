/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'yellow': '#FFD700',
        'yellow-100': '#fbe46280',
      },
      fontFamily: {
        sans: ["Varela Round", "sans-serif"],
      },
    },
    plugins: [
      require('daisyui'),
    ],
  },
};
