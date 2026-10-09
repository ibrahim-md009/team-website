import { useEffect, useRef } from "react";
import { useRouter } from "./router.jsx";
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

function pick(path) {
  if (path === "/") return { id: "home", view: <Home /> };
  if (path === "/services") return { id: "services", view: <Services /> };
  if (path === "/projects") return { id: "projects", view: <Projects /> };
  if (path === "/about") return { id: "about", view: <About /> };
  if (path === "/contact") return { id: "contact", view: <Contact /> };
  const m = path.match(/^\/projects\/([\w-]+)$/);
  if (m) return { id: "project", slug: m[1], view: <Project slug={m[1]} /> };
  return { id: "404", view: <NotFound /> };
}

export default function App() {
  const { loc } = useRouter();
  const { t, L, D, lang } = useApp();
  const page = pick(loc.path);
  const prevPath = useRef(null);

  /* page title + description (SEO) */
  useEffect(() => {
    let ti, de;
    if (page.id === "project") {
      const p = D.projects.find(x => x.slug === page.slug);
      ti = p ? L(p.name) + " | " + t("brand") : t("nf_t");
      de = p ? L(p.short) : t("nf_p");
    } else if (page.id === "404") {
      ti = t("nf_t") + " | " + t("brand"); de = t("nf_p");
    } else {
      [ti, de] = D.seo[page.id][lang];
    }
    document.title = ti;
    const set = (sel, v) => { const e = document.querySelector(sel); if (e) e.setAttribute("content", v); };
    set('meta[name="description"]', de); set('meta[property="og:title"]', ti); set('meta[property="og:description"]', de);
    set('meta[property="og:locale"]', lang === "ar" ? "ar_AR" : "en_US");
  }, [page.id, page.slug, lang]);

  /* scroll: to the #anchor if there is one, otherwise to the top */
  useEffect(() => {
    const first = prevPath.current === null;
    const same = prevPath.current === loc.path;
    prevPath.current = loc.path;
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) { setTimeout(() => el.scrollIntoView(), 80); return; }
    }
    if (first) return;
    scrollTo({ top: 0, behavior: same ? "smooth" : "instant" });
  }, [loc.key]);

  /* reveal-on-scroll */
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    document.querySelectorAll(".rv:not(.in)").forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [loc.path, lang]);

  return (
    <>
      <Header />
      <main id="app" key={loc.path}>{page.view}</main>
      <Footer />
      <BottomNav />
    </>
  );
}
