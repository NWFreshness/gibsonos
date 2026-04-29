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
      readline: (_prompt: string) => Promise.resolve('test'),
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

  it('hack command starts the trace war minigame', async () => {
    const registry = createCommandRegistry();
    const output: string[] = [];
    const answers = ['DADE', 'ACID', '007', 'HACK', '31337'];
    let answerIdx = 0;
    const ctx = {
      print: (text: string) => output.push(text),
      clear: () => output.push('[clear]'),
      setPrompt: () => {},
      readline: (_prompt: string) => Promise.resolve(answers[answerIdx++]),
      openApp: () => {},
    };

    const handler = registry.get('hack');
    expect(handler).toBeTruthy();

    // hack has ~2.7s of initial delays + 5*600ms between rounds = ~5.7s total
    await handler?.([], ctx);

    expect(output.join('\n')).toContain('GIBSON MAINFRAME');
    expect(output.join('\n')).toContain('TRACE WAR');
    expect(output.join('\n')).toContain('ACCESS GRANTED');
    expect(output.join('\n')).toContain('Score: 5/5');
  }, 10000);

  it('hack command shows partial access on bad answers', async () => {
    const registry = createCommandRegistry();
    const output: string[] = [];
    const answers = ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'];
    let answerIdx = 0;
    const ctx = {
      print: (text: string) => output.push(text),
      clear: () => output.push('[clear]'),
      setPrompt: () => {},
      readline: (_prompt: string) => Promise.resolve(answers[answerIdx++]),
      openApp: () => {},
    };

    const handler = registry.get('hack');
    await handler?.([], ctx);

    expect(output.join('\n')).toContain('partial access');
    expect(output.join('\n')).toContain('0/5');
  }, 10000);

  it('matrix command prints rain startup message', async () => {
    const registry = createCommandRegistry();
    const output: string[] = [];
    const ctx = {
      print: (text: string) => output.push(text),
      clear: () => output.push('[clear]'),
      setPrompt: () => {},
      readline: (_prompt: string) => Promise.resolve(''),
      openApp: () => {},
    };

    const handler = registry.get('matrix');
    // matrix tries to create DOM elements — catch the error and test output
    try {
      await handler?.([], ctx);
    } catch {
      // MatrixRain requires DOM, which isn't available in this test env
    }

    expect(output.join('\n')).toContain('digital rain');
  });
});
