import { getCommand, listCommands } from '../../commands/registry';
import { sound } from '../../core/sound';

export interface TerminalOptions {
  openApp?: (id: string) => void;
}

export class TerminalApp {
  element: HTMLElement;
  private output: HTMLElement;
  private input: HTMLInputElement;
  private promptText = 'zero_cool@gibson:~$ ';
  private history: string[] = [];
  private historyIndex = 0;
  private options: TerminalOptions;

  constructor(options: TerminalOptions = {}) {
    this.options = options;
    this.element = document.createElement('div');
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.element.style.display = 'flex';
    this.element.style.flexDirection = 'column';

    this.output = document.createElement('div');
    this.output.className = 'terminal-content';
    this.output.style.flex = '1';
    this.output.style.overflowY = 'auto';

    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-input-line';

    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = this.promptText;

    this.input = document.createElement('input');
    this.input.className = 'terminal-input';
    this.input.spellcheck = false;
    this.input.autocomplete = 'off';

    inputLine.appendChild(prompt);
    inputLine.appendChild(this.input);

    this.element.appendChild(this.output);
    this.element.appendChild(inputLine);

    this.input.addEventListener('keydown', (e) => this.onKeyDown(e));
    this.input.addEventListener('input', () => sound.playClick());
    this.element.addEventListener('click', () => this.input.focus());

    this.print('GIBSON/OS Terminal v4.20');
    this.print('Type "help" for available commands.');
    this.print('');
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const raw = this.input.value.trim();
      if (raw) {
        this.history.push(raw);
        this.historyIndex = this.history.length;
        this.print(`${this.promptText}${raw}`);
        this.execute(raw);
      }
      this.input.value = '';
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length === 0) return;
      this.historyIndex = Math.max(0, this.historyIndex - 1);
      this.input.value = this.history[this.historyIndex] ?? '';
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.history.length === 0) return;
      this.historyIndex = Math.min(this.history.length, this.historyIndex + 1);
      this.input.value = this.history[this.historyIndex] ?? '';
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      this.autocomplete();
    }
  }

  private autocomplete() {
    const current = this.input.value.trim();
    if (!current) return;

    const matches = listCommands().filter((command) => command.startsWith(current));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.print(matches.join('  '));
    }
  }

  private execute(raw: string) {
    const parts = raw.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    const handler = getCommand(cmd);
    if (handler) {
      try {
        handler(args, {
          print: (text: string) => this.print(text),
          clear: () => this.clear(),
          setPrompt: (text: string) => {
            this.promptText = text;
            const prompt = this.element.querySelector('.terminal-prompt');
            if (prompt) prompt.textContent = text;
          },
          openApp: this.options.openApp,
        });
      } catch (err) {
        this.print(`Error: ${err}`);
      }
    } else {
      sound.playError();
      this.print(`${cmd}: command not found`);
    }
  }

  private print(text: string) {
    const line = document.createElement('div');
    line.textContent = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  private clear() {
    this.output.innerHTML = '';
  }
}
