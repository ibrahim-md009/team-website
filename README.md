# DARCX website — React + Vite

## Run
```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the build
```
Deploy to Vercel as-is (framework preset: Vite). `vercel.json` rewrites every route to `index.html`
and redirects the old `.html` URLs (`/about.html` → `/about`).

## Where to edit
| What | File |
|---|---|
| Texts (AR/EN), projects, services, contact channels, tech stack | `src/data.js` |
| Colours, fonts, spacing | top of `src/styles/styles.css` |
| Pages | `src/pages/*.jsx` |
| Bottom navigation items | `NAV` list in `src/components/BottomNav.jsx` (+ `nav_*` labels in `data.js`) |
| Header / footer / cards / project preview | `src/components/*` |

To add a project: add an object to `projects` in `src/data.js` — its page `/projects/<slug>` appears automatically (no build script needed).
Screenshots: put images in `public/assets/img/` and list them in `shots: ["assets/img/name.jpg"]`.

## Contact form (`api/contact.js`)
Unchanged Vercel serverless function. Set these in Vercel → Settings → Environment Variables, then redeploy:
- Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- WhatsApp (CallMeBot): `CALLMEBOT_APIKEY` (optional `OWNER_PHONE`)
- Email (Resend): `RESEND_API_KEY`, `CONTACT_EMAIL`

If none is set (or you run `npm run dev`, which has no functions), the form falls back to opening WhatsApp with the message ready.

## Logo
`public/assets/logo/darcx-monogram.png` is used in the header and footer. The original source logo is kept in `design/`.
