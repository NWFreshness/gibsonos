import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { IrcApp, createIrcApp } from './IrcApp';

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

describe('IrcApp', () => {
  beforeEach(() => setupDom());

  it('renders channel tabs for all channels', () => {
    const app = new IrcApp();
    const tabs = app.element.querySelectorAll('.irc-tab');
    expect(tabs.length).toBe(3);
    expect(tabs[0].textContent).toBe('#hack-the-planet');
    expect(tabs[1].textContent).toBe('#warez');
    expect(tabs[2].textContent).toBe('#elite');
  });

  it('renders topic bar with current channel topic', () => {
    const app = new IrcApp();
    const topic = app.element.querySelector('.irc-topic');
    expect(topic?.textContent).toContain('Hack the planet');
  });

  it('renders chat area with scrollback messages', () => {
    const app = new IrcApp();
    const chat = app.element.querySelector('.irc-chat');
    expect(chat?.children.length).toBeGreaterThan(10);
    expect(chat?.textContent).toContain('crash_override');
    expect(chat?.textContent).toContain('acid_burn');
  });

  it('renders user list for current channel', () => {
    const app = new IrcApp();
    const users = app.element.querySelectorAll('.irc-user');
    expect(users.length).toBeGreaterThanOrEqual(4);
  });

  it('user list shows op (@) and voice (%) indicators', () => {
    const app = new IrcApp();
    // plague is @ op
    app.selectChannel('#elite');
    const userList = app.element.querySelector('.irc-users');
    expect(userList?.textContent).toContain('@');
    expect(userList?.textContent).toContain('%');
  });

  it('switches channels when tab is clicked', () => {
    const app = new IrcApp();
    expect(app.getCurrentChannel()).toBe('#hack-the-planet');

    const tabs = app.element.querySelectorAll('.irc-tab');
    (tabs[1] as HTMLButtonElement).click();
    expect(app.getCurrentChannel()).toBe('#warez');
  });

  it('updates topic when switching channels', () => {
    const app = new IrcApp();
    const tabs = app.element.querySelectorAll('.irc-tab');
    (tabs[1] as HTMLButtonElement).click();

    const topic = app.element.querySelector('.irc-topic');
    expect(topic?.textContent).toContain('NO FEDS');
  });

  it('updates user list when switching channels', () => {
    const app = new IrcApp();
    const tabs = app.element.querySelectorAll('.irc-tab');
    (tabs[1] as HTMLButtonElement).click();

    const userList = app.element.querySelector('.irc-users');
    expect(userList?.textContent).toContain('dooMbr1ng3r');
    expect(userList?.textContent).toContain('da_vinci_virus');
  });

  it('renders input bar with zero_cool nick', () => {
    const app = new IrcApp();
    const nick = app.element.querySelector('.irc-input-nick');
    expect(nick?.textContent).toBe('zero_cool');
  });

  it('has functional input field', () => {
    const app = new IrcApp();
    const input = app.element.querySelector('.irc-input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Type a message...');
  });

  it('echoes user message in chat when pressing Enter', () => {
    const app = new IrcApp();
    const input = app.element.querySelector('.irc-input') as HTMLInputElement;
    const chat = app.element.querySelector('.irc-chat') as HTMLElement;
    const initialCount = chat.children.length;

    input.value = 'hello world';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(chat.children.length).toBe(initialCount + 1);
    expect(chat.textContent).toContain('hello world');
    expect(chat.textContent).toContain('zero_cool');
  });

  it('handles /me action messages', () => {
    const app = new IrcApp();
    const input = app.element.querySelector('.irc-input') as HTMLInputElement;
    const chat = app.element.querySelector('.irc-chat') as HTMLElement;

    input.value = '/me waves at everyone';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(chat.textContent).toContain('waves at everyone');
    const actions = chat.querySelectorAll('.irc-action');
    expect(actions.length).toBeGreaterThan(0);
  });

  it('empty input does not add messages', () => {
    const app = new IrcApp();
    const input = app.element.querySelector('.irc-input') as HTMLInputElement;
    const chat = app.element.querySelector('.irc-chat') as HTMLElement;
    const initialCount = chat.children.length;

    input.value = '   ';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(chat.children.length).toBe(initialCount);
  });

  it('clears input after sending message', () => {
    const app = new IrcApp();
    const input = app.element.querySelector('.irc-input') as HTMLInputElement;

    input.value = 'test message';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(input.value).toBe('');
  });

  it('factory function creates app', () => {
    const app = createIrcApp();
    expect(app.element).toBeTruthy();
    expect(app.getChannelCount()).toBe(3);
  });

  it('returns correct channel count', () => {
    const app = new IrcApp();
    expect(app.getChannelCount()).toBe(3);
  });

  it('active tab has active class', () => {
    const app = new IrcApp();
    const tabs = app.element.querySelectorAll('.irc-tab');
    expect(tabs[0].classList.contains('active')).toBe(false);
    // first tab starts active because it's the default channel
    // but we select it to be sure
    app.selectChannel('#hack-the-planet');
    expect(tabs[0].classList.contains('active')).toBe(true);
  });
});
