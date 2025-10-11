// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";
import TrajectoireInteractive from "./components/Trajectoire/TrajectoireInteractive";
import TrajectoireMobile from "./components/Trajectoire/TrajectoireMobile";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détection initiale
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Écouter les changements de taille d'écran
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Afficher la version mobile ou desktop selon la détection
  if (isMobile) {
    return <TrajectoireMobile />;
  }

  return <TrajectoireInteractive />;
}
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // refs pour cleanup
  const playersRef = useRef({});
  const intervalRef = useRef(null);
  const finishedRef = useRef(false);

  const startExperience = async () => {
    try {
      // Nécessaire : déclenché par un clic utilisateur
      await Tone.start();
      setIsPlaying(true);

      // --- Chaîne audio ---
      const reverb = new Tone.Reverb({
        decay: 10,
        preDelay: 0.25,
        wet: 0.6,
      }).toDestination();

      const eq = new Tone.EQ3(-4, 1, 3).connect(reverb);

      // Gain master pour gérer les transitions globales
      const masterGain = new Tone.Gain(0.75).connect(eq);

      // Fade-in global doux (évite le pic au démarrage)
      try {
        const dest = Tone.getDestination();
        dest.volume.value = -8; // commence un peu bas
        dest.volume.rampTo(0, 1.5); // monte progressivement sur 1.5s
      } catch (e) {
        console.warn("Impossible d'initialiser le volume destination :", e);
      }

      // Chemin vers les sons
      const basePath = "/sounds/";
      const samples = {
        A: new Tone.Player(`${basePath}violin_Amin.wav`).connect(masterGain),
        C: new Tone.Player(`${basePath}violin_Cmaj.wav`).connect(masterGain),
        G: new Tone.Player(`${basePath}violin_Gmaj.wav`).connect(masterGain),
      };

      // Réglages fins des Players (fade-in/out + volume réduit)
      Object.values(samples).forEach((p) => {
        try {
          p.fadeIn = 0.15; // 150 ms d’entrée douce
          p.fadeOut = 0.5; // 500 ms de sortie
          p.volume.value = -6; // -6 dB pour réduire le pic
        } catch (e) {
          /* ignore si non supporté */
        }
      });

      // Stockage pour cleanup
      playersRef.current = samples;
      playersRef.current._chain = { reverb, eq, masterGain };

      // Log quand un sample est chargé
      Object.keys(samples).forEach((k) => {
        const p = samples[k];
        if (typeof p.loaded !== "undefined") {
          if (!p.loaded) p.onload = () => console.info(`Sample ${k} chargé`);
        } else if (typeof p.on === "function") {
          try {
            p.on("load", () => console.info(`Sample ${k} chargé`));
          } catch (e) {}
        }
      });

      const chords = ["A", "C", "G"];
      let index = 0;

      const playNextChord = () => {
        const chord = chords[index % chords.length];
        const player = samples[chord];
        if (!player) return;
        try {
          player.start();
        } catch (err) {
          console.warn(`Impossible de démarrer ${chord} :`, err);
        }
        index++;
      };

      // ▶️ Démarre immédiatement puis toutes les ~1.6s
      playNextChord();
      intervalRef.current = setInterval(playNextChord, 1600);

      // ⏳ Après 5s : fade-out global plus doux (4s)
      setTimeout(() => {
        try {
          Tone.getDestination().volume.rampTo(-25, 4); // fade-out progressif
        } catch (err) {
          console.warn("Impossible de faire le fade global :", err);
        }

        clearInterval(intervalRef.current);

        // On attend la fin du fade pour masquer l’intro
        setTimeout(() => {
          finishedRef.current = true;
          setShowIntro(false);
        }, 4000);
      }, 5000);
    } catch (err) {
      console.error("Erreur de démarrage audio :", err);
      setShowIntro(false);
    }
  };

  // cleanup si le composant est démonté (sécurité)
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const players = playersRef.current || {};
      Object.values(players).forEach((p) => {
        try {
          p.stop?.();
          p.dispose?.();
        } catch (e) {}
      });
      try {
        Tone.Transport.stop();
      } catch (e) {}
    };
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white text-5xl font-bold z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              Trajectoire
            </motion.h1>

            {!isPlaying && (
              <motion.button
                className="mt-8 px-6 py-3 text-lg bg-white text-black rounded-xl hover:bg-gray-200 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={startExperience}
              >
                Entrer
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && <TrajectoireInteractive />}

      <footer className="text-center text-gray-500 text-xs mt-8 mb-4">
        Ce site respecte votre vie privée : aucune donnée personnelle, cookie ou
        traceur n’est utilisé. Statistiques anonymisées via Vercel Analytics 🌿
      </footer>
    </div>
  );
