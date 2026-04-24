import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { Window } from '../ui/Window';

function makeDom() {
  const dom = new JSDOM('<!doctype html><body></body>');
  globalThis.document = dom.window.document;
  globalThis.window = dom.window as unknown as Window & typeof globalThis.window;
  return dom;
}

describe('Window chrome behavior', () => {
  it('minimizes and restores without closing the window', () => {
    makeDom();
    const content = document.createElement('div');
    const win = new Window('Terminal', content, 320, 200, 100, () => {}, () => {});

    win.minimize();
    expect(win.element.style.display).toBe('none');
    expect(win.isMinimized).toBe(true);

    win.restore();
    expect(win.element.style.display).toBe('flex');
    expect(win.isMinimized).toBe(false);
  });

  it('calls its focus callback when pressed', () => {
    makeDom();
    let focused = false;
    const content = document.createElement('div');
    const win = new Window('Terminal', content, 320, 200, 100, () => {}, () => {
      focused = true;
    });

    win.element.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true }));

    expect(focused).toBe(true);
  });
});
