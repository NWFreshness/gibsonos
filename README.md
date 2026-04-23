# Hack the Planet

A retro terminal OS experience inspired by *Hackers*, *The Matrix*, *Halo*, and the golden age of LAN parties.

## Quick Start

```bash
cd ~/Documents/hack-the-planet
npm install
npm run dev
```

Then open the local URL in your browser.

## Project Structure

```
src/
  core/          # Boot sequence, desktop manager, sound engine
  ui/            # Window manager, taskbar, icons, CRT shader
  apps/          # Terminal, Netscape, Mail, IRC, Halo, Hacking Game
  commands/      # Terminal command registry
  data/          # Emails, IRC logs, fortunes, etc.
public/
  sounds/        # WAV/MP3 sound effects
  fonts/         # Self-hosted fonts
  wallpapers/    # Background images
```

## Tech Stack

- Vite + Vanilla TypeScript
- Custom window manager (no heavy UI framework)
- Web Audio API for sound effects
- CSS-driven CRT scanlines + WebGL shader pipeline (Phase 2)

## Roadmap

See `~/Documents/ideas/hack-the-planet-spec.md` for the full design spec.

## License

MIT — Hack the planet.
