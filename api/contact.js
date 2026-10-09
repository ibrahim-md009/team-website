/* DARCX contact form → delivers every inquiry to the owner.
   Vercel serverless function (Node). Configure ONE OR MORE channels with environment variables
   (Vercel → Project → Settings → Environment Variables), then redeploy:

   Telegram (recommended, instant, free):  TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
   WhatsApp (CallMeBot, free):             CALLMEBOT_APIKEY   (phone defaults to 972567574848, or set OWNER_PHONE)
   Email (Resend):                         RESEND_API_KEY, CONTACT_EMAIL
*/
const clip = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n);

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method" });
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (_) { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true });              // honeypot: bots fill this hidden field
  const name = clip(b.name, 100), contact = clip(b.contact, 160), service = clip(b.service, 80), message = clip(b.message, 3000);
  if (!name || !contact || !message) return res.status(400).json({ ok: false, error: "invalid" });

  const text = "📩 DARCX — طلب مشروع جديد\n👤 " + name + "\n📞 " + contact + "\n🧩 " + service + "\n\n" + message;
  const env = process.env, jobs = [];
  const post = (u, body, headers) => fetch(u, { method: "POST", headers: { "Content-Type": "application/json", ...(headers || {}) }, body: JSON.stringify(body) });

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID)
    jobs.push(post("https://api.telegram.org/bot" + env.TELEGRAM_BOT_TOKEN + "/sendMessage", { chat_id: env.TELEGRAM_CHAT_ID, text }));
  if (env.CALLMEBOT_APIKEY)
    jobs.push(fetch("https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(env.OWNER_PHONE || "972567574848") + "&text=" + encodeURIComponent(text) + "&apikey=" + encodeURIComponent(env.CALLMEBOT_APIKEY)));
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL)
    jobs.push(post("https://api.resend.com/emails", { from: "DARCX <onboarding@resend.dev>", to: [env.CONTACT_EMAIL], subject: "DARCX — " + service + " — " + name, text }, { Authorization: "Bearer " + env.RESEND_API_KEY }));

  if (!jobs.length) return res.status(503).json({ ok: false, error: "not_configured" });
  const results = await Promise.allSettled(jobs);
  const ok = results.some(r => r.status === "fulfilled" && r.value && r.value.ok);
  return res.status(ok ? 200 : 502).json({ ok });
};
