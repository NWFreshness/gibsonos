import {
  castRay,
  createHaloGameState,
  firePlasmaRifle,
  movePlayer,
  strafePlayer,
  tickShotEffects,
  turnPlayer,
  updateEnemies,
} from './HaloGame';
import type { HaloEnemy, HaloGameState } from './HaloGame';

const WIDTH = 640;
const HEIGHT = 360;
const FOV = Math.PI / 3;

export class HaloApp {
  element: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private status: HTMLElement;
  private state: HaloGameState;
  private keys = new Set<string>();
  private animationId: number | null = null;
  private lastFrameTime = 0;

  constructor() {
    this.state = createHaloGameState();
    this.element = document.createElement('div');
    this.element.className = 'halo-app';

    const header = document.createElement('div');
    header.className = 'halo-header';
    header.innerHTML = '<strong>HALO: DOOM EVOLVED</strong><span>Master Chief vs the Covenant on Halo</span>';

    this.canvas = document.createElement('canvas');
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.canvas.tabIndex = 0;
    this.canvas.setAttribute('aria-label', 'DOOM-style Halo level canvas');
    this.ctx = this.canvas.getContext('2d');

    const controls = document.createElement('div');
    controls.className = 'halo-controls';
    controls.textContent = 'W/S move • A/D strafe • ←/→ turn • Space fire plasma rifle • Click canvas to focus';

    this.status = document.createElement('div');
    this.status.className = 'halo-status';

    this.element.appendChild(header);
    this.element.appendChild(this.canvas);
    this.element.appendChild(controls);
    this.element.appendChild(this.status);

    this.canvas.addEventListener('keydown', (event) => this.onKeyDown(event));
    this.canvas.addEventListener('keyup', (event) => this.keys.delete(event.key));
    this.canvas.addEventListener('click', () => this.canvas.focus());

    this.render();
    this.start();
  }

  destroy() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
      firePlasmaRifle(this.state);
      this.render();
      return;
    }
    this.keys.add(event.key);
  }

  private start() {
    const tick = (time: number) => {
      const deltaMs = this.lastFrameTime ? time - this.lastFrameTime : 16;
      this.lastFrameTime = time;
      this.updateFromKeys();
      updateEnemies(this.state);
      tickShotEffects(this.state, deltaMs);
      this.render();
      this.animationId = requestAnimationFrame(tick);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  private updateFromKeys() {
    if (this.keys.has('ArrowLeft')) turnPlayer(this.state, -0.055);
    if (this.keys.has('ArrowRight')) turnPlayer(this.state, 0.055);
    if (this.keys.has('w') || this.keys.has('W')) movePlayer(this.state, 0.055);
    if (this.keys.has('s') || this.keys.has('S')) movePlayer(this.state, -0.045);
    if (this.keys.has('a') || this.keys.has('A')) strafePlayer(this.state, -0.045);
    if (this.keys.has('d') || this.keys.has('D')) strafePlayer(this.state, 0.045);
  }

  private render() {
    if (!this.ctx) {
      this.status.textContent = 'Canvas unavailable. Cortana cannot initialize the visor.';
      return;
    }

    this.drawSkyAndFloor();
    this.drawWalls();
    this.drawSprites();
    this.drawShotEffects();
    this.drawWeapon();
    this.drawHud();
    this.status.textContent = `Chief: ${Math.ceil(this.state.player.health)} HP / ${Math.ceil(this.state.player.shield)} SHIELD • Ammo ${this.state.player.ammo} • Covenant ${this.state.enemies.filter((enemy) => enemy.alive).length} • ${this.state.message}`;
  }

  private drawSkyAndFloor() {
    if (!this.ctx) return;
    const sky = this.ctx.createLinearGradient(0, 0, 0, HEIGHT / 2);
    sky.addColorStop(0, '#020516');
    sky.addColorStop(1, '#144069');
    this.ctx.fillStyle = sky;
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT / 2);

    this.ctx.strokeStyle = '#9fd8ff';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(WIDTH * 0.72, HEIGHT * 0.16, 220, Math.PI * 1.04, Math.PI * 1.7);
    this.ctx.stroke();

    this.ctx.fillStyle = '#172016';
    this.ctx.fillRect(0, HEIGHT / 2, WIDTH, HEIGHT / 2);
    for (let y = HEIGHT / 2; y < HEIGHT; y += 18) {
      this.ctx.strokeStyle = `rgba(74, 180, 96, ${Math.min(0.35, (y - HEIGHT / 2) / HEIGHT)})`;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(WIDTH, y);
      this.ctx.stroke();
    }
  }

  private drawWalls() {
    if (!this.ctx) return;
    const columns = 160;
    const columnWidth = WIDTH / columns;
    for (let i = 0; i < columns; i++) {
      const angle = this.state.player.angle - FOV / 2 + (i / columns) * FOV;
      const distance = castRay(this.state, angle) * Math.cos(angle - this.state.player.angle);
      const wallHeight = Math.min(HEIGHT, HEIGHT / Math.max(distance, 0.15));
      const shade = Math.max(30, 185 - distance * 18);
      this.ctx.fillStyle = `rgb(${Math.floor(shade * 0.35)}, ${Math.floor(shade * 0.8)}, ${Math.floor(shade)})`;
      this.ctx.fillRect(i * columnWidth, (HEIGHT - wallHeight) / 2, Math.ceil(columnWidth), wallHeight);
      if (i % 8 === 0) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.ctx.fillRect(i * columnWidth, (HEIGHT - wallHeight) / 2, 1, wallHeight);
      }
    }
  }

  private drawSprites() {
    if (!this.ctx) return;
    const visible = this.state.enemies
      .filter((enemy) => enemy.alive)
      .map((enemy) => ({ enemy, distance: Math.hypot(enemy.x - this.state.player.x, enemy.y - this.state.player.y) }))
      .sort((a, b) => b.distance - a.distance);

    for (const { enemy, distance } of visible) {
      const angleToEnemy = Math.atan2(enemy.y - this.state.player.y, enemy.x - this.state.player.x);
      const delta = normalizeSpriteAngle(angleToEnemy - this.state.player.angle);
      if (Math.abs(delta) > FOV / 1.4) continue;

      const x = WIDTH / 2 + (delta / (FOV / 2)) * (WIDTH / 2);
      const size = Math.max(18, Math.min(120, 140 / distance));
      const y = HEIGHT / 2 - size / 2 + 28 / distance;
      this.drawEnemy(enemy, x, y, size);
    }
  }

  private drawEnemy(enemy: HaloEnemy, x: number, y: number, size: number) {
    if (!this.ctx) return;
    const color = {
      Grunt: '#ff8f00',
      Elite: '#6d8cff',
      Jackal: '#d7ff4f',
      Hunter: '#7b4fcb',
    }[enemy.species];

    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - size * 0.25, y, size * 0.5, size * 0.72);
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(x - size * 0.18, y + size * 0.12, size * 0.36, size * 0.12);
    this.ctx.fillStyle = '#c7f7ff';
    this.ctx.fillRect(x - size * 0.12, y + size * 0.15, size * 0.08, size * 0.05);
    this.ctx.fillRect(x + size * 0.04, y + size * 0.15, size * 0.08, size * 0.05);
    this.ctx.fillStyle = '#000';
    this.ctx.fillText(enemy.species, x - size * 0.32, y - 4);
  }

  private drawShotEffects() {
    if (!this.ctx) return;
    for (const effect of this.state.shotEffects) {
      const alpha = Math.max(0, 1 - effect.ageMs / effect.durationMs);
      const start = this.projectWorldPoint(effect.fromX, effect.fromY);
      const end = this.projectWorldPoint(effect.toX, effect.toY);
      const muzzleX = effect.kind === 'player' ? WIDTH / 2 : start.x;
      const muzzleY = effect.kind === 'player' ? HEIGHT - 82 : start.y;
      const targetX = effect.kind === 'enemy' ? WIDTH / 2 : end.x;
      const targetY = effect.kind === 'enemy' ? HEIGHT * 0.62 : end.y;

      this.ctx.strokeStyle = effect.kind === 'enemy' ? `rgba(255, 71, 215, ${alpha})` : `rgba(123, 232, 255, ${alpha})`;
      this.ctx.lineWidth = effect.kind === 'enemy' ? 3 : 4;
      this.ctx.beginPath();
      this.ctx.moveTo(muzzleX, muzzleY);
      this.ctx.lineTo(targetX, targetY);
      this.ctx.stroke();

      this.ctx.fillStyle = effect.color;
      this.ctx.fillRect(targetX - 4 * alpha, targetY - 4 * alpha, 8 * alpha, 8 * alpha);
    }
  }

  private projectWorldPoint(x: number, y: number): { x: number; y: number } {
    const dx = x - this.state.player.x;
    const dy = y - this.state.player.y;
    const distance = Math.max(0.1, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx);
    const delta = normalizeSpriteAngle(angle - this.state.player.angle);
    return {
      x: WIDTH / 2 + (delta / (FOV / 2)) * (WIDTH / 2),
      y: HEIGHT / 2 + 30 / distance,
    };
  }

  private drawWeapon() {
    if (!this.ctx) return;
    const firing = this.state.shotEffects.some((effect) => effect.kind === 'player' && effect.ageMs < 120);
    this.ctx.fillStyle = '#2f5d63';
    this.ctx.fillRect(WIDTH / 2 - 36, HEIGHT - 70, 72, 52);
    this.ctx.fillStyle = firing ? '#ffffff' : '#7be8ff';
    this.ctx.fillRect(WIDTH / 2 - 8, HEIGHT - 84, 16, firing ? 34 : 26);
    if (firing) {
      this.ctx.fillStyle = '#7be8ff';
      this.ctx.fillRect(WIDTH / 2 - 18, HEIGHT - 106, 36, 22);
    }
    this.ctx.fillStyle = '#101010';
    this.ctx.fillRect(WIDTH / 2 - 18, HEIGHT - 48, 36, 8);
  }

  private drawHud() {
    if (!this.ctx) return;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    this.ctx.fillRect(8, 8, 185, 50);
    this.ctx.strokeStyle = '#00ffff';
    this.ctx.strokeRect(8, 8, 185, 50);
    this.ctx.fillStyle = '#00ffff';
    this.ctx.font = '14px monospace';
    this.ctx.fillText('MASTER CHIEF', 16, 26);
    this.ctx.fillText(`SHIELD ${Math.ceil(this.state.player.shield)}  AMMO ${this.state.player.ammo}`, 16, 46);
  }
}

function normalizeSpriteAngle(angle: number): number {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

export function createHaloApp(): HaloApp {
  return new HaloApp();
}
