export interface CommandContext {
  print: (text: string) => void;
  clear: () => void;
  setPrompt: (text: string) => void;
}

export type CommandHandler = (args: string[], ctx: CommandContext) => void | Promise<void>;

const registry: Map<string, CommandHandler> = new Map();

export function registerCommand(name: string, handler: CommandHandler) {
  registry.set(name.toLowerCase(), handler);
}

export function getCommand(name: string): CommandHandler | undefined {
  return registry.get(name.toLowerCase());
}

export function listCommands(): string[] {
  return Array.from(registry.keys()).sort();
}

// === Built-in Commands ===

registerCommand('help', (_args, ctx) => {
  ctx.print('Available commands:');
  for (const cmd of listCommands()) {
    ctx.print(`  ${cmd}`);
  }
});

registerCommand('clear', (_args, ctx) => {
  ctx.clear();
});

registerCommand('echo', (args, ctx) => {
  ctx.print(args.join(' '));
});

registerCommand('whoami', (_args, ctx) => {
  ctx.print('zero_cool');
});

registerCommand('date', (_args, ctx) => {
  ctx.print(new Date().toString());
});

registerCommand('uname', (_args, ctx) => {
  ctx.print('GIBSON/OS 4.20-sparky x86_64');
});

registerCommand('ls', (args, ctx) => {
  const dir = args[0] || '.';
  if (dir === 'warez') {
    ctx.print('halflife.gold  [CRACKED BY FLT]');
    ctx.print('diablo2.iso    [CRACKED BY RAZOR1911]');
    ctx.print('aol4.0.exe     [KEYGEN INCLUDED]');
  } else {
    ctx.print('floppies  mp3s  warez  src  pron  readme.txt');
  }
});

registerCommand('cat', (args, ctx) => {
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

registerCommand('fortune', (_args, ctx) => {
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

registerCommand('cowsay', (args, ctx) => {
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

registerCommand('matrix', (_args, ctx) => {
  ctx.print('Initiating Matrix digital rain...');
  ctx.print('(Fullscreen mode not yet implemented in scaffold)');
});

registerCommand('hack', (_args, ctx) => {
  ctx.print('Connecting to the Gibson...');
  ctx.print('Bypassing mainframe firewall...');
  ctx.print('Trace initiated. Type fast!');
  ctx.print('(Minigame not yet implemented in scaffold)');
});

registerCommand('about', (_args, ctx) => {
  ctx.print('GIBSON/OS v4.20 [SPARKY EDITION]');
  ctx.print('Built for Hack the Planet');
  ctx.print('A millennial nostalgia experience.');
});
