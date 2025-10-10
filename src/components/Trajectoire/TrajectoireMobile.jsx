// TrajectoireMobile.jsx
import React, { useState } from "react";
import { Volume2, VolumeX, Settings, Clock, Moon, Sun, Map, List, X } from "lucide-react";
import EchosMode from "./EchosMode";
import EntropieMode from "./EntropieMode";
import EpinglerMode from "./EpinglerMode";
import PoemCardGrid from "./PoemCardGrid";

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
  wearLevel,
  setReadMemory,
}) {
  const [showTitles, setShowTitles] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" ou "cards"
  const [showSettings, setShowSettings] = useState(false);
  const [showEchosMode, setShowEchosMode] = useState(false);
  const [showEntropieMode, setShowEntropieMode] = useState(false);
  const [showEpinglerMode, setShowEpinglerMode] = useState(false);

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
          <p className="text-xs text-gray-600">Recueil interactif — mobile</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Maxime Estrade</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSound} 
            className="px-2 py-2 rounded-lg border bg-white/10 hover:bg-white/20"
          >
            {soundOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="px-2 py-2 rounded-lg border bg-white/10 hover:bg-white/20"
          >
            <Settings size={16}/>
          </button>
        </div>
      </div>

      {/* BANNIÈRE INFO */}
      {dailyIndex !== null && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-white/20 border border-gray-300 text-xs flex items-center gap-2">
          <Clock size={12}/>
          <span>Poème du jour : {poems[dailyIndex]?.title}</span>
        </div>
      )}

      {/* MODE SÉLECTION : Liste ou Cartes */}
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => setViewMode("list")}
          className={`flex-1 px-3 py-2 rounded-lg border transition ${
            viewMode === "list" 
              ? "bg-white/30 border-gray-400" 
              : "bg-white/10 border-gray-300"
          }`}
        >
          <List size={16} className="inline mr-2"/>
          Liste
        </button>
        <button
          onClick={() => setViewMode("cards")}
          className={`flex-1 px-3 py-2 rounded-lg border transition ${
            viewMode === "cards" 
              ? "bg-white/30 border-gray-400" 
              : "bg-white/10 border-gray-300"
          }`}
        >
          <Map size={16} className="inline mr-2"/>
          Cartes
        </button>
      </div>

      {/* VUE CARTES */}
      {viewMode === "cards" ? (
        <div className="mb-4">
          <PoemCardGrid
            poems={poems}
            currentIndex={currentIndex}
            onSelect={(idx) => setCurrentIndex(idx)}
            palette={palette}
            readMemory={readMemory}
            wearLevel={wearLevel}
          />
        </div>
      ) : (
        /* VUE LISTE (DROPDOWN) */
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
                <button 
                  key={i} 
                  onClick={() => { setCurrentIndex(i); setShowTitles(false); }}
                  className={`w-full text-left p-2 rounded transition ${
                    i === currentIndex 
                      ? "bg-white/40 border border-gray-400" 
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{p.title}</span>
                    <span className="text-xs text-gray-500">{readMemory[i]?.length || 0}×</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* POÈME / TEXTE */}
      <div 
        className="relative rounded-xl border border-gray-300 p-4 min-h-[50vh] overflow-auto mb-4"
        style={{ background: `linear-gradient(135deg, ${palette[0]}44, ${palette[1]}66, ${palette[2]}44)` }}
      >
        {current && (
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            {current.icon && React.createElement(current.icon, { size: 20 })}
            {current.title}
          </h2>
        )}

        {/* Texte interactif */}
        <div className="whitespace-pre-line font-serif text-base leading-relaxed">
          {current?.text}
        </div>
      </div>

      {/* CONTRÔLES : Échos, Entropie, Épingler */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setShowEchosMode(true)}
          className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
        >
          💭 Échos
        </button>
        <button
          onClick={() => setShowEntropieMode(true)}
          className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
        >
          ✨ Entropie
        </button>
        <button
          onClick={() => setShowEpinglerMode(true)}
          className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
        >
          📌 Épingler
        </button>
      </div>

      {/* BARRE D'ENTROPIE (en dessous) */}
      <div className="mb-4 p-3 rounded-lg bg-white/10 border border-gray-300">
        <label className="text-xs flex justify-between mb-2">
          <span>🧬 Niveau d'entropie</span>
          <span className="font-semibold">{entropyState[currentIndex] ?? 0}%</span>
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
          className="w-full h-2 accent-indigo-500 cursor-pointer rounded-lg"
        />
        <div className="mt-1 h-2 rounded-full bg-gray-300 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${entropyState[currentIndex] ?? 0}%`,
              background: `linear-gradient(90deg, ${palette[0]}, ${palette[1]})`
            }}
          />
        </div>
      </div>

      {/* LIGNES ÉPINGLÉES */}
      {Array.isArray(pinnedLines[currentIndex]) && pinnedLines[currentIndex].length > 0 && (
        <div className="p-3 rounded-lg bg-white/10 border border-gray-300 mb-4">
          <h3 className="text-sm uppercase tracking-wide mb-2 opacity-70 flex items-center gap-2">
            📌 Lignes épinglées ({pinnedLines[currentIndex].length})
          </h3>
          <ul className="text-sm space-y-1">
            {pinnedLines[currentIndex]
              .filter(l => typeof l === "number")
              .map((lineIdx, i) => {
                const line = current?.text.split("\n")[lineIdx];
                return (
                  <li key={i} className="italic text-gray-700 bg-white/20 p-2 rounded">
                    "{line}"
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      {/* PANNEAU PARAMÈTRES (Modal) */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="w-full bg-white rounded-t-2xl shadow-2xl p-6 max-h-[80vh] overflow-auto"
            style={{
              background: `linear-gradient(135deg, ${palette[0]}22, ${palette[1]}33)`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Paramètres</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-white/50 rounded-lg"
              >
                <X size={24}/>
              </button>
            </div>

            {/* Toggle thème */}
            <div className="mb-4 p-3 rounded-lg bg-white/30 border">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Mode sombre</span>
                <button 
                  onClick={() => setManualDark(prev => (prev === true ? false : prev === false ? null : true))}
                  className="px-4 py-2 rounded-lg border bg-white/50"
                >
                  {manualDark === null ? "🌓 Auto" : manualDark ? <Moon size={18}/> : <Sun size={18}/>}
                </button>
              </label>
            </div>

            {/* Reset stats */}
            <div className="mb-4">
              <button
                onClick={() => {
                  handleResetStats();
                  setShowSettings(false);
                }}
                className="w-full px-4 py-3 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 border border-red-400 font-medium"
              >
                🔄 Réinitialiser les statistiques
              </button>
            </div>

            {/* Stats */}
            <div className="p-3 rounded-lg bg-white/20 border">
              <h3 className="text-sm font-semibold mb-2">Statistiques</h3>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>📖 Lectures : {Object.values(readMemory).flat().length}</li>
                <li>🧬 Entropie moyenne : {Math.round(entropyState.reduce((a,b) => a+b, 0) / entropyState.length)}%</li>
                <li>📌 Lignes épinglées : {Object.values(pinnedLines).flat().length}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* MODALS DES MODES */}
      {showEchosMode && (
        <EchosMode
          currentPoem={current}
          onClose={() => setShowEchosMode(false)}
          onTriggerEchoes={triggerEchoes}
          palette={palette}
        />
      )}
      
      {showEntropieMode && (
        <EntropieMode
          currentPoem={current}
          currentIndex={currentIndex}
          entropyState={entropyState}
          onTickEntropy={(delta) => {
            setEntropyState(prev => {
              const arr = [...prev];
              arr[currentIndex] = Math.min(100, (arr[currentIndex] || 0) + delta);
              return arr;
            });
          }}
          onClose={() => setShowEntropieMode(false)}
          palette={palette}
        />
      )}
      
      {showEpinglerMode && (
        <EpinglerMode
          currentPoem={current}
          currentIndex={currentIndex}
          pinnedLines={pinnedLines}
          onPinLine={(poemIdx, lineIdx) => {
            setPinnedLines(prev => {
              const set = new Set(prev[poemIdx] || []);
              if (set.has(lineIdx)) set.delete(lineIdx); 
              else set.add(lineIdx);
              return { ...prev, [poemIdx]: Array.from(set) };
            });
          }}
          onClose={() => setShowEpinglerMode(false)}
          palette={palette}
        />
      )}
    </div>
  );
}