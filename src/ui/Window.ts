export class Window {
  element: HTMLElement;
  title: string;
  isMinimized = false;

  private onClose: (win: Window) => void;
  private onFocus: (win: Window) => void;
  private onDestroy?: () => void;
  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };
  private previousBounds: { left: string; top: string; width: string; height: string } | null = null;

  constructor(
    title: string,
    content: HTMLElement,
    width: number,
    height: number,
    zIndex: number,
    onClose: (win: Window) => void,
    onFocus: (win: Window) => void = () => {},
    onDestroy?: () => void
  ) {
    this.title = title;
    this.onClose = onClose;
    this.onFocus = onFocus;
    this.onDestroy = onDestroy;

    this.element = document.createElement('div');
    this.element.className = 'window';
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${50 + (zIndex % 10) * 20}px`;
    this.element.style.top = `${50 + (zIndex % 10) * 20}px`;
    this.element.style.zIndex = String(zIndex);

    const titlebar = document.createElement('div');
    titlebar.className = 'window-titlebar';

    const titleText = document.createElement('span');
    titleText.className = 'window-title';
    titleText.textContent = title;
    titlebar.appendChild(titleText);

    const buttons = document.createElement('div');
    buttons.className = 'window-buttons';

    const minimizeBtn = document.createElement('button');
    minimizeBtn.className = 'window-btn';
    minimizeBtn.textContent = '_';
    minimizeBtn.title = 'Minimize';
    minimizeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      this.minimize();
    });
    buttons.appendChild(minimizeBtn);

    const maximizeBtn = document.createElement('button');
    maximizeBtn.className = 'window-btn';
    maximizeBtn.textContent = '□';
    maximizeBtn.title = 'Maximize / restore';
    maximizeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleMaximize();
    });
    buttons.appendChild(maximizeBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'window-btn';
    closeBtn.textContent = '×';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      this.close();
    });
    buttons.appendChild(closeBtn);

    titlebar.appendChild(buttons);

    const contentArea = document.createElement('div');
    contentArea.className = 'window-content';
    contentArea.appendChild(content);

    this.element.appendChild(titlebar);
    this.element.appendChild(contentArea);

    this.setupDragging(titlebar);
    this.setupFocus();
  }

  focus() {
    this.restore();
    this.onFocus(this);
  }

  setZIndex(zIndex: number) {
    this.element.style.zIndex = String(zIndex);
  }

  minimize() {
    this.isMinimized = true;
    this.element.style.display = 'none';
  }

  restore() {
    this.isMinimized = false;
    this.element.style.display = 'flex';
  }

  toggleMaximize() {
    if (this.previousBounds) {
      this.element.style.left = this.previousBounds.left;
      this.element.style.top = this.previousBounds.top;
      this.element.style.width = this.previousBounds.width;
      this.element.style.height = this.previousBounds.height;
      this.previousBounds = null;
      return;
    }

    this.previousBounds = {
      left: this.element.style.left,
      top: this.element.style.top,
      width: this.element.style.width,
      height: this.element.style.height,
    };
    this.element.style.left = '8px';
    this.element.style.top = '8px';
    this.element.style.width = 'calc(100vw - 16px)';
    this.element.style.height = 'calc(100vh - 44px)';
  }

  close() {
    this.onDestroy?.();
    this.element.remove();
    this.onClose(this);
  }

  private setupDragging(titlebar: HTMLElement) {
    titlebar.addEventListener('mousedown', (e) => {
      if (this.previousBounds) return;
      this.isDragging = true;
      const rect = this.element.getBoundingClientRect();
      this.dragOffset.x = e.clientX - rect.left;
      this.dragOffset.y = e.clientY - rect.top;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const x = e.clientX - this.dragOffset.x;
      const y = e.clientY - this.dragOffset.y;
      this.element.style.left = `${Math.max(0, x)}px`;
      this.element.style.top = `${Math.max(0, y)}px`;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  private setupFocus() {
    this.element.addEventListener('mousedown', () => {
      this.onFocus(this);
    });
  }
}
