import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function StoryTimeline() {
  const { timeline } = anniversaryConfig;
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const nextStep = () => {
    setActiveStep((prev) => (prev < timeline.events.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{timeline.sectionTag}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light mb-6"
        >
          {timeline.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-serif italic text-base sm:text-lg md:text-xl text-cream-300/80 font-light"
        >
          {timeline.subtitle}
        </motion.p>
      </div>

      {/* ── DESKTOP INTERACTIVE HORIZONTAL TIMELINE ── */}
      <div className="hidden lg:block">
        {/* Timeline Progress Bar & Milestone Dots */}
        <div className="relative mb-14 px-8">
          <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-surface-muted -translate-y-1/2" />
          
          {/* Animated Gold Progress Line */}
          <motion.div
            className="absolute top-1/2 left-8 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 -translate-y-1/2 shadow-[0_0_12px_rgba(212,175,55,0.6)]"
            initial={{ width: '0%' }}
            animate={{
              width: `${(activeStep / (timeline.events.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative z-10 flex justify-between items-center">
            {timeline.events.map((evt, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <button
                  key={evt.number}
                  onClick={() => setActiveStep(idx)}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-xs transition-all duration-500 ${
                      isActive
                        ? 'bg-gold-500 text-stone-950 font-bold scale-110 shadow-[0_0_20px_rgba(212,175,55,0.7)]'
                        : isPast
                        ? 'bg-surface-card border border-gold-400 text-gold-300'
                        : 'bg-surface-card border border-gold-500/20 text-cream-400/50 group-hover:border-gold-400/60'
                    }`}
                  >
                    {evt.number}
                  </div>
                  <span
                    className={`text-[10px] tracking-widest uppercase mt-3 transition-colors duration-300 ${
                      isActive
                        ? 'text-gold-300 font-semibold'
                        : 'text-cream-400/50 group-hover:text-cream-300'
                    }`}
                  >
                    {evt.date.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Desktop Milestone Card */}
        <div className="relative min-h-[440px]">
          {timeline.events.map((evt, idx) => {
            if (idx !== activeStep) return null;
            return (
              <motion.div
                key={evt.number}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-8 lg:p-10 grid grid-cols-12 gap-8 items-center"
              >
                {/* Photo Side */}
                <div className="col-span-6 relative rounded-xl overflow-hidden aspect-[4/3] group shadow-2xl">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/30 text-gold-300 text-[10px] tracking-widest uppercase">
                    <Calendar className="w-3 h-3" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="col-span-6 flex flex-col justify-center space-y-4 pr-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-3xl text-gold-400 font-light">
                      {evt.number}
                    </span>
                    <span className="w-8 h-[1px] bg-gold-400/40" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-cream-400/70">
                      CHAPTER {evt.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl lg:text-4xl text-cream-100 font-light">
                    {evt.title}
                  </h3>

                  <p className="font-sans text-cream-300/85 text-sm lg:text-base leading-relaxed font-light">
                    {evt.description}
                  </p>

                  {/* Navigation controls */}
                  <div className="pt-6 flex items-center justify-between border-t border-gold-500/15">
                    <div className="flex space-x-2">
                      <button
                        onClick={prevStep}
                        disabled={activeStep === 0}
                        aria-label="Previous Chapter"
                        className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-cream-300 hover:text-gold-300 hover:border-gold-400 disabled:opacity-30 disabled:hover:border-gold-500/30 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextStep}
                        disabled={activeStep === timeline.events.length - 1}
                        aria-label="Next Chapter"
                        className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-cream-300 hover:text-gold-300 hover:border-gold-400 disabled:opacity-30 disabled:hover:border-gold-500/30 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-[11px] tracking-widest text-gold-400 font-serif">
                      0{activeStep + 1} / 0{timeline.events.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE / TABLET VERTICAL TIMELINE ── */}
      <div className="block lg:hidden relative">
        {/* Continuous Vertical Glowing Line */}
        <div className="absolute top-4 bottom-4 left-4 w-[2px] bg-gradient-to-b from-gold-500 via-gold-400/40 to-gold-500/10" />

        <div className="space-y-10 pl-10">
          {timeline.events.map((evt, idx) => (
            <motion.div
              key={evt.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative glass-card rounded-xl p-5 border border-gold-500/20 shadow-lg"
            >
              {/* Timeline Node on the line */}
              <div className="absolute -left-10 top-5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0B0908] border-2 border-gold-400 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                <span className="text-[9px] font-serif text-gold-300 font-bold">
                  {evt.number}
                </span>
              </div>

              {/* Photo Inset */}
              <div className="rounded-lg overflow-hidden aspect-[16/11] mb-4 relative shadow-md">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover object-[center_15%]"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-gold-500/30 text-gold-300 text-[9px] tracking-widest uppercase">
                  {evt.date}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase text-gold-400/80 mb-1">
                <span>CHAPTER {evt.number}</span>
              </div>

              <h3 className="font-serif text-2xl text-cream-100 font-light mb-2">
                {evt.title}
              </h3>

              <p className="font-sans text-cream-300/80 text-xs leading-relaxed">
                {evt.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
