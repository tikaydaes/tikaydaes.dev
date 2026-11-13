// The catalogue. Add a product by adding an object here, then run `node build.mjs`.
//
// Every product needs a `catch`: the honest limit someone should know before
// they install it. No catch, no listing.

const gh = (repo) => `https://github.com/tikaydaes/${repo}`;

export const products = [
  {
    sku: "TD-001",
    name: "InvidioSlop",
    kind: "Firefox extension",
    pitch: "Takes the AI slop out of your YouTube feed.",
    body: "Hides or marks mass-produced AI video on YouTube and any Invidious instance. It works from a public blocklist, community reports and YouTube's own “altered content” label, and you decide which of those hide a video and which only mark it.",
    specs: [
      ["Licence", "GPL-3.0"],
      ["Needs", "Firefox"],
      ["Account", "None, unless you want to file reports"],
    ],
    catch: "Firefox only. A flagged video gets a banner on its watch page, but nothing stops it playing.",
    get: { label: "Add to Firefox", href: "https://addons.mozilla.org/firefox/addon/invidioslop/" },
    source: gh("invidioslop"),
    art: { src: "p-invidioslop", alt: "A video player being squeegeed clean of pink slime." },
  },
  {
    sku: "TD-002",
    name: "Codemail",
    kind: "Self-hosted server + apps",
    pitch: "Sign-in codes, without the inbox.",
    body: "A server that receives email for your domains, pulls out the sign-in code or confirmation link, and shows it to you the moment it lands. One Go binary with its database inside. No mail server, no push service and no AI model to rent.",
    specs: [
      ["Licence", "AGPL-3.0"],
      ["Needs", "A machine with ports 25, 80 and 443 open"],
      ["Account", "Passkeys only"],
    ],
    catch: "Whoever runs the server can read every code it receives. That is why it is built for you to run. There is a public server at codegrab.me, and using it means trusting us.",
    get: { label: "Try codegrab.me", href: "https://codegrab.me" },
    source: gh("codemail"),
    art: { src: "p-codemail", alt: "An envelope with a ticket reading 481 920 popping out, and a key." },
  },
  {
    sku: "TD-003",
    name: "aislop-server",
    kind: "Community service",
    pitch: "A slop list nobody can buy their way onto, or off.",
    body: "The shared database behind InvidioSlop. People report videos, others confirm or contest, and votes are weighted by a reputation you can only earn by agreeing with lots of different established people. Anyone can download the whole list without an account.",
    specs: [
      ["Licence", "AGPL-3.0"],
      ["Needs", "Docker and Postgres"],
      ["Account", "A passkey and a nickname. No email"],
    ],
    catch: "No account recovery, at all. Lose your passkeys and the account is gone, so add a second one.",
    get: { label: "See it running", href: "https://aislop.tikaydaes.dev" },
    source: gh("aislop-server"),
    art: { src: "p-aislop", alt: "A balance scale: a pink slime blob outweighs a bowl of stars." },
  },
  {
    sku: "TD-004",
    name: "in↔out",
    kind: "Chrome extension",
    pitch: "Your LinkedIn contacts, in a file you own.",
    body: "Exports your connections, your followers and your company page's followers to JSONL. It runs in your own browser with your own login, and the data goes to your downloads folder and nowhere else.",
    specs: [
      ["Licence", "Not chosen yet"],
      ["Needs", "Chrome and a LinkedIn login"],
      ["Output", "JSONL"],
    ],
    catch: "This very likely breaks LinkedIn's user agreement, and they can restrict your account for it. You also become responsible for other people's personal data once you export it.",
    get: { label: "Download the zip", href: gh("in-out") + "/releases/latest" },
    source: gh("in-out"),
    art: { src: "p-inout", alt: "Contact cards flying from a box into a folder." },
  },
];
