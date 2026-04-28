/* ─── IRC App for GIBSON/OS — mIRC-style chat client ─── */

interface IrcMessage {
  timestamp: string;
  nick: string;
  nickColor: string;
  text: string;
  type: 'message' | 'join' | 'part' | 'action' | 'notice' | 'topic' | 'mode';
}

interface IrcChannel {
  name: string;
  topic: string;
  users: string[];
  scrollback: IrcMessage[];
}

const NICK_COLORS: Record<string, string> = {
  zero_cool: '#33ff00',
  crash_override: '#00ffff',
  acid_burn: '#ff00cc',
  phantom_phreak: '#ffb000',
  cereal_killer: '#ff4444',
  lord_nikon: '#88aaff',
  magik_man: '#ff8800',
  neo_watcher: '#44ff44',
  da_vinci_virus: '#cc88ff',
  dooMbr1ng3r: '#ff4444',
  plague: '#ffffff',
};

function mkMsg(nick: string, text: string, type: IrcMessage['type'] = 'message'): IrcMessage {
  return {
    timestamp: _padTime(),
    nick,
    nickColor: NICK_COLORS[nick] ?? '#aaaaaa',
    text,
    type,
  };
}

let _msgTime = new Date('1999-09-10T02:00:00');
function _padTime(): string {
  _msgTime = new Date(_msgTime.getTime() + (30000 + Math.floor(Math.random() * 120000)));
  const h = _msgTime.getHours().toString().padStart(2, '0');
  const m = _msgTime.getMinutes().toString().padStart(2, '0');
  return `[${h}:${m}]`;
}

function buildScrollback(channel: string): IrcMessage[] {
  if (channel === '#hack-the-planet') return [
    { timestamp: '[01:58]', nick: '', nickColor: '#888', text: `*** Now talking in #hack-the-planet`, type: 'notice' },
    { timestamp: '[01:58]', nick: '', nickColor: '#888', text: `*** Topic: 'Welcome to the underground. No FBI. No lamers. Hack the planet.'`, type: 'topic' },
    { timestamp: '[01:58]', nick: '', nickColor: '#888', text: `*** Channel created on Wed Apr 23 1998`, type: 'notice' },
    mkMsg('crash_override', 'so i heard the Gibson has a new security patch'),
    mkMsg('phantom_phreak', 'lol they patch every Monday. we just re-exploit on Tuesday'),
    mkMsg('acid_burn', 'the Gibson sysadmin uses "password123" i guarantee it'),
    mkMsg('crash_override', 'nah its worse. the answer is literally in the garbage file'),
    mkMsg('phantom_phreak', 'wait what garbage file'),
    mkMsg('crash_override', 'check the Trash app. someone named Dade has been sloppy'),
    mkMsg('acid_burn', 'lmao Dade. that noob.'),
    mkMsg('lord_nikon', 'has anyone seen the new Plague manifesto yet'),
    mkMsg('cereal_killer', 'yeah its fire. he says the next target is Ellingson Mineral'),
    mkMsg('crash_override', 'Ellingson? thats a lot of heat. feds will be all over that'),
    mkMsg('lord_nikon', 'Plague says he has a guy on the inside. janitor or something'),
    mkMsg('phantom_phreak', 'brb mom is yelling at me to take out the trash'),
    mkMsg('acid_burn', 'classic phantom. still living in his parents basement'),
    mkMsg('crash_override', 'hey zero_cool you there? i need you to test the new AOHell punter'),
    mkMsg('lord_nikon', 'zero_cool hasnt said anything in like 2 hours. probably in a trace war again'),
    mkMsg('cereal_killer', 'or sleeping. remember he has school tomorrow'),
    mkMsg('acid_burn', 'school is for lamers. hack the planet > algebra'),
    { timestamp: '', nick: 'acid_burn', nickColor: '#ff00cc', text: 'flips table', type: 'action' },
    mkMsg('crash_override', 'anyway i uploaded the new build to /warez on the FTP. grab it when you can'),
    mkMsg('magik_man', 'yo is this the IRC for the AOHell thing? i got punted 6 times today'),
    mkMsg('crash_override', 'yeah this is the channel. what version are you running'),
    mkMsg('magik_man', '4.0 with the keygen from the warez server'),
    mkMsg('crash_override', 'good. the new punter module bypasses the TOS screen. should be undetectable'),
    mkMsg('magik_man', 'sweet. i\'ll test it on some AOL chat rooms tonight'),
    mkMsg('plague', 'zero_cool. i need to talk to you. /msg me when you\'re back.'),
    mkMsg('acid_burn', 'oooooh Plague is back. someone is in trouble'),
    mkMsg('crash_override', 'dont scare the kid Plague. he did good on the Gibson run'),
    mkMsg('plague', 'im not mad. i have a new target. bigger than Ellingson.'),
    mkMsg('lord_nikon', 'bigger than Ellingson? what is it, the Pentagon?'),
    mkMsg('plague', 'something like that. need zero_cool for this one though.'),
    mkMsg('cereal_killer', 'zero_cool!!! wake up!!!'),
    { timestamp: '', nick: 'crash_override', nickColor: '#00ffff', text: 'pokes zero_cool with a stick', type: 'action' },
    mkMsg('acid_burn', 'he probably crashed his computer again. 486s cant handle real work'),
    mkMsg('phantom_phreak', 'im back. what did i miss'),
    mkMsg('lord_nikon', 'Plague has a new target and zero_cool is MIA'),
    mkMsg('phantom_phreak', 'classic. lmk when something happens'),
    { timestamp: '', nick: 'phantom_phreak', nickColor: '#ffb000', text: 'is now away: dinner', type: 'notice' },
    mkMsg('crash_override', 'ok im logging off for a bit. if zero_cool shows up tell him to check his email'),
    { timestamp: '', nick: 'crash_override', nickColor: '#00ffff', text: 'has quit IRC (Ping timeout: 180 seconds)', type: 'part' },
    mkMsg('acid_burn', 'same. i have a calculus test tomorrow pray for me'),
    { timestamp: '', nick: 'acid_burn', nickColor: '#ff00cc', text: 'has quit IRC (Quit: leaving)', type: 'part' },
  ];

  if (channel === '#warez') return [
    { timestamp: '[01:55]', nick: '', nickColor: '#888', text: `*** Now talking in #warez`, type: 'notice' },
    { timestamp: '[01:55]', nick: '', nickColor: '#888', text: `*** Topic: 'NO FEDS. NO RATS. RATIO 1:3 or get banned. Requests in #warez-req'`, type: 'topic' },
    mkMsg('dooMbr1ng3r', 'anyone got the Diablo 2 crack that actually works'),
    mkMsg('magik_man', 'the one on the FTP is good. RAZOR1911 release. tested it yesterday'),
    mkMsg('dooMbr1ng3r', 'sweet. grabbing now. ratio will update'),
    mkMsg('da_vinci_virus', 'i just uploaded Half-Life Opposing Force. cracked by FLT'),
    mkMsg('magik_man', 'oh SHIT. i\'ve been waiting for that. ty ty ty'),
    mkMsg('da_vinci_virus', 'np. 637mb. give it a few hours to prop'),
    mkMsg('dooMbr1ng3r', 'hey does anyone have the Windows 98 SE keygen? my trial expired'),
    mkMsg('magik_man', 'check the Trash app. zero_cool accidentally deleted one'),
    mkMsg('dooMbr1ng3r', 'lmao zero_cool. classic.'),
    mkMsg('da_vinci_virus', 'i have a spare key if you need it. ive been sitting on like 50 of them'),
    mkMsg('dooMbr1ng3r', 'nah i found the one in the garbage. all good'),
    mkMsg('magik_man', 'anyone playing Quake 3 tonight? i just got the cracked version'),
    mkMsg('da_vinci_virus', 'yeah im on the LAN server. IP is in the forum'),
    mkMsg('dooMbr1ng3r', 'im in. i call the railgun'),
    mkMsg('magik_man', 'railgun noob lol. real players use rocket launcher'),
    mkMsg('da_vinci_virus', 'anyone seen the new Napster beta? it has a Metallica block bypass'),
    mkMsg('dooMbr1ng3r', 'lol lars ulrich is gonna be so mad'),
    mkMsg('magik_man', 'good. metallica sold out years ago'),
    mkMsg('da_vinci_virus', 'uploading Quake 3 + all maps to the FTP now. 471mb'),
    mkMsg('magik_man', 'real MVP. whats your ratio at now'),
    mkMsg('da_vinci_virus', 'like 1:47. i have too much time on my hands'),
    mkMsg('dooMbr1ng3r', 'i gotta bounce. parents are waking up. dont rat me out'),
    { timestamp: '', nick: 'dooMbr1ng3r', nickColor: '#ff4444', text: 'has quit IRC (Quit: sleep is for the weak)', type: 'part' },
    mkMsg('magik_man', 'night dooM. dont let the feds bite'),
  ];

  if (channel === '#elite') return [
    { timestamp: '[01:59]', nick: '', nickColor: '#888', text: `*** Now talking in #elite`, type: 'notice' },
    { timestamp: '[01:59]', nick: '', nickColor: '#888', text: `*** Topic: 'Invite only. If you can read this, you either earned it or you're about to get kicked.'`, type: 'topic' },
    { timestamp: '[01:59]', nick: '', nickColor: '#888', text: `*** Channel mode is +i (invite only)`, type: 'mode' },
    mkMsg('plague', 'the Gibson was just phase one. the real target is much bigger'),
    mkMsg('crash_override', 'what are we talking here. government? financial?'),
    mkMsg('plague', 'i cant say yet. but it involves a supercomputer. and a lot of money.'),
    mkMsg('acid_burn', 'Plague you always say that. remember the "Air Force One" thing'),
    mkMsg('plague', 'that was a joke. this is serious.'),
    mkMsg('crash_override', 'do we need zero_cool for this'),
    mkMsg('plague', 'he is essential. his social engineering skills are unmatched.'),
    mkMsg('acid_burn', 'unmatched? i literally got into the FBI database last month'),
    mkMsg('plague', 'the FBI database is a honeypot Acid. you know that right'),
    mkMsg('acid_burn', '...what'),
    mkMsg('crash_override', 'LMAO. told you.'),
    mkMsg('plague', 'anyway. the target has an air-gapped network. we need physical access.'),
    mkMsg('crash_override', 'physical access? thats risky. like, real world risky.'),
    mkMsg('plague', 'i have someone on the inside. a janitor at the facility.'),
    mkMsg('acid_burn', 'a janitor. you\'re telling me our big plan involves a janitor?'),
    mkMsg('plague', 'physical security is always the weakest link. always has been.'),
    mkMsg('plague', 'zero_cool will handle the social engineering. i need you two on the network side.'),
    mkMsg('crash_override', 'im in. when do we start'),
    mkMsg('plague', 'soon. ill share the details in a private message. this channel is secure but nothing is perfect.'),
    mkMsg('acid_burn', 'what about the janitor'),
    mkMsg('plague', 'he goes by The Cleaner. youll meet him when the time comes.'),
    mkMsg('crash_override', 'The Cleaner. very ominous. i like it.'),
    mkMsg('plague', 'get some rest. we move at dawn. or, you know, whenever zero_cool wakes up.'),
    { timestamp: '', nick: 'plague', nickColor: '#ffffff', text: 'has quit IRC (Quit: the world is yours)', type: 'part' },
  ];

  return [];
}

const CHANNELS: IrcChannel[] = [
  {
    name: '#hack-the-planet',
    topic: 'Welcome to the underground. No FBI. No lamers. Hack the planet.',
    users: ['zero_cool', 'crash_override', 'acid_burn', 'phantom_phreak', 'cereal_killer', 'lord_nikon', 'magik_man', 'plague'],
    scrollback: buildScrollback('#hack-the-planet'),
  },
  {
    name: '#warez',
    topic: 'NO FEDS. NO RATS. RATIO 1:3 or get banned. Requests in #warez-req',
    users: ['zero_cool', 'dooMbr1ng3r', 'magik_man', 'da_vinci_virus'],
    scrollback: buildScrollback('#warez'),
  },
  {
    name: '#elite',
    topic: 'Invite only.',
    users: ['zero_cool', 'plague', 'crash_override', 'acid_burn'],
    scrollback: buildScrollback('#elite'),
  },
];

// ─── APP ─────────────────────────────────────────────────

export class IrcApp {
  element: HTMLElement;
  private chatArea: HTMLElement;
  private inputField: HTMLInputElement;
  private userList: HTMLElement;
  private topicBar: HTMLElement;
  private channelTabs: HTMLElement;
  private currentChannel: IrcChannel;
  private channels: IrcChannel[];

  constructor() {
    this.channels = CHANNELS;
    this.currentChannel = this.channels[0];
    this.element = document.createElement('div');
    this.element.className = 'irc-app';

    // header / channel tabs
    this.channelTabs = this.buildChannelTabs();
    this.topicBar = this.buildTopicBar();

    // main content: chat + user list
    const main = document.createElement('div');
    main.className = 'irc-main';

    this.chatArea = this.buildChatArea();
    this.userList = this.buildUserList();

    main.appendChild(this.chatArea);
    main.appendChild(this.userList);

    // input bar
    const inputBar = this.buildInputBar();

    this.element.appendChild(this.channelTabs);
    this.element.appendChild(this.topicBar);
    this.element.appendChild(main);
    this.element.appendChild(inputBar);

    this.renderScrollback();
    this.renderUserList();
  }

  // ── Channel Tabs ───────────────────────────────────

  private buildChannelTabs(): HTMLElement {
    const tabs = document.createElement('div');
    tabs.className = 'irc-tabs';
    for (const ch of this.channels) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'irc-tab';
      tab.textContent = ch.name;
      tab.addEventListener('click', () => this.selectChannel(ch.name));
      tabs.appendChild(tab);
    }
    return tabs;
  }

  private selectChannel(name: string) {
    const ch = this.channels.find((c) => c.name === name);
    if (!ch) return;
    this.currentChannel = ch;

    // highlight active tab
    const tabs = this.channelTabs.querySelectorAll('.irc-tab');
    tabs.forEach((t) => t.classList.toggle('active', t.textContent === name));

    this.renderScrollback();
    this.renderUserList();
    this.topicBar.textContent = `Topic: ${ch.topic}`;
  }

  // ── Topic Bar ──────────────────────────────────────

  private buildTopicBar(): HTMLElement {
    const bar = document.createElement('div');
    bar.className = 'irc-topic';
    bar.textContent = `Topic: ${this.currentChannel.topic}`;
    return bar;
  }

  // ── Chat Area ──────────────────────────────────────

  private buildChatArea(): HTMLElement {
    const area = document.createElement('div');
    area.className = 'irc-chat';
    return area;
  }

  private renderScrollback() {
    this.chatArea.innerHTML = '';
    for (const msg of this.currentChannel.scrollback) {
      this.appendMessage(msg);
    }
    this.chatArea.scrollTop = this.chatArea.scrollHeight;
  }

  private appendMessage(msg: IrcMessage) {
    const line = document.createElement('div');
    line.className = 'irc-line';

    const ts = document.createElement('span');
    ts.className = 'irc-timestamp';
    ts.textContent = msg.timestamp;

    if (msg.type === 'notice' || msg.type === 'topic' || msg.type === 'mode') {
      line.className += ' irc-system';
      line.textContent = msg.text;
    } else if (msg.type === 'action') {
      line.className += ' irc-action';
      const nickSpan = document.createElement('span');
      nickSpan.className = 'irc-nick';
      nickSpan.style.color = msg.nickColor;
      nickSpan.textContent = msg.nick;
      line.appendChild(ts);
      line.appendChild(document.createTextNode(` * ${msg.nick} `));
      line.appendChild(document.createTextNode(msg.text));
    } else if (msg.type === 'join' || msg.type === 'part') {
      line.className += ' irc-joinpart';
      line.appendChild(ts);
      line.appendChild(document.createTextNode(msg.text));
    } else {
      // normal message
      const bracket = document.createElement('span');
      bracket.className = 'irc-bracket';
      bracket.textContent = '<';

      const nickSpan = document.createElement('span');
      nickSpan.className = 'irc-nick';
      nickSpan.style.color = msg.nickColor;
      nickSpan.textContent = msg.nick;

      const closeBracket = document.createElement('span');
      closeBracket.className = 'irc-bracket';
      closeBracket.textContent = '>';

      line.appendChild(ts);
      line.appendChild(bracket);
      line.appendChild(nickSpan);
      line.appendChild(closeBracket);
      line.appendChild(document.createTextNode(` ${msg.text}`));
    }

    this.chatArea.appendChild(line);
  }

  // ── User List ──────────────────────────────────────

  private buildUserList(): HTMLElement {
    const list = document.createElement('div');
    list.className = 'irc-users';
    return list;
  }

  private renderUserList() {
    this.userList.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'irc-users-header';
    header.textContent = `Users (${this.currentChannel.users.length})`;
    this.userList.appendChild(header);

    for (const user of this.currentChannel.users) {
      const entry = document.createElement('div');
      entry.className = 'irc-user';

      const indicator = document.createElement('span');
      indicator.className = 'irc-user-indicator';
      if (user === 'plague') indicator.textContent = '@';
      else if (['crash_override', 'acid_burn'].includes(user)) indicator.textContent = '%';
      else indicator.textContent = '';

      const name = document.createElement('span');
      name.style.color = NICK_COLORS[user] ?? '#aaa';
      name.textContent = user;

      entry.appendChild(indicator);
      entry.appendChild(name);
      this.userList.appendChild(entry);
    }
  }

  // ── Input Bar ──────────────────────────────────────

  private buildInputBar(): HTMLElement {
    const bar = document.createElement('div');
    bar.className = 'irc-input-bar';

    const nickLabel = document.createElement('span');
    nickLabel.className = 'irc-input-nick';
    nickLabel.textContent = 'zero_cool';

    this.inputField = document.createElement('input');
    this.inputField.className = 'irc-input';
    this.inputField.type = 'text';
    this.inputField.spellcheck = false;
    this.inputField.placeholder = 'Type a message...';

    this.inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = this.inputField.value.trim();
        if (!text) return;

        // check for /me
        let msg: IrcMessage;
        if (text.startsWith('/me ')) {
          msg = {
            timestamp: '',
            nick: 'zero_cool',
            nickColor: NICK_COLORS['zero_cool'],
            text: text.slice(4),
            type: 'action',
          };
        } else {
          msg = mkMsg('zero_cool', text);
          msg.timestamp = ''; // no timestamp on self-messages
        }

        this.currentChannel.scrollback.push(msg);
        this.appendMessage(msg);
        this.chatArea.scrollTop = this.chatArea.scrollHeight;
        this.inputField.value = '';
      }
    });

    bar.appendChild(nickLabel);
    bar.appendChild(this.inputField);
    return bar;
  }

  // ── Public ──────────────────────────────────────────

  getChannelCount(): number {
    return this.channels.length;
  }

  getCurrentChannel(): string {
    return this.currentChannel.name;
  }
}

export function createIrcApp(): IrcApp {
  return new IrcApp();
}
