/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable JIT (Just-In-Time) mode for better performance
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
  // Enable dark mode using class strategy
  darkMode: 'class',
}