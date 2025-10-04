/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E2E",
        secondary: "#2A2A3B",
      },
    },
  },
  plugins: [],
};
