import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";
import TrajectoireInteractive from "./TrajectoireInteractive";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    let synth, reverb, filter;

    const initSoundscape = async () => {
      await Tone.start(); // Active l’audio
      Tone.Transport.start();

      // 🔮 Création d'une nappe sonore flottante
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 3, decay: 2, sustain: 0.7, release: 6 },
      });

      filter = new Tone.AutoFilter({
        frequency: "0.1hz",
        depth: 0.8,
        baseFrequency: 400,
        octaves: 3,
      }).start();

      reverb = new Tone.Reverb({ decay: 10, wet: 0.6 }).toDestination();
      synth.chain(filter, reverb);

      // 🌠 Notes aléatoires en boucle lente
      const notes = ["C4", "E4", "G4", "A4", "D5", "F5"];
      const playRandomNote = () => {
        const note = notes[Math.floor(Math.random() * notes.length)];
        const duration = ["1n", "2n", "4n"][Math.floor(Math.random() * 3)];
        synth.triggerAttackRelease(note, duration, "+0.1");
      };

      const interval = setInterval(playRandomNote, 1200);
      setTimeout(() => {
        clearInterval(interval);
        synth.releaseAll();
        reverb.wet.rampTo(0, 3);
        setShowIntro(false);
      }, 5000); // durée de l’intro (5 secondes)
    };

    initSoundscape();

    return () => {
      Tone.Transport.stop();
      synth?.dispose();
      reverb?.dispose();
      filter?.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 flex items-center justify-center bg-black text-white text-4xl font-bold z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              Trajectoire 
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <TrajectoireInteractive />
          <footer className="text-center text-gray-500 text-xs mt-8 mb-4">
            Ce site respecte votre vie privée : aucune donnée personnelle, cookie ou
            traceur n’est utilisé. Statistiques anonymisées via Vercel Analytics 🌿
          </footer>
        </>
      )}
    </div>
  );
}
