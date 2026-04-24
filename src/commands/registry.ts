export interface CommandContext {
  print: (text: string) => void;
  clear: () => void;
  setPrompt: (text: string) => void;
  openApp?: (id: string) => void;
}

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

  register(registry, 'matrix', (_args, ctx) => {
    ctx.print('Initiating Matrix digital rain...');
    ctx.print('(Fullscreen mode not yet implemented in scaffold)');
  });

  register(registry, 'hack', (_args, ctx) => {
    ctx.print('Connecting to the Gibson...');
    ctx.print('Bypassing mainframe firewall...');
    ctx.print('Trace initiated. Type fast!');
    ctx.print('(Minigame not yet implemented in scaffold)');
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
