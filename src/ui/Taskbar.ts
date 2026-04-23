export class Taskbar {
  private container: HTMLElement;
  private tasks: Map<string, HTMLElement> = new Map();

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    // Start button
    const startBtn = document.createElement('button');
    startBtn.className = 'window-btn';
    startBtn.style.width = '54px';
    startBtn.style.height = '22px';
    startBtn.style.fontWeight = 'bold';
    startBtn.textContent = 'root';
    startBtn.addEventListener('click', () => {
      alert('GIBSON/OS Start Menu coming soon...');
    });
    this.container.appendChild(startBtn);

    // Separator
    const sep = document.createElement('div');
    sep.style.width = '2px';
    sep.style.height = '22px';
    sep.style.margin = '0 4px';
    sep.style.background = '#808080';
    sep.style.borderLeft = '1px solid #dfdfdf';
    this.container.appendChild(sep);

    // Task area
    const taskArea = document.createElement('div');
    taskArea.id = 'task-area';
    taskArea.style.display = 'flex';
    taskArea.style.gap = '2px';
    taskArea.style.flex = '1';
    this.container.appendChild(taskArea);

    // Tray / Clock
    const tray = document.createElement('div');
    tray.style.display = 'flex';
    tray.style.alignItems = 'center';
    tray.style.gap = '4px';
    tray.style.padding = '0 4px';
    tray.style.borderLeft = '1px solid #808080';
    tray.style.borderTop = '1px solid #808080';
    tray.style.background = '#c0c0c0';

    const clock = document.createElement('span');
    clock.style.fontFamily = 'var(--font-ui)';
    clock.style.fontSize = '11px';
    clock.textContent = this.getTime();
    setInterval(() => {
      clock.textContent = this.getTime();
    }, 1000);
    tray.appendChild(clock);

    this.container.appendChild(tray);
  }

  addTask(title: string, onFocus: () => void, _onClose: () => void) {
    const taskArea = this.container.querySelector('#task-area') as HTMLElement;
    if (!taskArea) return;

    const btn = document.createElement('button');
    btn.className = 'window-btn';
    btn.style.width = 'auto';
    btn.style.minWidth = '120px';
    btn.style.height = '22px';
    btn.style.padding = '0 6px';
    btn.style.textAlign = 'left';
    btn.textContent = title;
    btn.addEventListener('click', onFocus);
    taskArea.appendChild(btn);
    this.tasks.set(title, btn);
  }

  removeTask(title: string) {
    const btn = this.tasks.get(title);
    if (btn) {
      btn.remove();
      this.tasks.delete(title);
    }
  }

  private getTime(): string {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${m} ${ampm}`;
  }
}
