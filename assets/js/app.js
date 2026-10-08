/* ==========================================================================
   NEXORA — site script. Reads content from data.js and renders each page.
   Handles: language (AR/EN + RTL), theme, mobile menu, scroll states,
   reveal animations, project filter, contact form and per-page SEO.
   ========================================================================== */
(function () {
  "use strict";
  const D = NEXORA;
  const body = document.body;
  const ROOT = body.dataset.root || "";
  const PAGE = body.dataset.page;
  const SLUG = body.dataset.slug || "";
  const doc = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  let lang = doc.lang === "en" ? "en" : "ar";
  const t = k => D.i18n[lang][k];
  const L = o => o[lang];
  const url = p => ROOT + p;
  const projectUrl = s => url("projects/" + s + ".html");

  /* ---------- small building blocks ---------- */
  const arrow = '<svg class="arr" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const logoMark = '<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="9" cy="9" r="7" fill="var(--sage)"/><path d="M18 2h12v12a12 12 0 0 1-12-12z" fill="var(--sand)" transform="translate(0 0)"/><rect x="2" y="18" width="14" height="12" rx="3" fill="var(--blue)"/><path d="M18 30a6 6 0 0 1 12 0z" fill="var(--olive)" transform="translate(0 -4)"/><circle cx="24" cy="26" r="3" fill="var(--taupe)"/></svg>';

  const icons = {
    websites: '<svg viewBox="0 0 48 48"><rect x="6" y="9" width="36" height="30" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M6 17h36" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="13" r="1.3" fill="currentColor"/><circle cx="17" cy="13" r="1.3" fill="currentColor"/></svg>',
    dashboards: '<svg viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16 33V24M24 33V16M32 33V21" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    mobile: '<svg viewBox="0 0 48 48"><rect x="14" y="5" width="20" height="38" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M21 37h6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    systems: '<svg viewBox="0 0 48 48"><rect x="7" y="7" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="27" y="7" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="7" y="27" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="34" cy="34" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>'
  };

  /* hero geometry: built from the logo's own shapes in brand colours */
  const heroGeo = '<svg class="geo" viewBox="0 0 400 400" aria-hidden="true">' +
    '<circle class="g1" cx="140" cy="140" r="112" fill="var(--sage)"/>' +
    '<path class="g2" d="M230 20h150v150a150 150 0 0 1-150-150z" fill="var(--sand)"/>' +
    '<rect class="g3" x="30" y="240" width="170" height="140" rx="34" fill="var(--blue)"/>' +
    '<path class="g4" d="M220 380a85 85 0 0 1 170 0z" fill="var(--olive)"/>' +
    '<circle class="g5" cx="300" cy="262" r="30" fill="var(--taupe)"/></svg>';

  /* generated preview used until real screenshots are added to data.js */
  function preview(p, big) {
    if (p.shots && p.shots[0]) return '<div class="pv pv-img" style="--ac:' + p.accent + '"><img src="' + url(p.shots[0]) + '" alt="' + L(p.name) + '" loading="lazy"></div>';
    const web = p.kind === "web";
    const inner = web
      ? '<div class="pv-hero"><b>' + L(p.name) + '</b><span></span><span></span></div><div class="pv-row"><u></u><u></u><u></u></div>'
      : '<div class="pv-side"><u></u><u></u><u></u><u></u></div><div class="pv-main"><div class="pv-stats"><u></u><u></u><u></u></div><div class="pv-chart"><s style="--h:42%"></s><s style="--h:68%"></s><s style="--h:52%"></s><s style="--h:86%"></s><s style="--h:60%"></s><s style="--h:74%"></s></div></div>';
    return '<div class="pv ' + (web ? "pv-web" : "pv-sys") + (big ? " pv-big" : "") + '" style="--ac:' + p.accent + '"><div class="pv-bar"><i></i><i></i><i></i></div><div class="pv-body">' + inner + '</div><em class="pv-shape" aria-hidden="true"></em></div>';
  }

  function projectCard(p, i) {
    return '<a class="pcard rv" style="--ac:' + p.accent + ';--d:' + (i * 0.07) + 's" href="' + projectUrl(p.slug) + '">' +
      '<div class="pcard-pv reveal-img">' + preview(p) + '</div>' +
      '<div class="pcard-b"><span class="badge">' + L(p.cat) + '</span><h3>' + L(p.name) + '</h3><p>' + L(p.short) + '</p>' +
      '<span class="pcard-more">' + t("more") + arrow + '</span></div></a>';
  }

  function serviceCard(s, i) {
    return '<a class="scard rv" style="--ac:' + s.accent + ';--d:' + (i * 0.07) + 's" href="' + url("services.html#" + s.id) + '">' +
      '<span class="sicon">' + icons[s.id] + '</span><h3>' + L(s.name) + '</h3><p>' + L(s.desc) + '</p></a>';
  }

  function pageHead(title, sub) {
    return '<header class="phead"><div class="wrap"><div class="phead-shapes" aria-hidden="true"><i></i><i></i><i></i></div>' +
      '<h1 class="rv">' + title + '</h1><p class="rv" style="--d:.08s">' + sub + '</p></div></header>';
  }

  function ctaBand(title, text) {
    return '<section class="band band-dark cta"><div class="wrap cta-in"><div class="cta-shapes" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
      '<div class="rv"><h2>' + title + '</h2><p>' + text + '</p></div>' +
      '<a class="btn btn-sage rv" style="--d:.1s" href="' + url("contact.html") + '">' + t("cta") + arrow + '</a></div></section>';
  }

  /* ---------- pages ---------- */
  const pages = {
    home() {
      return '<section class="hero"><div class="wrap hero-in"><div class="hero-txt">' +
        '<span class="badge badge-sage fade">' + t("h_badge") + '</span>' +
        '<h1><span class="ln"><span>' + t("h_title") + '</span></span></h1>' +
        '<p class="lead fade">' + t("h_sub") + '</p>' +
        '<div class="btns fade"><a class="btn btn-fill" href="' + url("contact.html") + '">' + t("cta") + arrow + '</a><a class="btn btn-line" href="' + url("projects.html") + '">' + t("h_cta2") + '</a></div>' +
        '</div><div class="hero-art fade">' + heroGeo + '</div></div></section>' +

        '<section class="band band-sand"><div class="wrap"><div class="sec-h rv"><div><h2>' + t("home_services_t") + '</h2><p>' + t("home_services_p") + '</p></div>' +
        '<a class="link" href="' + url("services.html") + '">' + t("all_services") + arrow + '</a></div>' +
        '<div class="grid4">' + D.services.map(serviceCard).join("") + '</div></div></section>' +

        '<section class="sec"><div class="wrap"><div class="sec-h rv"><div><h2>' + t("home_projects_t") + '</h2><p>' + t("home_projects_p") + '</p></div>' +
        '<a class="link" href="' + url("projects.html") + '">' + t("all_projects") + arrow + '</a></div>' +
        '<div class="grid2">' + D.projects.map(projectCard).join("") + '</div></div></section>' +
        ctaBand(t("home_cta_t"), t("home_cta_p"));
    },

    services() {
      const rows = D.services.map((s, i) => {
        const ex = s.examples.map(sl => D.projects.find(p => p.slug === sl)).filter(Boolean);
        return '<section class="sec srow ' + (i % 2 ? "band band-a" : "") + '" id="' + s.id + '" style="--ac:' + s.accent + '"><div class="wrap srow-in">' +
          '<div class="srow-txt rv"><span class="sicon">' + icons[s.id] + '</span><h2>' + L(s.name) + '</h2><p class="lead">' + L(s.desc) + '</p>' +
          '<h3 class="mini">' + t("s_includes") + '</h3><ul class="ticks">' + L(s.points).map(x => "<li>" + x + "</li>").join("") + '</ul>' +
          '<a class="btn btn-fill" href="' + url("contact.html?service=" + s.id) + '">' + t("s_ask") + arrow + '</a></div>' +
          '<div class="srow-vis rv" style="--d:.1s"><div class="svis reveal-img"><i></i><i></i><i></i>' + icons[s.id] + '</div>' +
          (ex.length ? '<h3 class="mini">' + t("s_examples") + '</h3><div class="exlist">' + ex.map(p => '<a class="ex" style="--ac:' + p.accent + '" href="' + projectUrl(p.slug) + '"><span class="dot"></span>' + L(p.name) + arrow + '</a>').join("") + '</div>' : "") +
          '</div></div></section>';
      }).join("");
      return pageHead(t("s_page_t"), t("s_page_p")) + rows + ctaBand(t("home_cta_t"), t("home_cta_p"));
    },

    projects() {
      return pageHead(t("p_page_t"), t("p_page_p")) +
        '<section class="sec"><div class="wrap"><div class="filters rv" role="group">' +
        '<button class="chipf on" data-f="all">' + t("f_all") + '</button><button class="chipf" data-f="web">' + t("f_web") + '</button><button class="chipf" data-f="system">' + t("f_sys") + '</button></div>' +
        '<div class="grid2" id="plist">' + D.projects.map((p, i) => '<div class="pwrap" data-k="' + p.kind + '">' + projectCard(p, i) + '</div>').join("") + '</div></div></section>' +
        ctaBand(t("home_cta_t"), t("home_cta_p"));
    },

    project() {
      const idx = D.projects.findIndex(p => p.slug === SLUG);
      if (idx < 0) return pageHead(t("nf_t"), t("nf_p"));
      const p = D.projects[idx], nx = D.projects[(idx + 1) % D.projects.length];
      return '<header class="phead dhead" style="--ac:' + p.accent + '"><div class="wrap"><a class="back" href="' + url("projects.html") + '">' + arrow + t("d_back") + '</a>' +
        '<span class="badge badge-ac rv">' + L(p.cat) + '</span><h1 class="rv" style="--d:.05s">' + L(p.name) + '</h1><p class="rv" style="--d:.1s">' + L(p.short) + '</p></div></header>' +
        '<section class="sec dpre"><div class="wrap"><div class="dpv rv reveal-img" style="--ac:' + p.accent + '">' + preview(p, true) + '</div></div></section>' +
        '<section class="sec dtxt" style="--ac:' + p.accent + '"><div class="wrap dgrid"><div class="rv"><h2>' + t("d_overview") + '</h2><p class="lead">' + L(p.desc) + '</p></div>' +
        '<div class="rv" style="--d:.08s"><h2>' + t("d_features") + '</h2><ul class="ticks">' + L(p.features).map(x => "<li>" + x + "</li>").join("") + '</ul>' +
        (p.tech.length ? '<h3 class="mini">' + t("d_tech") + '</h3><div class="tags">' + p.tech.map(x => '<span class="tag" dir="ltr">' + x + '</span>').join("") + '</div>' : "") + '</div></div></section>' +
        '<section class="band band-a" style="--ac:' + p.accent + '"><div class="wrap ps"><div class="pbox rv"><span class="badge badge-ac">' + t("d_problem") + '</span><p>' + L(p.problem) + '</p></div>' +
        '<div class="pbox pbox-s rv" style="--d:.08s"><span class="badge badge-ac">' + t("d_solution") + '</span><p>' + L(p.solution) + '</p></div></div></section>' +
        (p.shots.length > 1 ? '<section class="sec"><div class="wrap"><h2 class="rv">' + t("d_gallery") + '</h2><div class="gal">' + p.shots.map(s => '<img class="rv" src="' + url(s) + '" alt="' + L(p.name) + '" loading="lazy">').join("") + '</div></div></section>' : "") +
        '<section class="sec"><div class="wrap next rv"><span>' + t("d_next") + '</span><a class="link big" href="' + projectUrl(nx.slug) + '">' + L(nx.name) + arrow + '</a></div></section>' +
        ctaBand(t("d_cta_t"), t("d_cta_p"));
    },

    about() {
      return pageHead(t("a_page_t"), t("a_page_p")) +
        '<section class="sec"><div class="wrap dgrid"><div class="rv"><h2>' + t("a_story_t") + '</h2></div><div class="rv story" style="--d:.08s">' + t("a_story").map(x => "<p>" + x + "</p>").join("") + '</div></div></section>' +
        '<section class="band band-sand"><div class="wrap"><h2 class="rv">' + t("a_values_t") + '</h2><div class="grid3">' +
        t("a_values").map((v, i) => '<div class="vcard rv" style="--d:' + i * 0.07 + 's"><span class="dot" style="background:' + ["var(--sage)", "var(--blue)", "var(--taupe)"][i] + '"></span><h3>' + v[0] + '</h3><p>' + v[1] + '</p></div>').join("") + '</div></div></section>' +
        '<section class="sec"><div class="wrap dgrid"><div class="rv"><h2>' + t("a_skills_t") + '</h2><div class="tags">' + D.services.map(s => '<span class="tag" style="--ac:' + s.accent + '"><i class="dot"></i>' + L(s.name) + '</span>').join("") + '</div></div>' +
        '<div class="rv" style="--d:.08s"><h2>' + t("a_stack_t") + '</h2><div class="tags">' + D.stack.map(x => '<span class="tag tag-plain" dir="ltr">' + x + '</span>').join("") + '</div></div></div></section>' +
        ctaBand(t("home_cta_t"), t("home_cta_p"));
    },

    process() {
      const cols = ["var(--sage)", "var(--blue)", "var(--olive)", "var(--taupe)", "var(--sand)"];
      return pageHead(t("pr_page_t"), t("pr_page_p")) +
        '<section class="sec"><div class="wrap"><ol class="tl" id="tl">' +
        D.steps.map((s, i) => '<li class="rv" style="--ac:' + cols[i % cols.length] + '"><span class="tl-n">' + (i + 1) + '</span><div><h3>' + s[lang][0] + '</h3><p>' + s[lang][1] + '</p></div></li>').join("") +
        '</ol></div></section>' + ctaBand(t("home_cta_t"), t("home_cta_p"));
    },

    contact() {
      const c = D.contact, m = [];
      if (c.whatsapp) m.push(['https://wa.me/' + c.whatsapp, t("c_wa"), "+" + c.whatsapp, "var(--sage)"]);
      if (c.instagram) m.push(['https://instagram.com/' + c.instagram, t("c_ig"), "@" + c.instagram, "var(--taupe)"]);
      if (c.email) m.push(['mailto:' + c.email, t("c_mail"), c.email, "var(--blue)"]);
      const opts = D.services.map(s => '<option value="' + s.id + '">' + L(s.name) + '</option>').join("") + '<option value="other">' + t("c_other") + '</option>';
      return pageHead(t("c_page_t"), t("c_page_p")) +
        '<section class="sec"><div class="wrap cgrid"><form class="cform rv" id="cform" novalidate><h2>' + t("c_form_t") + '</h2>' +
        '<div class="fld"><input id="cn" placeholder=" " autocomplete="name" required><label for="cn">' + t("c_name") + '</label></div>' +
        '<div class="fld"><input id="cc" placeholder=" " autocomplete="email" required dir="auto"><label for="cc">' + t("c_contact") + '</label></div>' +
        '<div class="fld fld-s"><select id="cs">' + opts + '</select><label for="cs">' + t("c_service") + '</label></div>' +
        '<div class="fld"><textarea id="cm" placeholder=" " required></textarea><label for="cm">' + t("c_msg") + '</label></div>' +
        '<button class="btn btn-fill" type="submit">' + t("c_send") + arrow + '</button><p class="note" id="cnote" role="status"></p></form>' +
        '<aside class="cside rv" style="--d:.1s"><h2>' + t("c_methods") + '</h2>' +
        (m.length ? m.map(x => '<a class="cm" href="' + x[0] + '" target="_blank" rel="noopener"><span class="dot" style="background:' + x[3] + '"></span><span><b>' + x[1] + '</b><small dir="ltr">' + x[2] + '</small></span>' + arrow + '</a>').join("") : '<p class="mut">' + t("c_none") + '</p>') +
        '</aside></div></section>';
    }
  };

  /* ---------- header, menu, footer ---------- */
  const NAV = [["home", "index.html"], ["projects", "projects.html"], ["services", "services.html"], ["process", "process.html"], ["about", "about.html"], ["contact", "contact.html"]];
  const current = PAGE === "project" ? "projects" : PAGE;

  function controls() {
    return '<div class="lang" role="group" aria-label="' + t("language") + '"><button class="js-lang" data-l="ar" aria-pressed="' + (lang === "ar") + '">AR</button><button class="js-lang" data-l="en" aria-pressed="' + (lang === "en") + '">EN</button></div>' +
      '<button class="ib js-theme" aria-label="' + t("theme") + '"><svg viewBox="0 0 24 24"><g class="sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g><path class="moon" d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg></button>';
  }

  function renderHeader() {
    const links = NAV.map(n => '<a href="' + url(n[1]) + '"' + (n[0] === current ? ' aria-current="page"' : "") + '>' + t("nav_" + n[0]) + '</a>').join("");
    $("#hdr").innerHTML =
      '<a class="skip" href="#app">' + t("skip") + '</a>' +
      '<header class="nav" id="nav"><div class="wrap nav-in">' +
      '<a class="logo" href="' + url("index.html") + '" aria-label="' + t("brand") + '">' + logoMark + '<span>' + t("brand") + '</span></a>' +
      '<nav class="links" aria-label="Main">' + links + '</nav>' +
      '<div class="tools"><div class="tools-d">' + controls() + '<a class="btn btn-fill btn-sm" href="' + url("contact.html") + '">' + t("cta") + '</a></div>' +
      '<button class="burger" id="burger" aria-label="' + t("menu") + '" aria-expanded="false" aria-controls="mm"><span></span><span></span></button></div></div></header>' +
      '<div class="mm" id="mm" aria-hidden="true"><div class="mm-shapes" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="wrap mm-in">' +
      '<nav aria-label="Mobile">' + NAV.map((n, i) => '<a href="' + url(n[1]) + '" style="--i:' + i + '"' + (n[0] === current ? ' aria-current="page"' : "") + '><small>' + String(i + 1).padStart(2, "0") + '</small>' + t("nav_" + n[0]) + '</a>').join("") + '</nav>' +
      '<div class="mm-foot" style="--i:6"><a class="btn btn-sage btn-block" href="' + url("contact.html") + '">' + t("cta") + arrow + '</a><div class="mm-ctl">' + controls() + '</div></div></div></div>';
  }

  function renderFooter() {
    const c = D.contact, ch = [];
    if (c.whatsapp) ch.push(['https://wa.me/' + c.whatsapp, t("c_wa")]);
    if (c.instagram) ch.push(['https://instagram.com/' + c.instagram, t("c_ig")]);
    if (c.email) ch.push(['mailto:' + c.email, t("c_mail")]);
    if (!ch.length) ch.push([url("contact.html"), t("nav_contact")]);
    const fl = NAV.filter(n => n[0] !== "process").map(n => '<a href="' + url(n[1]) + '">' + t("nav_" + n[0]) + '</a>').join("");
    $("#ftr").innerHTML = '<footer class="foot"><div class="foot-bar" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="wrap foot-in">' +
      '<div class="foot-brand"><a class="logo" href="' + url("index.html") + '">' + logoMark + '<span>' + t("brand") + '</span></a><p>' + t("f_desc") + '</p></div>' +
      '<div><h3>' + t("f_nav") + '</h3>' + fl + '</div>' +
      '<div><h3>' + t("f_serv") + '</h3>' + D.services.map(s => '<a href="' + url("services.html#" + s.id) + '">' + L(s.name) + '</a>').join("") + '</div>' +
      '<div><h3>' + t("f_contact") + '</h3>' + ch.map(x => '<a href="' + x[0] + '"' + (x[0].startsWith("http") ? ' target="_blank" rel="noopener"' : "") + '>' + x[1] + '</a>').join("") + '</div>' +
      '</div><div class="wrap foot-end">' + t("f_rights") + '</div></footer>';
  }

  /* ---------- SEO ---------- */
  function meta() {
    let ti, de;
    if (PAGE === "project") {
      const p = D.projects.find(x => x.slug === SLUG);
      ti = p ? L(p.name) + " | " + t("brand") : t("nf_t"); de = p ? L(p.short) : t("nf_p");
    } else { [ti, de] = D.seo[PAGE][lang]; }
    document.title = ti;
    const set = (sel, v) => { const e = $(sel); if (e) e.setAttribute("content", v); };
    set('meta[name="description"]', de); set('meta[property="og:title"]', ti); set('meta[property="og:description"]', de);
    set('meta[property="og:locale"]', lang === "ar" ? "ar_AR" : "en_US");
  }

  /* ---------- interactions ---------- */
  let io;
  function reveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    $$(".rv").forEach(e => io.observe(e));
  }

  function menu(open) {
    const m = $("#mm"), b = $("#burger");
    m.classList.toggle("open", open); b.classList.toggle("open", open);
    b.setAttribute("aria-expanded", open); m.setAttribute("aria-hidden", !open);
    body.classList.toggle("lock", open);
    if (open) $("#mm a").focus({ preventScroll: true });
  }

  function bindShell() {
    $("#burger").onclick = () => menu(!$("#mm").classList.contains("open"));
    $$("#mm nav a, #mm .btn").forEach(a => a.addEventListener("click", () => menu(false)));
    $$(".js-lang").forEach(b => b.onclick = () => setLang(b.dataset.l));
    $$(".js-theme").forEach(b => b.onclick = toggleTheme);
  }

  function bindPage() {
    reveal();
    const tl = $("#tl");
    if (tl) tl.dataset.on = "1";
    $$(".chipf").forEach(b => b.onclick = () => {
      $$(".chipf").forEach(x => x.classList.toggle("on", x === b));
      $$(".pwrap").forEach(w => { w.hidden = !(b.dataset.f === "all" || w.dataset.k === b.dataset.f); });
    });
    const f = $("#cform");
    if (f) {
      const sv = new URLSearchParams(location.search).get("service");
      if (sv && $("#cs option[value='" + sv + "']")) $("#cs").value = sv;
      f.addEventListener("submit", submitForm);
    }
    if (location.hash && $(location.hash)) setTimeout(() => $(location.hash).scrollIntoView(), 60);
  }

  function submitForm(e) {
    e.preventDefault();
    const n = $("#cn").value.trim(), c = $("#cc").value.trim(), m = $("#cm").value.trim();
    const note = $("#cnote");
    if (!n || !c || !m) { note.textContent = t("c_err"); note.className = "note err"; return; }
    const sOpt = $("#cs").selectedOptions[0].textContent;
    const text = t("c_name") + ": " + n + "\n" + t("c_contact") + ": " + c + "\n" + t("c_service") + ": " + sOpt + "\n\n" + m;
    const ct = D.contact;
    note.className = "note";
    if (ct.whatsapp) { window.open("https://wa.me/" + ct.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener"); note.textContent = t("c_ok_wa"); }
    else if (ct.email) { location.href = "mailto:" + ct.email + "?subject=" + encodeURIComponent(t("brand") + " — " + sOpt) + "&body=" + encodeURIComponent(text); note.textContent = t("c_ok_mail"); }
    else { (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(() => {}); note.textContent = t("c_ok_copy"); }
    e.target.reset();
  }

  function toggleTheme() {
    const n = doc.dataset.theme === "dark" ? "light" : "dark";
    doc.classList.add("tx"); doc.dataset.theme = n; store.set("nx-theme", n);
    setTimeout(() => doc.classList.remove("tx"), 500);
  }

  function renderPage() {
    $("#app").innerHTML = (pages[PAGE] || pages.home)();
    meta(); bindPage();
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l; store.set("nx-lang", l);
    body.classList.add("swap");
    setTimeout(() => {
      doc.lang = l; doc.dir = l === "ar" ? "rtl" : "ltr";
      const open = $("#mm").classList.contains("open");
      renderHeader(); renderFooter(); renderPage(); bindShell(); onScroll();
      if (open) { $("#mm").classList.add("open"); $("#burger").classList.add("open"); $("#burger").setAttribute("aria-expanded", "true"); $("#mm").setAttribute("aria-hidden", "false"); }
      requestAnimationFrame(() => body.classList.remove("swap"));
    }, 160);
  }

  function onScroll() {
    const nav = $("#nav"); if (nav) nav.classList.toggle("scrolled", scrollY > 16);
    const tl = $("#tl");
    if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty("--p", Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height))); }
  }

  /* ---------- init ---------- */
  renderHeader(); renderFooter(); renderPage(); bindShell(); onScroll();
  let tick = false;
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { onScroll(); tick = false; }); } }, { passive: true });
  addEventListener("keydown", e => { if (e.key === "Escape" && $("#mm").classList.contains("open")) { menu(false); $("#burger").focus(); } });
  addEventListener("resize", () => { if (innerWidth > 980) menu(false); });
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => { if (!store.get("nx-theme")) doc.dataset.theme = e.matches ? "light" : "dark"; });
  addEventListener("pageshow", e => { if (e.persisted) body.classList.remove("swap"); });
})();
