import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, VolumeX } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryData';

export default function Navbar({ isMusicPlaying, onToggleMusic }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'OUR STORY', href: '#story' },
    { label: 'MEMORIES', href: '#memories' },
    { label: 'OUR NIKAH', href: '#nikah' },
    { label: 'LOVE NOTES', href: '#love-notes' },
    { label: 'LETTER', href: '#letter' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0908]/85 backdrop-blur-md border-b border-gold-500/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Initials Brand Logo Circle */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center space-x-3 text-decoration-none"
          >
            <div className="px-3.5 h-11 sm:h-12 min-w-[48px] rounded-full border border-gold-400/50 group-hover:border-gold-400 flex items-center justify-center bg-surface-card/80 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] ring-2 ring-gold-500/20">
              <span className="font-serif text-xs sm:text-sm tracking-wider text-gold-300 group-hover:text-gold-200 font-semibold whitespace-nowrap">
                {anniversaryConfig.initials}
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] tracking-[0.3em] uppercase text-cream-400/70 font-medium">
                ANNIVERSARY
              </span>
              <span className="font-serif text-xs tracking-wider text-gold-300/90 -mt-0.5">
                {anniversaryConfig.anniversaryYear}
              </span>
            </div>
          </a>

          {/* Center / Right: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] tracking-[0.25em] text-cream-300/80 hover:text-gold-300 font-medium transition-all duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-400 to-transparent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Music Toggle & Circular Hamburger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMusic}
              aria-label="Toggle background music"
              title={isMusicPlaying ? 'Pause Romantic Music' : 'Play Romantic Music'}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 hover:border-gold-400/60 bg-surface-card/60 backdrop-blur-sm transition-all duration-300 group"
            >
              {isMusicPlaying ? (
                <>
                  <div className="flex items-end space-x-0.5 h-3">
                    <span className="w-0.5 h-full bg-gold-400 animate-[pulse_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-2/3 bg-gold-300 animate-[pulse_1.2s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-4/5 bg-gold-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-gold-300 font-medium hidden lg:inline">
                    MUSIC ON
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-cream-400/60 group-hover:text-gold-300" />
                  <span className="text-[10px] tracking-widest uppercase text-cream-400/60 group-hover:text-gold-300 font-medium hidden lg:inline">
                    MUSIC OFF
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-full border border-gold-500/30 hover:border-gold-400 bg-surface-card/60 flex items-center justify-center text-cream-200 hover:text-gold-300 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.4)]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#0B0908]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 pt-28"
          >
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl mx-auto w-full flex flex-col items-center justify-center space-y-7 my-auto">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold-400 font-semibold mb-2">
                OUR JOURNEY NAVIGATION
              </span>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.1, duration: 0.5 }}
                  className="font-serif text-2xl md:text-3xl text-cream-200 hover:text-gold-300 tracking-wider transition-colors py-1 flex items-center space-x-3 group"
                >
                  <span className="text-xs font-sans tracking-widest text-gold-500/50 group-hover:text-gold-400">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6 flex flex-col items-center"
              >
                <div className="w-16 h-[1px] bg-gold-500/30 mb-6" />
                <p className="font-serif italic text-cream-400/80 text-sm text-center">
                  "Another year of choosing each other."
                </p>
                <span className="text-xs tracking-widest text-gold-400/90 uppercase mt-2">
                  {anniversaryConfig.initials} • {anniversaryConfig.anniversaryYear}
                </span>
              </motion.div>
            </div>

            <div className="text-center text-[10px] tracking-[0.2em] uppercase text-cream-500/50">
              TAP ANYWHERE OUTSIDE OR SELECT A CHAPTER TO EXPLORE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}