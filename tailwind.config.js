/** @type {import('tailwindcss').Config} */
import preline from "preline/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F0E8D5",
        secondary: "#312318",
        light: "#F8F9FA",
        dark: "#121212",
      },
    },
  },
  plugins: [preline],
  darkMode: "class",
};
