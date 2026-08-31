/**
 * Procedural Web Audio API sound synthesizer
 * Zero external audio files required, responsive, low-latency, soft, pleasant tones.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastTriggerTime: number = 0;
  private masterVolume: number = 0.6; // Centralized conservative UI volume

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initContext(): boolean {
    if (this.isMuted) return false;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return !!this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playClick();
    }
    return this.isMuted;
  }

  // Helper to throttle sounds and prevent chaotic audio overlap
  private canPlay(minIntervalMs = 35): boolean {
    if (this.isMuted) return false;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - this.lastTriggerTime < minIntervalMs) return false;
    this.lastTriggerTime = now;
    return this.initContext();
  }

  /**
   * Subtle, soft digital UI tap for interactive buttons
   */
  public playClick() {
    if (!this.canPlay(30) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.035);

      const targetGain = 0.045 * this.masterVolume;
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // AudioContext safe fallback
    }
  }

  /**
   * Navigation confirmation tone - subtle dual-tone upward sweep
   */
  public playNavigate() {
    if (!this.canPlay(45) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.055);

      const targetGain = 0.038 * this.masterVolume;
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {}
  }

  /**
   * Micro-tick for algorithm stepping in visualizer/lab
   */
  public playStep() {
    if (!this.canPlay(30) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

      const targetGain = 0.035 * this.masterVolume;
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }

  /**
   * Positive confirmation sound (soft harmonious major third)
   */
  public playSuccess() {
    this.playCorrect();
  }

  public playCorrect() {
    if (!this.canPlay(90) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // D5 (587.33Hz) -> A5 (880.00Hz) soft harmonic interval
      const notes = [587.33, 880.00];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.055);

        const targetGain = 0.06 * this.masterVolume;
        gain.gain.setValueAtTime(targetGain, now + i * 0.055);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.055 + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.055);
        osc.stop(now + i * 0.055 + 0.16);
      });
    } catch {}
  }

  /**
   * Subtle, soft negative feedback tone (non-punishing, damped low sine)
   */
  public playError() {
    this.playIncorrect();
  }

  public playIncorrect() {
    if (!this.canPlay(90) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(170, now + 0.12);

      const targetGain = 0.045 * this.masterVolume;
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  /**
   * Uplifting chime when search target is discovered
   */
  public playFound() {
    if (!this.canPlay(140) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // C5 -> E5 -> G5 -> C6 pleasant arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        const targetGain = 0.065 * this.masterVolume;
        gain.gain.setValueAtTime(targetGain, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
      });
    } catch {}
  }

  /**
   * Rich completion fanfare for quiz, mastery, and level completions
   */
  public playCompletion() {
    this.playLevelComplete();
  }

  public playLevelComplete() {
    if (!this.canPlay(180) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Fanfare: F4 -> A4 -> C5 -> F5
      const chord = [349.23, 440.00, 523.25, 698.46, 880.00];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === chord.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        const targetGain = 0.08 * this.masterVolume;
        gain.gain.setValueAtTime(targetGain, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    } catch {}
  }

  /**
   * Soft theme toggle sound
   */
  public playThemeToggle() {
    if (!this.canPlay(50) || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.06);

      const targetGain = 0.04 * this.masterVolume;
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }
}

export const sound = new SoundEngine();

