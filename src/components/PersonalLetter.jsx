import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function PersonalLetter() {
  const { letter, initials } = anniversaryConfig;

  return (
    <section id="letter" className="relative py-28 md:py-40 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{letter.tag}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light mb-4">
          {letter.title}
        </h2>
        <p className="font-serif italic text-cream-300/80 text-base sm:text-lg">
          "{letter.subtitle}"
        </p>
      </div>

      {/* Luxury Dark Parchment Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl glass-card p-8 sm:p-12 md:p-16 border border-gold-400/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Subtle Decorative Golden Corner Borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400/50" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400/50" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400/50" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400/50" />

        {/* Wax Seal / Monogram Emblem Stamp */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-gold-400/60 bg-stone-900/90 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)] ring-4 ring-gold-500/10">
            <span className="font-serif text-gold-300 font-bold text-sm tracking-widest">
              {initials}
            </span>
            <Heart className="w-2.5 h-2.5 text-gold-400 fill-gold-400 mt-0.5" />
          </div>
        </div>

        {/* Salutation */}
        <h3 className="font-serif italic text-2xl sm:text-3xl text-gold-300 font-normal mb-8">
          {letter.salutation}
        </h3>

        {/* Letter Paragraphs */}
        <div className="space-y-6 text-cream-200/90 font-sans text-sm sm:text-base leading-relaxed font-light">
          {letter.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="leading-loose">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Closing & Handwritten-style Signature */}
        <div className="mt-12 pt-8 border-t border-gold-500/20 flex flex-col items-end text-right">
          <span className="font-serif italic text-cream-400 text-sm mb-2">
            {letter.closing}
          </span>
          <span className="font-script text-3xl sm:text-4xl text-gold-300 tracking-wider">
            {letter.signature}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
