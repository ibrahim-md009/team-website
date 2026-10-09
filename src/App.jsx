import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useApp } from "./context.jsx";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Footer from "./components/Footer.jsx";
import { PageHead } from "./components/ui.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Projects from "./pages/Projects.jsx";
import Project from "./pages/Project.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

function NotFound() {
  const { t } = useApp();
  return <PageHead title={t("nf_t")} sub={t("nf_p")} />;
}

/* which SEO entry the current URL uses */
function pageId(path) {
  if (path === "/") return "home";
  if (/^\/projects\/[^/]+$/.test(path)) return "project";
  return ["services", "projects", "about", "contact"].find(x => path === "/" + x) || "404";
}

export default function App() {
  const loc = useLocation();
  const path = loc.pathname.replace(/\/+$/, "") || "/";
  const { t, L, D, lang } = useApp();
  const id = pageId(path);
  const slug = id === "project" ? path.split("/")[2] : "";
  const prevPath = useRef(null);

  /* page title + description (SEO) */
  useEffect(() => {
    let ti, de;
    if (id === "project") {
      const p = D.projects.find(x => x.slug === slug);
      ti = p ? L(p.name) + " | " + t("brand") : t("nf_t");
      de = p ? L(p.short) : t("nf_p");
    } else if (id === "404") {
      ti = t("nf_t") + " | " + t("brand"); de = t("nf_p");
    } else {
      [ti, de] = D.seo[id][lang];
    }
    document.title = ti;
    const set = (sel, v) => { const e = document.querySelector(sel); if (e) e.setAttribute("content", v); };
    set('meta[name="description"]', de); set('meta[property="og:title"]', ti); set('meta[property="og:description"]', de);
    set('meta[property="og:locale"]', lang === "ar" ? "ar_AR" : "en_US");
  }, [id, slug, lang]);

  /* scroll: to the #anchor if there is one, otherwise to the top */
  useEffect(() => {
    const first = prevPath.current === null;
    const same = prevPath.current === path;
    prevPath.current = path;
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) { setTimeout(() => el.scrollIntoView(), 80); return; }
    }
    if (first) return;
    scrollTo({ top: 0, behavior: same ? "smooth" : "instant" });
  }, [loc.key]);

  /* reveal-on-scroll (threshold 0: tall blocks such as screenshots appear as soon as they enter the screen) */
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".rv:not(.in)").forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [path, lang]);

  return (
    <>
      <Header />
      <main id="app" key={path}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
