import React, { useState, useEffect } from 'react';
import OpeningIntro from './components/OpeningIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleCanvas from './components/ParticleCanvas';
import StoryTimeline from './components/StoryTimeline';
import NikahSection from './components/NikahSection';
import MemoryCards from './components/MemoryCards';
import PhotoGallery from './components/PhotoGallery';
import LoveCards from './components/LoveCards';
import LoveQuote from './components/LoveQuote';
import SpecialSurprise from './components/SpecialSurprise';
import PersonalLetter from './components/PersonalLetter';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import { useHeartBurst, HeartBurstRenderer } from './components/HeartBurst';
import { romanticAudio } from './utils/audioSynth';
import { anniversaryConfig } from './data/anniversaryData';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { hearts, triggerHeartBurst } = useHeartBurst();

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setIsMusicPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggleMusic = () => {
    romanticAudio.toggle(anniversaryConfig.music.customAudioUrl);
  };

  return (
    <div className="min-h-screen bg-[#0B0908] text-[#F5EFEB] selection:bg-gold-500/30 selection:text-gold-200 relative overflow-x-hidden">
      {/* 1. Opening Cinematic Intro Experience */}
      {!introCompleted && (
        <OpeningIntro
          onComplete={() => setIntroCompleted(true)}
          onMusicStart={() => setIsMusicPlaying(true)}
        />
      )}

      {/* 2. Floating Ambient Golden Bokeh & Dust Particles */}
      <ParticleCanvas />

      {/* 3. Floating Micro-Heart Interaction Layer */}
      <HeartBurstRenderer hearts={hearts} />

      {/* 4. Luxury Navbar */}
      <Navbar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* 5. Main Story Sections */}
      <main>
        <Hero
          onEnterStory={triggerHeartBurst}
          onHeartBurst={triggerHeartBurst}
        />

        <StoryTimeline />

        <NikahSection />

        <MemoryCards />

        <PhotoGallery />

        <LoveCards />

        <LoveQuote />

        <SpecialSurprise onHeartBurst={triggerHeartBurst} />

        <PersonalLetter />
      </main>

      {/* 6. Floating Music Player Controller */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        onToggle={handleToggleMusic}
      />

      {/* 7. Romantic Outro & Footer */}
      <Footer onHeartBurst={triggerHeartBurst} />
    </div>
  );
}