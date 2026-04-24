---
version: alpha
name: GIBSON/OS
description: A retro hacker desktop where late-90s Win9x chrome collides with phosphor terminals, Matrix rain, LAN-party nostalgia, and playful fake OS rituals.
colors:
  primary: "#33FF00"
  secondary: "#C0C0C0"
  tertiary: "#00FFFF"
  phosphor-green: "#33FF00"
  phosphor-amber: "#FFB000"
  matrix-green: "#00FF41"
  cyan: "#00FFFF"
  acid-pink: "#FF00CC"
  bg-black: "#050505"
  win-gray: "#C0C0C0"
  win-dark: "#808080"
  win-light: "#DFDFDF"
  win-title: "#000080"
  win-title-bright: "#1084D0"
  win-text: "#000000"
  white: "#FFFFFF"
typography:
  terminal:
    fontFamily: VT323, Share Tech Mono, Courier New, monospace
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.25
  boot:
    fontFamily: VT323, Share Tech Mono, Courier New, monospace
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.4
  ui:
    fontFamily: MS Sans Serif, Tahoma, Geneva, sans-serif
    fontSize: 0.6875rem
    fontWeight: 400
    lineHeight: 1.2
  titlebar:
    fontFamily: MS Sans Serif, Tahoma, Geneva, sans-serif
    fontSize: 0.6875rem
    fontWeight: 700
    lineHeight: 1.2
rounded:
  none: 0px
spacing:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 16px
components:
  desktop:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.white}"
  boot-screen:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.phosphor-green}"
    typography: "{typography.boot}"
    padding: 32px
  terminal:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.primary}"
    typography: "{typography.terminal}"
    padding: 4px
  window-chrome:
    backgroundColor: "{colors.win-gray}"
    textColor: "{colors.win-text}"
    rounded: "{rounded.none}"
  window-titlebar:
    backgroundColor: "{colors.win-title}"
    textColor: "{colors.white}"
    typography: "{typography.titlebar}"
    height: 18px
  taskbar:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.win-text}"
    typography: "{typography.ui}"
    height: 28px
  desktop-icon-label:
    backgroundColor: "{colors.win-title}"
    textColor: "{colors.white}"
    typography: "{typography.ui}"
  accent-warning:
    backgroundColor: "{colors.phosphor-amber}"
    textColor: "{colors.bg-black}"
  matrix-effect:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.matrix-green}"
  acid-burn-accent:
    backgroundColor: "{colors.acid-pink}"
    textColor: "{colors.bg-black}"
  acid-burn-link:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.tertiary}"
  bevel-shadow:
    backgroundColor: "{colors.win-dark}"
    textColor: "{colors.bg-black}"
  titlebar-gradient-stop:
    backgroundColor: "{colors.win-title-bright}"
    textColor: "{colors.bg-black}"
  cyan-terminal-accent:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.cyan}"
  bevel-highlight:
    backgroundColor: "{colors.bg-black}"
    textColor: "{colors.win-light}"
---

## Overview

GIBSON/OS is a fictional full-screen retro desktop, not a real operating system. The north star is “authenticity over accuracy”: every element should feel like 1999 hacker culture even when the implementation is modern TypeScript and DOM.

The visual identity combines black terminal space, phosphor text, Win9x bevels, CRT overlays, and neon hacker accents. Every surface should invite interaction: icons open windows, terminal commands do something funny, and hidden clues should make the desktop feel bigger than it is.

## Colors

- **Phosphor Green (#33FF00):** Primary terminal text, boot text, and the default “computer room” glow.
- **Matrix Green (#00FF41):** Motion-heavy effects, digital rain, and higher-energy hacker moments.
- **Phosphor Amber (#FFB000):** Warnings, status accents, old monitor warmth, and alternate terminal flavor.
- **Cyan (#00FFFF) and Acid Pink (#FF00CC):** Rare “Acid Burn” accents, unlockable themes, and maximal 90s cyberpunk energy.
- **Win9x Grays (#C0C0C0, #808080, #DFDFDF):** Window chrome, taskbar, bevels, and desktop controls.
- **Black (#050505):** The base void behind the CRT and terminal content.

## Typography

Terminal and boot experiences use VT323 first, Share Tech Mono second, and Courier New as the safe fallback. UI chrome uses MS Sans Serif/Tahoma-style proportions to preserve the Win9x illusion. Use bold only in title bars or Start/taskbar emphasis; terminal text should stay regular and readable.

## Layout

The app occupies the full viewport with a simulated desktop under CRT overlays. Desktop icons sit on a grid. Windows are absolute-positioned and managed by the desktop shell. The taskbar remains anchored at the bottom and should always feel like a system primitive rather than app content.

## Elevation & Depth

Depth comes from 1px bevels, black drop shadows, active/inactive titlebars, and z-index ordering. Avoid modern soft shadows, rounded cards, translucent glass, and material-style surfaces.

## Shapes

Shapes are square and pixel-era. Rounded corners are intentionally absent. Buttons should feel pressable through bevel borders, not through modern radius or animation.

## Components

- **Boot screen:** Black background, green monospace text, line-by-line reveal.
- **Terminal:** Black canvas-like content area, green text, command echo, and a solid fake shell prompt.
- **Window chrome:** Gray bevel frame with a blue active titlebar and compact square controls.
- **Taskbar:** Gray system bar with `root@GIBSON`, task buttons, fake tray icons, and clock.
- **Desktop icons:** Simple nostalgic glyphs with white labels and blue selected/hover label states.

## Do's and Don'ts

Do:
- Prefer playful fake OS behavior over real system accuracy.
- Keep interactions small, surprising, and content-rich.
- Use token colors instead of introducing random new neon values.
- Let sound and text timing carry the mood.

Don't:
- Add modern SaaS styling, rounded cards, glassmorphism, or heavy framework conventions.
- Overbuild backend-like abstractions for a front-end toy.
- Start large spectacle features before the shell primitives feel alive.
- Use neon accents everywhere; pink/cyan should feel unlocked or special.
