// Universal Audio Engine supporting HTML5 Audio playback (with loop, seek, volume)
// and procedural fallback synthesis.

class AnniversaryAudioEngine {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 0.75;
    this.isMuted = false;
    this.listeners = new Set();
    this.customUrl = '/photos/anniversary_music.webm';
  }

  getAudio() {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.src = this.customUrl;
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('timeupdate', () => {
        this.currentTime = this.audioElement.currentTime;
        this.duration = this.audioElement.duration || 0;
        this.notify();
      });

      this.audioElement.addEventListener('loadedmetadata', () => {
        this.duration = this.audioElement.duration || 0;
        this.notify();
      });

      this.audioElement.addEventListener('volumechange', () => {
        this.volume = this.audioElement.volume;
        this.isMuted = this.audioElement.muted;
        this.notify();
      });
    }
    return this.audioElement;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Initial call
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(fn => {
      try { fn(state); } catch (e) {}
    });
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      isMuted: this.isMuted,
    };
  }

  async play(url = null) {
    if (url && url !== this.customUrl) {
      this.customUrl = url;
      if (this.audioElement) {
        this.audioElement.src = url;
      }
    }

    const audio = this.getAudio();
    try {
      await audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio play request blocked or waiting for user interaction:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  toggle(url = null) {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(url);
      return true;
    }
  }

  setVolume(val) {
    const vol = Math.max(0, Math.min(1, val));
    this.volume = vol;
    const audio = this.getAudio();
    audio.volume = vol;
    if (vol > 0 && audio.muted) {
      audio.muted = false;
    }
    this.notify();
  }

  toggleMute() {
    const audio = this.getAudio();
    audio.muted = !audio.muted;
    this.isMuted = audio.muted;
    this.notify();
  }

  seek(seconds) {
    const audio = this.getAudio();
    if (Number.isFinite(seconds)) {
      audio.currentTime = Math.max(0, Math.min(audio.duration || 0, seconds));
    }
  }
}

export const romanticAudio = new AnniversaryAudioEngine();

