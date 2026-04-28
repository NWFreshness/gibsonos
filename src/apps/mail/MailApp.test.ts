import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { MailApp, createMailApp } from './MailApp';

function setupDom() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
  });
  (globalThis as any).window = dom.window;
  (globalThis as any).document = dom.window.document;
  (globalThis as any).HTMLElement = dom.window.HTMLElement;
  (globalThis as any).HTMLInputElement = dom.window.HTMLInputElement;
  (globalThis as any).HTMLButtonElement = dom.window.HTMLButtonElement;
  (globalThis as any).MouseEvent = dom.window.MouseEvent;
  (globalThis as any).Event = dom.window.Event;
}

describe('MailApp', () => {
  beforeEach(() => {
    // clear global state
    delete (globalThis as any).window;
    delete (globalThis as any).document;
    delete (globalThis as any).HTMLElement;
    setupDom();
  });

  it('renders toolbar with buttons', () => {
    const app = new MailApp();
    const buttons = app.element.querySelectorAll('.mail-btn');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    expect(buttons[0].textContent).toBe('Get Mail');
  });

  it('renders folder list with Inbox, Sent, Trash', () => {
    const app = new MailApp();
    const folders = app.element.querySelectorAll('.mail-folder');
    expect(folders.length).toBe(3);
    const names = Array.from(folders).map((f) => f.textContent ?? '');
    expect(names[0]).toContain('Inbox');
    expect(names[1]).toContain('Sent');
    expect(names[2]).toContain('Trash');
  });

  it('shows unread count badge on Inbox', () => {
    const app = new MailApp();
    const badges = app.element.querySelectorAll('.mail-folder-badge');
    const inboxBadge = badges[0];
    expect(inboxBadge.textContent).toBeTruthy();
    expect(Number(inboxBadge.textContent)).toBeGreaterThan(0);
  });

  it('message list shows emails from inbox', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    expect(rows.length).toBe(6);
  });

  it('clicking a message shows preview', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    (rows[0] as HTMLElement).click();

    // re-query after re-render
    const preview = app.element.querySelector('.mail-preview');
    expect(preview?.textContent).toContain('From:');
    expect(preview?.textContent).toContain('phantom_phreak');
  });

  it('clicking a message marks it as read', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    (rows[0] as HTMLElement).click();

    // re-query after re-render
    const newRows = app.element.querySelectorAll('.mail-msg-row');
    expect(newRows[0].classList.contains('unread')).toBe(false);
  });

  it('delete button removes selected message', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    (rows[0] as HTMLElement).click();

    const deleteBtn = Array.from(app.element.querySelectorAll('.mail-btn')).find((b) => b.textContent === 'Delete');
    (deleteBtn as HTMLButtonElement)?.click();

    const newRows = app.element.querySelectorAll('.mail-msg-row');
    expect(newRows.length).toBe(5);
  });

  it('switches to Sent folder', () => {
    const app = new MailApp();
    const folders = app.element.querySelectorAll('.mail-folder');
    (folders[1] as HTMLElement).click();

    expect(app.getCurrentFolder()).toBe('Sent');
    const rows = app.element.querySelectorAll('.mail-msg-row');
    expect(rows.length).toBe(0);
  });

  it('returns correct folder names', () => {
    const app = new MailApp();
    expect(app.getFolderNames()).toEqual(['Inbox', 'Sent', 'Trash']);
  });

  it('returns correct email count per folder', () => {
    const app = new MailApp();
    expect(app.getEmailCount('Inbox')).toBe(6);
    expect(app.getEmailCount('Sent')).toBe(0);
    expect(app.getEmailCount('Trash')).toBe(0);
  });

  it('tracks selected email', () => {
    const app = new MailApp();
    expect(app.getSelectedEmail()).toBeNull();

    const rows = app.element.querySelectorAll('.mail-msg-row');
    (rows[0] as HTMLElement).click();
    expect(app.getSelectedEmail()).toBeTruthy();
    expect(app.getSelectedEmail()?.from).toContain('phantom_phreak');
  });

  it('factory function creates app', () => {
    const app = createMailApp();
    expect(app.element).toBeTruthy();
    expect(app.getFolderNames().length).toBe(3);
  });

  it('selecting message highlights row after re-render', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    (rows[0] as HTMLElement).click();

    // DOM was re-rendered, re-query
    const newRows = app.element.querySelectorAll('.mail-msg-row');
    expect(newRows[0].classList.contains('selected')).toBe(true);
  });

  it('plague email is in the inbox', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    // plague is oldest (Sep 10), newest first, so plague is at index 5
    const allText = Array.from(rows).map((r) => r.textContent ?? '');
    const plagueText = allText.find((t) => t.includes('plague'));
    expect(plagueText).toBeTruthy();
    expect(plagueText).toContain('The Cleaner');
  });

  it('empty preview shows default message when no email selected', () => {
    const app = new MailApp();
    const preview = app.element.querySelector('.mail-preview');
    expect(preview?.textContent).toContain('Select a message to read');
  });

  it('getUnreadCount returns correct count', () => {
    const app = new MailApp();
    const initial = app.getUnreadCount();
    expect(initial).toBeGreaterThanOrEqual(5);

    // read one
    const rows = app.element.querySelectorAll('.mail-msg-row');
    (rows[0] as HTMLElement).click();
    expect(app.getUnreadCount()).toBe(initial - 1);
  });

  it('first message is from phantom_phreak (newest)', () => {
    const app = new MailApp();
    const rows = app.element.querySelectorAll('.mail-msg-row');
    expect(rows[0].textContent).toContain('phantom_phreak');
    expect(rows[0].textContent).toContain('my mom says hi');
  });
});
