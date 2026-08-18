import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';
import { romanticAudio } from '../utils/audioSynth';

export default function MusicPlayer({ isPlaying, onToggle }) {
  const { music } = anniversaryConfig;
  const [audioState, setAudioState] = useState(romanticAudio.getState());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsubscribe;
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    romanticAudio.seek(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    romanticAudio.setVolume(newVol);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-[calc(100vw-3rem)]">
      <motion.div
        layout
        className="glass-card rounded-2xl border border-gold-500/30 bg-[#0E0C0B]/95 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-gold-400/20"
      >
        {/* Top Mini Bar / Summary */}
        <div className="flex items-center space-x-3 px-4 py-2.5">
          {/* Play / Pause Toggle Button */}
          <button
            onClick={onToggle}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 text-stone-950 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-stone-950" />
            ) : (
              <Play className="w-4 h-4 fill-stone-950 translate-x-0.5" />
            )}
          </button>

          {/* Track Details & Status */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col text-left cursor-pointer select-none pr-1"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400 font-bold">
                {isPlaying ? 'NOW PLAYING' : 'ANNIVERSARY MUSIC'}
              </span>
              {isPlaying && (
                <div className="flex items-end space-x-0.5 h-2.5">
                  <span className="w-0.5 h-full bg-gold-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2/3 bg-gold-300 animate-[pulse_0.9s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-4/5 bg-gold-400 animate-[pulse_0.75s_ease-in-out_infinite]" />
                </div>
              )}
            </div>
            <span className="font-serif text-xs text-cream-100 font-medium truncate max-w-[140px] sm:max-w-[180px]">
              {music.title || 'Our Love Song ❤️'}
            </span>
          </div>

          {/* Quick Mute Button */}
          <button
            onClick={() => romanticAudio.toggleMute()}
            className="p-1.5 text-cream-400 hover:text-gold-300 transition-colors"
            aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
          >
            {audioState.isMuted || audioState.volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Expand / Collapse Details Chevron */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-cream-400/70 hover:text-gold-300 transition-colors"
            aria-label="Toggle Full Controller"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Expanded Controls Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 pt-2 border-t border-gold-500/15 space-y-3"
            >
              {/* Progress Bar & Timestamps */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={audioState.duration || 100}
                  value={audioState.currentTime || 0}
                  onChange={handleSeek}
                  aria-label="Track progress"
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
                <div className="flex justify-between text-[10px] text-cream-400/70 font-sans">
                  <span>{formatTime(audioState.currentTime)}</span>
                  <span>{formatTime(audioState.duration)}</span>
                </div>
              </div>

              {/* Volume Slider Row */}
              <div className="flex items-center space-x-3 pt-1">
                <button
                  onClick={() => romanticAudio.toggleMute()}
                  className="text-cream-400 hover:text-gold-300"
                >
                  {audioState.isMuted || audioState.volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={audioState.isMuted ? 0 : audioState.volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume level"
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
                <span className="text-[10px] text-gold-300/80 font-serif w-7 text-right">
                  {Math.round((audioState.isMuted ? 0 : audioState.volume) * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
