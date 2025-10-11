// TrajectoireMobile.jsx - Version autonome
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Volume2, VolumeX, Settings, Clock, Moon, Sun, Map, List, X } from "lucide-react";
import { motion } from "framer-motion";
import * as Tone from "tone";
import { poems, ghostPoem } from "./poems";
import EchosMode from "./EchosMode";
import EpinglerMode from "./EpinglerMode";
import PoemCardGrid from "./PoemCardGrid";

// ------------------- LOCALSTORAGE -------------------
const storage = {
  get: (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

const LS_KEYS = {
  READ_MEMORY: "traj_read_memory_v1",
  DAILY_ASSIGN: "traj_daily_poem_v1",
  PALETTE: "traj_palette_v1",
  ENTROPY_STATE: "traj_entropy_state_v1",
  PINNED_LINES: "traj_pinned_lines_v1",
  WEAR_LEVEL: "traj_wear_level_v1",
  GHOST_UNLOCK: "traj_ghost_unlock_v1"
};

export default function TrajectoireMobile() {
  const [ghostUnlocked, setGhostUnlocked] = useState(storage.get(LS_KEYS.GHOST_UNLOCK, false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const listWithGhost = useMemo(() => ghostUnlocked ? [...poems, ghostPoem] : poems, [ghostUnlocked]);
  const current = listWithGhost[currentIndex];
  
  const [soundOn, setSoundOn] = useState(false);
  const synthRef = useRef(null);
  const reverbRef = useRef(null);
  const filterRef = useRef(null);
  const loopRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  
  const [palette, setPalette] = useState(storage.get(LS_KEYS.PALETTE, ["#8B5CF6", "#EC4899", "#22D3EE", "#F59E0B", "#10B981"]));
  const [readMemory, setReadMemory] = useState(storage.get(LS_KEYS.READ_MEMORY, {}));
  const [wearLevel, setWearLevel] = useState(storage.get(LS_KEYS.WEAR_LEVEL, poems.map(() => 0)));
  const [entropyState, setEntropyState] = useState(storage.get(LS_KEYS.ENTROPY_STATE, poems.map(() => 0)));
  const [pinnedLines, setPinnedLines] = useState(() => {
    const saved = storage.get(LS_KEYS.PINNED_LINES, {});
    Object.keys(saved).forEach(k => {
      if (!Array.isArray(saved[k])) saved[k] = [];
    });
    return saved;
  });
  
  const [dailyIndex, setDailyIndex] = useState(null);
  const [manualDark, setManualDark] = useState(null);
  const [showTitles, setShowTitles] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [showSettings, setShowSettings] = useState(false);
  const [showEchosMode, setShowEchosMode] = useState(false);
  const [showEpinglerMode, setShowEpinglerMode] = useState(false);
  const [echoesActive, setEchoesActive] = useState(false);
  const [echoTrigger, setEchoTrigger] = useState(0);

  // ------------------- AUDIO -------------------
  const initAudio = async () => {
    if (audioReady) return;
    await Tone.start();
    reverbRef.current = new Tone.Reverb({ decay: 4, wet: 0.5 }).toDestination();
    filterRef.current = new Tone.Filter({ type: "lowpass", frequency: 2000, rolloff: -24 }).connect(reverbRef.current);
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.8, decay: 0.5, sustain: 0.3, release: 2 },
      volume: -10
    }).connect(filterRef.current);
    setAudioReady(true);
  };

  const toggleSound = async () => {
    if (!soundOn) {
      await initAudio();
      setSoundOn(true);
    } else {
      if (loopRef.current) { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null; }
      if (Tone.Transport.state === "started") Tone.Transport.stop();
      setSoundOn(false);
    }
  };

  useEffect(() => {
    if (!soundOn || !audioReady || !current) return;
    if (loopRef.current) { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null; }
    
    const notes = current.soundscape?.notes || ["C4", "E4", "G4"];
    const rhythm = current.soundscape?.rhythm || "4n";
    let i = 0;
    
    loopRef.current = new Tone.Loop((time) => {
      synthRef.current.triggerAttackRelease(notes[i % notes.length], rhythm, time);
      i++;
    }, rhythm).start(0);
    
    if (Tone.Transport.state !== "started") Tone.Transport.start();
  }, [currentIndex, soundOn, audioReady, current]);

  const triggerEchoes = () => {
    setEchoesActive(true);
    setEchoTrigger(prev => prev + 1);
    setTimeout(() => setEchoesActive(false), 4000);
  };

  // ------------------- PERSISTANCE -------------------
  useEffect(() => { storage.set(LS_KEYS.PALETTE, palette); }, [palette]);
  useEffect(() => { storage.set(LS_KEYS.READ_MEMORY, readMemory); }, [readMemory]);
  useEffect(() => { storage.set(LS_KEYS.WEAR_LEVEL, wearLevel); }, [wearLevel]);
  useEffect(() => { storage.set(LS_KEYS.ENTROPY_STATE, entropyState); }, [entropyState]);
  useEffect(() => { storage.set(LS_KEYS.PINNED_LINES, pinnedLines); }, [pinnedLines]);
  useEffect(() => { storage.set(LS_KEYS.GHOST_UNLOCK, ghostUnlocked); }, [ghostUnlocked]);

  // ------------------- POÈME DU JOUR -------------------
  useEffect(() => {
    const assign = storage.get(LS_KEYS.DAILY_ASSIGN, {});
    const key = new Date().toISOString().slice(0,10);
    if (assign[key] == null) {
      const d = new Date();
      const doy = Math.floor((d - new Date(d.getFullYear(),0,0)) / 86400000);
      const seed = (doy * 37 + d.getFullYear()) % poems.length;
      assign[key] = seed;
      storage.set(LS_KEYS.DAILY_ASSIGN, assign);
    }
    setDailyIndex(assign[key]);
  }, []);

  // ------------------- MODE NOCTURNE -------------------
  const isNight = useMemo(() => {
    if (manualDark !== null) return manualDark;
    const h = new Date().getHours();
    return h >= 22 || h < 6;
  }, [manualDark]);

  const handleResetStats = () => {
    if (!confirm("⚠️ Réinitialiser toutes les stats ?")) return;
    setEntropyState(prev => prev.map(() => 0));
    setWearLevel(prev => prev.map(() => 0));
    setReadMemory({});
    setPinnedLines({});
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${
      isNight
        ? "bg-gradient-to-br from-slate-900 to-indigo-950 text-gray-100"
        : "bg-gradient-to-br from-slate-100 via-cyan-100 to-cyan-200 text-gray-900"
    }`}>
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

        {/* MODE SÉLECTION */}
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
              poems={listWithGhost}
              currentIndex={currentIndex}
              onSelect={(idx) => setCurrentIndex(idx)}
              palette={palette}
              readMemory={readMemory}
              wearLevel={wearLevel}
            />
          </div>
        ) : (
          /* VUE LISTE */
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
                {listWithGhost.map((p, i) => (
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

          {/* Animation des échos */}
          {echoesActive && current?.text && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {current.text.split(/\s+/).slice(0, 8).map((word, i) => (
                <motion.span
                  key={`${echoTrigger}-${i}`}
                  initial={{
                    opacity: 0,
                    y: -20,
                    x: Math.random() * 80 + 10,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, 300],
                    x: Math.random() * 100,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                  }}
                  className="absolute text-white text-sm font-medium drop-shadow-lg"
                  style={{ left: `${Math.random() * 80}%`, top: 0 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          )}

          {/* Texte du poème avec effet d'entropie */}
          <div className="whitespace-pre-line font-serif text-base leading-relaxed relative z-10">
            {(() => {
              if (!current?.text) return "";
              const entropy = entropyState[currentIndex] ?? 0;
              if (entropy === 0) return current.text;
              
              // Appliquer l'entropie : mélanger les mots
              const words = current.text.split(/\s+/);
              const shuffleAmount = Math.floor((entropy / 100) * words.length * 0.5);
              
              for (let i = 0; i < shuffleAmount; i++) {
                const a = Math.floor(Math.random() * words.length);
                const b = Math.floor(Math.random() * words.length);
                [words[a], words[b]] = [words[b], words[a]];
              }
              
              return words.join(" ");
            })()}
          </div>
        </div>

        {/* CONTRÔLES */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={triggerEchoes}
            className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
          >
            💭 Échos
          </button>
          <button
            onClick={() => {
              // Ajoute de l'entropie aléatoire entre 5 et 15%
              const randomIncrease = Math.floor(Math.random() * 10) + 5;
              setEntropyState(prev => {
                const copy = [...prev];
                copy[currentIndex] = Math.min(100, (copy[currentIndex] || 0) + randomIncrease);
                return copy;
              });
            }}
            className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
          >
            ✨ Entropie +
          </button>
          <button
            onClick={() => setShowEpinglerMode(true)}
            className="flex-1 px-3 py-2 rounded-lg border bg-white/10 hover:bg-white/20 transition"
          >
            📌 Épingler
          </button>
        </div>

        {/* BARRE D'ENTROPIE */}
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
            className="w-full h-2 rounded-lg cursor-pointer"
            style={{
              accentColor: palette[1],
              background: `linear-gradient(to right, ${palette[0]} 0%, ${palette[1]} ${entropyState[currentIndex] ?? 0}%, #ddd ${entropyState[currentIndex] ?? 0}%, #ddd 100%)`
            }}
          />
          <div className="mt-2 h-2 rounded-full bg-gray-300 overflow-hidden">
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

        {/* PANNEAU PARAMÈTRES */}
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

        {/* MODALS */}
        {showEchosMode && (
          <EchosMode
            currentPoem={current}
            onClose={() => setShowEchosMode(false)}
            onTriggerEchoes={triggerEchoes}
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
    </div>
  );
}