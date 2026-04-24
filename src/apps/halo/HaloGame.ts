export const COVENANT_ALIENS = ['Grunt', 'Elite', 'Jackal', 'Hunter'] as const;

export type CovenantAlien = (typeof COVENANT_ALIENS)[number];

export interface HaloPlayer {
  name: 'Master Chief';
  x: number;
  y: number;
  angle: number;
  health: number;
  shield: number;
  ammo: number;
  score: number;
}

export interface HaloEnemy {
  id: string;
  species: CovenantAlien;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  damage: number;
  alive: boolean;
}

export interface HaloLevel {
  name: string;
  sky: string;
  map: string[];
}

export interface ShotEffect {
  id: string;
  kind: 'player' | 'enemy' | 'impact';
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  ageMs: number;
  durationMs: number;
  color: string;
}

export interface HaloGameState {
  player: HaloPlayer;
  level: HaloLevel;
  enemies: HaloEnemy[];
  shotEffects: ShotEffect[];
  message: string;
  won: boolean;
}

export interface FireResult {
  hit: boolean;
  target?: HaloEnemy;
  message: string;
}

const LEVEL_MAP = [
  '111111111111',
  '1P0000000001',
  '100011001101',
  '100000000001',
  '101100011001',
  '100000000001',
  '101001100001',
  '100000000001',
  '100110011001',
  '1000000000E1',
  '111111111111',
];

export function createHaloGameState(): HaloGameState {
  return {
    player: {
      name: 'Master Chief',
      x: 1.5,
      y: 1.5,
      angle: 0,
      health: 100,
      shield: 100,
      ammo: 60,
      score: 0,
    },
    level: {
      name: 'Halo Ring: Silent Cartographer Pixel Breach',
      sky: 'A massive ring floating in space curves above the battlefield while stars burn behind it.',
      map: LEVEL_MAP,
    },
    enemies: [
      makeEnemy('grunt-1', 'Grunt', 5.5, 1.5),
      makeEnemy('elite-1', 'Elite', 9.5, 3.5),
      makeEnemy('jackal-1', 'Jackal', 4.5, 5.5),
      makeEnemy('hunter-1', 'Hunter', 9.5, 8.5),
    ],
    shotEffects: [],
    message: 'Mission: cleanse the Covenant landing zone on Halo.',
    won: false,
  };
}

function makeEnemy(id: string, species: CovenantAlien, x: number, y: number): HaloEnemy {
  const stats: Record<CovenantAlien, { health: number; damage: number }> = {
    Grunt: { health: 30, damage: 5 },
    Elite: { health: 70, damage: 12 },
    Jackal: { health: 45, damage: 8 },
    Hunter: { health: 120, damage: 20 },
  };
  return {
    id,
    species,
    x,
    y,
    health: stats[species].health,
    maxHealth: stats[species].health,
    damage: stats[species].damage,
    alive: true,
  };
}

export function turnPlayer(state: HaloGameState, radians: number) {
  state.player.angle = normalizeAngle(state.player.angle + radians);
}

export function movePlayer(state: HaloGameState, distance: number): boolean {
  const nx = state.player.x + Math.cos(state.player.angle) * distance;
  const ny = state.player.y + Math.sin(state.player.angle) * distance;
  if (isWall(state, nx, ny)) return false;
  state.player.x = nx;
  state.player.y = ny;
  return true;
}

export function strafePlayer(state: HaloGameState, distance: number): boolean {
  const nx = state.player.x + Math.cos(state.player.angle + Math.PI / 2) * distance;
  const ny = state.player.y + Math.sin(state.player.angle + Math.PI / 2) * distance;
  if (isWall(state, nx, ny)) return false;
  state.player.x = nx;
  state.player.y = ny;
  return true;
}

export function firePlasmaRifle(state: HaloGameState): FireResult {
  if (state.player.ammo <= 0) {
    state.message = 'Click. Plasma rifle battery depleted.';
    return { hit: false, message: state.message };
  }
  state.player.ammo -= 1;

  const target = findTargetInSight(state);
  if (!target) {
    const missDistance = castRay(state, state.player.angle);
    addShotEffect(state, {
      kind: 'player',
      fromX: state.player.x,
      fromY: state.player.y,
      toX: state.player.x + Math.cos(state.player.angle) * missDistance,
      toY: state.player.y + Math.sin(state.player.angle) * missDistance,
      color: '#7be8ff',
      durationMs: 180,
    });
    state.message = 'Plasma bolt scorches the Forerunner wall.';
    return { hit: false, message: state.message };
  }

  addShotEffect(state, {
    kind: 'player',
    fromX: state.player.x,
    fromY: state.player.y,
    toX: target.x,
    toY: target.y,
    color: '#7be8ff',
    durationMs: 220,
  });

  const damage = 35;
  target.health = Math.max(0, target.health - damage);
  if (target.health === 0) {
    target.alive = false;
    state.player.score += target.maxHealth;
    state.message = `${target.species} neutralized. Covenant signal fading.`;
    state.won = state.enemies.every((enemy) => !enemy.alive);
    if (state.won) state.message = 'ACCESS GRANTED: Halo landing zone secured.';
  } else {
    state.message = `Hit ${target.species}. Shields crackle in 8-bit glory.`;
  }

  return { hit: true, target, message: state.message };
}

export function updateEnemies(state: HaloGameState) {
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;
    const dx = state.player.x - enemy.x;
    const dy = state.player.y - enemy.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 0.75 && distance < 5) {
      const step = Math.min(0.025, distance - 0.75);
      const nx = enemy.x + (dx / distance) * step;
      const ny = enemy.y + (dy / distance) * step;
      if (!isWall(state, nx, ny)) {
        enemy.x = nx;
        enemy.y = ny;
      }
    } else if (distance <= 0.85) {
      damagePlayer(state, enemy.damage * 0.04);
      addShotEffect(state, {
        kind: 'enemy',
        fromX: enemy.x,
        fromY: enemy.y,
        toX: state.player.x,
        toY: state.player.y,
        color: '#ff47d7',
        durationMs: 260,
      });
    }
  }
}

export function isWall(state: HaloGameState, x: number, y: number): boolean {
  const cell = state.level.map[Math.floor(y)]?.[Math.floor(x)];
  return cell === undefined || cell === '1';
}

export function castRay(state: HaloGameState, angle: number, maxDistance = 12): number {
  const step = 0.035;
  for (let distance = step; distance <= maxDistance; distance += step) {
    const x = state.player.x + Math.cos(angle) * distance;
    const y = state.player.y + Math.sin(angle) * distance;
    if (isWall(state, x, y)) return distance;
  }
  return maxDistance;
}

export function tickShotEffects(state: HaloGameState, deltaMs: number) {
  for (const effect of state.shotEffects) {
    effect.ageMs += deltaMs;
  }
  state.shotEffects = state.shotEffects.filter((effect) => effect.ageMs < effect.durationMs);
}

function addShotEffect(
  state: HaloGameState,
  effect: Omit<ShotEffect, 'id' | 'ageMs'>
) {
  state.shotEffects.push({
    ...effect,
    id: `shot-${state.shotEffects.length}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ageMs: 0,
  });
}

function findTargetInSight(state: HaloGameState): HaloEnemy | undefined {
  const fov = Math.PI / 10;
  return state.enemies
    .filter((enemy) => enemy.alive)
    .map((enemy) => ({ enemy, distance: Math.hypot(enemy.x - state.player.x, enemy.y - state.player.y) }))
    .filter(({ enemy, distance }) => {
      const angle = Math.atan2(enemy.y - state.player.y, enemy.x - state.player.x);
      const delta = Math.abs(shortestAngle(state.player.angle, angle));
      return delta < fov && distance < castRay(state, angle) + 0.2;
    })
    .sort((a, b) => a.distance - b.distance)[0]?.enemy;
}

function damagePlayer(state: HaloGameState, amount: number) {
  const shieldDamage = Math.min(state.player.shield, amount);
  state.player.shield -= shieldDamage;
  state.player.health = Math.max(0, state.player.health - (amount - shieldDamage));
}

function normalizeAngle(angle: number): number {
  const twoPi = Math.PI * 2;
  return ((angle % twoPi) + twoPi) % twoPi;
}

function shortestAngle(from: number, to: number): number {
  const diff = normalizeAngle(to - from);
  return diff > Math.PI ? diff - Math.PI * 2 : diff;
}
