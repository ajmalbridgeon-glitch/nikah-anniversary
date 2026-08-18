import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function PhotoGallery() {
  const { gallery } = anniversaryConfig;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredPhotos =
    activeCategory === 'All'
      ? gallery.photos
      : gallery.photos.filter((p) => p.category === activeCategory);

  // Lightbox keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredPhotos.length]);

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev < filteredPhotos.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : filteredPhotos.length - 1
    );
  };

  return (
    <section id="gallery" className="relative py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{gallery.tag}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light mb-4">
          {gallery.title}
        </h2>
        <p className="font-serif italic text-cream-300/75 text-base sm:text-lg">
          "{gallery.subtitle}"
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
        {gallery.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-gold-500 text-stone-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'glass-card text-cream-300/70 hover:text-gold-300 hover:border-gold-400/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editorial Responsive Masonry Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[340px] sm:auto-rows-[280px]"
      >
        <AnimatePresence>
          {filteredPhotos.map((photo, idx) => {
            // Span rules for editorial feel
            const isSpan2Col = photo.aspect === 'landscape';
            const isSpan2Row = photo.aspect === 'tall';

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setSelectedImageIndex(idx)}
                className={`group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-gold-500/15 hover:border-gold-400/50 shadow-xl ${
                  isSpan2Col ? 'sm:col-span-2' : ''
                } ${isSpan2Row ? 'sm:row-span-2' : ''}`}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className={`w-full h-full object-cover ${photo.position || 'object-top'} transition-transform duration-700 ease-out group-hover:scale-106 brightness-90 group-hover:brightness-105`}
                  loading="lazy"
                />

                {/* Dark Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Caption & Category Overlay */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-gold-400/90 font-semibold block mb-0.5">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl text-cream-100 font-light leading-snug">
                    {photo.title}
                  </h4>
                  <p className="font-sans text-xs text-cream-300/75 font-light line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
                    {photo.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── FULL-SCREEN EDITORIAL LIGHTBOX ── */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredPhotos[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Top Bar: Counter & Close Button */}
            <div className="flex items-center justify-between z-10">
              <span className="font-serif text-sm tracking-widest text-gold-300">
                {String(selectedImageIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredPhotos.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => setSelectedImageIndex(null)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full border border-gold-500/30 bg-surface-card flex items-center justify-center text-cream-200 hover:text-gold-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Content Area */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-2 md:left-6 z-20 w-11 h-11 rounded-full border border-gold-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-cream-200 hover:text-gold-300 hover:border-gold-400 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl max-h-[75vh] relative rounded-xl overflow-hidden glass-card border border-gold-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
              >
                <img
                  src={filteredPhotos[selectedImageIndex].image}
                  alt={filteredPhotos[selectedImageIndex].title}
                  className="max-h-[72vh] w-auto object-contain mx-auto"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-2 md:right-6 z-20 w-11 h-11 rounded-full border border-gold-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-cream-200 hover:text-gold-300 hover:border-gold-400 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center max-w-xl mx-auto z-10">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-semibold block mb-1">
                {filteredPhotos[selectedImageIndex].category}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-cream-100 font-light">
                {filteredPhotos[selectedImageIndex].title}
              </h3>
              <p className="font-serif italic text-cream-300/80 text-sm mt-1">
                "{filteredPhotos[selectedImageIndex].subtitle}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
