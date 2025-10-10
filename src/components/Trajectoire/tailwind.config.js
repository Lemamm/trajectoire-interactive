/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        nuit: "#0B0B14",
        jour: "#f6f7f9",
        accent: "#8B5CF6",
      },
      transitionDuration: {
        400: "400ms",
        700: "700ms",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
