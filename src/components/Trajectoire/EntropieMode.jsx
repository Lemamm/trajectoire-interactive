import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EntropieMode — rend des particules, déformations ou pulsations visuelles
 * selon le niveau d'entropie (0 → calme, 100 → agitation maximale).
 */
export default function EntropieMode({ level = 0, palette = [] }) {
  const particleCount = Math.round(level / 4);

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        size: 3 + Math.random() * 6,
        color: palette[i % palette.length] || "#fff",
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    [level, palette]
  );

  return (
    <AnimatePresence>
      {level > 0 && (
        <motion.div
          key={level}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 0.2,
                scale: 0.8,
                x: `${p.x}%`,
                y: `${p.y}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.color,
                filter: "blur(1px)",
                position: "absolute",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
