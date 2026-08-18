// Sweet Islamic Nasheed & Acoustic Instrument Synthesizer using Web Audio API
// Synthesizes soothing spiritual melodies inspired by Maqam Nahawand & Bayati,
// featuring gentle acoustic Oud plucks, breathy Ney flute harmonies, and warm ambient drone pads.

class IslamicNasheedAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.droneNodes = [];
    this.audioElement = null;
    this.masterGain = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Warm Acoustic Oud / Qanun Pluck Synthesis
  playOudPluck(freq, startTime, duration = 3.2, velocity = 0.24) {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm acoustic resonant filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    // Fundamental (triangle) + body harmonics (sine & subtle saw)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.004, startTime); // Subtle wooden resonance

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.01, startTime); // Light harmonic chime

    // Natural plucked envelope
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(velocity, startTime + 0.025);
    gainNode.gain.exponentialRampToValueAtTime(velocity * 0.45, startTime + 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
    osc3.stop(startTime + duration);
  }

  // 2. Soft Breathy Ney (Islamic Reed Flute) Note Synthesis
  playNeyFlute(freq, startTime, duration = 2.6, velocity = 0.14) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle vibrato (5.2 Hz)
    vibrato.frequency.setValueAtTime(5.2, startTime);
    vibratoGain.gain.setValueAtTime(2.2, startTime);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    // Warm bandpass/lowpass blend
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime);
    filter.Q.setValueAtTime(2.5, startTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Breathy soft attack and gentle release
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(velocity, startTime + 0.3);
    gainNode.gain.setValueAtTime(velocity * 0.9, startTime + duration - 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    vibrato.start(startTime);
    osc.start(startTime);
    vibrato.stop(startTime + duration);
    osc.stop(startTime + duration);
  }

  // 3. Gentle Spiritual Drone & Harmony Pads
  startDronePads() {
    this.stopDronePads();
    const droneFreqs = [73.42, 110.00, 146.83, 220.00]; // D2, A2, D3, A3

    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.ctx.currentTime);

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const targetVol = idx === 0 ? 0.08 : 0.05 / (idx + 1);
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetVol, this.ctx.currentTime + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneNodes.push({ osc, gain });
    });
  }

  stopDronePads() {
    this.droneNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
        setTimeout(() => osc.stop(), 1100);
      } catch (e) {}
    });
    this.droneNodes = [];
  }

  // 4. Spiritual Islamic Nasheed Melody Progression (Maqam Nahawand on D)
  startIslamicSequence() {
    this.initContext();
    this.isPlaying = true;
    this.startDronePads();

    // Sweet romantic Islamic melody phrases (Oud arpeggios + Ney flute highlights)
    const phrases = [
      // Phrase 1: Spiritual peaceful opening (D -> F -> A -> G -> F -> E -> D)
      {
        oud: [
          { f: 146.83, t: 0.0, v: 0.28 }, // D3
          { f: 220.00, t: 0.2, v: 0.20 }, // A3
          { f: 293.66, t: 0.5, v: 0.22 }, // D4
          { f: 349.23, t: 1.0, v: 0.24 }, // F4
          { f: 440.00, t: 1.6, v: 0.26 }, // A4
          { f: 392.00, t: 2.3, v: 0.20 }, // G4
          { f: 349.23, t: 2.8, v: 0.18 }, // F4
          { f: 329.63, t: 3.3, v: 0.16 }, // E4
        ],
        ney: { f: 440.00, t: 1.5, d: 2.8, v: 0.12 }, // Sustained Ney flute
        duration: 4.2
      },
      // Phrase 2: Gentle yearning & love (G -> Bb -> A -> G -> F -> G -> A)
      {
        oud: [
          { f: 196.00, t: 0.0, v: 0.26 }, // G3
          { f: 293.66, t: 0.3, v: 0.20 }, // D4
          { f: 392.00, t: 0.7, v: 0.22 }, // G4
          { f: 466.16, t: 1.2, v: 0.24 }, // Bb4
          { f: 440.00, t: 1.8, v: 0.24 }, // A4
          { f: 392.00, t: 2.4, v: 0.20 }, // G4
          { f: 349.23, t: 3.0, v: 0.18 }, // F4
          { f: 440.00, t: 3.5, v: 0.22 }, // A4
        ],
        ney: { f: 466.16, t: 1.1, d: 2.6, v: 0.11 },
        duration: 4.2
      },
      // Phrase 3: Heartfelt emotion (F -> A -> C -> D5 -> C -> Bb -> A)
      {
        oud: [
          { f: 174.61, t: 0.0, v: 0.26 }, // F3
          { f: 261.63, t: 0.3, v: 0.20 }, // C4
          { f: 349.23, t: 0.7, v: 0.22 }, // F4
          { f: 440.00, t: 1.2, v: 0.24 }, // A4
          { f: 523.25, t: 1.7, v: 0.22 }, // C5
          { f: 587.33, t: 2.3, v: 0.26 }, // D5 (high sweet touch)
          { f: 523.25, t: 2.9, v: 0.20 }, // C5
          { f: 440.00, t: 3.4, v: 0.18 }, // A4
        ],
        ney: { f: 587.33, t: 2.2, d: 2.2, v: 0.13 },
        duration: 4.2
      },
      // Phrase 4: Peaceful resolution & gratitude (A -> G -> F -> E -> D)
      {
        oud: [
          { f: 110.00, t: 0.0, v: 0.28 }, // A2
          { f: 164.81, t: 0.3, v: 0.20 }, // E3
          { f: 220.00, t: 0.7, v: 0.22 }, // A3
          { f: 329.63, t: 1.2, v: 0.20 }, // E4
          { f: 349.23, t: 1.8, v: 0.22 }, // F4
          { f: 329.63, t: 2.4, v: 0.18 }, // E4
          { f: 293.66, t: 3.0, v: 0.25 }, // D4 (home note)
        ],
        ney: { f: 293.66, t: 2.8, d: 3.0, v: 0.14 },
        duration: 4.5
      }
    ];

    let phraseIdx = 0;

    const playNextPhrase = () => {
      if (!this.isPlaying) return;

      const now = this.ctx.currentTime;
      const phrase = phrases[phraseIdx];

      // Play Oud notes
      phrase.oud.forEach(n => {
        this.playOudPluck(n.f, now + n.t, 3.0, n.v);
      });

      // Play Ney flute note
      if (phrase.ney) {
        this.playNeyFlute(phrase.ney.f, now + phrase.ney.t, phrase.ney.d, phrase.ney.v);
      }

      phraseIdx = (phraseIdx + 1) % phrases.length;
      this.timer = setTimeout(playNextPhrase, phrase.duration * 1000);
    };

    playNextPhrase();
  }

  play(customAudioUrl = null) {
    if (customAudioUrl) {
      if (!this.audioElement) {
        this.audioElement = new Audio(customAudioUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.55;
      }
      this.audioElement.play().then(() => {
        this.isPlaying = true;
      }).catch(() => {
        // Fallback to procedural Islamic nasheed synthesizer
        this.startIslamicSequence();
      });
    } else {
      this.startIslamicSequence();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.stopDronePads();
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  toggle(customAudioUrl = null) {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(customAudioUrl);
      return true;
    }
  }
}

export const romanticAudio = new IslamicNasheedAudioEngine();
