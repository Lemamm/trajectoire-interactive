// Compass3D.jsx
import React, { useMemo } from "react";

export default function Compass3D({ poems = [], onPick = () => {}, palette = [], currentIndex }) {
  const isMobile = window.innerWidth < 768;
  const size = isMobile ? 300 : Math.min(window.innerWidth * 0.38, 600);
  const radius = size * 0.38;

  const points = useMemo(() => {
    return poems.map((p, i) => {
      const angle = (i / Math.max(1, poems.length)) * 2 * Math.PI;
      const x = radius * Math.cos(angle) + size / 2;
      const y = radius * Math.sin(angle) + size / 2;
      return { x, y, i };
    });
  }, [poems.length, size]);

  return (
    <div className="w-full flex justify-center">
      <div style={{ width: size, height: size, position: "relative" }}>
        {points.map(({ x, y, i }) => {
          const p = poems[i] || {};
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                left: x,
                top: y,
                padding: isMobile ? "6px 8px" : "10px 14px",
                borderRadius: 14,
                minWidth: isMobile ? 70 : 110,
                background: isActive
                  ? `linear-gradient(90deg, ${palette[0]}, ${palette[1]})`
                  : `linear-gradient(90deg, ${palette[0]}33, ${palette[2]}22)`,
                color: "#fff",
                border: isActive ? `2px solid ${palette[4]}` : "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
              }}
            >
              {p.title.length > 24 ? p.title.slice(0, 23) + "…" : p.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
