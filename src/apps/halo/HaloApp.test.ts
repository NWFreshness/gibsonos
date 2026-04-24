import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { createHaloApp } from './HaloApp';

function makeDom() {
  const dom = new JSDOM('<!doctype html><body></body>');
  globalThis.document = dom.window.document;
  globalThis.window = dom.window as unknown as typeof globalThis.window;
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.HTMLCanvasElement = dom.window.HTMLCanvasElement;
  globalThis.KeyboardEvent = dom.window.KeyboardEvent;
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(() => callback(Date.now()), 16);
  globalThis.cancelAnimationFrame = (id: number) => window.clearTimeout(id);
  Object.defineProperty(dom.window.HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({
      beginPath: () => {},
      arc: () => {},
      stroke: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      fillText: () => {},
      moveTo: () => {},
      lineTo: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      set fillStyle(_value: string | CanvasGradient) {},
      set strokeStyle(_value: string | CanvasGradient) {},
      set lineWidth(_value: number) {},
      set font(_value: string) {},
    }),
  });
}

describe('HaloApp', () => {
  it('renders a playable Master Chief vs Covenant DOOM-style canvas app', () => {
    makeDom();
    const app = createHaloApp();

    expect(app.element.className).toContain('halo-app');
    expect(app.element.textContent).toContain('HALO: DOOM EVOLVED');
    expect(app.element.textContent).toContain('Master Chief');
    expect(app.element.textContent).toContain('Covenant');
    expect(app.element.querySelector('canvas')).toBeTruthy();
  });
});
