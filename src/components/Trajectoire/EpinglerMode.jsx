import React from "react";
import { motion } from "framer-motion";
import { X, Pin, PinOff } from "lucide-react";

export default function EpinglerMode({ 
  currentPoem, 
  currentIndex, 
  pinnedLines, 
  onPinLine, 
  onClose, 
  palette 
}) {
  if (!currentPoem) return null;

  const lines = currentPoem.text.split("\n");
  const currentPinnedLines = new Set(pinnedLines[currentIndex] || []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${palette[0]}22, ${palette[1]}33)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ background: `${palette[1]}33` }}
            >
              <Pin size={24} style={{ color: palette[4] }} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Mode Épinglage</h2>
              <p className="text-sm text-gray-600">
                Protégez des vers de l'entropie
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
          <div className="mb-4 p-4 rounded-lg bg-white/50 border border-gray-300">
            <p className="text-sm text-gray-700">
              <strong>Info :</strong> Cliquez sur une ligne pour l'épingler. 
              Les lignes épinglées seront protégées lorsque l'entropie augmente.
            </p>
          </div>

          <div className="space-y-2">
            {lines.map((line, index) => {
              const isPinned = currentPinnedLines.has(index);
              
              return (
                <motion.button
                  key={index}
                  onClick={() => onPinLine(currentIndex, index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isPinned 
                      ? "border-2 shadow-lg" 
                      : "border border-gray-300 hover:border-gray-400"
                  }`}
                  style={{
                    background: isPinned 
                      ? `linear-gradient(135deg, ${palette[1]}44, ${palette[3]}33)`
                      : "rgba(255,255,255,0.3)",
                    borderColor: isPinned ? palette[4] : undefined,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isPinned ? (
                        <Pin 
                          size={18} 
                          style={{ color: palette[4] }}
                          fill={palette[4]}
                        />
                      ) : (
                        <PinOff size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">
                        Ligne {index + 1}
                      </div>
                      <div className={`font-serif ${isPinned ? "font-semibold" : ""}`}>
                        {line || "(ligne vide)"}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-300 bg-white/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {currentPinnedLines.size} ligne(s) épinglée(s)
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`,
                color: "white",
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}