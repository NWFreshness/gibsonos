export interface TrashFile {
  id: string;
  name: string;
  size: string;
  deletedAt: string;
  body: string;
}

export interface TrashAppOptions {
  onOpenFile?: (title: string, content: HTMLElement) => void;
}

export const TRASH_FILES: TrashFile[] = [
  {
    id: 'love-letter',
    name: 'love_letter_to_acid.txt',
    size: '4 KB',
    deletedAt: '09/09/1999 11:42 PM',
    body: 'Dear Acid Burn,\n\nYou looked elite in that crash override duel.\n\n-- definitely not Dade',
  },
  {
    id: 'keygen',
    name: 'windows_98_keygen.exe',
    size: '313 KB',
    deletedAt: '09/10/1999 12:03 AM',
    body: 'MZ\u0000\u0002... CRACKED BY ZERO COOL ... BAD CHECKSUM ...',
  },
  {
    id: 'spoilers',
    name: 'matrix_reloaded_spoilers.doc',
    size: '12 KB',
    deletedAt: '09/10/1999 12:17 AM',
    body: 'ERROR: temporal anomaly. This file appears to be from 2003.',
  },
  {
    id: 'garbage-file',
    name: 'garbage_file.txt',
    size: '42 KB',
    deletedAt: '09/10/1999 02:17 AM',
    body: 'The answer is in the garbage file.\nSecrets does not want a real password.\nTry: poolonroof\nThen look for the reflection.',
  },
  {
    id: 'credit-card',
    name: 'dads_credit_card.csv',
    size: '1 KB',
    deletedAt: '09/10/1999 03:33 AM',
    body: 'name,number,expiry\nREDACTED,xxxx-xxxx-xxxx-1337,never',
  },
];

export class TrashApp {
  element: HTMLElement;
  private options: TrashAppOptions;

  constructor(options: TrashAppOptions = {}) {
    this.options = options;
    this.element = document.createElement('div');
    this.element.className = 'trash-app';
    this.render();
  }

  private render() {
    const header = document.createElement('div');
    header.className = 'trash-header';
    header.textContent = 'Deleted Files — double-click to attempt recovery';
    this.element.appendChild(header);

    const table = document.createElement('div');
    table.className = 'trash-list';

    const headings = document.createElement('div');
    headings.className = 'trash-row trash-row-heading';
    headings.innerHTML = '<span>Name</span><span>Size</span><span>Deleted</span>';
    table.appendChild(headings);

    for (const file of TRASH_FILES) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'trash-row';
      row.dataset.fileId = file.id;
      row.innerHTML = `<span>🧻 ${file.name}</span><span>${file.size}</span><span>${file.deletedAt}</span>`;
      row.addEventListener('dblclick', () => this.openFile(file));
      table.appendChild(row);
    }

    this.element.appendChild(table);
  }

  private openFile(file: TrashFile) {
    const content = document.createElement('div');
    content.className = 'terminal-content corrupted-file';
    content.textContent = this.makeCorruptedPreview(file);
    this.options.onOpenFile?.(file.name, content);
  }

  private makeCorruptedPreview(file: TrashFile): string {
    const hex = Array.from(file.body)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
      .join(' ')
      .match(/.{1,47}/g)
      ?.join('\n') ?? '';

    return `CORRUPTED FILE RECOVERY\nFILE: ${file.name}\nSTATUS: PARTIAL READ ONLY\n\n${file.body}\n\n--- HEX DUMP ---\n${hex}`;
  }
}

export function createTrashApp(options: TrashAppOptions = {}): TrashApp {
  return new TrashApp(options);
}
