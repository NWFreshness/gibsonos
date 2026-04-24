import { Taskbar } from '../ui/Taskbar';
import { DesktopIcon } from '../ui/DesktopIcon';
import { Window } from '../ui/Window';
import { TerminalApp } from '../apps/terminal/terminal';
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
      case 'netscape':
        this.spawnWindow('Netscape Navigator', this.makePlaceholder('Netscape loading...'), 700, 450);
        break;
      case 'mail':
        this.spawnWindow('Mail', this.makePlaceholder('Mail client coming soon...'), 500, 350);
        break;
      case 'irc':
        this.spawnWindow('mIRC', this.makePlaceholder('#warez channel coming soon...'), 550, 400);
        break;
      case 'halo': {
        const halo = createHaloApp();
        this.spawnWindow('Halo: Doom Evolved', halo.element, 720, 500);
        break;
      }
      case 'secrets':
        this.spawnWindow('Secrets', this.makePlaceholder('Password required. Hint: The answer is in the garbage file.'), 420, 220);
        break;
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
