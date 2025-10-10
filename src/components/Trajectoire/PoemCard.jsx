// PoemCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PoemCard({ poem, index, isActive, onClick, palette, reads = 0, wear = 0 }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-xl overflow-hidden transition-all duration-300 ${isActive ? "ring-2 ring-offset-2" : ""}`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${palette[0]}88, ${palette[1]}66)`
          : `linear-gradient(135deg, ${palette[0]}33, ${palette[2]}22)`,
        ringColor: palette[4],
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {poem.icon && React.createElement(poem.icon, { size: 20 })}
        <div className="flex-1">
          <h3 className="font-semibold text-base">{poem.title}</h3>
          <p className="text-xs opacity-70">{poem.text.split("\n")[0].slice(0, 50)}...</p>
        </div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: palette[1] }}
          initial={{ width: 0 }}
          animate={{ width: `${poem.intensity}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        />
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] opacity-60">
        <span>📖 {reads} lectures</span>
        {wear > 50 && <span>⏳ usé à {wear}%</span>}
      </div>
    </motion.button>
  );
}
