/* ─── Secrets App — classified dossier browser with password gate ─── */

interface SecretFile {
  id: string;
  title: string;
  classification: string;
  content: string;
}

const SECRET_FILES: SecretFile[] = [
  {
    id: 'gibson',
    title: 'OPERATION_GIBSON.md',
    classification: 'TOP SECRET // NOFORN',
    content: `═══════════════════════════════════════
  AFTER-ACTION REPORT: OPERATION GIBSON
═══════════════════════════════════════

CLASSIFICATION: TOP SECRET // NOFORN
DATE: 10 SEP 1999
AUTHOR: CRASH_OVERRIDE

SUMMARY
───────
On 09 SEP 1999, the GIBSON mainframe was successfully breached via a buffer overflow in crt_scanline.service (port 31337). The exploit, developed by ZERO_COOL, allowed Level 5 access to the Gibson's encrypted filesystem.

EXTRACTED DATA
──────────────
• Ellingson Mineral Corporation wire transfer logs (Q3 1999)
• Richard V. Peterson's personnel file (Director of Security)
• Gibson root certificate (valid until 2001)
• Partial access log showing 47 failed FBI login attempts (lol)

CASUALTIES
──────────
• ZERO_COOL's 486 crashed mid-extraction (insufficient RAM)
• ACID_BURN's ego (she triggered the FBI honeypot database)
• PHANTOM_PHREAK's dinner (his mom was yelling)

STATUS: MISSION ACCOMPLISHED
─────────────────────────────
The Gibson has been hacked. The data is ours.
Next target: see OPERATION_CLEANER.md`,
  },
  {
    id: 'cleaner',
    title: 'OPERATION_CLEANER.md',
    classification: 'TOP SECRET // EYES ONLY',
    content: `═══════════════════════════════════════
  PERSONNEL FILE: THE CLEANER
═══════════════════════════════════════

CLASSIFICATION: TOP SECRET // EYES ONLY

CODENAME: The Cleaner
REAL NAME: [REDACTED] — "Hank"
OCCUPATION: Janitor, Night Shift
FACILITY: [CLASSIFIED] Supercomputer Complex
CLEARANCE: None (physical access only)

BACKGROUND
──────────
Hank has worked at the facility for 12 years. He knows every hallway, every camera blind spot, and every guard rotation. He has a keycard that opens 87% of the doors — including the server room.

RECRUITMENT
───────────
Recruited by PLAGUE in AUG 1999. Motivation: the facility management cut his overtime pay and canceled the holiday party two years in a row. Hank holds a grudge.

ASSETS
──────
• Master keycard (cloned by CEREAL_KILLER)
• Floor plans of all 4 levels (hand-drawn by Hank on napkins)
• Guard rotation schedule (updated weekly)
• Knowledge of the ventilation system (for physical access)

WEAKNESSES
──────────
• Talks too much. Do NOT let Hank near anyone with a badge.
• Drinks coffee at exactly 2:17 AM every night. 4-minute window.

NEXT STEPS
──────────
ZERO_COOL will approach the facility director (Richard V. Peterson) at O'Malley's Bar on Friday night. Social engineering objective: obtain Peterson's badge number and biometric data. Once acquired, THE CLEANER will handle the physical breach.

TARGET DATE: 24 SEP 1999`,
  },
  {
    id: 'ellingson',
    title: 'ELLINGSON_DOSSIER.md',
    classification: 'TOP SECRET // ORCON',
    content: `═══════════════════════════════════════
  TARGET DOSSIER: ELLINGSON MINERAL CORP
═══════════════════════════════════════

CLASSIFICATION: TOP SECRET // ORCON

ORGANIZATION: Ellingson Mineral Corporation
HQ: 1400 Industrial Blvd, Portland, OR
CEO: Harold Ellingson III (inherited, incompetent)
DIRECTOR OF SECURITY: Richard V. Peterson

FINANCIAL IRREGULARITIES
────────────────────────
The Gibson wire transfer logs reveal $47M in off-book transactions between Ellingson Mineral and an offshore shell company: "Cypress Holdings Ltd." (registered in the Cayman Islands, PO Box 31337). These transfers coincide with the "accidental" chemical spill in Cowlitz County last March.

PERSONNEL OF INTEREST
─────────────────────
• Harold Ellingson III — CEO. Has 3 yachts but claims the company is "barely breaking even."
• Richard V. Peterson — Director of Security. Drinks at O'Malley's every Friday. Recently divorced. Vulnerable to social engineering.
• Sarah Chen — CFO. The only person who might be clean. Has been locked out of the Gibson data by Peterson.

EXPLOITATION PLAN
─────────────────
Phase 1: Social engineer Peterson at O'Malley's (ZERO_COOL)
Phase 2: Physical breach via THE CLEANER
Phase 3: Extract full financial records from the air-gapped supercomputer
Phase 4: Leak to the press / FBI (anonymously, via IRC drop)

The world deserves to know what Ellingson is doing.
Hack the planet.`,
  },
  {
    id: 'theme',
    title: 'UNLOCK: acid_burn.theme',
    classification: 'TOP SECRET // SPECIAL ACCESS',
    content: `═══════════════════════════════════════
  UNLOCKABLE CONTENT: ACID BURN THEME
═══════════════════════════════════════

Congratulations. You found the secret.

Acid Burn left a modified desktop theme in the Gibson's filesystem. It replaces the standard phosphor-green terminal with her signature acid-pink and cyan palette.

To activate:
1. Open the Terminal
2. Type: theme acid

The Desktop will reload with:
• Terminal text: #FF00CC (acid pink)
• Titlebar gradient: #FF00CC → #00FFFF
• Desktop icon labels: pink glow
• Taskbar highlights: cyan accents

This theme is permanent until you type: theme reset

Acid Burn says: "You're welcome. Try not to crash your 486 this time."

╔══════════════════════════════════════╗
║  ACCESS GRANTED  •  ACID_THEME v1.0 ║
╚══════════════════════════════════════╝`,
  },
  {
    id: 'credits',
    title: 'CREDITS.md',
    classification: 'UNCLASSIFIED',
    content: `═══════════════════════════════════════
  GIBSON/OS v4.20 — CREDITS
═══════════════════════════════════════

GIBSON/OS was built for the "Hack the Planet" retro desktop experience.

CREW
────
• ZERO_COOL (Dade Murphy) — Social engineering, Gibson exploit
• CRASH_OVERRIDE — Network penetration, AOHell development
• ACID_BURN — Database infiltration, theme design
• PHANTOM_PHREAK — Infrastructure, wasted too much time in AOL chat rooms
• CEREAL_KILLER — Hardware, keycard cloning, terrible root beer
• LORD_NIKON — Intel gathering, Ellingson research
• PLAGUE — Strategic direction, recruitment, ominous messages

TECH STACK
──────────
• TypeScript + Vite
• Custom window manager (no frameworks)
• Web Audio API
• CSS CRT scanlines
• Raycasting engine (Halo demake)
• Canvas Matrix rain

SOUNDTRACK
──────────
• The sound of a 56k modem connecting
• Keyboard clicking at 3 AM
• The FBI knocking on your door (just kidding... probably)

SPECIAL THANKS
──────────────
• The 1995 film "Hackers" — for the aesthetic
• The Matrix — for the digital rain
• Halo: Combat Evolved — for the demake inspiration
• GeoCities — for teaching us that more blink tags = better website
• Every AOL chat room that ever got punted

"Mess with the best, die like the rest."
— Crash Override, 1995

HACK THE PLANET.
───────────────`,
  },
];

const CORRECT_PASSWORD = 'poolonroof';

// ─── APP ─────────────────────────────────────────────────

export class SecretsApp {
  element: HTMLElement;
  private unlocked = false;
  private selectedFile: SecretFile | null = null;
  private contentArea: HTMLElement;
  private state: 'locked' | 'unlocked' = 'locked';

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'secrets-app';
    this.contentArea = document.createElement('div');
    this.contentArea.className = 'secrets-content';
    this.element.appendChild(this.contentArea);
    this.renderLocked();
  }

  private renderLocked() {
    this.state = 'locked';
    this.contentArea.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'secrets-locked';

    const icon = document.createElement('div');
    icon.className = 'secrets-lock-icon';
    icon.textContent = '🔐';

    const title = document.createElement('div');
    title.className = 'secrets-title';
    title.textContent = 'CLASSIFIED — RESTRICTED ACCESS';

    const hint = document.createElement('div');
    hint.className = 'secrets-hint';
    hint.textContent = 'Password required.';
    const hint2 = document.createElement('div');
    hint2.className = 'secrets-hint-sub';
    hint2.textContent = 'Hint: The answer is in the garbage file.';

    const inputGroup = document.createElement('div');
    inputGroup.className = 'secrets-input-group';

    const input = document.createElement('input');
    input.className = 'secrets-input';
    input.type = 'password';
    input.placeholder = 'Enter password...';
    input.spellcheck = false;

    const btn = document.createElement('button');
    btn.className = 'secrets-btn';
    btn.textContent = 'UNLOCK';

    const error = document.createElement('div');
    error.className = 'secrets-error';

    const attempt = () => {
      if (input.value.trim() === CORRECT_PASSWORD) {
        this.unlocked = true;
        this.renderDossier();
      } else {
        error.textContent = 'ACCESS DENIED — Invalid password';
        input.value = '';
        input.focus();
      }
    };

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attempt();
    });

    inputGroup.appendChild(input);
    inputGroup.appendChild(btn);

    wrapper.appendChild(icon);
    wrapper.appendChild(title);
    wrapper.appendChild(hint);
    wrapper.appendChild(hint2);
    wrapper.appendChild(inputGroup);
    wrapper.appendChild(error);

    this.contentArea.appendChild(wrapper);
  }

  private renderDossier() {
    this.state = 'unlocked';
    this.contentArea.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'secrets-dossier-header';
    header.innerHTML = '<span>🔓 ACCESS GRANTED — Level 5 Clearance</span><span>TOP SECRET</span>';

    const main = document.createElement('div');
    main.className = 'secrets-dossier-main';

    // file list sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'secrets-file-list';

    for (const file of SECRET_FILES) {
      const entry = document.createElement('div');
      entry.className = 'secrets-file-entry';
      if (file === this.selectedFile) entry.classList.add('active');

      const name = document.createElement('span');
      name.className = 'secrets-file-name';
      name.textContent = file.title;

      const badge = document.createElement('span');
      badge.className = 'secrets-file-classification';
      badge.textContent = file.classification.split(' // ')[0];

      entry.appendChild(name);
      entry.appendChild(badge);
      entry.addEventListener('click', () => {
        this.selectedFile = file;
        this.renderDossier();
      });

      sidebar.appendChild(entry);
    }

    // preview pane
    const preview = document.createElement('div');
    preview.className = 'secrets-preview';

    if (this.selectedFile) {
      const stamp = document.createElement('div');
      stamp.className = 'secrets-stamp';
      stamp.textContent = this.selectedFile.classification;

      const body = document.createElement('div');
      body.className = 'secrets-body terminal-content';
      body.textContent = this.selectedFile.content;

      preview.appendChild(stamp);
      preview.appendChild(body);
    } else {
      preview.innerHTML = '<div class="secrets-select-file">Select a file to view its contents</div>';
    }

    main.appendChild(sidebar);
    main.appendChild(preview);

    // lock button
    const lockBtn = document.createElement('button');
    lockBtn.className = 'secrets-lock-btn';
    lockBtn.textContent = '🔒 Lock';
    lockBtn.addEventListener('click', () => {
      this.unlocked = false;
      this.selectedFile = null;
      this.renderLocked();
    });

    this.contentArea.appendChild(header);
    this.contentArea.appendChild(main);
    this.contentArea.appendChild(lockBtn);
  }

  // ── Public ──────────────────────────────────────────

  isUnlocked(): boolean {
    return this.unlocked;
  }

  getState(): string {
    return this.state;
  }

  getFileCount(): number {
    return SECRET_FILES.length;
  }
}

export function createSecretsApp(): SecretsApp {
  return new SecretsApp();
}
