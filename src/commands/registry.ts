export interface CommandContext {
  print: (text: string) => void;
  clear: () => void;
  setPrompt: (text: string) => void;
  readline: (prompt: string) => Promise<string>;
  openApp?: (id: string) => void;
}

import { MatrixRain } from '../effects/MatrixRain';

export type CommandHandler = (args: string[], ctx: CommandContext) => void | Promise<void>;

function register(registry: Map<string, CommandHandler>, name: string, handler: CommandHandler) {
  registry.set(name.toLowerCase(), handler);
}

export function createCommandRegistry(): Map<string, CommandHandler> {
  const registry: Map<string, CommandHandler> = new Map();

  register(registry, 'help', (_args, ctx) => {
    ctx.print('Available commands:');
    for (const cmd of Array.from(registry.keys()).sort()) {
      ctx.print(`  ${cmd}`);
    }
  });

  register(registry, 'clear', (_args, ctx) => {
    ctx.clear();
  });

  register(registry, 'echo', (args, ctx) => {
    ctx.print(args.join(' '));
  });

  register(registry, 'whoami', (_args, ctx) => {
    ctx.print('zero_cool');
  });

  register(registry, 'date', (_args, ctx) => {
    ctx.print(new Date().toString());
  });

  register(registry, 'uname', (_args, ctx) => {
    ctx.print('GIBSON/OS 4.20-sparky x86_64');
  });

  register(registry, 'ls', (args, ctx) => {
    const dir = args[0] || '.';
    if (dir === 'warez') {
      ctx.print('halflife.gold  [CRACKED BY FLT]');
      ctx.print('diablo2.iso    [CRACKED BY RAZOR1911]');
      ctx.print('aol4.0.exe     [KEYGEN INCLUDED]');
    } else {
      ctx.print('floppies  mp3s  warez  src  pron  readme.txt');
    }
  });

  register(registry, 'cat', (args, ctx) => {
    const file = args[0];
    if (file === 'readme.txt') {
      ctx.print('Welcome to GIBSON/OS.');
      ctx.print('This system is for authorized hackers only.');
      ctx.print('Mess with the best, die like the rest.');
    } else if (file === '/dev/urandom') {
      const chars = '01';
      let line = '';
      for (let i = 0; i < 320; i++) line += chars[Math.floor(Math.random() * chars.length)];
      ctx.print(line);
    } else {
      ctx.print(`cat: ${file}: No such file or directory`);
    }
  });

  register(registry, 'fortune', (_args, ctx) => {
    const fortunes = [
      'The Matrix has you...',
      'Follow the white rabbit.',
      'There is no spoon.',
      'Hack the planet!',
      'The answer is in the garbage file.',
      'Mess with the best, die like the rest.',
      'All your base are belong to us.',
      'I need a weapon.',
      'Wake up, Neo.',
      'Trust no one.',
    ];
    ctx.print(fortunes[Math.floor(Math.random() * fortunes.length)]);
  });

  register(registry, 'cowsay', (args, ctx) => {
    const text = args.join(' ') || 'Hack the planet!';
    const lines = text.split('\\n');
    const maxLen = Math.max(...lines.map((l) => l.length));
    const top = ' ' + '_'.repeat(maxLen + 2);
    const bottom = ' ' + '-'.repeat(maxLen + 2);
    const body = lines.map((l) => `< ${l.padEnd(maxLen)} >`).join('\n');
    const cow = `
${top}
${body}
${bottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    ctx.print(cow);
  });

  register(registry, 'matrix', async (_args, ctx) => {
    ctx.print('Initiating Matrix digital rain...');
    ctx.print('The Matrix has you. Press ESC to exit.');
    const rain = new MatrixRain();
    await rain.start(25000);
    ctx.print('Wake up, Neo...');
  });

  register(registry, 'hack', async (_args, ctx) => {
    ctx.print('╔══════════════════════════════════════╗');
    ctx.print('║   GIBSON MAINFRAME — PORT 31337     ║');
    ctx.print('╚══════════════════════════════════════╝');
    ctx.print('');
    ctx.print('Connecting to gibson.olo:31337...');

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    await sleep(800);
    ctx.print('CONNECTED — Banner received.');
    ctx.print('GIBSON/OS Secure Mainframe v7.1');
    ctx.print('');
    await sleep(400);
    ctx.print('Bypassing firewall...');
    await sleep(600);
    ctx.print('Sending crafted packet to port 31337...');
    await sleep(500);
    ctx.print('Buffer overflow triggered in crt_scanline.service');
    await sleep(400);
    ctx.print('[!] WARNING: Counter-trace detected!');
    ctx.print('[!] The Gibson is tracing your connection.');
    ctx.print('');

    // ── TRACE WAR ──────────────────────────────────
    const codes = [
      { code: 'DADE', hint: 'Enter override password: ' },
      { code: 'ACID', hint: 'Disable firewall — authentication code: ' },
      { code: '007', hint: 'Spoof MAC address — enter hex key: ' },
      { code: 'HACK', hint: 'Inject rootkit — activation phrase: ' },
      { code: '31337', hint: 'Kill trace process — elite code: ' },
    ];

    const maxTime = 6000; // ms per round
    let score = 0;

    ctx.print('══════ TRACE WAR ══════');
    ctx.print('Type each code before the trace finds you!');
    ctx.print('');

    for (let i = 0; i < codes.length; i++) {
      const { code, hint } = codes[i];
      ctx.print(`[ROUND ${i + 1}/5] Trace progress: ${'█'.repeat(i * 4)}${'░'.repeat(16 - i * 4)}`);

      const start = Date.now();
      const answer = await ctx.readline(hint);

      const elapsed = Date.now() - start;
      const correct = answer.trim().toUpperCase() === code;

      if (correct) {
        score++;
        const timeStr = elapsed < 2000 ? 'FAST' : elapsed < 4000 ? 'good' : 'close';
        ctx.print(`  ${timeStr} — code accepted!`);
      } else {
        ctx.print(`  incorrect — trace advancing!`);
      }

      if (elapsed > maxTime) {
        ctx.print('');
        ctx.print('████████████████████████████████████');
        ctx.print('███  TRACE COMPLETE — LOCATED  ███');
        ctx.print('████████████████████████████████████');
        ctx.print('');
        ctx.print('FBI Cybercrime Division has your address.');
        ctx.print('They are already on their way.');
        ctx.print('');
        ctx.print('Tip: run faster next time. <3 seconds per code.');
        return;
      }

      await sleep(600);
    }

    // ── RESULTS ────────────────────────────────────
    ctx.print('');
    if (score >= 4) {
      ctx.print('╔══════════════════════════════════════╗');
      ctx.print('║  ▓▓ ACCESS GRANTED — LEVEL 5 ▓▓    ║');
      ctx.print('╚══════════════════════════════════════╝');
      ctx.print('');
      ctx.print('You are now inside the Gibson mainframe.');
      ctx.print('Root access acquired. Trace terminated.');
      ctx.print('');
      ctx.print(`Score: ${score}/5 codes bypassed.`);
      ctx.print('');
      ctx.print('Available databases:');
      ctx.print('  /gibson/financial/  — Ellingson transfer records');
      ctx.print('  /gibson/personnel/  — Richard V. Peterson, Director of Security');
      ctx.print('  /gibson/secrets/    — [ENCRYPTED — see Secrets folder]');
      ctx.print('');
      ctx.print('The world is yours. Hack the planet.');
    } else {
      ctx.print('══════════════════════════════════════');
      ctx.print(`${score}/5 codes bypassed — partial access`);
      ctx.print('Trace program activated. Disconnecting...');
      ctx.print('');
      ctx.print('You got some data but the Gibson is on alert.');
      ctx.print('Wait 24 hours before attempting again.');
    }
  });

  register(registry, 'sudo', (_args, ctx) => {
    ctx.print('zero_cool is not in the sudoers file. This incident will be reported.');
  });

  register(registry, 'rm', (args, ctx) => {
    if (args.join(' ') === '-rf /') {
      ctx.print('*** KERNEL PANIC ***');
      ctx.print('nice try. :)');
      return;
    }
    ctx.print('rm: permission denied by vibe police');
  });

  register(registry, 'ping', (args, ctx) => {
    const host = args[0] || 'gibson.olo';
    ctx.print(`PING ${host} (207.68.44.12): 56 data bytes`);
    ctx.print(`64 bytes from ${host}: icmp_seq=0 ttl=255 time=13.37 ms`);
    ctx.print(`64 bytes from ${host}: icmp_seq=1 ttl=255 time=14.20 ms`);
    ctx.print(`--- ${host} ping statistics ---`);
    ctx.print('2 packets transmitted, 2 packets received, 0% packet loss');
  });

  register(registry, 'nmap', (_args, ctx) => {
    ctx.print('Starting Nmap 2.54BETA31 ( www.insecure.org/nmap/ )');
    ctx.print('Interesting ports on gibson.olo (207.68.44.12):');
    ctx.print('PORT     STATE  SERVICE');
    ctx.print('21/tcp   open   ftp');
    ctx.print('23/tcp   open   telnet');
    ctx.print('31337/tcp open  elite');
    ctx.print('Nmap run completed -- 1 IP address scanned. Hack the planet.');
  });

  register(registry, 'dialup', (_args, ctx) => {
    ctx.print('ATDT 555-0199');
    ctx.print('Connecting to AOL...');
    ctx.print('krrrrrrk... bEEEEEP... shhhhhhh... CONNECT 56000');
  });

  register(registry, 'elm', (_args, ctx) => {
    ctx.print('Opening elm mail client...');
    ctx.openApp?.('mail');
  });

  register(registry, 'about', (_args, ctx) => {
    ctx.print('GIBSON/OS v4.20 [SPARKY EDITION]');
    ctx.print('Built for Hack the Planet');
    ctx.print('A millennial nostalgia experience.');
  });

  return registry;
}

const registry = createCommandRegistry();

export function registerCommand(name: string, handler: CommandHandler) {
  registry.set(name.toLowerCase(), handler);
}

export function getCommand(name: string): CommandHandler | undefined {
  return registry.get(name.toLowerCase());
}

export function listCommands(): string[] {
  return Array.from(registry.keys()).sort();
}
