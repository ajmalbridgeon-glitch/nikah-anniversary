import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function Hero({ onEnterStory, onHeartBurst }) {
  const { hero, initials, anniversaryYear } = anniversaryConfig;

  const scrollToStory = (e) => {
    e.preventDefault();
    if (onHeartBurst) onHeartBurst(e);
    const element = document.querySelector('#story');
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0908]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1.0 }}
          transition={{
            duration: 16,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full"
        >
          <img
            src={hero.bgImage}
            alt="Nikah Anniversary Hero"
            className="w-full h-full object-cover object-center brightness-75 contrast-110"
            loading="eager"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908] via-[#0B0908]/50 to-[#0B0908]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0908]/80 via-transparent to-[#0B0908]/40" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 py-32 flex flex-col items-center text-center">
        
        {/* Monogram Emblem Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold-400/70 bg-surface-card/85 backdrop-blur-md flex flex-col items-center justify-center mb-6 shadow-[0_0_40px_rgba(212,175,55,0.35)] ring-4 ring-gold-500/25"
        >
          <span className="font-serif text-base sm:text-lg font-bold text-gold-gradient tracking-widest drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]">
            {initials}
          </span>
        </motion.div>

        {/* Small Uppercase Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gold-400/30 bg-surface-card/60 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(212,175,55,0.12)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
            {hero.badge} • {anniversaryYear}
          </span>
        </motion.div>

        {/* Editorial Serif Heading Lines */}
        <div className="space-y-1 md:space-y-2 mb-8">
          {hero.headingLines.map((line, index) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1.2,
                delay: 0.5 + index * 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden"
            >
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-cream-100 font-light drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                {line}
                {index === hero.headingLines.length - 1 && (
                  <span className="text-gold-400 inline-block ml-1">✦</span>
                )}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-cream-300/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          "{hero.subtitle}"
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#story"
            onClick={scrollToStory}
            className="btn-liquid-glass inline-flex items-center space-x-3 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-cream-100 group"
          >
            <span>{hero.ctaButton}</span>
            <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center group-hover:bg-gold-500/40 group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Floating Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="absolute bottom-8 right-6 md:right-12 z-20 flex flex-col items-center space-y-2 cursor-pointer"
        onClick={scrollToStory}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-cream-400/70 font-medium">
          {hero.scrollText}
        </span>
        <div className="w-9 h-9 rounded-full border border-gold-500/30 bg-surface-card/60 backdrop-blur-sm flex items-center justify-center text-gold-300 hover:border-gold-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}