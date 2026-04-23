export class Window {
  element: HTMLElement;
  title: string;
  private onClose: (win: Window) => void;
  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };

  constructor(
    title: string,
    content: HTMLElement,
    width: number,
    height: number,
    zIndex: number,
    onClose: (win: Window) => void
  ) {
    this.title = title;
    this.onClose = onClose;

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
    buttons.appendChild(minimizeBtn);

    const maximizeBtn = document.createElement('button');
    maximizeBtn.className = 'window-btn';
    maximizeBtn.textContent = '□';
    buttons.appendChild(maximizeBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'window-btn';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.close());
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
    // Bring to front logic handled by Desktop z-index manager in future
    this.element.style.display = 'flex';
  }

  close() {
    this.element.remove();
    this.onClose(this);
  }

  private setupDragging(titlebar: HTMLElement) {
    titlebar.addEventListener('mousedown', (e) => {
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
      // Desktop would bump z-index here
    });
  }
}
