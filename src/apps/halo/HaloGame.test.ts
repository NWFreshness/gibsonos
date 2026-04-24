import { describe, expect, it } from 'vitest';
import {
  COVENANT_ALIENS,
  createHaloGameState,
  firePlasmaRifle,
  movePlayer,
  tickShotEffects,
  turnPlayer,
  updateEnemies,
} from './HaloGame';

describe('Halo DOOM-style game model', () => {
  it('starts Master Chief on a ring-world level with Covenant enemies', () => {
    const state = createHaloGameState();

    expect(state.player.name).toBe('Master Chief');
    expect(state.level.name).toContain('Halo');
    expect(state.level.sky).toContain('massive ring floating in space');
    expect(state.enemies.length).toBeGreaterThanOrEqual(4);
    expect(new Set(state.enemies.map((enemy) => enemy.species))).toEqual(new Set(COVENANT_ALIENS));
  });

  it('keeps Master Chief from walking through walls', () => {
    const state = createHaloGameState();
    state.player.x = 1.2;
    state.player.y = 1.2;
    state.player.angle = Math.PI;

    const moved = movePlayer(state, 1);

    expect(moved).toBe(false);
    expect(state.player.x).toBeCloseTo(1.2);
    expect(state.player.y).toBeCloseTo(1.2);
  });

  it('turns and fires at a Covenant enemy in front of the player', () => {
    const state = createHaloGameState();
    const target = state.enemies[0];
    state.player.x = target.x - 1;
    state.player.y = target.y;
    state.player.angle = 0;

    turnPlayer(state, Math.PI / 8);
    expect(state.player.angle).toBeCloseTo(Math.PI / 8);

    state.player.angle = 0;
    const result = firePlasmaRifle(state);

    expect(result.hit).toBe(true);
    expect(result.target?.id).toBe(target.id);
    expect(target.health).toBeLessThan(target.maxHealth);
  });

  it('creates fading player shot and Covenant incoming shot effects', () => {
    const state = createHaloGameState();
    const target = state.enemies[0];
    state.player.x = target.x - 1;
    state.player.y = target.y;
    state.player.angle = 0;

    firePlasmaRifle(state);

    expect(state.shotEffects).toHaveLength(1);
    expect(state.shotEffects[0]).toMatchObject({ kind: 'player', fromX: state.player.x, fromY: state.player.y, toX: target.x, toY: target.y });

    const shooter = state.enemies[1];
    state.player.x = shooter.x;
    state.player.y = shooter.y + 0.5;
    updateEnemies(state);

    expect(state.shotEffects.some((effect) => effect.kind === 'enemy')).toBe(true);

    tickShotEffects(state, 999);
    expect(state.shotEffects).toHaveLength(0);
  });
});
