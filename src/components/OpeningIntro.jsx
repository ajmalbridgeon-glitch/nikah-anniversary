import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalaxyCanvas from './GalaxyCanvas';
import { anniversaryConfig } from '../data/anniversaryData';
import { romanticAudio } from '../utils/audioSynth';

export default function OpeningIntro({ onComplete, onMusicStart }) {
  const [stage, setStage] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  const { opening, initials, nikahDate, anniversaryYear, music } = anniversaryConfig;

  useEffect(() => {
    if (stage === 0) return;

    const timings = {
      1: 3000,
      2: 5500,
      3: 5000,
      4: 7500,
    };

    if (timings[stage]) {
      const timer = setTimeout(() => {
        setStage((prev) => prev + 1);
      }, timings[stage]);
      return () => clearTimeout(timer);
    } else if (stage === 5) {
      const exitTimer = setTimeout(onComplete, 1200);
      return () => clearTimeout(exitTimer);
    }
  }, [stage, onComplete]);

  const handleOpenDoors = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (navigator.vibrate) navigator.vibrate([70, 40, 110]);

    setTimeout(() => {
      try {
        romanticAudio.play(music?.customAudioUrl);
        if (onMusicStart) onMusicStart();
      } catch (err) {
        console.warn('Audio blocked or unavailable:', err);
      }
    }, 300);

    setStage(1);
  };

  const handleNextStage = () => {
    if (stage >= 2 && stage <= 4) {
      setStage((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    try {
      romanticAudio.play(music?.customAudioUrl);
      if (onMusicStart) onMusicStart();
    } catch {
      // Audio fallback
    }
    setStage(5);
    onComplete();
  };

  return (
    <AnimatePresence>
      {stage < 5 && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-50 bg-[#040303] select-none overflow-hidden touch-manipulation [perspective:1400px]"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={stage >= 2 && stage <= 4 ? handleNextStage : undefined}
        >
          {/* 1. Orbiting 3D Spiral Galaxy Canvas */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <GalaxyCanvas />

            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: stage === 1 ? [0, 0.8, 0.3] : 0.25,
                  scale: stage === 1 ? [0.8, 1.4, 1] : 1,
                }}
                transition={{ duration: 3.5, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(255,235,185,0.18) 0%, rgba(212,175,55,0.08) 40%, transparent 75%)',
                  mixBlendMode: 'screen',
                }}
              />
            )}
          </div>

          {/* 2. Top Header Bar */}
          <div className="relative z-30 w-full flex justify-center items-center px-6 pt-8 pointer-events-none">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-300 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-center">
              {anniversaryYear} • {nikahDate}
            </span>
            {stage > 0 && (
              <motion.button
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-6 top-7 pointer-events-auto text-[9px] uppercase tracking-[0.25em] text-cream-200 px-3.5 py-1.5 border border-gold-500/30 rounded-full backdrop-blur-md bg-black/40 hover:opacity-100 transition-opacity"
              >
                Skip ✕
              </motion.button>
            )}
          </div>

          {/* 3. Physical 3D Celestial Double Doors */}
          <AnimatePresence>
            {stage <= 1 && (
              <div className="absolute inset-0 z-20 pointer-events-none flex">
                <motion.div
                  key="door-left"
                  initial={{ x: 0, rotateY: 0 }}
                  animate={stage === 1 ? { x: '-105%', rotateY: -75, opacity: 0 } : { x: 0, rotateY: 0 }}
                  transition={{ duration: 3.0, ease: [0.77, 0, 0.175, 1] }}
                  className="w-1/2 h-full bg-gradient-to-r from-[#0d0a08] via-[#1a140f] to-[#251b14] border-r border-gold-600/40 shadow-[20px_0_60px_rgba(0,0,0,0.95)] origin-left relative overflow-hidden"
                >
                  <div className="absolute inset-6 border border-gold-500/15 rounded-tl-3xl pointer-events-none" />
                </motion.div>

                <motion.div
                  key="door-right"
                  initial={{ x: 0, rotateY: 0 }}
                  animate={stage === 1 ? { x: '105%', rotateY: 75, opacity: 0 } : { x: 0, rotateY: 0 }}
                  transition={{ duration: 3.0, ease: [0.77, 0, 0.175, 1] }}
                  className="w-1/2 h-full bg-gradient-to-l from-[#0d0a08] via-[#1a140f] to-[#251b14] border-l border-gold-600/40 shadow-[-20px_0_60px_rgba(0,0,0,0.95)] origin-right relative overflow-hidden"
                >
                  <div className="absolute inset-6 border border-gold-500/15 rounded-tr-3xl pointer-events-none" />
                </motion.div>

                {stage === 0 && (
                  <motion.div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.9),0_0_70px_20px_rgba(212,175,55,0.8)] z-30"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
            )}
          </AnimatePresence>

          {/* 4. Stage 0 Knocker Interaction */}
          {stage === 0 && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0 }}
                className="flex flex-col items-center space-y-8 max-w-sm"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full bg-gold-500/25 blur-3xl"
                  />
                  <motion.button
                    onClick={handleOpenDoors}
                    whileTap={{ scale: 0.94, y: 4 }}
                    className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-[#D4AF37] bg-gradient-to-b from-[#2a221a] via-[#1a140e] to-[#0d0a07] flex flex-col items-center justify-center shadow-[0_15px_50px_rgba(0,0,0,0.95),inset_0_3px_10px_rgba(255,255,255,0.25)] ring-4 ring-[#D4AF37]/30 cursor-pointer"
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient tracking-widest drop-shadow-[0_0_15px_rgba(212,175,55,0.9)]">
                      {initials}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gold-300/90 font-medium mt-1">
                      SEALED
                    </span>
                  </motion.button>
                </div>

                <div className="space-y-2">
                  <h1 className="font-serif italic text-2xl sm:text-3xl text-cream-100 font-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    Written in the Heavens
                  </h1>
                  <p className="text-xs text-gold-300/90 tracking-wide font-light">
                    Best experienced with sound on 🎧
                  </p>
                </div>

                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-medium"
                >
                  Tap the seal to unlock our story
                </motion.p>
              </motion.div>
            </div>
          )}

          {/* 5. Timed Calligraphy & Story Frames */}
          <div className="relative z-30 max-w-2xl w-full flex flex-col items-center justify-center my-auto min-h-[380px] px-6 text-center pointer-events-none">
            <AnimatePresence mode="wait">
              {stage === 2 && (
                <motion.div
                  key="frame-2-ayah"
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center space-y-6"
                >
                  <p className="font-arabic text-xl sm:text-2xl text-gold-200/90 font-normal drop-shadow-[0_0_25px_rgba(212,175,55,0.7)]" dir="rtl">
                    {opening.bismillahArabic}
                  </p>

                  <div className="py-2">
                    <h2 className="font-arabic text-4xl sm:text-6xl text-gold-gradient font-bold leading-relaxed drop-shadow-[0_0_40px_rgba(212,175,55,0.9)]" dir="rtl">
                      {opening.ayahArabic}
                    </h2>
                  </div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <p className="font-serif italic text-base sm:text-xl text-cream-100 font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      {opening.ayahTranslation}
                    </p>
                    <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-gold-300/80">
                      — {opening.ayahSurah}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400/40 pt-4 animate-pulse">
                    (Tap screen to continue)
                  </span>
                </motion.div>
              )}

              {stage === 3 && (
                <motion.div
                  key="frame-3-dua"
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center space-y-6"
                >
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold-300/70">The Sacred Covenant</span>
                  <p className="font-arabic text-2xl sm:text-4xl text-gold-200 font-normal leading-relaxed max-w-xl drop-shadow-[0_0_30px_rgba(212,175,55,0.7)]" dir="rtl">
                    {opening.nikahDuaArabic}
                  </p>
                  <p className="font-serif italic text-sm sm:text-base text-gold-300/90 font-light max-w-md">
                    {opening.nikahDuaTranslation}
                  </p>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400/40 pt-2 animate-pulse">
                    (Tap screen to continue)
                  </span>
                </motion.div>
              )}

              {stage === 4 && (
                <motion.div
                  key="frame-4-story"
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
                  transition={{ duration: 1.1 }}
                  className="flex flex-col items-center space-y-6 max-w-lg"
                >
                  <p className="font-serif italic text-2xl sm:text-4xl text-cream-100 font-light tracking-wide leading-relaxed drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                    "{opening.romanticNote}"
                  </p>

                  <div className="space-y-1">
                    <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
                      {opening.storyTitle}
                    </h2>
                    <p className="font-serif italic text-sm sm:text-base text-gold-300 font-light">
                      {opening.storySubtitle}
                    </p>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400/40 pt-2 animate-pulse">
                    (Entering our story...)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}