import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function NikahSection() {
  const { nikahSection, initials } = anniversaryConfig;

  return (
    <section
      id="nikah"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-gradient-to-b from-[#0B0908] via-[#120F0D] to-[#0B0908] overflow-hidden"
    >
      {/* Warm Golden Halo Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left / Top: Large Framed Cinematic Nikah Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Golden Glow Box */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold-500/20 via-gold-400/5 to-transparent rounded-2xl blur-xl" />

            {/* Photo Container with Luxury Golden Trim & Corner Accents */}
            <div className="relative rounded-2xl overflow-hidden glass-card p-2 md:p-3 border border-gold-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
              {/* Corner Decorative Crosses / Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-400/80 z-20" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-400/80 z-20" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-400/80 z-20" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-400/80 z-20" />

              <div className="relative rounded-xl overflow-hidden aspect-[4/5] group">
                <img
                  src={nikahSection.image}
                  alt="Our Nikah Day"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Monogram Stamp */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full border border-gold-400/60 bg-black/70 backdrop-blur-md flex items-center justify-center text-gold-300 font-serif text-xs sm:text-sm tracking-wider whitespace-nowrap shadow-xl ring-1 ring-gold-400/30">
                  {initials}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold-300 font-semibold block mb-1">
                    OUR SACRED COVENANT
                  </span>
                  <p className="font-serif italic text-cream-200 text-sm">
                    "Two souls bound by love, faith, and a promise forever."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right / Content Column: Emotional Story & Prominent Date */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            {/* Tag Label */}
            <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{nikahSection.tag}</span>
            </div>

            {/* Large Serif Title */}
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-cream-100 font-light tracking-tight">
              {nikahSection.title}
              <span className="text-gold-400 text-3xl ml-2 font-sans font-light">✦</span>
            </h2>

            {/* Prominent Golden Date Badge */}
            <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full border border-gold-400/40 bg-surface-card/80 backdrop-blur-md w-fit shadow-[0_0_25px_rgba(212,175,55,0.15)]">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span className="font-serif text-base sm:text-lg tracking-widest text-gold-200 font-semibold">
                {nikahSection.date}
              </span>
            </div>

            {/* Subtitle Tagline */}
            <p className="font-serif italic text-xl sm:text-2xl text-gold-300/90 font-light border-l-2 border-gold-500/40 pl-4 py-1">
              "{nikahSection.tagline}"
            </p>

            {/* Personal Vows / Paragraph */}
            <p className="font-sans text-cream-200/85 text-sm sm:text-base leading-relaxed font-light">
              {nikahSection.personalParagraph}
            </p>

            {/* Decorative Divider */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="w-12 h-[1px] bg-gold-400/50" />
              <Heart className="w-4 h-4 text-gold-400 fill-gold-400/20" />
              <div className="w-24 h-[1px] bg-gold-400/30" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
