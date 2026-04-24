export class SoundEngine {
  private enabled = true;
  private volume = 0.5;
  private ctx: AudioContext | null = null;

  toggle(on: boolean) {
    this.enabled = on;
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
  }

  playClick() {
    this.playTone(800, 0.02, 0.05);
  }

  playError() {
    this.playTone(150, 0.15, 0.1);
  }

  private getContext(): AudioContext | null {
    try {
      this.ctx ??= new AudioContext();
      return this.ctx;
    } catch {
      return null;
    }
  }

  private playTone(frequency: number, duration: number, gainMultiplier: number) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    gain.gain.value = this.volume * gainMultiplier;
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }
}

export const sound = new SoundEngine();
