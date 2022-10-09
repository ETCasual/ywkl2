/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5454C5",
        secondary: "#639CD9",
        darkerPrimary: "#342056",
        blackout: "#220E24",
      },
    },
  },
  plugins: [],
};
