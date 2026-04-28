interface Page {
  title: string;
  render: () => HTMLElement;
}

const GEOCITIES_CSS = `
  body { background: #000033 url('/wallpapers/hack-the-planet-tile.png'); color: #00ff00; font-family: 'Times New Roman', serif; margin: 0; padding: 8px; }
  a { color: #00ffff; }
  a:visited { color: #ff00ff; }
  table { border-collapse: collapse; }
  .counter { font-family: 'Courier New', monospace; background: #000; color: #0f0; padding: 2px 6px; border: 1px inset #666; }
  hr { border: 1px solid #00ff00; margin: 8px 0; }
  h1, h2, h3 { color: #ff00cc; font-family: 'Comic Sans MS', cursive, sans-serif; }
  .blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  .box { border: 3px double #00ff00; padding: 8px; background: rgba(0,0,0,0.7); margin: 4px 0; }
  .webring { font-size: 10px; border: 1px solid #666; padding: 4px; text-align: center; background: #111; }
  .construction { background: #ff0; color: #000; font-weight: bold; text-align: center; border: 2px dashed #f00; padding: 4px; }
  .navbar { background: #003366; color: #fff; font-family: Arial, sans-serif; font-size: 13px; padding: 2px 4px; }
  .navbar a { color: #fff; margin: 0 8px; }
  .marquee { color: #ffff00; font-family: 'Comic Sans MS', cursive; }
  .thread { border: 1px solid #333; background: #1a1a2e; padding: 4px; margin: 2px 0; }
  .thread-title { font-size: 14px; font-weight: bold; color: #00ff41; }
  .thread-meta { font-size: 11px; color: #888; }
  .search-input { font-family: 'Courier New', monospace; background: #000; color: #0f0; border: 2px inset #555; padding: 4px; width: 300px; }
  .search-btn { background: #333; color: #0f0; border: 2px outset #555; padding: 4px 12px; font-family: 'Courier New', monospace; cursor: pointer; }
  .row-alt { background: #0a0a14; }
  .signature { font-size: 11px; color: #666; font-style: italic; }
  .spoiler { background: #000; color: #000; cursor: pointer; }
  .spoiler:hover { color: #ff0; }
`;

function wrapPage(title: string, body: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'netscape-page';
  el.innerHTML = `<style>${GEOCITIES_CSS}</style>${body}`;
  return el;
}

// ─── PAGE DEFINITIONS ────────────────────────────────────

const PAGES: Record<string, Page> = {
  'home': {
    title: 'Welcome to HackThePlanet.com',
    render: () => wrapPage('Home', `
      <center>
        <table width="90%" cellpadding="4"><tr><td>
        <center>
          <img src="/favicon.svg" width="88" height="88" alt="logo" style="image-rendering: pixelated;">
          <h1 style="margin:4px 0;">WELCOME TO HACK THE PLANET</h1>
          <div class="construction">⚠ UNDER CONSTRUCTION ⚠</div>
          <p style="font-size:10px; color:#888;">Last updated: 09/10/1999</p>
        </center>

        <marquee class="marquee" scrollamount="3">★☆ WELCOME TO MY HOME PAGE ★☆ COOL STUFF INSIDE ★☆ SIGN MY GUESTBOOK ★☆ HACK THE PLANET ★☆</marquee>

        <div class="box">
          <h3>📟 About This Site</h3>
          <p>Welcome to the official underground HQ of the Hack the Planet crew. We are elite hackers fighting The Man one mainframe at a time. This site contains tutorials, tools, and secret knowledge. Mess with the best, die like the rest.</p>
          <p style="font-size:11px; color:#888;"><i>"The world is yours." — Plague, 1996</i></p>
        </div>

        <div class="box">
          <h3>🌐 Web Ring</h3>
          <div class="webring">
            This site is part of the <b>HACKER WEB RING</b><br>
            [ <a href="#" onclick="return false">⬅ Prev</a> | <a href="#" onclick="return false">Random</a> | <a href="#" onclick="return false">Next ➡</a> ]<br>
            <span style="font-size:9px;">Want to join the ring? Email webring@hack-the-planet.com</span>
          </div>
        </div>

        <div class="box">
          <h3>🔥 HOT LINKS</h3>
          <table width="100%" cellpadding="4">
            <tr><td width="50%">• <a href="forum">💬 Underground Forum</a></td><td>• <a href="warez">💾 Warez Server</a></td></tr>
            <tr><td>• <a href="astalavista">🔍 Astalavista Search</a></td><td>• <a href="about:gibson">🖥 About GIBSON/OS</a></td></tr>
            <tr><td>• <a href="hack-the-gibson">🔓 Hack the Gibson Tutorial</a></td><td>• <a href="cracked">🧩 Cracked Software</a></td></tr>
          </table>
        </div>

        <div class="box">
          <h3>📧 Contact</h3>
          <p>IRC: #hack-the-planet on EFnet<br>
          ICQ: 31337-0420<br>
          AIM: zerocool1999<br>
          Email: crash_override@hack-the-planet.com</p>
        </div>

        <hr>
        <table width="100%"><tr>
          <td align="left" class="counter">You are visitor #<span id="visitor-count">0</span></td>
          <td align="center"><span class="blink" style="color:#ff00cc;">★ BEST VIEWED IN NETSCAPE NAVIGATOR 4.7 ★</span></td>
          <td align="right"><img src="/favicon.svg" width="31" height="31" style="image-rendering: pixelated;" alt="ns"> <span style="font-size:10px;">Netscape Now!</span></td>
        </tr></table>
        <p style="font-size:10px; color:#666;">© 1999 Hack The Planet Crew. All rights reversed.</p>
        </td></tr></table>
      </center>
    `),
  },

  'forum': {
    title: 'Underground Forum — Hack the Planet',
    render: () => wrapPage('Forum', `
      <div class="navbar">
        <a href="home">Home</a> |
        <a href="forum">Forum</a> |
        <a href="warez">Warez</a> |
        <a href="astalavista">Search</a> |
        <a href="hack-the-gibson">Tutorials</a>
      </div>
      <h2 style="color:#00ff41; font-family:'Courier New',monospace;">⛓ UNDERGROUND FORUM</h2>
      <p style="color:#ff0; font-size:12px;">You are logged in as: <b>zero_cool</b> | <a href="#">Logout</a></p>
      <hr>

      <table width="100%" cellpadding="2" style="font-size:12px; border:1px solid #333;">
        <tr style="background:#003366; color:#fff;"><td width="60%"><b>Topic</b></td><td width="15%"><b>Replies</b></td><td width="25%"><b>Last Post</b></td></tr>

        <tr class="thread"><td class="thread-title"><a href="#">How 2 hack the gibson (tutorial)</a></td><td align="center">1337</td><td class="thread-meta">by crash_override<br>09/10/99</td></tr>
        <tr class="thread row-alt"><td class="thread-title"><a href="#">Best AOHell 4.0 punters and proggies</a></td><td align="center">420</td><td class="thread-meta">by magik_man<br>09/09/99</td></tr>
        <tr class="thread"><td class="thread-title"><a href="#">Social engineering: how I got into the FBI mainframe</a></td><td align="center">808</td><td class="thread-meta">by phantom_phreak<br>09/08/99</td></tr>
        <tr class="thread row-alt"><td class="thread-title"><a href="#">Warez request: Diablo 2 crack (WORKING)</a></td><td align="center">56</td><td class="thread-meta">by dooMbr1ng3r<br>09/08/99</td></tr>
        <tr class="thread"><td class="thread-title"><a href="#">The Plague manifesto — required reading</a></td><td align="center">666</td><td class="thread-meta">by lord_nikon<br>09/07/99</td></tr>
        <tr class="thread row-alt"><td class="thread-title"><a href="#">Anyone have the Gibson superuser password?</a></td><td align="center">1</td><td class="thread-meta">by da_vinci_virus<br>09/10/99</td></tr>
        <tr class="thread"><td class="thread-title"><a href="#">How to bypass AOL TOS warning screen</a></td><td align="center">234</td><td class="thread-meta">by acid_burn<br>09/06/99</td></tr>
        <tr class="thread row-alt"><td class="thread-title"><a href="#">The Matrix conspiracy theory thread</a></td><td align="center">999</td><td class="thread-meta">by neo_watcher<br>09/05/99</td></tr>
        <tr class="thread"><td class="thread-title"><a href="#">FREE AOL account generator v3.0</a></td><td align="center">567</td><td class="thread-meta">by cereal_killer<br>09/04/99</td></tr>
      </table>

      <hr>
      <p style="font-size:10px; color:#666;">Powered by UBB™ Classic 5.47c — hacker edition</p>
    `),
  },

  'astalavista': {
    title: 'Astalavista — Security Search Engine',
    render: () => wrapPage('Astalavista', `
      <center>
        <h1 style="font-family:'Courier New',monospace; color:#ffb000; font-size:28px; letter-spacing:4px;">ASTALAVISTA</h1>
        <p style="color:#888; font-size:11px;">The Security & Hacking Search Engine</p>
        <p style="font-size:10px; color:#666;">Searching 42,069 exploits, 13,337 advisories, and 6,669 underground files</p>

        <div style="margin:12px 0;">
          <input class="search-input" type="text" value="hack the planet" readonly style="cursor:default;">
          <button class="search-btn">Search</button>
        </div>

        <table width="80%" cellpadding="4" style="text-align:left; font-size:12px; margin-top:12px;">
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td width="5%">🔍</td>
            <td><a href="#">GIBSON/OS v4.20 root exploit — zero-day</a><br><span style="font-size:10px; color:#888;">Buffer overflow in crt_scanline.service allows local privilege escalation. Patch: there is no patch. — 09/10/1999</span></td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td>🔍</td>
            <td><a href="#">AOL 4.0 — CC generator + password cracker bundle</a><br><span style="font-size:10px; color:#888;">Includes keygen and unlimited trial reset. Rated ★★★★★ by 31337 users. — 09/09/1999</span></td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td>🔍</td>
            <td><a href="#">Win98 — RPC vulnerability (MS98-042)</a><br><span style="font-size:10px; color:#888;">Remote code execution via malformed SMB packet. Affects all versions. — 09/08/1999</span></td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td>🔍</td>
            <td><a href="#">Back Orifice 2000 — latest build with plugins</a><br><span style="font-size:10px; color:#888;">The cult of the dead cow presents: the definitive remote admin tool. Now with encryption. — 09/07/1999</span></td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
          <tr>
            <td>🔍</td>
            <td><a href="#">How to hide your IP — the complete guide</a><br><span style="font-size:10px; color:#888;">Proxy chaining, wingates, and SOCKS5 for the paranoid hacker. — 09/06/1999</span></td>
          </tr>
          <tr><td colspan="2"><hr></td></tr>
        </table>

        <p style="font-size:10px; color:#666; margin-top:12px;">Astalavista box.sk is not responsible for how you use this information. <b>Hack responsibly.</b></p>
        <p class="signature">— Hasta la vista, baby.</p>
      </center>
    `),
  },

  'warez': {
    title: 'Warez Server — Hack the Planet',
    render: () => wrapPage('Warez', `
      <h2 style="font-family:'Courier New',monospace; color:#ffb000;">📀 WAREZ ARCHIVE</h2>
      <p style="font-size:11px; color:#888;">FTP: ftp.hack-the-planet.com:2121 &nbsp;|&nbsp; Ratio: unlimited</p>
      <hr>

      <table width="100%" cellpadding="3" style="font-size:12px;">
        <tr style="background:#003366; color:#fff; font-weight:bold;"><td>File</td><td align="right">Size</td><td align="right">D/L</td><td>Rating</td></tr>
        <tr class="row-alt"><td>halflife.gold [CRACKED BY FLT].zip</td><td align="right">637 MB</td><td align="right">13337</td><td>★★★★★</td></tr>
        <tr><td>diablo2.iso [CRACKED BY RAZOR1911].zip</td><td align="right">1.2 GB</td><td align="right">9801</td><td>★★★★★</td></tr>
        <tr class="row-alt"><td>aol4.0.exe [KEYGEN INCLUDED].zip</td><td align="right">4.7 MB</td><td align="right">42000</td><td>★★★★☆</td></tr>
        <tr><td>photoshop5_full.zip</td><td align="right">112 MB</td><td align="right">5678</td><td>★★★★☆</td></tr>
        <tr class="row-alt"><td>deus_ex_preview_build.iso</td><td align="right">520 MB</td><td align="right">8901</td><td>★★★★★</td></tr>
        <tr><td>winamp2.5_plus_skins_pack.zip</td><td align="right">3.1 MB</td><td align="right">67890</td><td>★★★★☆</td></tr>
        <tr class="row-alt"><td>quake3_arena_cracked.zip</td><td align="right">471 MB</td><td align="right">11234</td><td>★★★★★</td></tr>
        <tr><td>icq_98b_proggie_pack.zip</td><td align="right">1.2 MB</td><td align="right">89123</td><td>★★★☆☆</td></tr>
        <tr class="row-alt"><td>windows_98_keygen.exe</td><td align="right">313 KB</td><td align="right">33333</td><td>★★★★★</td></tr>
      </table>

      <hr>
      <p style="font-size:10px; color:#f00;"><b>DISCLAIMER:</b> We do not host any files. These are just filenames. Seriously. Don't sue us.</p>
      <p class="signature" style="text-align:right;">Uploaded by zero_cool — 09/09/1999 3:33 AM</p>
    `),
  },

  'hack-the-gibson': {
    title: 'How to Hack the Gibson — Tutorial',
    render: () => wrapPage('Tutorial', `
      <h2 style="color:#ffb000; font-family:'Courier New',monospace;">🔓 HOW TO HACK THE GIBSON</h2>
      <p style="font-size:11px; color:#888;">By crash_override &mdash; Level: Elite</p>
      <hr>

      <div class="box">
        <p><b>Step 1: Reconnaissance</b></p>
        <p>First, fire up your terminal and run: <code style="background:#000; color:#0f0; padding:1px 4px;">nmap gibson.olo</code></p>
        <p>You'll see ports 21 (ftp), 23 (telnet), and 31337 (elite) open. Port 31337 is our target — that's the Gibson's proprietary mainframe protocol.</p>
      </div>

      <div class="box">
        <p><b>Step 2: Social Engineering</b></p>
        <p>The Gibson's sysadmin changes the root password every Monday. But check the trash — someone named "Dade" may have accidentally deleted some useful files. The answer is in the garbage.</p>
      </div>

      <div class="box">
        <p><b>Step 3: The Exploit</b></p>
        <p>Once you have the credentials, telnet to port 31337 and enter: <code style="background:#000; color:#0f0; padding:1px 4px;">poolonroof</code></p>
        <p>The Gibson's mainframe will grant you level 5 access. From there, you can browse the encrypted filesystem.</p>
        <p class="blink" style="color:#f00; font-size:13px;"><b>WARNING: The Gibson is protected by a trace program. You have approximately 60 seconds before they locate you.</b></p>
      </div>

      <div class="box">
        <p><b>Step 4: Cover Your Tracks</b></p>
        <p>After extracting the data, run: <code style="background:#000; color:#0f0; padding:1px 4px;">rm -rf /var/log/*</code></p>
        <p>Then disconnect and change your MAC address. Stay ghost.</p>
      </div>

      <hr>
      <p class="signature">"Never fear, I is here." — Dade Murphy, 1995</p>
    `),
  },

  'cracked': {
    title: 'CRACKED Software — Hack the Planet',
    render: () => wrapPage('Cracked', `
      <h2 style="color:#ff00cc; font-family:'Comic Sans MS',cursive;">💊 CRACKED SOFTWARE COLLECTION</h2>
      <hr>
      <table width="100%" cellpadding="4" style="font-size:12px;">
        <tr><td width="50%">
          <div class="box" style="text-align:center;">
            <b>WinZip 7.0 SR-1</b><br>
            <span style="font-size:10px;">Registered to: zero_cool<br>Serial: 00000-00000-00000</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td><td>
          <div class="box" style="text-align:center;">
            <b>Netscape Navigator 4.7</b><br>
            <span style="font-size:10px;">Gold Edition<br>128-bit SSL</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td></tr>
        <tr><td>
          <div class="box" style="text-align:center;">
            <b>mIRC 5.7</b><br>
            <span style="font-size:10px;">with NoNag + BotScript</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td><td>
          <div class="box" style="text-align:center;">
            <b>WinRAR 2.50</b><br>
            <span style="font-size:10px;">40-day trial? Not anymore.</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td></tr>
        <tr><td>
          <div class="box" style="text-align:center;">
            <b>Nero Burning ROM 4.0</b><br>
            <span style="font-size:10px;">Burn anything. Forever.</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td><td>
          <div class="box" style="text-align:center;">
            <b>Napster 2.0 Beta</b><br>
            <span style="font-size:10px;">with Metallica block bypass</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td></tr>
        <tr><td>
          <div class="box" style="text-align:center;">
            <b>Sub7 2.1</b><br>
            <span style="font-size:10px;">Trojan — server + client</span><br>
            <span style="color:#ff0;">[USE AT OWN RISK]</span>
          </div>
        </td><td>
          <div class="box" style="text-align:center;">
            <b>Hotline 1.8.4</b><br>
            <span style="font-size:10px;">Server + client bundle</span><br>
            <span style="color:#0f0;">[CRACKED]</span>
          </div>
        </td></tr>
      </table>
      <hr>
      <p style="font-size:10px; color:#666;">All cracks provided by FLT, RAZOR1911, and PHROZEN CREW. Respect.</p>
    `),
  },

  'about:gibson': {
    title: 'About:GIBSON — System Information',
    render: () => wrapPage('About', `
      <h2 style="font-family:'Courier New',monospace; color:#33ff00;">GIBSON/OS v4.20 [SPARKY EDITION]</h2>
      <hr>
      <table width="100%" cellpadding="3" style="font-size:13px;">
        <tr><td width="200" style="color:#ffb000;">System:</td><td>GIBSON/OS 4.20-sparky x86_64</td></tr>
        <tr><td style="color:#ffb000;">Kernel:</td><td>neurocracker-ii 2.6.66-hack</td></tr>
        <tr><td style="color:#ffb000;">CPU:</td><td>NeuroCracker II @ 266 MHz</td></tr>
        <tr><td style="color:#ffb000;">Memory:</td><td>65,536 KB (64 MB)</td></tr>
        <tr><td style="color:#ffb000;">Storage:</td><td>MAXTOR 8.4 GB IDE</td></tr>
        <tr><td style="color:#ffb000;">Display:</td><td>S3 ViRGE 4MB — 800x600 @ 256 colors</td></tr>
        <tr><td style="color:#ffb000;">Sound:</td><td>Sound Blaster 16 — IRQ 5, DMA 1</td></tr>
        <tr><td style="color:#ffb000;">Network:</td><td>3Com EtherLink III — 10 Mbps</td></tr>
        <tr><td style="color:#ffb000;">CD-ROM:</td><td>TOSHIBA XM-5702B 32x</td></tr>
      </table>
      <hr>
      <h3 style="color:#ffb000;">🏆 Hall of Fame</h3>
      <table width="100%" cellpadding="2" style="font-size:12px;">
        <tr style="color:#ffb000;"><td>User</td><td align="right">Points</td><td align="right">Hacks</td></tr>
        <tr><td>crash_override</td><td align="right">13,337</td><td align="right">420</td></tr>
        <tr class="row-alt"><td>acid_burn</td><td align="right">12,345</td><td align="right">398</td></tr>
        <tr><td>zero_cool</td><td align="right">9,999</td><td align="right">313</td></tr>
        <tr class="row-alt"><td>phantom_phreak</td><td align="right">8,008</td><td align="right">256</td></tr>
        <tr><td>cereal_killer</td><td align="right">6,669</td><td align="right">199</td></tr>
      </table>
      <hr>
      <p style="font-size:11px; color:#666;">GIBSON/OS is a fictional operating system created for entertainment purposes only.</p>
      <p style="font-size:11px; color:#666;">Built with Vite + TypeScript. No mainframes were harmed in the making of this software.</p>
      <p style="font-size:11px; color:#666;">© 1999 Cyberdyne Hacker Systems. Hack the planet.</p>
    `),
  },
};

// ─── DEFAULTS ────────────────────────────────────────────

const HOME_URL = 'home';
const NOT_FOUND_PAGE: Page = {
  title: '404 Not Found',
  render: () => wrapPage('404', `
    <center>
      <h1 style="font-size:48px; color:#f00; font-family:'Courier New',monospace; margin:40px 0 8px;">404</h1>
      <h2 style="color:#ffb000; font-family:'Courier New',monospace;">The page cannot be displayed</h2>
      <hr width="50%">
      <p>The page you are looking for might have been removed,<br>had its name changed, or is temporarily unavailable.</p>
      <p style="color:#888; font-size:11px;">Or the FBI seized the server. Either way.</p>
      <hr width="50%">
      <p>Please try the following:</p>
      <ul style="display:inline-block; text-align:left;">
        <li>Click the <b>Back</b> button to try another link.</li>
        <li>Check the URL for typos (noobs do this a lot).</li>
        <li>Go to the <a href="home">Home Page</a> and start over.</li>
        <li>Consider that maybe this page never existed.</li>
      </ul>
      <p style="color:#888; font-size:10px;">HTTP 404 — File Not Found</p>
    </center>
  `),
};

const START_PAGE: Page = {
  title: 'Netscape — Starting Page',
  render: () => wrapPage('Start', `
    <center>
      <table width="100%" height="100%"><tr><td align="center" valign="middle">
        <h1 style="font-family:'Courier New',monospace; color:#33ff00; font-size:24px;">NETSCAPE NAVIGATOR 4.7</h1>
        <p style="color:#ffb000;">Gold Edition — 128-bit SSL</p>
        <hr width="60%">
        <p style="color:#888;">Loading home page...</p>
        <p class="blink" style="color:#33ff00;">▌</p>
        <p style="font-size:10px; color:#666; margin-top:20px;">Netscape Communications Corporation © 1994-1999</p>
      </td></tr></table>
    </center>
  `),
};

// ─── APP ─────────────────────────────────────────────────

export class NetscapeApp {
  element: HTMLElement;
  private contentArea: HTMLElement;
  private locationInput: HTMLInputElement;
  private statusBar: HTMLElement;
  private toolbar: HTMLElement;
  private currentUrl = '';
  private historyStack: string[] = [];
  private historyIndex = -1;
  private onTitleChange?: (title: string) => void;

  constructor(onTitleChange?: (title: string) => void) {
    this.onTitleChange = onTitleChange;
    this.element = document.createElement('div');
    this.element.className = 'netscape-app';
    this.element.style.display = 'flex';
    this.element.style.flexDirection = 'column';
    this.element.style.height = '100%';
    this.element.style.width = '100%';

    this.toolbar = this.buildToolbar();
    this.contentArea = this.buildContentArea();
    this.statusBar = this.buildStatusBar();

    this.element.appendChild(this.toolbar);
    this.element.appendChild(this.contentArea);
    this.element.appendChild(this.statusBar);

    // location input
    this.locationInput = this.toolbar.querySelector('.ns-location') as HTMLInputElement;
  }

  private buildToolbar(): HTMLElement {
    const tb = document.createElement('div');
    tb.className = 'netscape-toolbar';

    // Row 1: navigation buttons
    const buttons = document.createElement('div');
    buttons.className = 'netscape-buttons';

    const btnBack = this.makeButton('Back', () => this.goBack());
    const btnFwd = this.makeButton('Forward', () => this.goForward());
    const btnReload = this.makeButton('Reload', () => this.navigate(this.currentUrl || HOME_URL));
    const btnHome = this.makeButton('Home', () => this.navigate(HOME_URL));
    const btnStop = this.makeButton('Stop', () => this.setStatus('Stopped'));

    buttons.appendChild(btnBack);
    buttons.appendChild(btnFwd);
    buttons.appendChild(btnReload);
    buttons.appendChild(btnHome);
    buttons.appendChild(btnStop);

    // Row 2: location bar
    const locBar = document.createElement('div');
    locBar.className = 'netscape-location-bar';

    const locLabel = document.createElement('span');
    locLabel.className = 'netscape-location-label';
    locLabel.textContent = 'Location:';

    const locInput = document.createElement('input');
    locInput.className = 'netscape-location ns-location';
    locInput.type = 'text';
    locInput.spellcheck = false;
    locInput.value = '';
    locInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.navigate(locInput.value.trim() || HOME_URL);
      }
    });

    locBar.appendChild(locLabel);
    locBar.appendChild(locInput);

    tb.appendChild(buttons);
    tb.appendChild(locBar);
    return tb;
  }

  private buildContentArea(): HTMLElement {
    const area = document.createElement('div');
    area.className = 'netscape-content';
    area.style.flex = '1';
    area.style.overflow = 'auto';
    area.style.background = '#000';
    return area;
  }

  private buildStatusBar(): HTMLElement {
    const sb = document.createElement('div');
    sb.className = 'netscape-status';
    sb.textContent = 'Document: Done';
    return sb;
  }

  private makeButton(label: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'netscape-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => onClick());
    return btn;
  }

  // ── Navigation ──────────────────────────────────────

  navigate(url: string) {
    url = url.trim() || HOME_URL;

    // prune forward history
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    }

    // avoid duplicate consecutive entries
    if (this.historyStack[this.historyIndex] !== url) {
      this.historyStack.push(url);
      this.historyIndex = this.historyStack.length - 1;
    }

    this.loadPage(url);
  }

  goBack() {
    if (this.historyIndex <= 0) return;
    this.historyIndex--;
    this.loadPage(this.historyStack[this.historyIndex]);
  }

  goForward() {
    if (this.historyIndex >= this.historyStack.length - 1) return;
    this.historyIndex++;
    this.loadPage(this.historyStack[this.historyIndex]);
  }

  private loadPage(url: string) {
    this.setStatus('Loading...');
    this.currentUrl = url;

    const locLabel = url.startsWith('about:') ? 'Location:' : 'Location:';
    this.locationInput.value = url;

    const page = PAGES[url] ?? NOT_FOUND_PAGE;
    const docTitle = page.title;

    if (page.render === NOT_FOUND_PAGE.render && url !== '') {
      // it's a 404
    }

    this.contentArea.innerHTML = '';
    const rendered = page.render();
    this.contentArea.appendChild(rendered);

    // make links navigable
    this.wireLinks();

    // update title callback for window titlebar
    this.onTitleChange?.(`Netscape — ${docTitle}`);
    this.setStatus('Document: Done');

    // visitor counter animation
    setTimeout(() => {
      const counter = this.contentArea.querySelector('#visitor-count');
      if (counter) {
        counter.textContent = String(133700 + Math.floor(Math.random() * 1000));
      }
    }, 600);
  }

  private wireLinks() {
    const links = this.contentArea.querySelectorAll('a[href]');
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement;
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          e.preventDefault();
          this.navigate(href);
        }
      });
    });
  }

  // ── Public API ──────────────────────────────────────

  init() {
    // Show start page briefly then go home
    const startPage = START_PAGE.render();
    this.contentArea.innerHTML = '';
    this.contentArea.appendChild(startPage);
    this.onTitleChange?.('Netscape Navigator');

    setTimeout(() => {
      this.navigate(HOME_URL);
    }, 800);
  }

  private setStatus(text: string) {
    this.statusBar.textContent = text;
  }
}

export function createNetscapeApp(onTitleChange?: (title: string) => void): NetscapeApp {
  const app = new NetscapeApp(onTitleChange);
  app.init();
  return app;
}
