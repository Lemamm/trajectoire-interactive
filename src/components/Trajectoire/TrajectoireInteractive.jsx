import React, { useState, useRef, useEffect, useMemo } from "react";
import { Sun, Moon, Volume2, VolumeX, Settings, Clock, Sparkles, Compass, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";
import { poems, ghostPoem } from "./poems";
import PoemCardGrid from "./PoemCardGrid";
import Compass3D from "./Compass3D";
import EchosMode from "./EchosMode";
import EntropieMode from "./EntropieMode";
import EpinglerMode from "./EpinglerMode";
import ThemeToggle from "./ThemeToggle";
import TrajectoireMobile from "./TrajectoireMobile"

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
  HAPTICS_ENABLED: "traj_haptics_enabled_v1",
  REMIXES: "traj_remixes_v1",
  ENTROPY_STATE: "traj_entropy_state_v1",
  PINNED_LINES: "traj_pinned_lines_v1",
  WEAR_LEVEL: "traj_wear_level_v1",
  ECHOS: "traj_echos_v1",
  GHOST_UNLOCK: "traj_ghost_unlock_v1"
};

// ------------------- BREATHING TEMPO -------------------
const useBreathingTempo = ({ enabled, baseBpm = 80 }) => {
  const lastActionRef = useRef(Date.now());
  const [bpm, setBpm] = useState(baseBpm);

  useEffect(() => {
    if (!enabled) return;
    const onAction = () => { lastActionRef.current = Date.now(); };
    const onScroll = () => { lastActionRef.current = Date.now(); };
    window.addEventListener("click", onAction);
    window.addEventListener("keydown", onAction);
    window.addEventListener("scroll", onScroll, { passive: true });

    const id = setInterval(() => {
      const delta = Date.now() - lastActionRef.current;
      const target = delta < 1000 ? baseBpm + 30 : delta < 4000 ? baseBpm + 10 : baseBpm - 20;
      setBpm((prev) => prev + (target - prev) * 0.15);
    }, 300);

    return () => {
      window.removeEventListener("click", onAction);
      window.removeEventListener("keydown", onAction);
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, [enabled, baseBpm]);

  return Math.max(40, Math.min(160, Math.round(bpm)));
};

// ------------------- COMPOSANT PRINCIPAL -------------------
export default function TrajectoireInteractive() {
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
  
  const [modesOpen, setModesOpen] = useState(false);
  const [showCompass, setShowCompass] = useState(false);
  const [entropyMode, setEntropyMode] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(storage.get(LS_KEYS.HAPTICS_ENABLED, true));
  const [palette, setPalette] = useState(storage.get(LS_KEYS.PALETTE, ["#8B5CF6", "#EC4899", "#22D3EE", "#F59E0B", "#10B981"]));
  const [nocturneAuto, setNocturneAuto] = useState(true);
  
  const [readMemory, setReadMemory] = useState(storage.get(LS_KEYS.READ_MEMORY, {}));
  const [wearLevel, setWearLevel] = useState(storage.get(LS_KEYS.WEAR_LEVEL, poems.map(() => 0)));
  const [entropyState, setEntropyState] = useState(storage.get(LS_KEYS.ENTROPY_STATE, poems.map(() => 0)));
  const [pinnedLines, setPinnedLines] = useState(() => {
  const saved = storage.get(LS_KEYS.PINNED_LINES, {});
  // s'assurer que toutes les clés contiennent des tableaux
  Object.keys(saved).forEach(k => {
    if (!Array.isArray(saved[k])) saved[k] = [];
  });
  return saved;
});

  
  const [dailyIndex, setDailyIndex] = useState(null);
  const [echoesActive, setEchoesActive] = useState(false);
  const [echoTrigger, setEchoTrigger] = useState(0);
  const [showTitles, setShowTitles] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  
  const bpm = useBreathingTempo({ enabled: soundOn, baseBpm: 80 });
  // Contrôle manuel du thème
const [manualDark, setManualDark] = useState(null); // null = auto, true = nuit, false = jour


// ------------------- ÉCHOS -------------------
const triggerEchoes = () => {
  setEchoTrigger((t) => t + 1);
  setEchoesActive(true);
  setTimeout(() => setEchoesActive(false), 4000); // Durée de l’effet
};

// ------------------- ENTROPIE -------------------
const tickEntropy = (amount = 1) => {
  setEntropyState(prev => {
    const copy = [...prev];
    const next = (copy[currentIndex] || 0) + amount;
    copy[currentIndex] = Math.min(next, 100); // max 100
    return copy;
  });
};


  // ------------------- PERSISTANCE -------------------
  useEffect(() => { storage.set(LS_KEYS.HAPTICS_ENABLED, hapticsEnabled); }, [hapticsEnabled]);
  useEffect(() => { storage.set(LS_KEYS.PALETTE, palette); }, [palette]);
  useEffect(() => { storage.set(LS_KEYS.READ_MEMORY, readMemory); }, [readMemory]);
  useEffect(() => { storage.set(LS_KEYS.WEAR_LEVEL, wearLevel); }, [wearLevel]);
  useEffect(() => { storage.set(LS_KEYS.ENTROPY_STATE, entropyState); }, [entropyState]);
  useEffect(() => { storage.set(LS_KEYS.PINNED_LINES, pinnedLines); }, [pinnedLines]);
  useEffect(() => { storage.set(LS_KEYS.GHOST_UNLOCK, ghostUnlocked); }, [ghostUnlocked]);
// ------------------- CONTEXTE LIGNE (pour Genius-like menu) -------------------
const [contextLine, setContextLine] = useState(null);

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
    if (!soundOn || !audioReady) return;
    if (loopRef.current) { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null; }
    if (reverbRef.current) { reverbRef.current.decay = (current.soundscape?.reverb || 0.5) * 5; reverbRef.current.wet.value = current.soundscape?.reverb ?? 0.5; }
    if (filterRef.current) { filterRef.current.frequency.rampTo(current.soundscape?.filter ?? 2000, 0.5); }
    const notes = current.soundscape?.notes || ["C4", "E4", "G4"];
    const rhythm = current.soundscape?.rhythm || "4n";
    let i = 0;
    loopRef.current = new Tone.Loop((time) => {
      synthRef.current.triggerAttackRelease(notes[i % notes.length], rhythm, time);
      i++;
    }, rhythm).start(0);
    Tone.Transport.bpm.rampTo(bpm, 0.4);
    if (Tone.Transport.state !== "started") Tone.Transport.start();
  }, [currentIndex, soundOn, audioReady, bpm]);

  useEffect(() => {
    if (soundOn && audioReady) Tone.Transport.bpm.rampTo(bpm, 0.3);
  }, [bpm, soundOn, audioReady]);

  // ------------------- MÉMOIRE & VIEILLISSEMENT -------------------
  useEffect(() => {
    const now = new Date();
    const meta = {
      date: now.toISOString(),
      hour: now.getHours(),
      season: ["hiver", "printemps", "été", "automne"][Math.floor(((now.getMonth()+1)%12)/3)]
    };
    setReadMemory(prev => {
      const list = prev[currentIndex] || [];
      return { ...prev, [currentIndex]: [...list, meta] };
    });
    setWearLevel(prev => {
      const clone = [...prev];
      clone[currentIndex] = Math.min(100, (clone[currentIndex] || 0) + 2);
      return clone;
    });
  }, [currentIndex]);

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

// ------------------- MODE NOCTURNE (auto + manuel) -------------------
const isNight = useMemo(() => {
  if (manualDark !== null) return manualDark; // priorité au choix manuel
  if (!nocturneAuto) return false;
  const h = new Date().getHours();
  return h >= 22 || h < 6;
}, [manualDark, nocturneAuto]);
useEffect(() => {
  const classList = document.documentElement.classList;
  if (isNight) classList.add("dark");
  else classList.remove("dark");
}, [isNight]);

  // ------------------- POÈME FANTÔME -------------------
  useEffect(() => {
    const distinctRead = Object.keys(readMemory).length >= 5;
    const entropyAny = entropyState.some(v => v >= 20);
    const night = isNight;
    if (distinctRead && entropyAny && night) setGhostUnlocked(true);
  }, [readMemory, entropyState, isNight]);
  
// ------------------- TEXTE AFFICHÉ -------------------
const displayText = useMemo(() => {
  if (!current) return "";
  let text = current.text;
  const entropy = entropyState[currentIndex] ?? 0;

  if (entropy > 0) {
    const words = text.split(/\s+/);
    const shuffleAmount = Math.floor((entropy / 100) * words.length * 0.7);

    // On mélange une partie du texte en fonction du niveau d'entropie
    for (let i = 0; i < shuffleAmount; i++) {
      const a = Math.floor(Math.random() * words.length);
      const b = Math.floor(Math.random() * words.length);
      [words[a], words[b]] = [words[b], words[a]];
    }

    text = words.join(" ");
  }

  return text;
}, [current, currentIndex, entropyState]);



  // ------------------- RENDU -------------------
  return (
    <div
  className={`min-h-screen w-full transition-colors duration-700 ${
    isNight
      ? "bg-gradient-to-br from-slate-900 to-indigo-950 text-gray-100"
      : "bg-gradient-to-br from-slate-100 via-cyan-100 to-cyan-200 text-gray-900"
  }`}
>

<div className="max-w-[90vw] mx-auto px-2 py-5 md:py-10">
        
       {/* HEADER */}
<div className="flex items-center justify-between mb-4">
  <div>
    <h1 className="text-3xl md:text-5xl font-serif tracking-wide">TRAJECTOIRE</h1>
    <p className={`text-xs md:text-sm ${isNight ? "text-gray-300" : "text-gray-600"}`}>
      Recueil interactif — lecture mobile + ordinateur
    </p>
    <p className={`text-[12px] md:text-xs ${isNight ? "text-gray-400" : "text-gray-500"} mt-0.5`}>
      Maxime Estrade
    </p>
  </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleSound} 
              className={`px-3 py-2 rounded-lg border border-gray-300 ${soundOn ? "bg-green-600/20" : "bg-white/5"}`}
            >
              {soundOn ? <Volume2 size={18}/> : <VolumeX size={18}/>}
            </button>
            {/* Bouton Réinitialiser stats */}
  <button
    onClick={() => {
      if (!confirm("⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les stats ?")) return;
      setEntropyState(prev => prev.map(() => 0));
      setWearLevel(prev => prev.map(() => 0));
      setReadMemory({});
      setPinnedLines({});
    }}
    className="px-3 py-2 rounded-lg border border-red-400 bg-red-500/20 hover:bg-red-500/30 text-red-600"
  >
    🔄 Reset
  </button>
              {/* Thème jour/nuit */}
  <button
    onClick={() => setManualDark(prev => (prev === true ? false : prev === false ? null : true))}
    className="px-3 py-2 rounded-lg border border-gray-300 bg-white/5 hover:bg-white/10 transition"
    title={
      manualDark === null ? "Mode auto" :
      manualDark ? "Forcer mode jour" : "Revenir au mode auto"
    }
  >
    {manualDark === null ? (
      isNight ? <Moon size={18}/> : <Sun size={18}/>
    ) : manualDark ? (
      <Moon size={18}/>
    ) : (
      <Sun size={18}/>
    )}
  </button>
            <button 
              onClick={() => setModesOpen(v => !v)} 
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white/5"
            >
              
              <Settings size={18}/>
            </button>
          </div>
        </div>

        {/* BANNIÈRE CONTEXTUELLE */}
<div
  className={`mt-1 flex flex-wrap gap-2 text-[11px] md:text-xs ${
    isNight ? "text-gray-300" : "text-gray-700"
  }`}
>
  {dailyIndex !== null && (
    <div
      className={`px-2 py-1 rounded border ${
        isNight
          ? "bg-white/10 border-white/30 text-gray-200"
          : "bg-white/25 border-gray-300 text-gray-800"
      }`}
    >
      <Clock className="inline mr-1" size={12} />
      Poème du jour: {poems[dailyIndex].title}
    </div>
  )}
  {isNight && (
    <div className="px-2 py-1 rounded bg-white/10 border border-white/30 text-gray-200">
      <Moon className="inline mr-1" size={12} />
      Mode nocturne
    </div>
  )}
  {ghostUnlocked && (
    <div className="px-2 py-1 rounded bg-white/10 border border-white/30 text-gray-200">
      <Sparkles className="inline mr-1" size={12} />
      Poème fantôme débloqué
    </div>
  )}
</div>


        {/* TITRES MOBILES */}
        <div className="block md:hidden my-4">
          <button 
            onClick={() => setShowTitles(prev => !prev)} 
            className="w-full p-3 rounded-lg bg-white/20 border border-gray-300 text-left"
          >
            <div className="flex items-center justify-between">
              <span>📖 {current ? current.title : "Aucun poème"}</span>
              <span className="text-xs">{showTitles ? "▲" : "▼"}</span>
            </div>
          </button>
          {showTitles && (
            <div className="mt-2 space-y-1 max-h-64 overflow-auto">
              {listWithGhost.map((p, i) => {
                const isActive = i === currentIndex;
                const reads = readMemory[i]?.length || 0;
                return (
                  <button
                    key={i}
                    onClick={() => { setCurrentIndex(i); setShowTitles(false); }}
                    className={`w-full text-left p-2 rounded ${isActive ? "bg-white/40" : "bg-white/20"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{p.title}</div>
                      <div className="text-xs text-gray-500">{reads}×</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* PANEL MODES */}
        <AnimatePresence>
          {modesOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -8 }} 
              className="mt-4 p-4 rounded-xl border border-gray-300 bg-white/70 shadow-lg text-gray-900"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <div className="font-medium mb-2">Navigation</div>
                  <button
                    onClick={() => setShowCompass(v => !v)}
                    className="px-3 py-1 rounded bg-white border border-gray-300 flex items-center gap-2 mb-2"
                  >
                    <Compass size={16} />
                    {showCompass ? "Masquer" : "Afficher"} boussole
                  </button>
                  {showCompass && (
                    <Compass3D 
                      poems={listWithGhost} 
                      onPick={setCurrentIndex} 
                      palette={palette} 
                      currentIndex={currentIndex}
                    />
                  )}
                  <button
                    onClick={() => setViewMode(v => v === "list" ? "cards" : "list")}
                    className="px-3 py-1 rounded bg-white border border-gray-300 flex items-center gap-2"
                  >
                    <Map size={16} />
                    {viewMode === "list" ? "Vue cartes" : "Vue liste"}
                  </button>
                </div>
                <div>
                  <div className="font-medium mb-2">Personnalisation</div>
                  <div className="flex gap-2 mt-1">
                    {palette.map((c, i) => (
                      <input 
                        key={i} 
                        type="color" 
                        value={c}
                        onChange={e => setPalette(p => { const a = [...p]; a[i] = e.target.value; return a; })}
                        className="w-8 h-8 border border-gray-300 rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENU PRINCIPAL */}
 <div className="mt-5 grid md:grid-cols-3 gap-2">

          
          {/* SIDEBAR DESKTOP */}
          <div className="hidden md:block">
            {viewMode === "cards" ? (
<div className="md:col-span-1/1 max-h-[85vh] overflow-auto px-2">
  <PoemCardGrid
    poems={listWithGhost}
    currentIndex={currentIndex}
    onSelect={setCurrentIndex}
    palette={palette}
    readMemory={readMemory}
    wearLevel={wearLevel}
  />
</div>

            ) : (
              <div className="space-y-2 max-h-[70vh] overflow-auto pr-2">
                {listWithGhost.map((p, i) => {
                  const isActive = i === currentIndex;
                  const reads = readMemory[i]?.length || 0;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-full text-left p-3 rounded-lg ${isActive ? "bg-white/40" : "bg-white/20"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-gray-500">{reads}×</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CONTENU POÈME */}
          <div className="md:col-span-2">
            <div
              className="relative rounded-2xl border border-gray-300 p-6 md:p-10 min-h-[60vh] overflow-hidden shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${palette[0]}44, ${palette[1]}66, ${palette[2]}44)`,
                transition: "filter 0.5s ease, opacity 0.5s ease"
              }}
            >
              <div className="relative z-10">
                {current ? (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2">
                    {current.icon && React.createElement(current.icon, { size: 22 })}
                    {current.title === "Poème fantôme" ? "l'encre de mes veines" : current.title}
                  </h2>
                ) : (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-400 italic">
                    Aucun poème sélectionné
                  </h2>
                )}

<div className="relative">
  {/* Effets visuels */}
  <EchosMode active={echoesActive} trigger={echoTrigger} palette={palette} />
  <EntropieMode level={entropyState[currentIndex]} palette={palette} />

  {/* Texte principal */}
<div className="whitespace-pre-line font-serif text-base md:text-lg leading-relaxed relative">
  {current.text.split("\n").map((line, lineIndex) => {
    const isPinned = pinnedLines[currentIndex]?.includes(line);
    return (
      <div
        key={lineIndex}
        className={`relative group cursor-pointer hover:bg-white/10 rounded p-1 ${
          isPinned ? "bg-indigo-400/20" : ""
        }`}
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
        {isPinned && (
          <span className="absolute right-0 top-0 text-indigo-400 text-sm px-1">📌</span>
        )}
      </div>
    );
  })}
</div>
</div>
        <div className="flex gap-3 mt-4">
  {/* Échos */}
  <button
    onClick={triggerEchoes}
    className="px-3 py-1 rounded-lg border border-gray-400 bg-white/10 hover:bg-white/20 transition"
  >
    💭 Échos
  </button>

  {/* Entropie */}
<div className="mt-4">
  <label className="text-sm font-medium flex items-center gap-2">
    <span>🧬 Entropie :</span>
    <span className="text-xs text-gray-600">{entropyState[currentIndex] ?? 0}%</span>
  </label>
  <input
    type="range"
    min="0"
    max="100"
    step="1"
    value={entropyState[currentIndex] ?? 0}
    onChange={(e) => {
      const val = parseInt(e.target.value);
      setEntropyState((prev) => {
        const copy = [...prev];
        copy[currentIndex] = val;
        return copy;
      });
    }}
    className="w-full accent-indigo-500 cursor-pointer"
  />
</div>


  {/* Épingler */}
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
  className="px-3 py-1 rounded-lg border border-gray-400 bg-white/10 hover:bg-white/20 transition"
>
  📌 Épingler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
{Array.isArray(pinnedLines[currentIndex]) && pinnedLines[currentIndex].length > 0 && (
  <div className="mt-4 p-3 rounded-lg bg-white/10 border border-gray-300">
    <h3 className="text-sm uppercase tracking-wide mb-2 opacity-70">
      Lignes épinglées
    </h3>
    <ul className="text-sm space-y-1">
      {pinnedLines[currentIndex]
        .filter(l => typeof l === "string" && l.trim() !== "") // <-- ignore les 0 ou valeurs incorrectes
        .map((l, i) => (
          <li key={i} className="italic text-gray-200">“{l}”</li>
      ))}
    </ul>
  </div>
)}


        {/* FOOTER */}
        <div className="mt-8 text-center text-xs text-gray-600">
          Version 1.0 — Trajectoire interactive © 2025
        </div>
      </div>
    </div>
  );
}