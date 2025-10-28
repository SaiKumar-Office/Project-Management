/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: "#fff8dc",
          200: "#ffeb99",
          300: "#ffd966",
          400: "#ffcc33",
          500: "#ffbf00", // main gold color
          600: "#cc9900",
          700: "#996600",
        },
      },
    },
  },
  plugins: [],
}
