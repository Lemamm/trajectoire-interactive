// TrajectoireMobile.jsx
import React, { useState } from "react";
import { Volume2, VolumeX, Settings, Clock, Moon, Sun } from "lucide-react";
import EchosMode from "./EchosMode";
import EntropieMode from "./EntropieMode";

export default function TrajectoireMobile({
  current, 
  currentIndex,
  poems,
  readMemory,
  pinnedLines,
  setCurrentIndex,
  setPinnedLines,
  entropyState,
  setEntropyState,
  toggleSound,
  soundOn,
  triggerEchoes,
  palette,
  manualDark,
  setManualDark,
  dailyIndex,
  setWearLevel,
  setReadMemory,
}) {
  const [showTitles, setShowTitles] = useState(false);

  const handleResetStats = () => {
    if (!confirm("⚠️ Réinitialiser toutes les stats ?")) return;
    setEntropyState(prev => prev.map(() => 0));
    setWearLevel(prev => prev.map(() => 0));
    setReadMemory({});
    setPinnedLines({});
  };

  return (
    <div className="w-full px-2 py-4">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-serif tracking-wide">TRAJECTOIRE</h1>
          <p className="text-xs text-gray-600">Recueil interactif — lecture mobile</p>
          <p className="text-[12px] text-gray-500 mt-0.5">Maxime Estrade</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleSound} className="px-3 py-2 rounded-lg border bg-white/10">
            {soundOn ? <Volume2 size={18}/> : <VolumeX size={18}/>}
          </button>
          <button onClick={() => setManualDark(prev => (prev === true ? false : prev === false ? null : true))}
            className="px-3 py-2 rounded-lg border bg-white/10">
            {manualDark === null ? <Sun size={18}/> : manualDark ? <Moon size={18}/> : <Sun size={18}/>}
          </button>
          <button onClick={handleResetStats} className="px-3 py-2 rounded-lg border bg-red-500/20 text-red-600 hover:bg-red-500/30">
            🔄 Reset
          </button>
        </div>
      </div>

      {/* POÈME / TEXTE */}
      <div className="relative rounded-xl border border-gray-300 p-4 min-h-[50vh] overflow-auto mb-4"
        style={{ background: `linear-gradient(135deg, ${palette[0]}44, ${palette[1]}66, ${palette[2]}44)` }}>
        
        {current && (
          <h2 className="text-xl font-semibold mb-3">{current.title}</h2>
        )}

        {/* Effets et entropie */}
        <EchosMode active={false} trigger={0} palette={palette} />
        <EntropieMode level={entropyState[currentIndex]} palette={palette} />

        {/* Texte interactif */}
        <div className="whitespace-pre-line font-serif text-base leading-relaxed">
          {current.text.split("\n").map((line, i) => {
            const isPinned = pinnedLines[currentIndex]?.includes(line);
            return (
              <div
                key={i}
                className={`relative cursor-pointer p-1 rounded ${isPinned ? "bg-indigo-400/20" : "hover:bg-white/10"}`}
                onClick={() => {
                  setPinnedLines(prev => {
                    const copy = { ...prev };
                    if (!copy[currentIndex]) copy[currentIndex] = [];
                    if (isPinned) {
                      copy[currentIndex] = copy[currentIndex].filter(l => l !== line);
                    } else {
                      copy[currentIndex].push(line);
                    }
                    return copy;
                  });
                }}
              >
                {line}
                {isPinned && <span className="absolute right-0 top-0 text-indigo-400 text-sm px-1">📌</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Contrôles Échos & Entropie & Épingler */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={triggerEchoes}
          className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
        >
          💭 Échos
        </button>
        <div className="flex-1">
          <label className="text-xs flex justify-between mb-1">
            <span>🧬 Entropie</span>
            <span>{entropyState[currentIndex] ?? 0}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={entropyState[currentIndex] ?? 0}
            onChange={e => {
              const val = parseInt(e.target.value);
              setEntropyState(prev => {
                const copy = [...prev];
                copy[currentIndex] = val;
                return copy;
              });
            }}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
        <button
          onClick={() => {
            if (!current?.text) return;
            const lines = current.text.split("\n").filter(l => l.trim().length > 0);
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            setPinnedLines(prev => {
              const copy = { ...prev };
              if (!copy[currentIndex]) copy[currentIndex] = [];
              if (!copy[currentIndex].includes(randomLine)) {
                copy[currentIndex].push(randomLine);
              }
              return copy;
            });
          }}
          className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
        >
          📌 Épingler
        </button>
      </div>

      {/* LISTE POÈMES (toggle) */}
      <div className="mb-4">
        <button 
          onClick={() => setShowTitles(prev => !prev)}
          className="w-full p-3 rounded-lg bg-white/20 border text-left flex justify-between items-center"
        >
          <span>📖 {current ? current.title : "Aucun poème"}</span>
          <span className="text-xs">{showTitles ? "▲" : "▼"}</span>
        </button>
        {showTitles && (
          <div className="mt-2 max-h-64 overflow-auto space-y-1">
            {poems.map((p, i) => (
              <button key={i} onClick={() => { setCurrentIndex(i); setShowTitles(false); }}
                className="w-full text-left p-2 rounded bg-white/20 hover:bg-white/40">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{p.title}</span>
                  <span className="text-xs text-gray-500">{readMemory[i]?.length || 0}×</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lignes épinglées */}
      {Array.isArray(pinnedLines[currentIndex]) && pinnedLines[currentIndex].length > 0 && (
        <div className="p-3 rounded-lg bg-white/10 border border-gray-300 mb-4">
          <h3 className="text-sm uppercase tracking-wide mb-2 opacity-70">Lignes épinglées</h3>
          <ul className="text-sm space-y-1">
            {pinnedLines[currentIndex]
              .filter(l => typeof l === "string" && l.trim() !== "")
              .map((l, i) => (
                <li key={i} className="italic text-gray-200">“{l}”</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
