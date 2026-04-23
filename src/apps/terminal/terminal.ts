import { getCommand } from '../../commands/registry';
import { sound } from '../../core/sound';

export class TerminalApp {
  element: HTMLElement;
  private output: HTMLElement;
  private input: HTMLInputElement;
  private promptText = 'zero_cool@gibson:~$ ';

  constructor() {
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
    // Auto-focus when terminal window is clicked
    this.element.addEventListener('click', () => this.input.focus());

    // Initial welcome
    this.print('GIBSON/OS Terminal v4.20');
    this.print('Type "help" for available commands.');
    this.print('');
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const raw = this.input.value.trim();
      if (raw) {
        this.print(`${this.promptText}${raw}`);
        this.execute(raw);
      }
      this.input.value = '';
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
          },
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
