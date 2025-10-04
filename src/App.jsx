import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";
import TrajectoireInteractive from "./TrajectoireInteractive";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);

  const startExperience = async () => {
  await Tone.start();
  setAudioStarted(true);

  // --- Violons éthérés / nappes de cordes ---
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" },
    envelope: {
      attack: 4,
      decay: 2,
      sustain: 0.8,
      release: 8,
    },
    volume: -10,
  });

  const chorus = new Tone.Chorus({
    frequency: 0.3,
    delayTime: 4,
    depth: 0.7,
    spread: 180,
  }).start();

  const reverb = new Tone.Reverb({
    decay: 12,
    wet: 0.6,
  }).toDestination();

  synth.chain(chorus, reverb);

  const notes = ["A3", "C4", "E4", "G4", "B4", "D5"];
  const playNote = () => {
    const note = notes[Math.floor(Math.random() * notes.length)];
    synth.triggerAttackRelease(note, "4n");
  };

  const interval = setInterval(playNote, 1500);

  setTimeout(() => {
    clearInterval(interval);
    synth.releaseAll();
    reverb.wet.rampTo(0, 4);
    setShowIntro(false);
  }, 6000);
};

  useEffect(() => {
    return () => Tone.Transport.stop();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {!audioStarted ? (
              <>
                <motion.h1
                  className="text-4xl font-bold mb-8"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  Trajectoire 
                </motion.h1>
                <motion.button
                  onClick={startExperience}
                  className="px-6 py-3 border border-white rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  Commencer
                </motion.button>
              </>
            ) : (
              <motion.h1
                className="text-4xl font-bold"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                Trajectoire 
              </motion.h1>
            )}
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
