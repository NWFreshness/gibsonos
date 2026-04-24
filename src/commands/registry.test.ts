import { describe, expect, it } from 'vitest';
import { createCommandRegistry } from './registry';

describe('command registry', () => {
  it('handles first-pass hacker commands from the project spec', () => {
    const registry = createCommandRegistry();
    const output: string[] = [];
    const ctx = {
      print: (text: string) => output.push(text),
      clear: () => output.push('[clear]'),
      setPrompt: () => {},
      openApp: (id: string) => output.push(`[open:${id}]`),
    };

    registry.get('sudo')?.(['make', 'me', 'a', 'sandwich'], ctx);
    registry.get('ping')?.(['gibson.olo'], ctx);
    registry.get('nmap')?.([], ctx);
    registry.get('dialup')?.([], ctx);
    registry.get('elm')?.([], ctx);

    expect(output.join('\n')).toContain('not in the sudoers file');
    expect(output.join('\n')).toContain('PING gibson.olo');
    expect(output.join('\n')).toContain('Starting Nmap 2.54BETA31');
    expect(output.join('\n')).toContain('Connecting to AOL');
    expect(output).toContain('[open:mail]');
  });
});
