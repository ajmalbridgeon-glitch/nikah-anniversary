import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { anniversaryConfig } from '../data/anniversaryData';

export default function SpecialSurprise({ onHeartBurst }) {
  const { surprise } = anniversaryConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(-1);
  const [showPhoto, setShowPhoto] = useState(false);

  const startSurpriseSequence = (e) => {
    if (onHeartBurst) onHeartBurst(e);
    setIsOpen(true);
    setActiveMessageIndex(-1);
    setShowPhoto(false);

    // Trigger subtle golden celebration confetti
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E3C3', '#E5C396', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    }, 1500);

    // Staged message timings
    surprise.stagedMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setActiveMessageIndex(idx);
        if (idx === surprise.stagedMessages.length - 1) {
          setTimeout(() => {
            setShowPhoto(true);
            confetti({
              particleCount: 60,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#D4AF37', '#F3E3C3', '#C5A880'],
            });
          }, 1200);
        }
      }, (idx + 1) * 2200);
    });
  };

  const closeSurprise = () => {
    setIsOpen(false);
  };

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-5xl mx-auto text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 glass-card rounded-3xl p-10 md:p-16 border border-gold-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FINAL SURPRISE</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light mb-6 tracking-wide">
          {surprise.promptHeading}
        </h2>

        <p className="font-serif italic text-cream-300/80 text-base sm:text-xl font-light max-w-xl mx-auto mb-10">
          "A quiet truth from my heart to yours."
        </p>

        {/* Liquid Glass Surprise Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={startSurpriseSequence}
          className="btn-liquid-glass inline-flex items-center space-x-3 px-10 py-5 rounded-full text-xs font-semibold uppercase tracking-[0.3em] text-gold-200 border-gold-400 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] group"
        >
          <Heart className="w-4 h-4 text-gold-400 fill-gold-400 group-hover:scale-110 transition-transform" />
          <span>{surprise.buttonText}</span>
        </motion.button>
      </div>

      {/* ── CINEMATIC FULL-SCREEN MULTI-STEP SURPRISE MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden"
          >
            {/* Background Photograph Fading In at Climax */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={showPhoto ? { opacity: 0.28, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={surprise.bgImage}
                alt="Romantic Surprise"
                className="w-full h-full object-cover filter brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-radial-vignette opacity-90" />
            </motion.div>

            {/* Expanding Central Warm Golden Light Core */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.1, 1.8, 2.5], opacity: [0, 0.8, 0.45] }}
              transition={{ duration: 4, ease: 'easeOut' }}
              className="absolute w-[400px] h-[400px] bg-gradient-to-r from-gold-500/30 via-amber-400/20 to-transparent rounded-full blur-[100px] pointer-events-none"
            />

            {/* Close / Replay Controls Top Right */}
            <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
              <button
                onClick={startSurpriseSequence}
                aria-label="Replay Surprise"
                title="Replay sequence"
                className="w-10 h-10 rounded-full border border-gold-500/30 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center text-cream-300 hover:text-gold-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={closeSurprise}
                aria-label="Close Surprise"
                className="w-10 h-10 rounded-full border border-gold-500/30 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center text-cream-300 hover:text-gold-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Staged Messages Stage Area */}
            <div className="relative z-10 max-w-3xl flex flex-col items-center space-y-6">
              {activeMessageIndex === -1 ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-gold-400 shadow-[0_0_25px_rgba(212,175,55,1)]"
                />
              ) : (
                <div className="space-y-6">
                  {surprise.stagedMessages.slice(0, activeMessageIndex + 1).map((msg, idx) => (
                    <motion.div
                      key={msg.text}
                      initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {msg.highlight ? (
                        <div className="pt-4">
                          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-gold-300 font-normal tracking-wide drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                            {msg.text}
                          </h2>
                          {showPhoto && (
                            <motion.p
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6, duration: 1 }}
                              className="font-serif italic text-cream-200 text-lg md:text-xl font-light mt-6 max-w-xl mx-auto"
                            >
                              "{surprise.closingNote}"
                            </motion.p>
                          )}
                        </div>
                      ) : (
                        <p
                          className={`font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wide ${
                            idx === activeMessageIndex
                              ? 'text-cream-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                              : 'text-cream-400/60'
                          }`}
                        >
                          {msg.text}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Note */}
            <div className="absolute bottom-8 text-[11px] uppercase tracking-[0.25em] text-cream-500/60 font-sans">
              PRESS ESC OR CLOSE TO RETURN
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
