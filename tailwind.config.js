/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#0B0B14",
        starlight: "#C9F2FF",
        twilight: "#3B1E54",
        sunrise: "#FFB84C",
        emotion: {
          joy: "#FFD166",
          sadness: "#118AB2",
          anger: "#EF476F",
          calm: "#06D6A0",
        },
      },
      fontFamily: {
        poetic: ["'Cormorant Garamond'", "serif"],
        modern: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.15)",
      },
      animation: {
        pulseSoft: "pulseSoft 6s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
