import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, Compass, Feather, Home, ChevronDown } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  ShieldCheck: ShieldCheck,
  Compass: Compass,
  Feather: Feather,
  Home: Home,
};

export default function LoveCards() {
  const { loveCards } = anniversaryConfig;
  const [expandedId, setExpandedId] = useState(null);

  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="love-notes" className="relative py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{loveCards.tag}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light mb-4">
          {loveCards.heading}
        </h2>
        <p className="font-serif italic text-cream-300/80 text-base sm:text-lg">
          "{loveCards.subtitle}"
        </p>
      </div>

      {/* Expandable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loveCards.items.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Heart;
          const isExpanded = expandedId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => toggleCard(item.id)}
              className={`group rounded-2xl glass-card transition-all duration-500 cursor-pointer overflow-hidden p-6 relative ${
                isExpanded
                  ? 'border-gold-400/70 bg-stone-900/80 shadow-[0_0_35px_rgba(212,175,55,0.25)] ring-1 ring-gold-400/40'
                  : 'hover:border-gold-400/40 hover:bg-stone-900/50'
              }`}
            >
              {/* Top Accent Icon & Chevron */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full border border-gold-500/30 group-hover:border-gold-400 flex items-center justify-center bg-gold-500/10 text-gold-400 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div
                  className={`w-7 h-7 rounded-full border border-gold-500/20 flex items-center justify-center text-cream-400 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-gold-300 bg-gold-500/20' : ''
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Preview */}
              <h3 className="font-serif text-2xl text-cream-100 font-light mb-2 group-hover:text-gold-200 transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-cream-400/70 font-light mb-2">
                {item.short}
              </p>

              {/* Expanded Emotional Note */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gold-500/20 mt-3">
                      <p className="font-serif italic text-cream-100 text-sm sm:text-base leading-relaxed font-light">
                        "{item.message}"
                      </p>
                      <span className="block text-[9px] tracking-[0.2em] uppercase text-gold-400/80 font-semibold mt-3">
                        ❤️ REASON #{idx + 1}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isExpanded && (
                <div className="text-[10px] tracking-widest uppercase text-gold-400/60 group-hover:text-gold-400 transition-colors mt-3">
                  TAP TO REVEAL MESSAGE →
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
