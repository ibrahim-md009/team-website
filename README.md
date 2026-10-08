# Nexora website — static, no build step

Open `index.html` through any static host (or `python3 -m http.server`) — it works as-is.
Upload the whole folder to Netlify / Vercel / GitHub Pages / any static hosting.

## Where to edit
- `assets/js/data.js` — **everything editable**: contact channels (WhatsApp / Instagram / email),
  projects (text, features, technologies, screenshots), services, process steps, technologies, and all AR/EN interface text.
- `assets/css/styles.css` — design tokens (brand colours) are at the top of the file.
- `assets/js/app.js` — page rendering, language/theme/menu logic.

## Before launch
1. Set `contact` in `data.js` (empty channels are hidden; the form uses WhatsApp, else email, else copies the message).
2. Review the project texts in `data.js` — they only describe each project in general terms; replace with your real details.
3. Add real screenshots: put images in `assets/img/` and list them in a project's `shots: [...]`.
   The first image replaces the generated preview; with 2+ images the gallery section appears.
4. Add the technologies used per project in `tech: [...]` (the section is hidden while empty).
5. Replace the logo mark (in `app.js` → `logoMark`, and `assets/favicon.svg`) with your final Nexora logo.

## Pages
index, services, projects, about, process, contact + `projects/{elbalad-water,keo-studio,pos-system,studio-management}.html`.
`vercel.json` enables clean URLs (`/projects/elbalad-water`). Netlify does this by default.
If you add a project in `data.js`, run `python3 build.py` to generate its page.
