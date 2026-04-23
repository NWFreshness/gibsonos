import './style.css';
import { BootSequence } from './core/boot';
import { Desktop } from './core/desktop';

async function main() {
  const bootScreen = document.getElementById('boot-screen')!;
  const desktopEl = document.getElementById('desktop')!;

  const boot = new BootSequence(bootScreen);
  await boot.run();

  bootScreen.classList.add('hidden');
  desktopEl.classList.remove('hidden');

  const desktop = new Desktop(desktopEl);
  desktop.init();
}

main();
