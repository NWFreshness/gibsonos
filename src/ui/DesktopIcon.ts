export class DesktopIcon {
  element: HTMLElement;

  constructor(id: string, label: string, icon: string, onOpen: () => void) {
    this.element = document.createElement('div');
    this.element.className = 'desktop-icon';
    this.element.dataset.id = id;

    const iconEl = document.createElement('div');
    iconEl.className = 'icon-image';
    iconEl.style.display = 'flex';
    iconEl.style.alignItems = 'center';
    iconEl.style.justifyContent = 'center';
    iconEl.style.fontSize = '24px';
    iconEl.textContent = icon;

    const labelEl = document.createElement('div');
    labelEl.className = 'icon-label';
    labelEl.textContent = label;

    this.element.appendChild(iconEl);
    this.element.appendChild(labelEl);

    this.element.addEventListener('dblclick', () => onOpen());
  }
}
