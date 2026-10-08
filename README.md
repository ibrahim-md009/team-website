# DARCX website — static, no build step

Open `index.html` through any static host (or `python3 -m http.server`) — it works as-is.
Upload the whole folder to Netlify / Vercel / GitHub Pages / any static hosting.

## Brand assets
- The OFFICIAL DARCX logo is used as supplied: `tools/source/darcx-logo-official.png`.
- `assets/logo/darcx-monogram.png` — the monogram on a transparent background (used in the top bar, hero and footer).
- `assets/favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — icon tiles built from the same logo.
- To replace the logo later: overwrite `tools/source/darcx-logo-official.png` and run `python3 tools/make_logo_assets.py`
  (needs `pip install pillow numpy scipy`; it only removes the flat dark background and crops).
- Brand colours and fonts: top of `assets/css/styles.css`.

## Where to edit content
- `assets/js/data.js` — contact channels, projects, services, process steps, technologies and all AR/EN text.
- `assets/js/app.js` — page rendering, language/theme/menu logic.
- If you add a project in `data.js`, run `python3 build.py` to generate its page.

## Before launch
1. Set `contact` in `data.js` (empty channels are hidden; the form uses WhatsApp, else email, else copies the message).
2. Review the project texts in `data.js` and add screenshots (`shots: [...]`) and technologies (`tech: [...]`).
`vercel.json` enables clean URLs (`/projects/elbalad-water`).
