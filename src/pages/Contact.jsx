import { useEffect, useRef, useState } from "react";
import { useApp } from "../context.jsx";
import { useRouter } from "../router.jsx";
import { Arrow, PageHead } from "../components/ui.jsx";
import SelectSheet from "../components/SelectSheet.jsx";
import { channels } from "../channels.jsx";

export default function Contact() {
  const { t, L, D, lang } = useApp();
  const { loc } = useRouter();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState(D.services[0].id);
  const [note, setNote] = useState({ text: "", err: false });
  const [busy, setBusy] = useState(false);
  const honey = useRef(null);

  /* /contact?service=websites pre-selects the project type */
  useEffect(() => {
    const sv = new URLSearchParams(loc.search).get("service");
    if (sv && (sv === "other" || D.services.some(s => s.id === sv))) setService(sv);
  }, [loc.search, D]);

  const options = [
    ...D.services.map(s => ({ value: s.id, label: L(s.name), accent: s.accent })),
    { value: "other", label: t("c_other"), accent: "var(--sand)" }
  ];
  const sLabel = options.find(o => o.value === service).label;
  const methods = channels(D);

  const reset = () => { setName(""); setContact(""); setMessage(""); setService(D.services[0].id); };

  async function submit(e) {
    e.preventDefault();
    const n = name.trim(), c = contact.trim(), m = message.trim();
    if (!n || !c || !m) { setNote({ text: t("c_err"), err: true }); return; }
    const text = t("c_name") + ": " + n + "\n" + t("c_contact") + ": " + c + "\n" + t("c_service") + ": " + sLabel + "\n\n" + m;
    setNote({ text: t("c_sending"), err: false }); setBusy(true);
    let sent = false;
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, contact: c, service: sLabel, message: m, website: honey.current ? honey.current.value : "", lang })
      });
      sent = r.ok;
    } catch (_) {}
    setBusy(false);
    const ct = D.contact;
    if (sent) { setNote({ text: t("c_sent"), err: false }); reset(); return; }
    /* fallback when the server function is not set up: open WhatsApp with the message ready */
    if (ct.whatsapp) {
      window.open("https://wa.me/" + ct.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      setNote({ text: t("c_ok_wa"), err: false }); reset();
    } else if (ct.email) {
      location.href = "mailto:" + ct.email + "?subject=" + encodeURIComponent(t("brand") + " — " + sLabel) + "&body=" + encodeURIComponent(text);
      setNote({ text: t("c_ok_mail"), err: false }); reset();
    } else {
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(() => {});
      setNote({ text: t("c_ok_copy"), err: false });
    }
  }

  return (
    <>
      <PageHead title={t("c_page_t")} sub={t("c_page_p")} />
      <section className="sec">
        <div className="wrap cgrid">
          <form className="cform rv" data-busy={busy ? "" : undefined} onSubmit={submit} noValidate>
            <h2>{t("c_form_t")}</h2>
            <input className="hp" name="website" ref={honey} tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="fld">
              <input id="cn" placeholder=" " autoComplete="name" required value={name} onChange={e => setName(e.target.value)} />
              <label htmlFor="cn">{t("c_name")}</label>
            </div>
            <div className="fld">
              <input id="cc" placeholder=" " autoComplete="email" required dir="auto" value={contact} onChange={e => setContact(e.target.value)} />
              <label htmlFor="cc">{t("c_contact")}</label>
            </div>
            <SelectSheet label={t("c_service")} options={options} value={service} onChange={setService} />
            <div className="fld">
              <textarea id="cm" placeholder=" " required value={message} onChange={e => setMessage(e.target.value)} />
              <label htmlFor="cm">{t("c_msg")}</label>
            </div>
            <button className="btn btn-fill" type="submit" disabled={busy}>{t("c_send")}<Arrow /></button>
            <p className={"note" + (note.err ? " err" : "")} role="status">{note.text}</p>
          </form>

          <aside className="cside rv" style={{ "--d": ".1s" }}>
            <h2>{t("c_methods")}</h2>
            {methods.length ? methods.map(s => (
              <a key={s.k} className="cm" href={s.href(D.contact[s.k])} target="_blank" rel="noopener">
                <span className="dot" style={{ background: s.dot }} />
                <span><b>{s.label(t)}</b><small dir="ltr">{s.show(D.contact[s.k])}</small></span>
                <Arrow />
              </a>
            )) : <p className="mut">{t("c_none")}</p>}
          </aside>
        </div>
      </section>
    </>
  );
}
