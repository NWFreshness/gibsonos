const BOOT_LINES = [
  { text: 'GIBSON/OS v4.20 [SPARKY EDITION]', delay: 200 },
  { text: 'Copyright (c) 1995-1999 Cyberdyne Hacker Systems', delay: 100 },
  { text: '', delay: 50 },
  { text: 'BIOS Date: 09/09/99 14:32:51 Ver 1.02', delay: 80 },
  { text: 'CPU: NeuroCracker II, 266 MHz', delay: 60 },
  { text: 'Memory Test: 65536K OK', delay: 400 },
  { text: '', delay: 50 },
  { text: 'Award Plug and Play BIOS Extension v1.0A', delay: 80 },
  { text: 'Detecting IDE Primary Master  ... MAXTOR 8.4GB', delay: 300 },
  { text: 'Detecting IDE Primary Slave   ... NONE', delay: 150 },
  { text: 'Detecting IDE Secondary Master... TOSHIBA CD-ROM', delay: 200 },
  { text: '', delay: 50 },
  { text: 'Loading LILO ........', delay: 600 },
  { text: '', delay: 100 },
  { text: 'boot: gibson-os root=/dev/ide0', delay: 200 },
  { text: '', delay: 100 },
  { text: 'Uncompressing Linux... Ok, booting the kernel.', delay: 400 },
  { text: '', delay: 50 },
  { text: ' [ OK ] Started kernel.', delay: 60 },
  { text: ' [ OK ] Mounted /dev/ide0.', delay: 60 },
  { text: ' [ OK ] Mounted /proc filesystem.', delay: 60 },
  { text: ' [ OK ] Started crt_scanline.service.', delay: 60 },
  { text: ' [ OK ] Started ambient_hum.service.', delay: 60 },
  { text: ' [ OK ] HACK THE PLANET', delay: 60 },
  { text: '', delay: 100 },
  { text: 'gibson login: zero_cool', delay: 300 },
  { text: 'password: ••••••••', delay: 400 },
  { text: '', delay: 100 },
  { text: 'Last login: Fri Sep 10 02:17:33 1999 from pool-207-68-44-12.nycmny.east.verizon.net', delay: 100 },
  { text: '', delay: 50 },
  { text: 'Welcome, Zero Cool.', delay: 150 },
  { text: 'You have 1 new mail.', delay: 150 },
  { text: '', delay: 100 },
  { text: 'Type "help" for available commands.', delay: 100 },
  { text: '', delay: 100 },
];

export class BootSequence {
  private container: HTMLElement;
  private abort = false;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  async run(): Promise<void> {
    for (const line of BOOT_LINES) {
      if (this.abort) break;
      await this.typeLine(line.text, line.delay);
    }
    // Brief pause at end before handoff
    await this.sleep(800);
  }

  private async typeLine(text: string, delay: number): Promise<void> {
    const lineEl = document.createElement('div');
    this.container.appendChild(lineEl);
    for (const char of text) {
      if (this.abort) break;
      lineEl.textContent += char;
      await this.sleep(12); // typing speed
    }
    await this.sleep(delay);
    this.container.scrollTop = this.container.scrollHeight;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  skip() {
    this.abort = true;
  }
}
