// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6fffa",
          100: "#e6fff0",
          300: "#66d19a",
          500: "#2bb673", // primary green
          700: "#1f8a53"
        },
        ui: {
          bg: "#FFFFFF",
          muted: "#F3F7F4",
          accent: "#E8F8EE"
        }
      },
      borderRadius: {
        xl: "1rem",
        '2xl': '1.5rem'
      },
      boxShadow: {
        soft: "0 6px 20px rgba(32, 64, 32, 0.08)"
      }
    }
  },
  plugins: [],
};
