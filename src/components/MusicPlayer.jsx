import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function MusicPlayer({ isPlaying, onToggle }) {
  const { music } = anniversaryConfig;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        aria-label={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        className="glass-card flex items-center space-x-3 px-4 py-2.5 rounded-full border border-gold-500/30 hover:border-gold-400 bg-stone-950/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] group transition-all duration-300"
      >
        {/* Equalizer / Icon */}
        <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 transition-colors">
          {isPlaying ? (
            <div className="flex items-end space-x-0.5 h-3.5">
              <span className="w-0.5 h-full bg-gold-400 animate-[pulse_0.7s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2/3 bg-gold-300 animate-[pulse_1.1s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4/5 bg-gold-400 animate-[pulse_0.9s_ease-in-out_infinite]" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-cream-400" />
          )}
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[9px] uppercase tracking-[0.25em] text-cream-400/70 font-medium">
            {isPlaying ? 'SWEET ISLAMIC NASHEED' : 'PLAY NASHEED'}
          </span>
          <span className="font-serif text-xs text-gold-300 font-normal">
            {isPlaying ? (music.title || 'Acoustic Oud & Gentle Melody') : 'Click to Listen'}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
