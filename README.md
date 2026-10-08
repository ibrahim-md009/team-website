# DARCX website — static, no build step

Open `index.html` through any static host (or `python3 -m http.server`) — it works as-is.
Upload the whole folder to Netlify / Vercel / GitHub Pages / any static hosting.

## Brand assets
- `assets/js/logo.js` — the DARCX monogram geometry (single source of truth, used by the site).
- `assets/logo/` — generated SVGs: `darcx-mark-{light,dark}.svg` (icon only), `darcx-logo-{light,dark}.svg`
  (full lockup with DARCX / DIGITAL SOLUTIONS), `darcx-app-icon-{light,dark}.svg`.
  "light" = for light backgrounds, "dark" = for dark backgrounds.
- `assets/favicon.svg`, `assets/apple-touch-icon.png` — favicon / touch icon.
- To change the logo: edit `assets/js/logo.js`, then run `python3 tools/make_logos.py` to regenerate the SVG files.
- Brand colours and fonts: top of `assets/css/styles.css` (Plus Jakarta Sans + IBM Plex Sans Arabic).

## Where to edit content
- `assets/js/data.js` — contact channels, projects, services, process steps, technologies and all AR/EN text.
- `assets/js/app.js` — page rendering, language/theme/menu logic.
- If you add a project in `data.js`, run `python3 build.py` to generate its page.

## Before launch
1. Set `contact` in `data.js` (empty channels are hidden; the form uses WhatsApp, else email, else copies the message).
2. Review the project texts in `data.js` and add screenshots (`shots: [...]`) and technologies (`tech: [...]`).
`vercel.json` enables clean URLs (`/projects/elbalad-water`).
