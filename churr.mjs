// The Churr product page, built to dist/churr/index.html.
//
// It follows Churr's own style guide (churr/docs/STYLE.md), not the
// catalogue's: no terminal props, one cut corner, fills instead of frames.
// The screenshots in src/churr/ are of the real web chat with a made-up team.
//
// Churr has no release yet; its source is public. Everything under STATUS is dated; update STATUS_DATE
// and the lists together, from churr/README.md "What exists today".

const SITE = "https://tikaydaes.dev";
const GITHUB = "https://github.com/tikaydaes";
const SPONSOR = "https://github.com/sponsors/tikaydaes";
const CHURR = "https://churr.chat";
const SOURCE = "https://github.com/tikaydaes/churr";
const CHAT = "https://chat.tikaydaes.dev/";
const STATUS_DATE = "17 November 2026";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// built: in the server today, with tests. soon: being built now.
const features = [
  ["built", "Channels and threads", "Public and private channels, sub-channels and sections. A thread that grows up can be moved out into a channel of its own."],
  ["built", "Messages that can't bite", "A small, safe Markdown. Nothing in a message can run a script or load a picture from somebody else's server."],
  ["built", "Search", "Across everything you can read, and nothing you can't."],
  ["built", "Polls, checklists, reminders", "Plus forms, scheduled messages and saved replies. Built in, not bolted on."],
  ["built", "Bots and webhooks", "A bot is an ordinary account with a token. Webhooks take Churr's own payloads, and Slack's, Discord's and GitHub's."],
  ["built", "No passwords, no email", "Passkeys, with recovery codes. Company sign-in over OIDC or SAML if you need it."],
  ["built", "A way in, and a way out", "An importer for Slack exports, and an export of everything the server holds, for the owner."],
  ["built", "Retention that deletes", "Set a period and messages older than it are removed, not hidden."],
  ["built", "Sealed chats", "End-to-end encrypted, between exactly two people. The server stores what it cannot read. Not yet reviewed by anyone outside the project."],
  ["built", "Calls", "Voice, video and screen sharing, carried by your own server."],
  ["built", "Apps", "One codebase, with builds for Android, macOS and the iPhone simulator. It has not run on a real phone yet."],
  ["built", "Shared channels", "A channel shared between Churr servers, linked directly or through a hub. Tested with a load tool, not yet with people."],
];

const sees = [
  ["Your Churr server", "All messages and files. Who talks to whom, and when.", "What is inside a sealed chat."],
  ["A server you share a channel with", "That channel, and chats between its members and yours.", "Anything else on your server."],
  ["A hub", "Which servers exchange how much, and when.", "Any content. Servers encrypt to each other before the hub sees it."],
  ["The push relay", "A phone's push address, which server woke it, and when.", "Any content, any name, any channel, or whether it was a call."],
];

const outside = [
  ["Certificate renewal", "When the server runs without a reverse proxy", "on"],
  ["Push relay", "A member with a phone app is mentioned or messaged while away", "on"],
  ["UnifiedPush", "An Android phone without Google services asked to be woken", "off"],
  ["Link previews", "A member posts a link", "off"],
  ["Object storage", "You chose S3-compatible storage for uploads", "off"],
  ["Identity provider", "Company sign-in is set up", "off"],
  ["Linked servers and hubs", "An admin linked a server or joined a hub", "off"],
];

const status = {
  built: [
    "The server, on SQLite and PostgreSQL, with bots, webhooks, the Slack importer and the export",
    "The web chat and the app, including calls and sealed chats",
    "Links between servers, the hub and the push relay",
    "The sealed-chat encryption, in two languages, passing the same test vectors",
  ],
  proven: [
    "Single servers of up to 50,000 members, with a load tool as the members",
    "A call with 25 on audio and 8 on video",
    "Three servers sharing a channel through a hub",
    "A real certificate from Let's Encrypt",
    "One real community: the Tikaydaes dev chat",
  ],
  never: [
    "The app on a real phone, and Windows and Linux builds",
    "The web chat in Firefox or Safari",
    "Real Apple and Google push",
    "The container image and the reverse-proxy examples",
    "A real Slack export, only small hand-made ones",
    "An outside review of the sealed-chat encryption",
  ],
};

const tag = (kind) =>
  kind === "built" ? `<span class="tag c">built</span>` : `<span class="tag p">being built</span>`;

export function churrPage() {
  const title = "Churr: team chat your group runs for itself";
  const description =
    "Self-hosted team chat in one program: channels, threads, search, bots and passkeys. Free and open source. No release yet; this page says what works today.";
  const strip = ["Self-hosted team chat", "One program", "No passwords", "No email", "$0.00", "AGPL-3.0", "Not finished"]
    .map((t) => `<span>${t}</span>`)
    .join("");

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/churr/">
<meta property="og:image" content="${SITE}/churr/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${SITE}/churr/">
<meta name="theme-color" content="#0d1026">
<link rel="icon" href="icon.png" type="image/png">
<link rel="preload" href="../fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="churr.css">
</head>
<body>

<div class="strip" aria-hidden="true">${strip}${strip}</div>

<header class="top">
  <a class="back" href="../">← Tikaydaes catalogue</a>
  <p><span class="tag">TD-005</span> <span class="meta">self-hosted server + apps</span></p>
</header>

<main>
  <section class="hero">
    <div class="hero-text">
      <h1 class="word" aria-label="Churr">churr</h1>
      <p class="lede">Team chat your group <em>runs for itself.</em> Channels, threads, search, bots and calls, from one program on a machine you control.</p>
      <p class="sub">No passwords, no email addresses, no per-seat price. Whoever installs it owns it.</p>
      <div class="row">
        <a class="btn" href="${CHURR}">Visit churr.chat</a>
        <a class="ghost" href="#status">See what works today</a>
      </div>
    </div>
    <div class="hero-art">
      <img class="sticker" src="sticker.webp" width="720" height="755" alt="The Churr mascot: a purple nightjar wearing headphones, sitting on a small server with chat bubbles beside it.">
      <span class="stamp">not finished</span>
      <span class="price" aria-label="Price: zero dollars">$0<small>.00</small></span>
    </div>
  </section>

  <figure class="shot">
    <picture>
      <source media="(max-width: 640px)" srcset="chat-phone.webp" width="780" height="1600">
      <img src="chat-thread.webp" width="2000" height="1250" alt="The Churr web chat. A channel called Moving day holds a checklist with two of three items ticked, a poll on whether to switch tonight or in the morning, and a thread of three replies open on the right.">
    </picture>
    <figcaption>The web chat, running on a laptop. The screenshot is real. The team is made up.</figcaption>
  </figure>

  <section class="catch" id="catch">
    <div class="bar"><h2>The catch</h2><p>read this before anything else</p></div>
    <p class="big">Whoever runs a Churr server can read everything on it, private channels included.</p>
    <p>The one exception is a sealed chat, which is always between exactly two people. That is why Churr is built for a group to run for itself: the person who can read your chat should be someone you can name.</p>
    <div class="sees" role="table" aria-label="What each operator can and cannot read">
      <div class="sees-head" role="row"><span role="columnheader">Whoever runs</span><span role="columnheader">Can read</span><span role="columnheader">Cannot read</span></div>
      ${sees
        .map(
          ([who, can, cannot]) =>
            `<div role="row"><b role="cell">${esc(who)}</b><span role="cell" data-l="Can read">${esc(can)}</span><span role="cell" data-l="Cannot read">${esc(cannot)}</span></div>`,
        )
        .join("\n      ")}
    </div>
    <p class="note">The sealed-chat encryption has not been reviewed by anyone outside the project. Do not rely on it until it has.</p>
    <p class="note">Nothing on disk is encrypted except sealed chats and the server's own secrets. Use disk encryption, and treat a backup as you treat the server.</p>
  </section>

  <section id="does">
    <div class="bar"><h2>What it does</h2><p>all of it built, none of it finished</p></div>
    <div class="feats">
      ${features
        .map(
          ([kind, name, text]) =>
            `<div class="feat ${kind}">${tag(kind)}<h3>${esc(name)}</h3><p>${esc(text)}</p></div>`,
        )
        .join("\n      ")}
    </div>
  </section>

  <section class="looks">
    <div class="bar"><h2>How it looks</h2><p>flat colour, hard edges, one corner cut</p></div>
    <div class="looks-grid">
      <figure>
        <img src="chat-light.webp" width="1600" height="1000" loading="lazy" alt="The same channel in Churr's light theme: pale lavender paper with deepened colours.">
        <figcaption>Light theme. There is also a high-distinction palette for red-green colour blindness, and every pairing of text and background is measured for contrast, not judged by eye.</figcaption>
      </figure>
      <figure class="phone">
        <img src="chat-phone.webp" width="780" height="1600" loading="lazy" alt="The same channel at phone width, in the dark theme.">
        <figcaption>The web chat at phone width.</figcaption>
      </figure>
    </div>
  </section>

  <section id="run">
    <div class="bar"><h2>Running it</h2><p>one person, one afternoon</p></div>
    <div class="two">
      <div>
        <p>Churr is one Go program with its database inside. Give it a host name and a folder:</p>
        <pre class="code"><code>churr serve -hostname chat.example.com -data /var/lib/churr</code></pre>
        <p>It listens on ports 80 and 443 and fetches and renews its own certificate. Everything a community is lives in that one folder, and one command backs it up while the server runs.</p>
        <p>SQLite is the default. PostgreSQL is there if you prefer it, with a command that moves a community between the two.</p>
      </div>
      <dl class="specs">
        <div><dt>Licence</dt><dd>AGPL-3.0</dd></div>
        <div><dt>Needs</dt><dd>A machine with a public address, a host name, and ports 80 and 443. Calls add port 24877.</dd></div>
        <div><dt>Account</dt><dd>Passkeys. No password, no email address.</dd></div>
        <div><dt>Size</dt><dd>One processor and 1 GB of memory carried up to 5,000 people online in tests on rented servers, with a load tool as the members.</dd></div>
        <div><dt>Uses AI when it runs</dt><dd>No.</dd></div>
      </dl>
    </div>
  </section>

  <section id="outside">
    <div class="bar"><h2>Outside connections</h2><p>a server makes these and no others</p></div>
    <p>Each one has a switch. Most start off.</p>
    <ul class="conns">
      ${outside
        .map(
          ([name, when, def]) =>
            `<li><b>${esc(name)}</b><span>${esc(when)}</span><i class="sw ${def}">${def === "on" ? "starts on" : "starts off"}</i></li>`,
        )
        .join("\n      ")}
    </ul>
  </section>

  <section id="status" class="status">
    <div class="bar"><h2>Where it is up to</h2><p>written ${STATUS_DATE}</p></div>
    <p class="big">Churr is built and its source is public. It is not finished, and there is no release yet.</p>
    <div class="cols">
      <div class="col built">
        <h3><span class="tag c">built</span> Passes automated tests</h3>
        <ul>${status.built.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      <div class="col soon">
        <h3><span class="tag">run for real</span> On rented servers</h3>
        <ul>${status.proven.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      <div class="col never">
        <h3><span class="tag y">untried</span> Not done yet</h3>
        <ul>${status.never.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
    </div>
    <p>Churr is being built the way everything in the catalogue is: a person sets the requirements and makes the decisions, and AI agents write the code and its tests. The source is at <a href="${SOURCE}">github.com/tikaydaes/churr</a>. The <a href="${CHAT}">Tikaydaes dev chat</a> is where people talk about Churr and the other tools, and it runs on Churr. Joining needs an invite. Churr has a site of its own, with more detail: <a href="${CHURR}">churr.chat</a>.</p>
    <div class="row">
      <a class="btn" href="${CHURR}">Visit churr.chat</a>
      <a class="ghost" href="${SOURCE}">Read the source</a>
      <a class="ghost" href="${SPONSOR}">Sponsor on GitHub</a>
      <a class="ghost" href="../">Back to the catalogue</a>
    </div>
  </section>
</main>

<footer class="foot">
  <p><b>Why "Churr"?</b> A churr is the call of a nightjar: a long, low trill you hear after dark. The bird on the sticker is one.</p>
  <p class="meta">Price $0.00, and it stays $0.00. This page sets no cookies, runs no scripts and loads nothing from anybody else's servers.</p>
</footer>

</body>
</html>
`;
}
