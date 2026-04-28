import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { MatrixRain } from './MatrixRain';

function setupDom() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
  });
  (globalThis as any).window = dom.window;
  (globalThis as any).document = dom.window.document;
  (globalThis as any).HTMLElement = dom.window.HTMLElement;
  (globalThis as any).HTMLCanvasElement = dom.window.HTMLCanvasElement;
  (globalThis as any).HTMLInputElement = dom.window.HTMLInputElement;
  (globalThis as any).HTMLButtonElement = dom.window.HTMLButtonElement;
  (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
    return setTimeout(() => cb(performance.now()), 0) as unknown as number;
  };
  (globalThis as any).cancelAnimationFrame = (id: number) => clearTimeout(id);
  (globalThis as any).performance = { now: () => Date.now() };
  Object.defineProperty(globalThis, 'innerWidth', { value: 1024, writable: true });
  Object.defineProperty(globalThis, 'innerHeight', { value: 768, writable: true });
}

describe('MatrixRain', () => {
  beforeEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).document;
    setupDom();
  });

  it('creates overlay with canvas element', () => {
    const rain = new MatrixRain();
    const overlay = (rain as any).overlay as HTMLElement;
    expect(overlay).toBeTruthy();
    expect(overlay.className).toBe('matrix-overlay');
    expect(overlay.querySelector('canvas')).toBeTruthy();
  });

  it('start appends overlay to body', async () => {
    const rain = new MatrixRain();
    const promise = rain.start(100); // very short duration for testing
    expect(document.body.contains((rain as any).overlay)).toBe(true);

    // wait for it to finish
    await promise;
  });

  it('dismiss removes overlay from body', async () => {
    const rain = new MatrixRain();
    const promise = rain.start(5000);
    rain.dismiss();
    await promise;
    expect(document.body.contains((rain as any).overlay)).toBe(false);
  });

  it('overlay has correct CSS styles', () => {
    const rain = new MatrixRain();
    const overlay = (rain as any).overlay as HTMLElement;
    expect(overlay.style.position).toBe('fixed');
    expect(overlay.style.inset).toBe('0px');
    expect(overlay.style.zIndex).toBe('99999');
  });

  it('clicking overlay dismisses it', async () => {
    const rain = new MatrixRain();
    const promise = rain.start(5000);
    const overlay = (rain as any).overlay as HTMLElement;
    overlay.click();
    await promise;
    expect(document.body.contains(overlay)).toBe(false);
  });

  it('canvas is sized to window dimensions', async () => {
    const rain = new MatrixRain();
    const promise = rain.start(100);
    const canvas = (rain as any).canvas as HTMLCanvasElement;
    expect(canvas.width).toBeGreaterThan(0);
    expect(canvas.height).toBeGreaterThan(0);
    await promise;
  });

  it('drops array is populated', async () => {
    const rain = new MatrixRain();
    const promise = rain.start(100);
    const drops = (rain as any).drops as Array<unknown>;
    expect(drops.length).toBeGreaterThan(0);
    // each drop should have x, y, speed, chars
    expect(drops[0]).toHaveProperty('x');
    expect(drops[0]).toHaveProperty('y');
    expect(drops[0]).toHaveProperty('speed');
    expect(drops[0]).toHaveProperty('chars');
    await promise;
  });
});
