# tikaydaes.dev

The Tikaydaes catalogue: every product we make, listed with its price ($0.00) and its catch.

One static page. No framework, no dependencies, no JavaScript on the page.

## Working on it

    node build.mjs --serve     # http://localhost:4173, rebuilds on each page load
    node build.mjs             # writes dist/

Needs Node 22 or newer.

| Path | What it is |
|---|---|
| `products.mjs` | The catalogue. Add a product here. Every product needs a `catch`. |
| `build.mjs` | Page template and build script. |
| `src/style.css` | All the styling. |
| `src/img/` | Web-sized sticker art (WebP). |
| `art/` | Full-size originals of the sticker art, plus the avatar they were styled from. |
| `src/fonts/` | Archivo and Martian Mono, self-hosted, with their licences. |

## Adding a product

1. Add an entry to `products.mjs`.
2. Put a sticker for it in `src/img/<name>.webp` (about 720px wide, transparent background) and
   point the entry's `art.src` at it.
3. Run the build.

The sticker art was generated with nano-banana, using `art/avatar.png` as the style reference
and the `-t` flag for a transparent background. The prompt shape that worked:

> An object sticker (no character): *what it shows*. Match the art style of the reference image
> exactly: cute anime-style illustration, bold dark navy outlines, flat cel shading, palette of
> neon lavender purple, cyan-teal, hot pink and warm yellow, with glowing circuit-line details and
> tiny stars and crescent moons. Draw it as a single die-cut vinyl sticker with a thick clean
> white border around the whole shape. Centered, nothing else in the frame, no drop shadow, no
> extra text.

`src/og.png` is a 1200×630 screenshot of the top of the page. Retake it if the hero changes.

## Deploying

The site runs as one small container: the Dockerfile builds the page and serves it with Caddy
on port 8080. `compose.yaml` publishes that on `127.0.0.1:8471` for the host's reverse proxy.

    git pull && docker compose up -d --build

## Style rules

- Flat colour only: navy, lavender, cyan, pink, yellow. No decorative gradients, blur or soft shadows.
- Stickers and labels sit slightly crooked. Boxes have square corners.
- Copy is plain and says what the thing does not do.
