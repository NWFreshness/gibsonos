import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { NetscapeApp, createNetscapeApp } from './NetscapeApp';

function setupDom() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
  });
  (globalThis as any).window = dom.window;
  (globalThis as any).document = dom.window.document;
  (globalThis as any).HTMLElement = dom.window.HTMLElement;
  (globalThis as any).HTMLInputElement = dom.window.HTMLInputElement;
  (globalThis as any).HTMLButtonElement = dom.window.HTMLButtonElement;
  (globalThis as any).HTMLAnchorElement = dom.window.HTMLAnchorElement;
  (globalThis as any).MouseEvent = dom.window.MouseEvent;
  (globalThis as any).KeyboardEvent = dom.window.KeyboardEvent;
  (globalThis as any).Event = dom.window.Event;
}

describe('NetscapeApp', () => {
  it('renders toolbar with navigation buttons and location bar', () => {
    setupDom();
    const app = new NetscapeApp();
    const toolbar = app.element.querySelector('.netscape-toolbar');
    expect(toolbar).toBeTruthy();

    const buttons = app.element.querySelectorAll('.netscape-btn');
    expect(buttons.length).toBeGreaterThanOrEqual(5);

    const location = app.element.querySelector('.netscape-location') as HTMLInputElement;
    expect(location).toBeTruthy();
  });

  it('renders content area and status bar', () => {
    setupDom();
    const app = new NetscapeApp();
    expect(app.element.querySelector('.netscape-content')).toBeTruthy();
    expect(app.element.querySelector('.netscape-status')).toBeTruthy();
  });

  it('navigates to home page and renders content', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('home');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('HACK THE PLANET');
  });

  it('shows 404 for unknown URLs', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('nonexistent-page');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('404');
  });

  it('navigates to forum page', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('forum');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('UNDERGROUND FORUM');
  });

  it('navigates to astalavista page', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('astalavista');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('ASTALAVISTA');
  });

  it('navigates to warez page', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('warez');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('WAREZ ARCHIVE');
  });

  it('navigates to hack-the-gibson tutorial page', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('hack-the-gibson');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('HOW TO HACK THE GIBSON');
  });

  it('navigates to cracked software page', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('cracked');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('CRACKED SOFTWARE');
  });

  it('navigates to about:gibson page', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('about:gibson');
    const content = app.element.querySelector('.netscape-content');
    expect(content?.innerHTML).toContain('GIBSON/OS');
  });

  it('supports back/forward navigation', () => {
    setupDom();
    const app = new NetscapeApp();

    app.navigate('home');
    app.navigate('forum');
    app.navigate('warez');

    const loc = app.element.querySelector('.netscape-location') as HTMLInputElement;
    expect(loc.value).toBe('warez');

    app.goBack();
    expect(loc.value).toBe('forum');

    app.goBack();
    expect(loc.value).toBe('home');

    app.goForward();
    expect(loc.value).toBe('forum');
  });

  it('factory function creates and initializes app', () => {
    setupDom();
    const titleUpdates: string[] = [];
    const app = createNetscapeApp((title) => titleUpdates.push(title));

    expect(app.element).toBeTruthy();
    expect(titleUpdates.length).toBeGreaterThanOrEqual(1);
    expect(titleUpdates[0]).toContain('Netscape');
  });

  it('update title callback is invoked on navigation', () => {
    setupDom();
    const titleUpdates: string[] = [];
    const app = new NetscapeApp((title) => titleUpdates.push(title));

    app.navigate('home');
    expect(titleUpdates[titleUpdates.length - 1]).toContain('HackThePlanet');
  });
});
