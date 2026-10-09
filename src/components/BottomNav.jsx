import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";

/* Edit this list to add / remove items in the bottom bar */
export const NAV = [
  { id: "home", to: "/", icon: <path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10" /> },
  { id: "projects", to: "/projects", icon: <><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></> },
  { id: "services", to: "/services", icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /> },
  { id: "about", to: "/about", icon: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20c.8-4 3.7-6 7.5-6s6.7 2 7.5 6" /></> },
  { id: "contact", to: "/contact", icon: <path d="M4 5h16v11H9l-5 4z" /> }
];

export default function BottomNav() {
  const { t } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const drag = useRef({ id: null, sx: 0, on: false, last: -1, skip: false });

  const current = pathname.startsWith("/projects") ? "projects" : (NAV.find(n => n.to === pathname)?.id ?? null);
  const idx = NAV.findIndex(n => n.id === current);

  const items = () => [...trackRef.current.querySelectorAll("a")];
  const frac = x => {
    const tr = trackRef.current, r = tr.getBoundingClientRect(), w = r.width / NAV.length;
    const rtl = document.documentElement.dir === "rtl";
    return (rtl ? r.right - x : x - r.left) / w - 0.5;
  };

  const down = e => {
    if (e.pointerType === "mouse" && e.button) return;
    Object.assign(drag.current, { sx: e.clientX, id: e.pointerId, on: false });
  };
  const move = e => {
    const d = drag.current, tr = trackRef.current;
    if (d.id !== e.pointerId) return;
    if (!d.on) {
      if (Math.abs(e.clientX - d.sx) < 10) return;
      d.on = true; tr.classList.add("drag");
      try { tr.setPointerCapture(d.id); } catch (_) {}
    }
    const f = Math.min(NAV.length - 1, Math.max(0, frac(e.clientX)));
    tr.style.setProperty("--idx", f);
    const k = Math.round(f);
    if (k !== d.last) {
      d.last = k;
      items().forEach((x, i) => x.classList.toggle("hot", i === k));
      if (navigator.vibrate) navigator.vibrate(6);
    }
  };
  const up = e => {
    const d = drag.current, tr = trackRef.current;
    if (d.id !== e.pointerId) return;
    d.id = null;
    if (!d.on) return;
    d.on = false;
    const k = Math.max(0, Math.min(NAV.length - 1, Math.round(parseFloat(tr.style.getPropertyValue("--idx")) || 0)));
    tr.classList.remove("drag");
    items().forEach(x => x.classList.remove("hot"));
    d.last = -1;
    d.skip = true; setTimeout(() => { d.skip = false; }, 350);
    tr.style.setProperty("--idx", k);
    if (NAV[k].id !== current) navigate(NAV[k].to);
  };
  const swallowClick = e => { if (drag.current.skip) { e.preventDefault(); e.stopPropagation(); } };

  return (
    <nav className="bnav" id="bnav" aria-label="Main">
      <div className="wrap bnav-in">
        <div
          className="bnav-track" ref={trackRef}
          style={{ "--n": NAV.length, "--idx": idx < 0 ? 0 : idx }}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
          onClickCapture={swallowClick}
        >
          <i className="bnav-ind" aria-hidden="true" style={idx < 0 ? { opacity: 0 } : undefined} />
          {NAV.map(n => (
            <Link
              key={n.id} to={n.to} draggable="false"
              aria-current={n.id === current ? "page" : undefined}
              onClick={() => { if (n.id === current && pathname === n.to) scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">{n.icon}</svg>
              <span>{t("nav_" + n.id)}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
