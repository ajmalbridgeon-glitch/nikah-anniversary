// Universal Audio Engine supporting HTML5 Audio playback (with multi-track playlist, seek, volume)

const defaultPlaylist = [
  {
    id: "track-1",
    title: "Wedding Nasheed 💍",
    subtitle: "Muhammad Al Muqit",
    url: "/photos/track_02.mp3",
  },
  {
    id: "track-2",
    title: "Our Love Melody ❤️",
    subtitle: "Sweet Islamic Melody",
    url: "/photos/anniversary_music.webm",
  }
];

class AnniversaryAudioEngine {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 0.75;
    this.isMuted = false;
    this.currentTrackIndex = 0;
    this.playlist = defaultPlaylist;
    this.listeners = new Set();
  }

  getAudio() {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.src = this.playlist[this.currentTrackIndex]?.url || '/photos/anniversary_music.webm';
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
    const currentTrack = this.playlist[this.currentTrackIndex] || this.playlist[0];
    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      isMuted: this.isMuted,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: currentTrack,
      playlist: this.playlist,
    };
  }

  async playTrack(index) {
    if (index >= 0 && index < this.playlist.length) {
      this.currentTrackIndex = index;
      const track = this.playlist[index];
      const audio = this.getAudio();
      audio.src = track.url;
      audio.currentTime = 0;
      try {
        await audio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch (err) {
        console.warn('Audio play request waiting for user gesture:', err);
        this.isPlaying = false;
        this.notify();
        return false;
      }
    }
    return false;
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % this.playlist.length;
    return this.playTrack(nextIdx);
  }

  prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    return this.playTrack(prevIdx);
  }

  async play(url = null) {
    if (url) {
      const idx = this.playlist.findIndex(t => t.url === url);
      if (idx !== -1) {
        return this.playTrack(idx);
      }
    }
    const audio = this.getAudio();
    try {
      await audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio play request blocked:', err);
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


