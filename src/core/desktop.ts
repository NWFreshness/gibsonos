import { Taskbar } from '../ui/Taskbar';
import { DesktopIcon } from '../ui/DesktopIcon';
import { Window } from '../ui/Window';
import { TerminalApp } from '../apps/terminal/terminal';

const DESKTOP_ICONS = [
  { id: 'terminal', label: 'Terminal', icon: '📟' },
  { id: 'netscape', label: 'Netscape', icon: '🌐' },
  { id: 'mail', label: 'Mail', icon: '✉️' },
  { id: 'irc', label: 'IRC', icon: '💬' },
  { id: 'halo', label: 'Halo CE', icon: '🎮' },
  { id: 'trash', label: 'Trash', icon: '🗑️' },
];

export class Desktop {
  private windowsLayer: HTMLElement;
  private iconsLayer: HTMLElement;
  private taskbar: Taskbar;
  private windowStack: Window[] = [];
  private nextZ = 100;

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
    for (const item of DESKTOP_ICONS) {
      const icon = new DesktopIcon(item.id, item.label, item.icon, () => this.openApp(item.id));
      this.iconsLayer.appendChild(icon.element);
    }
  }

  openApp(id: string) {
    switch (id) {
      case 'terminal':
        this.spawnWindow('Terminal', new TerminalApp().element, 600, 400);
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
      case 'halo':
        this.spawnWindow('Halo CE', this.makePlaceholder('Halo menu demake coming soon...'), 640, 480);
        break;
      case 'trash':
        this.spawnWindow('Trash', this.makePlaceholder('Empty trash... or is it?'), 300, 200);
        break;
      default:
        break;
    }
  }

  private spawnWindow(title: string, content: HTMLElement, width: number, height: number) {
    const w = new Window(title, content, width, height, this.nextZ++, (win) => this.closeWindow(win));
    this.windowStack.push(w);
    this.windowsLayer.appendChild(w.element);
    this.taskbar.addTask(title, () => w.focus(), () => w.close());
  }

  private closeWindow(win: Window) {
    const idx = this.windowStack.indexOf(win);
    if (idx > -1) this.windowStack.splice(idx, 1);
    this.taskbar.removeTask(win.title);
  }

  private makePlaceholder(text: string): HTMLElement {
    const el = document.createElement('div');
    el.className = 'terminal-content';
    el.textContent = text;
    return el;
  }
}
