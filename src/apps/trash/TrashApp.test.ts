import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { createTrashApp, TRASH_FILES } from './TrashApp';

function makeDom() {
  const dom = new JSDOM('<!doctype html><body></body>');
  globalThis.document = dom.window.document;
  globalThis.window = dom.window as unknown as typeof globalThis.window;
  globalThis.MouseEvent = dom.window.MouseEvent as unknown as typeof MouseEvent;
}

describe('Trash app', () => {
  it('renders deleted files and opens a corrupted file preview', () => {
    makeDom();
    const opened: string[] = [];
    const app = createTrashApp({
      onOpenFile: (title, content) => {
        opened.push(title);
        expect(content.textContent).toContain('CORRUPTED FILE RECOVERY');
      },
    });

    expect(app.element.textContent).toContain('love_letter_to_acid.txt');
    expect(app.element.textContent).toContain('garbage_file.txt');

    const garbage = app.element.querySelector('[data-file-id="garbage-file"]') as HTMLElement;
    garbage.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

    expect(opened).toEqual(['garbage_file.txt']);
  });

  it('keeps the Secrets clue in the garbage file', () => {
    const garbage = TRASH_FILES.find((file) => file.id === 'garbage-file');

    expect(garbage?.body).toContain('poolonroof');
    expect(garbage?.body).toContain('Secrets');
  });
});
