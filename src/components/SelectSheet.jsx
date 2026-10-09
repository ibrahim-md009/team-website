import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "../context.jsx";

/* Bottom-sheet picker used instead of a native <select> */
export default function SelectSheet({ label, options, value, onChange }) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const panel = useRef(null);
  const timer = useRef(null);
  const current = options.find(o => o.value === value) || options[0];

  const open = () => {
    clearTimeout(timer.current);
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };
  const close = () => {
    setShown(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMounted(false), 450);
  };

  useEffect(() => {
    if (!mounted) return;
    document.body.classList.add("lock");
    const key = e => { if (e.key === "Escape") close(); };
    addEventListener("keydown", key);
    const f = setTimeout(() => {
      const el = panel.current && (panel.current.querySelector(".opt.on") || panel.current.querySelector(".opt"));
      if (el) el.focus({ preventScroll: true });
    }, 350);
    return () => { document.body.classList.remove("lock"); removeEventListener("keydown", key); clearTimeout(f); };
  }, [mounted]);
  useEffect(() => () => clearTimeout(timer.current), []);

  /* drag the grabber down to dismiss */
  const g = useRef({ y0: null, dy: 0 });
  const gDown = e => { g.current.y0 = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); panel.current.style.transition = "none"; };
  const gMove = e => {
    if (g.current.y0 === null) return;
    g.current.dy = Math.max(0, e.clientY - g.current.y0);
    panel.current.style.transform = "translateY(" + g.current.dy + "px)";
  };
  const gEnd = () => {
    if (g.current.y0 === null) return;
    g.current.y0 = null;
    panel.current.style.transition = ""; panel.current.style.transform = "";
    if (g.current.dy > 80) close();
    g.current.dy = 0;
  };

  return (
    <div className="fld fld-s">
      <button type="button" className="sel" onClick={open} aria-haspopup="dialog" aria-expanded={mounted}>
        <span>{current.label}</span>
        <svg className="chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <label>{label}</label>
      {mounted && createPortal(
        <div className={"sheet" + (shown ? " open" : "")}>
          <div className="sheet-bg" onClick={close} />
          <div className="sheet-p" role="dialog" aria-modal="true" aria-label={label} ref={panel}>
            <div className="sheet-grab" onPointerDown={gDown} onPointerMove={gMove} onPointerUp={gEnd} onPointerCancel={gEnd}><i /></div>
            <h3>{label}</h3>
            <ul>
              {options.map((o, i) => (
                <li key={o.value} style={{ "--i": i }}>
                  <button type="button" className={"opt" + (o.value === value ? " on" : "")}
                    onClick={() => { onChange(o.value); setTimeout(close, 160); }}>
                    <span className="svc-dot" style={{ background: o.accent }} />
                    <span>{o.label}</span>
                    <i className="tick" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
