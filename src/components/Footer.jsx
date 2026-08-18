import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function Footer({ onHeartBurst }) {
  const { outro, footer, initials } = anniversaryConfig;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative pt-24 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#0B0908] via-[#0D0A09] to-[#050404] border-t border-gold-500/10 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center space-y-12">
        {/* Outro Grand Emotional Statement */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 rounded-full border border-gold-400/40 bg-stone-950/80 mx-auto flex items-center justify-center text-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-6 cursor-pointer"
            onClick={onHeartBurst}
          >
            <Heart className="w-5 h-5 fill-gold-400/30 animate-pulse" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light tracking-wide">
            {outro.heading}
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-cream-300/80 font-light">
            {outro.subheading}
          </p>

          <div className="pt-4 flex flex-col items-center space-y-2">
            <span className="font-serif text-2xl sm:text-3xl text-gold-300 font-medium">
              {outro.anniversaryGreeting}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-cream-400/70">
              {outro.signOff}
            </span>
          </div>
        </div>

        {/* Scroll Back to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center space-x-2 px-5 py-2 rounded-full border border-gold-500/20 hover:border-gold-400 text-cream-400 hover:text-gold-300 text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>RETURN TO TOP</span>
        </button>

        {/* Minimal Footer Divider */}
        <div className="w-full pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] uppercase text-cream-500/50 space-y-4 sm:space-y-0">
          <span>{initials} • {footer.copyrightText}</span>
          <span>{footer.madeWithLove} {footer.year}</span>
        </div>
      </div>
    </footer>
  );
}
