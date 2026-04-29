import { Taskbar } from '../ui/Taskbar';
import { DesktopIcon } from '../ui/DesktopIcon';
import { Window } from '../ui/Window';
import { TerminalApp } from '../apps/terminal/terminal';
import { createIrcApp } from '../apps/irc/IrcApp';
import { createSecretsApp } from '../apps/secrets/SecretsApp';
import { createNetscapeApp } from '../apps/netscape/NetscapeApp';
import { createTrashApp } from '../apps/trash/TrashApp';
import { createHaloApp } from '../apps/halo/HaloApp';

const DESKTOP_ICONS = [
  { id: 'terminal', label: 'Terminal', icon: '📟' },
  { id: 'netscape', label: 'Netscape', icon: '🌐' },
  { id: 'mail', label: 'Mail', icon: '✉️' },
  { id: 'irc', label: 'IRC', icon: '💬' },
  { id: 'halo', label: 'Halo CE', icon: '🎮' },
  { id: 'secrets', label: 'Secrets', icon: '🔐' },
  { id: 'trash', label: 'Trash', icon: '🗑️' },
];

interface ManagedWindow {
  id: string;
  title: string;
  window: Window;
}

export class Desktop {
  private windowsLayer: HTMLElement;
  private iconsLayer: HTMLElement;
  private taskbar: Taskbar;
  private windowStack: ManagedWindow[] = [];
  private nextZ = 100;
  private nextWindowId = 1;

  constructor(container: HTMLElement) {
    this.iconsLayer = container.querySelector('#desktop-icons') as HTMLElement;
    this.windowsLayer = container.querySelector('#windows-layer') as HTMLElement;
    this.taskbar = new Taskbar(container.querySelector('#taskbar') as HTMLElement);
  }

  init() {
    this.renderIcons();
    this.taskbar.render();
  }

  private renderIcons() {
    this.iconsLayer.innerHTML = '';
    for (const item of DESKTOP_ICONS) {
      const icon = new DesktopIcon(item.id, item.label, item.icon, () => this.openApp(item.id));
      this.iconsLayer.appendChild(icon.element);
    }
  }

  openApp(id: string) {
    switch (id) {
      case 'terminal':
        this.spawnWindow('Terminal', new TerminalApp({ openApp: (appId) => this.openApp(appId) }).element, 600, 400);
        break;
      case 'netscape': {
        const winId = `window-${this.nextWindowId++}`;
        const w = new Window(
          'Netscape Navigator',
          document.createElement('div'), // placeholder, replaced below
          740,
          500,
          this.nextZ++,
          (win) => this.closeWindow(win),
          (win) => this.focusWindow(win)
        );
        const netscape = createNetscapeApp((title) => {
          w.title = title;
          const managed = this.windowStack.find((item) => item.window === w);
          if (managed) managed.title = title;
        });
        // swap content
        const contentArea = w.element.querySelector('.window-content');
        if (contentArea) {
          contentArea.innerHTML = '';
          contentArea.appendChild(netscape.element);
        }
        this.windowStack.push({ id: winId, title: 'Netscape Navigator', window: w });
        this.windowsLayer.appendChild(w.element);
        this.taskbar.addTask(winId, 'Netscape Navigator', () => this.toggleWindow(winId));
        this.focusWindow(w);
        break;
      }
      case 'mail':
        this.spawnWindow('Mail', this.makePlaceholder('Mail client coming soon...'), 500, 350);
        break;
      case 'irc': {
        const irc = createIrcApp();
        this.spawnWindow('mIRC', irc.element, 650, 450);
        break;
      }
      case 'halo': {
        const halo = createHaloApp();
        this.spawnWindow('Halo: Doom Evolved', halo.element, 720, 500);
        break;
      }
      case 'secrets': {
        const secrets = createSecretsApp();
        this.spawnWindow('SECRETS — CLASSIFIED', secrets.element, 680, 460);
        break;
      }
      case 'trash': {
        const trash = createTrashApp({
          onOpenFile: (title, content) => this.spawnWindow(title, content, 520, 360),
        });
        this.spawnWindow('Trash', trash.element, 540, 320);
        break;
      }
      default:
        break;
    }
  }

  private spawnWindow(title: string, content: HTMLElement, width: number, height: number) {
    const id = `window-${this.nextWindowId++}`;
    const w = new Window(
      title,
      content,
      width,
      height,
      this.nextZ++,
      (win) => this.closeWindow(win),
      (win) => this.focusWindow(win)
    );
    this.windowStack.push({ id, title, window: w });
    this.windowsLayer.appendChild(w.element);
    this.taskbar.addTask(id, title, () => this.toggleWindow(id));
    this.focusWindow(w);
  }

  private toggleWindow(id: string) {
    const managed = this.windowStack.find((item) => item.id === id);
    if (!managed) return;

    if (managed.window.isMinimized) {
      managed.window.restore();
      this.focusWindow(managed.window);
    } else {
      managed.window.minimize();
      this.taskbar.setTaskActive(id, false);
    }
  }

  private focusWindow(win: Window) {
    win.restore();
    win.setZIndex(this.nextZ++);
    for (const item of this.windowStack) {
      this.taskbar.setTaskActive(item.id, item.window === win);
    }
  }

  private closeWindow(win: Window) {
    const idx = this.windowStack.findIndex((item) => item.window === win);
    if (idx > -1) {
      const [removed] = this.windowStack.splice(idx, 1);
      this.taskbar.removeTask(removed.id);
    }
  }

  private makePlaceholder(text: string): HTMLElement {
    const el = document.createElement('div');
    el.className = 'terminal-content';
    el.textContent = text;
    return el;
  }
}
