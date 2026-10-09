import { useEffect, useRef, useState } from "react";
import { useApp } from "../context.jsx";

const Chevron = ({ left }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d={left ? "M12.5 4l-6 6 6 6" : "M7.5 4l6 6-6 6"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Image slider: swipe / arrows / dots. `images` = list of paths relative to public/, e.g. "assets/img/a.jpg" */
export default function Carousel({ images, alt }) {
  const { t } = useApp();
  const track = useRef(null);
  const [i, setI] = useState(0);
  const many = images.length > 1;

  const rtl = () => document.documentElement.dir === "rtl";
  const goTo = n => {
    const el = track.current; if (!el) return;
    const k = Math.max(0, Math.min(images.length - 1, n));
    el.scrollTo({ left: (rtl() ? -1 : 1) * k * el.clientWidth, behavior: "smooth" });
  };
  /* arrows are physical: the right arrow moves right on screen in both languages */
  const step = physicalRight => goTo(i + (physicalRight ? (rtl() ? -1 : 1) : (rtl() ? 1 : -1)));

  useEffect(() => {
    const el = track.current; if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setI(Math.round(Math.abs(el.scrollLeft) / el.clientWidth)));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => { el.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [images.length]);

  return (
    <div className="car">
      <div className="car-view">
        <div className="car-track" ref={track}>
          {images.map((src, n) => (
            <div className="car-slide" key={src} aria-hidden={n !== i}>
              <img src={"/" + src} alt={alt + " " + (n + 1)} loading={n === 0 ? "eager" : "lazy"} draggable="false" />
            </div>
          ))}
        </div>
        {many && (
          <>
            <button type="button" className="car-btn car-l" onClick={() => step(false)} aria-label={t(rtl() ? "c_next" : "c_prev")}><Chevron left /></button>
            <button type="button" className="car-btn car-r" onClick={() => step(true)} aria-label={t(rtl() ? "c_prev" : "c_next")}><Chevron /></button>
          </>
        )}
      </div>
      {many && (
        <div className="car-dots" role="tablist">
          {images.map((_, n) => (
            <button key={n} type="button" role="tab" aria-selected={n === i} aria-label={t("c_goto") + " " + (n + 1)}
              className={"car-dot" + (n === i ? " on" : "")} onClick={() => goTo(n)} />
          ))}
        </div>
      )}
    </div>
  );
}
