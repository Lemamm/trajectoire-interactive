// PoemCardGrid.jsx
import React from "react";
import PoemCard from "./PoemCard";

export default function PoemCardGrid({ poems, currentIndex, onSelect, palette, readMemory, wearLevel }) {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {poems.map((poem, i) => (
        <PoemCard
          key={i}
          poem={poem}
          index={i}
          isActive={i === currentIndex}
          onClick={() => onSelect(i)}
          palette={palette}
          reads={readMemory[i]?.length || 0}
          wear={wearLevel[i] || 0}
        />
      ))}
    </div>
  );
}
