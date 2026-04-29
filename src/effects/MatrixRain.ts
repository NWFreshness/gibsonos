/* ─── Matrix Digital Rain — canvas overlay effect ─── */

const CHARS = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF:;<=>?@';
const FONT_SIZE = 16;
const FADE_SPEED = 0.03;

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  headIndex: number;
  opacity: number;
}

export class MatrixRain {
  private overlay: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private drops: Drop[] = [];
  private animationId: number | null = null;
  private resolve: (() => void) | null = null;
  private cols = 0;
  private rows = 0;

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'matrix-overlay';
    this.overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.85);
      cursor: pointer;
    `;
    this.overlay.addEventListener('click', () => this.dismiss());

    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    this.overlay.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  start(durationMs = 20000): Promise<void> {
    document.body.appendChild(this.overlay);

    this.cols = Math.floor(window.innerWidth / FONT_SIZE);
    this.rows = Math.floor(window.innerHeight / FONT_SIZE);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // seed drops
    this.drops = [];
    for (let i = 0; i < this.cols; i++) {
      this.drops.push(this.newDrop(i, Math.random() * this.rows * FONT_SIZE));
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.dismiss();
    };
    document.addEventListener('keydown', onKey, { once: true });

    // auto-fade during last 3 seconds
    let startTime = performance.now();
    const tick = (time: number) => {
      const elapsed = time - startTime;
      let globalAlpha = 1;
      if (elapsed > durationMs - 3000) {
        globalAlpha = Math.max(0, 1 - (elapsed - (durationMs - 3000)) / 3000);
        if (globalAlpha <= 0) {
          this.dismiss();
          return;
        }
      }

      this.draw(globalAlpha);
      this.animationId = requestAnimationFrame(tick);
    };

    // auto-dismiss after duration
    this.resolve = () => {
      document.removeEventListener('keydown', onKey);
    };

    this.animationId = requestAnimationFrame(tick);

    // timeout for auto-dismiss
    const timeoutId = setTimeout(() => this.dismiss(), durationMs);

    return new Promise<void>((resolve) => {
      const originalResolve = this.resolve!;
      this.resolve = () => {
        clearTimeout(timeoutId);
        originalResolve();
        resolve();
      };
    });
  }

  dismiss() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.overlay.remove();
    this.resolve?.();
  }

  private newDrop(col: number, startY: number): Drop {
    const len = 8 + Math.floor(Math.random() * 18);
    const chars: string[] = [];
    for (let i = 0; i < len; i++) {
      chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
    return {
      x: col * FONT_SIZE,
      y: startY,
      speed: 0.8 + Math.random() * 3.5,
      chars,
      headIndex: 0,
      opacity: 0.3 + Math.random() * 0.7,
    };
  }

  private draw(globalAlpha: number) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // semi-transparent black to create trail effect
    ctx.fillStyle = `rgba(0, 0, 0, ${0.05 * globalAlpha})`;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.font = `${FONT_SIZE}px 'VT323', 'Courier New', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const drop = this.drops[i];

      // draw trailing characters with fading opacity
      for (let j = 0; j < drop.chars.length; j++) {
        const charIndex = (drop.headIndex - j + drop.chars.length) % drop.chars.length;
        const charY = drop.y - j * FONT_SIZE;

        if (charY < -FONT_SIZE || charY > this.canvas.height + FONT_SIZE) continue;

        // head is brightest, tail fades
        const charAlpha = j === 0 ? 1 : Math.max(0, 1 - j / drop.chars.length);
        const green = Math.floor(180 + j * 4);

        ctx.fillStyle = `rgba(0, ${Math.min(255, green)}, 0, ${charAlpha * drop.opacity * globalAlpha})`;
        ctx.fillText(drop.chars[charIndex], drop.x, charY);
      }

      // move drop down
      drop.y += drop.speed;
      drop.headIndex = (drop.headIndex + 1) % drop.chars.length;

      // reset when off screen
      if (drop.y - drop.chars.length * FONT_SIZE > this.canvas.height) {
        this.drops[i] = this.newDrop(i, -drop.chars.length * FONT_SIZE);
      }
    }
  }
}
