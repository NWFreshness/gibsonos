import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { SecretsApp, createSecretsApp } from './SecretsApp';

function setupDom() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
  });
  (globalThis as any).window = dom.window;
  (globalThis as any).document = dom.window.document;
  (globalThis as any).HTMLElement = dom.window.HTMLElement;
  (globalThis as any).HTMLInputElement = dom.window.HTMLInputElement;
  (globalThis as any).HTMLButtonElement = dom.window.HTMLButtonElement;
  (globalThis as any).KeyboardEvent = dom.window.KeyboardEvent;
  (globalThis as any).Event = dom.window.Event;
}

describe('SecretsApp', () => {
  beforeEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).document;
    setupDom();
  });

  it('starts in locked state with password prompt', () => {
    const app = new SecretsApp();
    expect(app.isUnlocked()).toBe(false);
    expect(app.getState()).toBe('locked');
  });

  it('shows password input and unlock button', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    const btn = app.element.querySelector('.secrets-btn');
    expect(input).toBeTruthy();
    expect(btn).toBeTruthy();
    expect(input.placeholder).toContain('password');
  });

  it('shows access denied for wrong password', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    const btn = app.element.querySelector('.secrets-btn') as HTMLButtonElement;

    input.value = 'wrong';
    btn.click();

    const error = app.element.querySelector('.secrets-error');
    expect(error?.textContent).toContain('ACCESS DENIED');
    expect(app.isUnlocked()).toBe(false);
  });

  it('unlocks with correct password via button click', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    const btn = app.element.querySelector('.secrets-btn') as HTMLButtonElement;

    input.value = 'poolonroof';
    btn.click();

    expect(app.isUnlocked()).toBe(true);
    expect(app.getState()).toBe('unlocked');
  });

  it('unlocks with correct password via Enter key', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;

    input.value = 'poolonroof';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(app.isUnlocked()).toBe(true);
  });

  it('shows classified files after unlock', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const files = app.element.querySelectorAll('.secrets-file-entry');
    expect(files.length).toBe(app.getFileCount());
    expect(files.length).toBe(5);
  });

  it('file names match expected classified documents', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const names = Array.from(app.element.querySelectorAll('.secrets-file-name')).map((f) => f.textContent);
    expect(names).toContain('OPERATION_GIBSON.md');
    expect(names).toContain('OPERATION_CLEANER.md');
    expect(names).toContain('ELLINGSON_DOSSIER.md');
    expect(names).toContain('UNLOCK: acid_burn.theme');
    expect(names).toContain('CREDITS.md');
  });

  it('clicking a file shows its contents in preview', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const firstFile = app.element.querySelector('.secrets-file-entry') as HTMLElement;
    firstFile.click();

    const preview = app.element.querySelector('.secrets-preview');
    expect(preview?.textContent).toContain('AFTER-ACTION REPORT');
    expect(preview?.textContent).toContain('CRASH_OVERRIDE');
    expect(preview?.textContent).toContain('MISSION ACCOMPLISHED');
  });

  it('shows classification stamp on selected file', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const firstFile = app.element.querySelector('.secrets-file-entry') as HTMLElement;
    firstFile.click();

    const stamp = app.element.querySelector('.secrets-stamp');
    expect(stamp).toBeTruthy();
    expect(stamp?.textContent).toContain('TOP SECRET');
  });

  it('lock button returns to password prompt', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    expect(app.isUnlocked()).toBe(true);

    const lockBtn = app.element.querySelector('.secrets-lock-btn') as HTMLButtonElement;
    lockBtn.click();

    expect(app.isUnlocked()).toBe(false);
    expect(app.getState()).toBe('locked');
    expect(app.element.querySelector('.secrets-input')).toBeTruthy();
  });

  it('select file prompt shows before clicking a file', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const preview = app.element.querySelector('.secrets-preview');
    expect(preview?.textContent).toContain('Select a file');
  });

  it('active file entry has highlight class', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const firstFile = app.element.querySelector('.secrets-file-entry') as HTMLElement;
    firstFile.click();

    // DOM is re-rendered by click, re-query
    const updated = app.element.querySelector('.secrets-file-entry') as HTMLElement;
    expect(updated.classList.contains('active')).toBe(true);
  });

  it('factory creates app', () => {
    const app = createSecretsApp();
    expect(app.element).toBeTruthy();
    expect(app.getState()).toBe('locked');
  });

  it('credits file contains hack the planet message', () => {
    const app = new SecretsApp();
    const input = app.element.querySelector('.secrets-input') as HTMLInputElement;
    input.value = 'poolonroof';
    (app.element.querySelector('.secrets-btn') as HTMLButtonElement).click();

    const creditsEntry = Array.from(app.element.querySelectorAll('.secrets-file-entry')).find(
      (e) => e.textContent?.includes('CREDITS.md')
    ) as HTMLElement;
    creditsEntry.click();

    const preview = app.element.querySelector('.secrets-preview');
    expect(preview?.textContent).toContain('HACK THE PLANET');
    expect(preview?.textContent).toContain('CRASH_OVERRIDE');
  });
});
