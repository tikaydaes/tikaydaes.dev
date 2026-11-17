#!/usr/bin/env node
// Builds the site into dist/. No dependencies.
//   node build.mjs           build once
//   node build.mjs --serve   build, then serve dist/ on http://localhost:4173
//                            (rebuilds on every page load)

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { churrPage } from "./churr.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const dist = join(root, "dist");

const SITE = "https://tikaydaes.dev";
const GITHUB = "https://github.com/tikaydaes";
const SPONSOR = "https://github.com/sponsors/tikaydaes";
const CHAT = "https://chat.tikaydaes.dev/";
const ISSUE = "01";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// A jagged price-sticker outline, as SVG polygon points.
function burst(spikes, outer, inner) {
  const pts = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI * i) / spikes;
    pts.push(`${(50 + r * Math.sin(a)).toFixed(1)},${(50 - r * Math.cos(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

const price = `<div class="price" aria-label="Price: zero dollars"><span aria-hidden="true"><sup>$</sup>0<sup>.00</sup></span><small aria-hidden="true">ea.</small></div>`;

function item(p) {
  return `
      <article class="item" id="${esc(p.sku.toLowerCase())}">
        <header>
          <span class="sku">${esc(p.sku)}</span>
          <span class="kind">${esc(p.kind)}</span>
        </header>
        <div class="shot"><img src="img/${esc(p.art.src)}.webp" alt="${esc(p.art.alt)}" loading="lazy"></div>
        <h3>${esc(p.name)}</h3>
        <p class="pitch">${esc(p.pitch)}</p>
        <p>${esc(p.body)}</p>
        <dl>
          ${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n          ")}
        </dl>
        <p class="catch"><strong>The catch</strong> ${esc(p.catch)}</p>
        <footer>
          ${price}
          <div class="go">
            <a class="btn" href="${esc(p.get.href)}">${esc(p.get.label)} <span aria-hidden="true">→</span></a>
            ${p.source ? `<a href="${esc(p.source)}">Read the source</a>` : ""}${p.more ? `<a href="${esc(p.more.href)}">${esc(p.more.label)}</a>` : ""}
          </div>
        </footer>
      </article>`;
}

function page(products, month) {
  const ticker = ["Free", "Open source", "Host it yourself", "No tiers", "No trial clock", "No sales team", "No catch we haven't printed"]
    .map((t) => `<span>${t}</span>`)
    .join("");
  const description =
    "Small, finished, open-source tools you can run yourself. Every one costs $0.00. Sponsor us if you like what we're doing.";

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tikaydaes: software, priced correctly</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="Tikaydaes: software, priced correctly">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/">
<link rel="canonical" href="${SITE}/">
<meta property="og:image" content="${SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d1026">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="preload" href="fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="spark" viewBox="0 0 100 100"><path d="M50 0C55 35 65 45 100 50 65 55 55 65 50 100 45 65 35 55 0 50 35 45 45 35 50 0Z"/></symbol>
  <symbol id="moon" viewBox="0 0 100 100"><path d="M68 6A46 46 0 1 0 94 68 37 37 0 1 1 68 6Z"/></symbol>
</svg>

<div class="ticker" aria-hidden="true"><div>${ticker}${ticker}</div></div>

<header class="mast">
  <p><img src="favicon.png" width="34" height="34" alt=""><b>~ $</b> catalogue № ${ISSUE} <span>/</span> ${esc(month)} <span>/</span> prices valid forever</p>
  <nav aria-label="Sections">
    <a href="#stock">Stock</a>
    <a href="#why">Why it's $0</a>
    <a href="#tin">Honesty box</a>
    <a href="${CHAT}">Dev chat</a>
    <a href="${GITHUB}">GitHub</a>
  </nav>
</header>

<main>
  <section class="hero">
    <svg class="doodle d1" aria-hidden="true"><use href="#spark"/></svg>
    <svg class="doodle d2" aria-hidden="true"><use href="#moon"/></svg>
    <svg class="doodle d3" aria-hidden="true"><use href="#spark"/></svg>
    <p class="wordmark"><span data-t="tikaydaes">tikaydaes</span></p>
    <div class="hero-grid">
      <div>
        <h1>Software, priced <em>correctly.</em></h1>
        <p class="lede">Small, finished tools for problems people actually have. Every one is free, open source, and built so you can run it yourself. We broke the pricing page on purpose.</p>
        <ul class="dead" aria-label="Things we don't have">
          <li><s>Starter</s></li><li><s>Pro</s></li><li><s>Enterprise</s></li><li><s>Per seat</s></li><li><s>14-day trial</s></li><li><s>Contact sales</s></li>
        </ul>
      </div>
      <div class="stickers">
        <img class="mascot" src="img/hero.webp" width="720" height="851" alt="The Tikaydaes mascot, a winking girl with lavender hair, headphones and a circuit-pattern hoodie, cutting a $0 price tag in half with scissors.">
        <a class="burst" href="#stock" aria-label="Every item costs zero dollars. See the stock.">
          <svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="${burst(20, 47, 40)}"/></svg>
          <span aria-hidden="true"><small>every item</small><b>$0</b><small>no, really</small></span>
        </a>
      </div>
    </div>
  </section>

  <section id="stock" class="stock">
    <div class="bar">
      <h2><i>$</i> ls stock/</h2>
      <p>${products.length} items <span>/</span> all $0.00 <span>/</span> no limit per customer</p>
    </div>
    <div class="shelf">${products.map(item).join("")}
    </div>
  </section>

  <section id="why" class="why">
    <div class="bar">
      <h2><i>$</i> cat why-its-free.txt</h2>
      <p>the fine print, in normal-sized type</p>
    </div>
    <div class="cols">
      <div>
        <b>1</b>
        <h3>Software got cheap to make. The price tags didn't notice.</h3>
        <p>We build with AI agents. A person picks the problem, makes the design calls and tests the result. The agents write the code. Work that used to need a team and a funding round now needs one stubborn person, so we pass the saving on. All of it.</p>
      </div>
      <div>
        <b>2</b>
        <h3>You host it, so nobody can take it away.</h3>
        <p>Most of what we make is a single binary or a browser extension. Run it on your own machine and it keeps working whether we do or not. Where we run a public server for convenience, the listing says what you'd be trusting us with.</p>
      </div>
      <div>
        <b>3</b>
        <h3>Every item prints its catch.</h3>
        <p>Free software that hides its limits still costs you an afternoon. Each listing says what the thing won't do, in the same size type as what it will. If the catch is a dealbreaker, you found out here and not after the install.</p>
      </div>
    </div>
  </section>

  <section id="tin" class="tin">
    <div class="tin-grid">
      <div>
        <h2>The honesty box</h2>
        <p>It works like a roadside stall. Take what you need.</p>
        <p>If something here saved you time or a subscription, and you want more of it to exist, put a few dollars in the tin. It pays for the servers and the hours.</p>
        <p>If you can't, or would rather not, the price is still $0.00 and nobody will email you about it.</p>
        <a class="btn big" href="${SPONSOR}">Sponsor on GitHub <span aria-hidden="true">→</span></a>
      </div>
      <div class="till">
      <img class="tin-can" src="img/tin.webp" width="556" height="870" alt="A dented tin with a coin slot, covered in star and moon stickers." loading="lazy">
      <div class="receipt" aria-hidden="true">
        <p class="r-head">TIKAYDAES<br><span>tax invoice, sort of</span></p>
        <ul>
          ${products.map((p) => `<li><span>${esc(p.name)}</span><span>0.00</span></li>`).join("\n          ")}
          <li><span>Hosting it yourself</span><span>0.00</span></li>
          <li><span>Account manager</span><span>n/a</span></li>
        </ul>
        <p class="r-total"><span>TOTAL</span><span>$0.00</span></p>
        <p class="r-tip"><span>Tip</span><span>up to you</span></p>
        <p class="r-foot">thank you, come again<br>* * *</p>
      </div>
      </div>
    </div>
  </section>
</main>

<footer class="fine">
  <p>While stocks last. Stocks are infinite. No rainchecks needed. Not available in stores.</p>
  <p>This site sets no cookies, runs no analytics, ships no JavaScript and loads nothing from anybody else's servers.</p>
  <p><a href="${GITHUB}">github.com/tikaydaes</a> <span>/</span> <a href="${SPONSOR}">Sponsor</a> <span>/</span> <a href="${CHAT}">Dev chat</a> (where people talk about these tools; runs on Churr, open to anyone) <span>/</span> Type: Archivo and Martian Mono, SIL Open Font Licence</p>
</footer>

</body>
</html>
`;
}

async function build() {
  // Re-import so --serve picks up edits to the product list.
  const { products } = await import(`./products.mjs?t=${Date.now()}`);
  const month = new Date().toLocaleDateString("en-AU", { month: "long", year: "numeric" });

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, "src"), dist, { recursive: true });
  await writeFile(join(dist, "index.html"), page(products, month));
  // Product pages. src/churr/ (styles and pictures) was copied above.
  await writeFile(join(dist, "churr", "index.html"), churrPage());
  return products.length;
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

if (process.argv.includes("--serve")) {
  const port = 4173;
  createServer(async (req, res) => {
    try {
      let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (path.endsWith("/")) {
        await build();
        path += "index.html";
      }
      const file = join(dist, normalize(path));
      if (!file.startsWith(dist)) throw new Error("outside dist");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not found");
    }
  }).listen(port, "127.0.0.1", () => console.log(`http://localhost:${port}`));
} else {
  const n = await build();
  console.log(`Built dist/ with ${n} products.`);
}
