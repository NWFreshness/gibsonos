// Simple audio manager stub — expand with Web Audio API / howler.js later

export class SoundEngine {
  private enabled = true;
  private volume = 0.5;

  toggle(on: boolean) {
    this.enabled = on;
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
  }

  playClick() {
    if (!this.enabled) return;
    // Placeholder: use Web Audio API oscillator for a short click
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = this.volume * 0.05;
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // ignore
    }
  }

  playError() {
    if (!this.enabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 150;
      gain.gain.value = this.volume * 0.1;
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
