import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { Taskbar } from './Taskbar';

function makeDom() {
  const dom = new JSDOM('<!doctype html><body><div id="taskbar"></div></body>');
  globalThis.document = dom.window.document;
  globalThis.window = dom.window as unknown as typeof globalThis.window;
}

describe('Taskbar root button', () => {
  it('renders root@GIBSON as the start button', () => {
    makeDom();
    const container = document.querySelector('#taskbar') as HTMLElement;

    new Taskbar(container).render();

    const start = container.querySelector('.taskbar-start') as HTMLButtonElement;
    expect(start).toBeTruthy();
    expect(start.textContent).toBe('root@GIBSON');
  });

  it('overrides compact window button styles so the root button is readable', () => {
    const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
    const taskbarStartRule = css.match(/\.taskbar-start\s*{[^}]+}/)?.[0] ?? '';

    expect(taskbarStartRule).toContain('font-size: 11px');
    expect(taskbarStartRule).toContain('line-height: 20px');
    expect(taskbarStartRule).toContain('display: inline-flex');
    expect(taskbarStartRule).toContain('align-items: center');
  });
});
