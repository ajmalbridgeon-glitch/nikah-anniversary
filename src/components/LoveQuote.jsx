import React from 'react';
import { motion } from 'framer-motion';
import { anniversaryConfig } from '../data/anniversaryData';

export default function LoveQuote() {
  const { quoteSection, initials } = anniversaryConfig;

  return (
    <section className="relative py-28 md:py-40 w-full overflow-hidden flex items-center justify-center bg-[#0B0908]">
      {/* Blurred Romantic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={quoteSection.bgImage}
          alt="Cinematic Quote Background"
          className="w-full h-full object-cover object-center filter blur-md scale-105 brightness-50 contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0B0908]/75 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-radial-vignette opacity-90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center">
        {/* Decorative Golden Quotation Mark Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-6xl md:text-8xl text-gold-400/30 leading-none mb-2 select-none"
        >
          “
        </motion.div>

        {/* Large Serif Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cream-100 font-light leading-snug tracking-wide mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          {quoteSection.quote}
        </motion.blockquote>

        {/* Secondary Subtitle Quote */}
        {quoteSection.secondaryQuote && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif italic text-base sm:text-xl text-gold-300/90 font-light mb-8"
          >
            "{quoteSection.secondaryQuote}"
          </motion.p>
        )}

        {/* Author / Signature */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center space-x-3"
        >
          <span className="w-10 h-[1px] bg-gold-400/40" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cream-300 font-medium">
            {quoteSection.author}
          </span>
          <span className="w-10 h-[1px] bg-gold-400/40" />
        </motion.div>
      </div>
    </section>
  );
}
