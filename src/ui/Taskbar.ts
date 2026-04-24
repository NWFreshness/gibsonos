export class Taskbar {
  private container: HTMLElement;
  private tasks: Map<string, HTMLElement> = new Map();

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = '';

    const startBtn = document.createElement('button');
    startBtn.className = 'window-btn taskbar-start';
    startBtn.textContent = 'root@GIBSON';
    startBtn.addEventListener('click', () => {
      const menu = this.container.querySelector('.start-menu');
      menu?.remove();
      if (menu) return;

      const popup = document.createElement('div');
      popup.className = 'start-menu';
      popup.textContent = 'GIBSON/OS\nTerminal\nMail\nShutdown... nice try.';
      this.container.appendChild(popup);
    });
    this.container.appendChild(startBtn);

    const sep = document.createElement('div');
    sep.className = 'taskbar-separator';
    this.container.appendChild(sep);

    const taskArea = document.createElement('div');
    taskArea.id = 'task-area';
    this.container.appendChild(taskArea);

    const tray = document.createElement('div');
    tray.className = 'taskbar-tray';

    const cpu = document.createElement('span');
    cpu.textContent = 'CPU 13%';
    tray.appendChild(cpu);

    const net = document.createElement('span');
    net.textContent = 'NET';
    tray.appendChild(net);

    const volume = document.createElement('span');
    volume.textContent = '🔊';
    tray.appendChild(volume);

    const clock = document.createElement('span');
    clock.className = 'taskbar-clock';
    clock.textContent = this.getTime();
    setInterval(() => {
      clock.textContent = this.getTime();
    }, 1000);
    tray.appendChild(clock);

    this.container.appendChild(tray);
  }

  addTask(id: string, title: string, onToggle: () => void) {
    const taskArea = this.container.querySelector('#task-area') as HTMLElement;
    if (!taskArea) return;

    const btn = document.createElement('button');
    btn.className = 'window-btn taskbar-task';
    btn.textContent = title;
    btn.addEventListener('click', onToggle);
    taskArea.appendChild(btn);
    this.tasks.set(id, btn);
  }

  removeTask(id: string) {
    const btn = this.tasks.get(id);
    if (btn) {
      btn.remove();
      this.tasks.delete(id);
    }
  }

  setTaskActive(id: string, active: boolean) {
    const btn = this.tasks.get(id);
    btn?.classList.toggle('active', active);
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
