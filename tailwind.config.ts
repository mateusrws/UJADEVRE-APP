/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Exemplo para uma pasta src
  theme: {
    extend: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        }
    },
  },
  plugins: [],
}
