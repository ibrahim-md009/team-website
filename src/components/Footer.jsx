import { Link } from "../router.jsx";
import { useApp } from "../context.jsx";
import { Logo } from "./ui.jsx";
import { channels } from "../channels.jsx";

export default function Footer() {
  const { t, D } = useApp();
  const ch = channels(D);
  return (
    <footer className="foot">
      <div className="foot-bar" aria-hidden="true" />
      <div className="wrap foot-in">
        <Link className="logo" to="/" aria-label="DARCX"><Logo /></Link>
        <p className="foot-desc">{t("f_desc")}</p>
        {ch.length > 0 && (
          <div className="foot-soc">
            {ch.map(s => (
              <a key={s.k} className="soc" href={s.href(D.contact[s.k])} target="_blank" rel="noopener" aria-label={s.label(t)} title={s.label(t)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{s.ic}</svg>
              </a>
            ))}
          </div>
        )}
        <p className="foot-end">{t("f_rights")}</p>
      </div>
    </footer>
  );
}
