/* ─── Mail App for GIBSON/OS — 90s email client (Eudora / Outlook Express style) ─── */

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  body: string;
  read: boolean;
}

interface EmailFolder {
  name: string;
  emails: Email[];
}

const EMAILS: Email[] = [
  {
    id: '1',
    from: 'plague@hack-the-planet.com',
    to: 'zero_cool@hack-the-planet.com',
    subject: 'The Cleaner — new target',
    date: 'Fri, 10 Sep 1999 01:17:33 -0500',
    body: `zero_cool,

I saw you were AFK during the #elite channel discussion. Here's the summary:

We have a new target. Bigger than the Gibson. Bigger than Ellingson Mineral. I can't say the name here — even encrypted email isn't safe anymore.

What I can tell you: it's an air-gapped supercomputer facility. No remote access possible. We need someone on the inside.

That's where The Cleaner comes in. He works as a janitor at the facility. Night shift. He's been mapping the physical layout for three weeks. Guards, cameras, badge readers — he knows all of it.

Your job: social engineering. The facility director is a guy named Richard V. Peterson. Mid-50s, divorced, drinks too much at O'Malley's on Friday nights. I need you to strike up a conversation. Get friendly. Get his badge number.

The Cleaner will handle the physical breach. crash_override and acid_burn will handle the network side once we're in.

We move in two weeks. Until then — stay off IRC after 2 AM. The feds have been sniffing around EFnet.

Burn this email after reading.

— Plague

---
P.S. The password for the Secrets folder is "poolonroof". In case you need it.`,
  },
  {
    id: '2',
    from: 'crash_override@hack-the-planet.com',
    to: 'zero_cool@hack-the-planet.com',
    subject: 'AOHell Punter v4.2 — test build',
    date: 'Thu, 09 Sep 1999 23:42:01 -0500',
    body: `yo zero_cool,

I uploaded the new AOHell punter to the FTP. Grab it from /warez/tools/aoh42.zip.

New features:
- Bypasses the AOL 4.0 TOS warning screen (finally)
- New "Phantom Flood" mode — sends 500 IMs in 10 seconds
- Fixed the bug where it would punt yourself (lmao sorry about that)
- Added a "stealth mode" that hides your screen name from chat monitors

magik_man tested it yesterday and said it works perfectly. He punted 12 people in an AOL chat room before getting banned.

Let me know if you find any bugs. I want to release it to the forum by Monday.

— crash_override

P.S. Did you see acid_burn's new profile pic on ICQ? She's definitely trying too hard.

P.P.S. Your mom called my house looking for you. Something about "take out the trash before you hack any more mainframes." I didn't answer.`,
  },
  {
    id: '3',
    from: 'acid_burn@hack-the-planet.com',
    to: 'zero_cool@hack-the-planet.com',
    subject: 're: the gibson run',
    date: 'Thu, 09 Sep 1999 22:13:44 -0500',
    body: `Dade,

You did good on the Gibson. I'll admit it. That buffer overflow in crt_scanline.service was clever.

But don't let it go to your head. Plague says you're "essential" for the next job. Essential? Please. I cracked the FBI database last month. (Yes Plague says it was a honeypot. He's probably right. Doesn't matter — I still got in.)

Anyway. I left something in the Trash folder on your desktop. A love letter. To someone named "Acid." Very poetic. Very embarrassing for you.

"Dear Acid Burn, you looked elite in that crash override duel." 🙄

Delete it before anyone else finds it. Or don't. Your call.

— Acid Burn (the better hacker)

P.S. I changed your IRC nick to "poolboy" for a day. You're welcome.`,
  },
  {
    id: '4',
    from: 'security@ellingson-mineral.com',
    to: 'zero_cool@hack-the-planet.com',
    subject: 'Security Audit — Urgent Response Required',
    date: 'Wed, 08 Sep 1999 14:22:18 -0500',
    body: `Dear Mr. Murphy,

This is an automated notification from Ellingson Mineral Corporation's Security Division.

Our systems have detected unusual network activity originating from IP address 207.68.44.12, which our records associate with your account.

Specifically, we detected:
- 47 failed login attempts to the employee directory
- Port scanning on ports 21, 23, 25, 80, 110, and 31337
- An attempted buffer overflow on our SMTP server

Please respond to this email within 48 hours to confirm whether this activity was authorized. If we do not hear from you, we will be forced to escalate this matter to our legal department and the FBI Cybercrime Division.

For your convenience, you can verify your identity by clicking the link below and entering your Social Security number and mother's maiden name:

http://ellingson-mineral.com/security/verify?ref=31337

Sincerely,
Richard V. Peterson
Director of Security
Ellingson Mineral Corporation`,
  },
  {
    id: '5',
    from: 'MAILER-DAEMON@gibson.olo',
    to: 'zero_cool@gibson.olo',
    subject: 'Undelivered Mail Returned to Sender',
    date: 'Tue, 07 Sep 1999 03:33:33 -0500',
    body: `This is the mail system at host gibson.olo.

I'm sorry to inform you that your message could not be delivered to one or more recipients. It has been returned to you, unread. Below is a copy of the original message headers along with the delivery failure notice.

<fbi-tip-line@fbi.gov>: host mx1.fbi.gov[153.31.113.22] said:
    550 5.1.1 <fbi-tip-line@fbi.gov>: Recipient address rejected:
    "We know who you are, zero_cool. Nice try." (in reply to RCPT TO command)

<agent-ray@gibson.olo>: host mail.gibson.olo[10.0.0.1] said:
    550 5.7.1 Security alert triggered. System administrator notified.
    The Gibson has been alerted. Trace program initiated. (in reply to end of DATA command)

--- ORIGINAL MESSAGE ---
From: zero_cool@gibson.olo
To: fbi-tip-line@fbi.gov, agent-ray@gibson.olo
Subject: you'll never catch me
Date: Tue, 07 Sep 1999 03:33:00 -0500

hack the planet`,
  },
  {
    id: '6',
    from: 'phantom_phreak@hack-the-planet.com',
    to: 'zero_cool@hack-the-planet.com',
    subject: 'my mom says hi',
    date: 'Mon, 06 Sep 1999 19:45:00 -0500',
    body: `zero_cool,

My mom wanted me to ask you something: are you coming to the LAN party this weekend? She's making pizza rolls and there will be Mountain Dew. Lots of Mountain Dew.

She also said you left your hoodie here last time. The black one with the green binary code on it. She washed it for you. It smells like fabric softener now. Very unhackerlike. Sorry.

We're playing Quake 3 and Half-Life deathmatch. da_vinci_virus is bringing his cracked copies. cereal_killer is bringing his homemade root beer (it's terrible but we pretend to like it).

Also — and this is important — do NOT tell my mom about the Gibson thing. She still thinks we're "studying computer science." If she asks, we're working on a "Linux kernel module for distributed computing." I already wrote it down on a Post-it if you need to refer to it.

See you Saturday. 6 PM. Bring your own keyboard.

— phantom_phreak

P.S. My mom says to tell you "eat more vegetables." I told her hackers photosynthesize energy from CRT monitors. She didn't believe me.`,
  },
];

const FOLDERS: EmailFolder[] = [
  { name: 'Inbox', emails: EMAILS },
  { name: 'Sent', emails: [] },
  { name: 'Trash', emails: [] },
];

// ─── APP ─────────────────────────────────────────────────

export class MailApp {
  element: HTMLElement;
  private folders: EmailFolder[];
  private currentFolder: EmailFolder;
  private selectedEmail: Email | null = null;
  private folderList: HTMLElement;
  private messageList: HTMLElement;
  private previewPane: HTMLElement;

  constructor() {
    this.folders = FOLDERS.map((f) => ({
      ...f,
      emails: f.emails.map((e) => ({ ...e })),
    }));
    this.currentFolder = this.folders[0];
    this.element = document.createElement('div');
    this.element.className = 'mail-app';

    // top bar
    const toolbar = this.buildToolbar();
    this.element.appendChild(toolbar);

    // main area: folders | message list | preview
    const main = document.createElement('div');
    main.className = 'mail-main';

    this.folderList = this.buildFolderList();
    this.messageList = this.buildMessageList();
    this.previewPane = this.buildPreviewPane();

    const divider = document.createElement('div');
    divider.className = 'mail-divider';

    main.appendChild(this.folderList);
    main.appendChild(divider);
    main.appendChild(this.messageList);
    main.appendChild(this.previewPane);

    this.element.appendChild(main);

    this.renderFolders();
    this.renderMessages();
  }

  // ── Toolbar ──────────────────────────────────────────

  private buildToolbar(): HTMLElement {
    const tb = document.createElement('div');
    tb.className = 'mail-toolbar';

    const btns = [
      { label: 'Get Mail', action: () => this.showStatus('Checking mail... No new messages.') },
      { label: 'New', action: () => this.showStatus('New message: not implemented. Use IRC instead.') },
      { label: 'Reply', action: () => this.showStatus('Reply: not implemented. They probably deserved it anyway.') },
      { label: 'Delete', action: () => this.deleteEmail() },
    ];

    for (const b of btns) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mail-btn';
      btn.textContent = b.label;
      btn.addEventListener('click', b.action);
      tb.appendChild(btn);
    }

    return tb;
  }

  private showStatus(text: string) {
    const existing = this.element.querySelector('.mail-status');
    existing?.remove();
    const s = document.createElement('div');
    s.className = 'mail-status';
    s.textContent = text;
    this.element.appendChild(s);
    setTimeout(() => s.remove(), 2500);
  }

  private deleteEmail() {
    if (!this.selectedEmail) return;
    const idx = this.currentFolder.emails.indexOf(this.selectedEmail);
    if (idx < 0) return;

    const trash = this.folders.find((f) => f.name === 'Trash');
    if (trash) {
      trash.emails.push(this.selectedEmail);
    }

    this.currentFolder.emails.splice(idx, 1);
    this.selectedEmail = null;
    this.renderMessages();
    this.previewPane.innerHTML = `<div class="mail-empty">Select a message to read</div>`;
    this.renderFolders();
  }

  // ── Folder List ──────────────────────────────────────

  private buildFolderList(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'mail-folders';
    return el;
  }

  private renderFolders() {
    this.folderList.innerHTML = '';
    for (const folder of this.folders) {
      const unread = folder.emails.filter((e) => !e.read).length;
      const entry = document.createElement('div');
      entry.className = 'mail-folder';
      if (folder === this.currentFolder) entry.classList.add('active');

      const icon = document.createElement('span');
      icon.className = 'mail-folder-icon';
      icon.textContent = folder === this.currentFolder ? '📂' : '📁';

      const name = document.createElement('span');
      name.textContent = folder.name;

      const badge = document.createElement('span');
      badge.className = 'mail-folder-badge';
      badge.textContent = unread > 0 ? String(unread) : '';

      entry.appendChild(icon);
      entry.appendChild(name);
      entry.appendChild(badge);

      entry.addEventListener('click', () => {
        this.currentFolder = folder;
        this.selectedEmail = null;
        this.renderFolders();
        this.renderMessages();
        this.previewPane.innerHTML = `<div class="mail-empty">Select a message to read</div>`;
      });

      this.folderList.appendChild(entry);
    }
  }

  // ── Message List ─────────────────────────────────────

  private buildMessageList(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'mail-messages';
    return el;
  }

  private renderMessages() {
    this.messageList.innerHTML = '';

    // header row
    const header = document.createElement('div');
    header.className = 'mail-msg-header';
    header.innerHTML = '<span class="mail-col-from">From</span><span class="mail-col-subject">Subject</span><span class="mail-col-date">Date</span>';
    this.messageList.appendChild(header);

    // reverse so newest first
    const sorted = [...this.currentFolder.emails].reverse();

    for (const email of sorted) {
      const row = document.createElement('div');
      row.className = `mail-msg-row${email === this.selectedEmail ? ' selected' : ''}${email.read ? '' : ' unread'}`;

      const from = document.createElement('span');
      from.className = 'mail-col-from';
      from.textContent = email.from.split('@')[0];

      const subject = document.createElement('span');
      subject.className = 'mail-col-subject';
      subject.textContent = email.subject;

      const date = document.createElement('span');
      date.className = 'mail-col-date';
      date.textContent = email.date.split(',')[1]?.trim().split(' ').slice(0, 3).join(' ') ?? email.date;

      row.appendChild(from);
      row.appendChild(subject);
      row.appendChild(date);

      row.addEventListener('click', () => {
        email.read = true;
        this.selectedEmail = email;
        this.renderFolders();
        this.renderMessages();
        this.renderPreview(email);
      });

      this.messageList.appendChild(row);
    }
  }

  // ── Preview Pane ─────────────────────────────────────

  private buildPreviewPane(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'mail-preview';
    el.innerHTML = '<div class="mail-empty">Select a message to read</div>';
    return el;
  }

  private renderPreview(email: Email) {
    this.previewPane.innerHTML = `
      <div class="mail-preview-headers">
        <div><span class="mail-header-label">From:</span> ${this.esc(email.from)}</div>
        <div><span class="mail-header-label">To:</span> ${this.esc(email.to)}</div>
        <div><span class="mail-header-label">Subject:</span> ${this.esc(email.subject)}</div>
        <div><span class="mail-header-label">Date:</span> ${this.esc(email.date)}</div>
      </div>
      <div class="mail-preview-body terminal-content">${this.esc(email.body)}</div>
    `;
  }

  private esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Public API ───────────────────────────────────────

  getFolderNames(): string[] {
    return this.folders.map((f) => f.name);
  }

  getCurrentFolder(): string {
    return this.currentFolder.name;
  }

  getSelectedEmail(): Email | null {
    return this.selectedEmail;
  }

  getEmailCount(folderName: string): number {
    return this.folders.find((f) => f.name === folderName)?.emails.length ?? 0;
  }

  getUnreadCount(): number {
    return this.folders[0].emails.filter((e) => !e.read).length;
  }
}

export function createMailApp(): MailApp {
  return new MailApp();
}
