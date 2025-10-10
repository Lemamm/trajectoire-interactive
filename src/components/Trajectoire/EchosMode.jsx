import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EchosMode({ active, trigger, palette = [] }) {
  const fallingWords = useMemo(() => {
    if (!active) return [];
    const baseWords = [
      "souffle", "mémoire", "trace", "onde", "retour", "murmure",
      "reflet", "ombre", "éclat", "silence", "lumière", "fragment",
    ];
    return Array.from({ length: 12 }, () => ({
      word: baseWords[Math.floor(Math.random() * baseWords.length)],
      left: Math.random() * 90,
      rotate: Math.random() * 40 - 20,
      size: 12 + Math.random() * 6,
      color: palette[Math.floor(Math.random() * palette.length)] || "#fff",
      delay: Math.random() * 0.5, // apparition aléatoire
      duration: 2 + Math.random() * 1.5, // vitesse rapide
    }));
  }, [active, trigger, palette]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={trigger}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {fallingWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10, rotate: w.rotate }}
              animate={{ opacity: 1, y: "100%", rotate: w.rotate }}
              exit={{ opacity: 0 }}
              transition={{
                duration: w.duration,
                delay: w.delay,
                ease: "easeInOut",
              }}
              style={{
                color: w.color,
                fontSize: `${w.size}px`,
                position: "absolute",
                left: `${w.left}%`,
                top: 0,
                fontFamily: "serif",
                textShadow: "0 0 4px rgba(0,0,0,0.3)",
              }}
            >
              {w.word}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
