import './style.css';
import { BootSequence } from './core/boot';
import { Desktop } from './core/desktop';

async function main() {
  const bootScreen = document.getElementById('boot-screen')!;
  const desktopEl = document.getElementById('desktop')!;

  const boot = new BootSequence(bootScreen);
  const skipBoot = () => boot.skip();
  window.addEventListener('keydown', skipBoot, { once: true });
  bootScreen.addEventListener('click', skipBoot, { once: true });

  await boot.run();

  window.removeEventListener('keydown', skipBoot);
  bootScreen.removeEventListener('click', skipBoot);
  bootScreen.classList.add('hidden');
  desktopEl.classList.remove('hidden');

  const desktop = new Desktop(desktopEl);
  desktop.init();
}

main();
