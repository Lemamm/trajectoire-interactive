import { useState, useEffect, useCallback } from "react";

export default function useThoughts() {
  const [thoughts, setThoughts] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("echos_thoughts");
    if (saved) setThoughts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("echos_thoughts", JSON.stringify(thoughts));
  }, [thoughts]);

  const addThought = useCallback((word, text) => {
    setThoughts((prev) => ({
      ...prev,
      [word]: [...(prev[word] || []), { text, date: new Date().toISOString() }],
    }));
  }, []);

  return { thoughts, addThought };
}
