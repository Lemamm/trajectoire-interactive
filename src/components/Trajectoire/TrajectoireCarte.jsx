// TrajectoireCarte.jsx
import React from "react";

export default function TrajectoireCarte({ poems, currentIndex, onSelect, readMemory, wearLevel }) {
  return (
    <div className="space-y-2">
      {poems.map((poem, i) => {
        const isActive = i === currentIndex;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left p-3 rounded-lg ${isActive ? "bg-white/40" : "bg-white/20"}`}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{poem.title}</div>
              <div className="text-xs text-gray-500">{readMemory[i]?.length || 0}×</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
