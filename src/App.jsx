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

    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 3, decay: 2, sustain: 0.7, release: 6 },
    });

    const filter = new Tone.AutoFilter({
      frequency: "0.1hz",
      depth: 0.8,
      baseFrequency: 400,
      octaves: 3,
    }).start();

    const reverb = new Tone.Reverb({ decay: 10, wet: 0.6 }).toDestination();
    synth.chain(filter, reverb);

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
    }, 5000);
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
                  Trajectoire Interactive
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
