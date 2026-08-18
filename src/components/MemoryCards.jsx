import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function MemoryCards() {
  const { memoryCards } = anniversaryConfig;

  return (
    <section id="memories" className="relative py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTERS OF LOVE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light mb-4">
          Treasured Milestones
        </h2>
        <p className="font-serif italic text-cream-300/75 text-base sm:text-lg">
          "The three pillars that hold our most precious memories."
        </p>
      </div>

      {/* 3 Luxury Glassmorphism Cards Grid (Matching Reference Image) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {memoryCards.map((card, idx) => (
          <motion.div
            key={card.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl glass-card glass-card-hover p-6 lg:p-7 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Top Row: Number and Diagonal Arrow */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif text-sm text-gold-400/80 tracking-widest font-light">
                {card.number}
              </span>
              <div className="w-8 h-8 rounded-full border border-gold-500/20 group-hover:border-gold-400 group-hover:bg-gold-500/10 flex items-center justify-center text-cream-300 group-hover:text-gold-300 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl lg:text-3xl text-cream-100 font-light mb-4 tracking-wide group-hover:text-gold-200 transition-colors">
              {card.title}
            </h3>

            {/* Photo Inset Frame */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] my-3 shadow-2xl">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-75" />
            </div>

            {/* Description & Bottom Tracked Caption */}
            <div className="mt-4 pt-4 border-t border-gold-500/15 space-y-2">
              <p className="font-sans text-xs text-cream-300/80 leading-relaxed font-light line-clamp-2">
                {card.description}
              </p>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-gold-400/90 font-medium pt-1">
                {card.caption}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
