import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (isDark) {
      classList.add("dark");
    } else {
      classList.remove("dark");
    }
  }, [isDark]);

const toggleTheme = () => {
  setIsDark(prev => !prev);
  window.dispatchEvent(new CustomEvent("themeToggle", { detail: !isDark }));
};

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">{isDark ? "Mode jour" : "Mode nuit"}</span>
    </button>
  );
}
