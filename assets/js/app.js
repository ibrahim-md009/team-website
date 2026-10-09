/* ==========================================================================
   DARCX — site script. Reads content from data.js and renders each page.
   Handles: language (AR/EN + RTL), theme, mobile menu, scroll states,
   reveal animations, project filter, contact form and per-page SEO.
   ========================================================================== */
(function () {
  "use strict";
  const D = DARCX_DATA;
  const body = document.body;
  /* absolute site root, derived from this script's own location (works in any sub-folder) */
  const BASE = new URL("../../", document.currentScript.src).href;
  let PAGE = body.dataset.page;
  let SLUG = body.dataset.slug || "";
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
  const url = p => BASE + p;
  const projectUrl = s => url("projects/" + s + ".html");

  /* ---------- small building blocks ---------- */
  const arrow = '<svg class="arr" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* The OFFICIAL DARCX monogram image (assets/logo/darcx-monogram.png) is used everywhere */
  function logoImg(cls) {
    const big = cls === "hm-svg";   /* large hero version vs. small navbar/footer version (same artwork) */
    return '<img class="' + (cls || "mark") + '" src="' + url("assets/logo/darcx-monogram" + (big ? "" : "-sm") + ".png") + '" alt="DARCX" width="1752" height="1017" decoding="async">';
  }

  const icons = {
    websites: '<svg viewBox="0 0 48 48"><rect x="6" y="9" width="36" height="30" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M6 17h36" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="13" r="1.3" fill="currentColor"/><circle cx="17" cy="13" r="1.3" fill="currentColor"/></svg>',
    dashboards: '<svg viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16 33V24M24 33V16M32 33V21" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    mobile: '<svg viewBox="0 0 48 48"><rect x="14" y="5" width="20" height="38" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M21 37h6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    systems: '<svg viewBox="0 0 48 48"><rect x="7" y="7" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="27" y="7" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="7" y="27" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="34" cy="34" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>'
  };

  /* hero art: the official monogram on a quiet geometric field */
  const heroGeo = '<div class="hero-mark">' + logoImg("hm-svg") + '</div>';

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

  /* ---------- contact channels (from data.js) ---------- */
  const SOCIAL = [
    { k: "whatsapp", label: () => t("c_wa"), href: v => "https://wa.me/" + v, show: v => "+" + v, dot: "var(--sage)", ic: '<path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5z"/><path d="M9 8.8c.3 2.4 2.600 4.700 5.200 5.300l1-1.200-1.800-.9-.9.800c-.9-.4-1.700-1.200-2.100-2.100l.8-.9-.9-1.800z"/>' },
    { k: "phone", label: () => t("c_call"), href: v => "tel:" + v, show: v => v, dot: "var(--blue)", ic: '<path d="M5 4h4l1.500 4-2 1.300a11 11 0 0 0 5.200 5.200L15 12.500l4 1.500v4a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2z"/>' },
    { k: "instagram", label: () => t("c_ig"), href: v => "https://instagram.com/" + v, show: v => "@" + v, dot: "var(--taupe)", ic: '<rect x="4" y="4" width="16" height="16" rx="4.500"/><circle cx="12" cy="12" r="3.600"/><circle cx="16.800" cy="7.200" r=".6"/>' },
    { k: "email", label: () => t("c_mail"), href: v => "mailto:" + v, show: v => v, dot: "var(--sand)", ic: '<rect x="3.500" y="5.500" width="17" height="13" rx="2.500"/><path d="M4 8l8 5.500L20 8"/>' },
    { k: "telegram", label: () => t("c_tg"), href: v => "https://t.me/" + v, show: v => "@" + v, dot: "var(--blue)", ic: '<path d="M20.500 4.500L3.500 11l5 2 2 5.500 3-3.500 4.500 3.500z"/><path d="M8.500 13l8-5.500"/>' },
    { k: "facebook", label: () => "Facebook", href: v => "https://facebook.com/" + v, show: v => v, dot: "var(--blue)", ic: '<path d="M14 21v-8h2.700l.5-3.300H14V7.600c0-1 .4-1.600 1.700-1.600h1.600V3.200C17 3.100 16 3 14.900 3 12.500 3 11 4.400 11 7v2.700H8.300V13H11v8z"/>' },
    { k: "linkedin", label: () => "LinkedIn", href: v => "https://linkedin.com/company/" + v, show: v => v, dot: "var(--blue)", ic: '<rect x="4" y="9" width="3.500" height="11"/><circle cx="5.800" cy="5.500" r="1.800"/><path d="M10.500 20v-11h3.300v1.600c.6-1 1.800-1.900 3.400-1.900 2.800 0 3.800 1.800 3.800 4.600V20h-3.500v-5.800c0-1.300-.4-2.200-1.700-2.200s-2 1-2 2.300V20z"/>' },
    { k: "x", label: () => "X", href: v => "https://x.com/" + v, show: v => "@" + v, dot: "var(--taupe)", ic: '<path d="M4 4l16 16M20 4L4 20"/>' },
    { k: "tiktok", label: () => "TikTok", href: v => "https://tiktok.com/@" + v, show: v => "@" + v, dot: "var(--olive)", ic: '<path d="M14 4v11a3.500 3.500 0 1 1-3.500-3.500M14 4c.4 2.300 1.900 3.700 4.500 3.900"/>' }
  ];
  const channels = () => SOCIAL.filter(s => D.contact[s.k]);

  /* ---------- pages ---------- */
  const pages = {
    home() {
      return '<section class="hero"><div class="wrap hero-in"><div class="hero-txt">' +
        '<h1><span class="ln"><span>' + t("h_title") + '</span></span></h1>' +
        '<p class="lead fade">' + t("h_sub") + '</p>' +
        '<div class="btns fade"><a class="btn btn-fill" href="' + url("contact.html") + '">' + t("cta") + arrow + '</a><a class="btn btn-line" href="' + url("projects.html") + '">' + t("h_cta2") + '</a></div>' +
        '<p class="flow fade">' + t("h_flow").map(x => "<span>" + x + "</span>").join('<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M12 6l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>') + "</p>" +
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
      const m = channels().map(s => [s.href(D.contact[s.k]), s.label(), s.show(D.contact[s.k]), s.dot]);
      const opts = D.services.map(s => '<option value="' + s.id + '">' + L(s.name) + '</option>').join("") + '<option value="other">' + t("c_other") + '</option>';
      return pageHead(t("c_page_t"), t("c_page_p")) +
        '<section class="sec"><div class="wrap cgrid"><form class="cform rv" id="cform" novalidate><h2>' + t("c_form_t") + '</h2><input class="hp" name="website" id="chp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<div class="fld"><input id="cn" placeholder=" " autocomplete="name" required><label for="cn">' + t("c_name") + '</label></div>' +
        '<div class="fld"><input id="cc" placeholder=" " autocomplete="email" required dir="auto"><label for="cc">' + t("c_contact") + '</label></div>' +
        '<div class="fld fld-s"><button type="button" class="sel" id="csb" aria-haspopup="dialog" aria-expanded="false"><span id="csv"></span><svg class="chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button><label>' + t("c_service") + '</label><select id="cs" tabindex="-1" aria-hidden="true">' + opts + '</select></div>' +
        '<div class="fld"><textarea id="cm" placeholder=" " required></textarea><label for="cm">' + t("c_msg") + '</label></div>' +
        '<button class="btn btn-fill" type="submit">' + t("c_send") + arrow + '</button><p class="note" id="cnote" role="status"></p></form>' +
        '<aside class="cside rv" style="--d:.1s"><h2>' + t("c_methods") + '</h2>' +
        (m.length ? m.map(x => '<a class="cm" href="' + x[0] + '" target="_blank" rel="noopener"><span class="dot" style="background:' + x[3] + '"></span><span><b>' + x[1] + '</b><small dir="ltr">' + x[2] + '</small></span>' + arrow + '</a>').join("") : '<p class="mut">' + t("c_none") + '</p>') +
        '</aside></div></section>';
    }
  };

  /* ---------- top bar, bottom navigation, footer ---------- */
  const NAV = [["home", "index.html"], ["projects", "projects.html"], ["services", "services.html"], ["process", "process.html"], ["about", "about.html"], ["contact", "contact.html"]];
  const cur = () => (PAGE === "project" ? "projects" : PAGE);
  const ni = {
    home: '<path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10"/>',
    projects: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    services: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    process: '<circle cx="5.5" cy="6" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/><path d="M8 6h6a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 4h6"/>',
    about: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c.8-4 3.7-6 7.5-6s6.7 2 7.5 6"/>',
    contact: '<path d="M4 5h16v11H9l-5 4z"/>'
  };

  function controls() {
    return '<div class="lang" role="group" aria-label="' + t("language") + '"><button class="js-lang" data-l="ar" aria-pressed="' + (lang === "ar") + '">AR</button><button class="js-lang" data-l="en" aria-pressed="' + (lang === "en") + '">EN</button></div>' +
      '<button class="ib js-theme" aria-label="' + t("theme") + '"><svg viewBox="0 0 24 24"><g class="sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g><path class="moon" d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg></button>';
  }

  function renderHeader() {
    $("#hdr").innerHTML =
      '<a class="skip" href="#app">' + t("skip") + '</a>' +
      '<header class="nav" id="nav"><div class="wrap nav-in">' +
      '<a class="logo" href="' + url("index.html") + '" aria-label="DARCX">' + logoImg("mark") + '</a>' +
      '<div class="tools">' + controls() + '</div></div></header>' +
      '<nav class="bnav" id="bnav" aria-label="Main"><div class="wrap bnav-in"><div class="bnav-track" id="btrack" style="--n:' + NAV.length + ';--idx:' + NAV.findIndex(n => n[0] === cur()) + '"><i class="bnav-ind" aria-hidden="true"></i>' +
      NAV.map(n => '<a href="' + url(n[1]) + '" draggable="false"' + (n[0] === cur() ? ' aria-current="page"' : "") + ' data-p="' + n[0] + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ni[n[0]] + '</svg><span>' + t("nav_" + n[0]) + '</span></a>').join("") +
      '</div></div></nav>';
  }

  function renderFooter() {
    const ch = channels();
    $("#ftr").innerHTML = '<footer class="foot"><div class="foot-bar" aria-hidden="true"></div><div class="wrap foot-in">' +
      '<a class="logo" href="' + url("index.html") + '" aria-label="DARCX">' + logoImg("mark") + '</a>' +
      '<p class="foot-desc">' + t("f_desc") + '</p>' +
      (ch.length ? '<div class="foot-soc">' + ch.map(s => '<a class="soc" href="' + s.href(D.contact[s.k]) + '" target="_blank" rel="noopener" aria-label="' + s.label() + '" title="' + s.label() + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + s.ic + '</svg></a>').join("") + '</div>' : "") +
      '<p class="foot-end">' + t("f_rights") + '</p></div></footer>';
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

  function bindShell() {
    $$(".js-lang").forEach(b => b.onclick = () => setLang(b.dataset.l));
    $$(".js-theme").forEach(b => b.onclick = toggleTheme);
    bindBar();
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
      setSel(); $("#csb").onclick = openSheet;
      f.addEventListener("submit", submitForm);
    }
    if (location.hash && $(location.hash)) setTimeout(() => $(location.hash).scrollIntoView(), 80);
  }

  async function submitForm(e) {
    e.preventDefault();
    const f = e.target, btn = $("button[type=submit]", f), note = $("#cnote");
    const n = $("#cn").value.trim(), c = $("#cc").value.trim(), m = $("#cm").value.trim();
    if (!n || !c || !m) { note.textContent = t("c_err"); note.className = "note err"; return; }
    const sOpt = $("#cs").selectedOptions[0].textContent;
    const text = t("c_name") + ": " + n + "\n" + t("c_contact") + ": " + c + "\n" + t("c_service") + ": " + sOpt + "\n\n" + m;
    note.className = "note"; note.textContent = t("c_sending"); btn.disabled = true; f.classList.add("busy");
    let sent = false;
    try {
      const r = await fetch(url("api/contact"), { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, contact: c, service: sOpt, message: m, website: $("#chp") ? $("#chp").value : "", lang }) });
      sent = r.ok;
    } catch (_) {}
    btn.disabled = false; f.classList.remove("busy");
    const ct = D.contact;
    if (sent) { note.textContent = t("c_sent"); f.reset(); setSel(); return; }
    /* fallback when the server function is not set up: open WhatsApp with the message ready */
    if (ct.whatsapp) { window.open("https://wa.me/" + ct.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener"); note.textContent = t("c_ok_wa"); f.reset(); setSel(); }
    else if (ct.email) { location.href = "mailto:" + ct.email + "?subject=" + encodeURIComponent(t("brand") + " — " + sOpt) + "&body=" + encodeURIComponent(text); note.textContent = t("c_ok_mail"); f.reset(); setSel(); }
    else { (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(() => {}); note.textContent = t("c_ok_copy"); }
  }

  function toggleTheme() {
    const n = doc.dataset.theme === "dark" ? "light" : "dark";
    doc.classList.add("tx"); doc.dataset.theme = n; store.set("dx-theme", n);
    setTimeout(() => doc.classList.remove("tx"), 500);
  }

  function renderPage() {
    closeSheet(true);
    $("#app").innerHTML = (pages[PAGE] || pages.home)();
    meta(); bindPage();
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l; store.set("dx-lang", l);
    body.classList.add("swap");
    setTimeout(() => {
      doc.lang = l; doc.dir = l === "ar" ? "rtl" : "ltr";
      renderHeader(); renderFooter(); renderPage(); bindShell(); onScroll();
      $("#bnav").classList.add("still");
      requestAnimationFrame(() => body.classList.remove("swap"));
    }, 160);
  }

  function onScroll() {
    const nav = $("#nav"); if (nav) nav.classList.toggle("scrolled", scrollY > 16);
    const tl = $("#tl");
    if (tl) { const r = tl.getBoundingClientRect(); tl.style.setProperty("--p", Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height))); }
  }

  /* ---------- bottom sheet picker (replaces the native select) ---------- */
  function setSel() {
    const s = $("#cs"), v = $("#csv"); if (s && v) v.textContent = s.selectedOptions[0].textContent;
  }
  function closeSheet(instant) {
    const sh = $("#sheet"); if (!sh) return;
    sh.classList.remove("open"); body.classList.remove("lock");
    const b = $("#csb"); if (b) b.setAttribute("aria-expanded", "false");
    if (instant) sh.remove(); else setTimeout(() => sh.remove(), 450);
  }
  function openSheet() {
    const sel = $("#cs"); if (!sel || $("#sheet")) return;
    const accent = v => { const s = D.services.find(x => x.id === v); return s ? s.accent : "var(--sand)"; };
    const sh = document.createElement("div"); sh.id = "sheet"; sh.className = "sheet";
    sh.innerHTML = '<div class="sheet-bg"></div><div class="sheet-p" role="dialog" aria-modal="true" aria-label="' + t("c_service") + '"><div class="sheet-grab"><i></i></div><h3>' + t("c_service") + '</h3><ul>' +
      [...sel.options].map((o, i) => '<li style="--i:' + i + '"><button type="button" class="opt' + (o.value === sel.value ? " on" : "") + '" data-v="' + o.value + '"><span class="svc-dot" style="background:' + accent(o.value) + '"></span><span>' + o.textContent + '</span><i class="tick"></i></button></li>').join("") + '</ul></div>';
    document.body.appendChild(sh); body.classList.add("lock"); $("#csb").setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => requestAnimationFrame(() => sh.classList.add("open")));
    sh.addEventListener("click", e => {
      if (e.target.classList.contains("sheet-bg")) return closeSheet();
      const o = e.target.closest(".opt"); if (!o) return;
      sel.value = o.dataset.v; setSel(); $$(".opt", sh).forEach(x => x.classList.toggle("on", x === o)); setTimeout(closeSheet, 160);
    });
    const p = $(".sheet-p", sh), g = $(".sheet-grab", sh); let y0 = null, dy = 0;
    g.addEventListener("pointerdown", e => { y0 = e.clientY; g.setPointerCapture(e.pointerId); p.style.transition = "none"; });
    g.addEventListener("pointermove", e => { if (y0 === null) return; dy = Math.max(0, e.clientY - y0); p.style.transform = "translateY(" + dy + "px)"; });
    const end = () => { if (y0 === null) return; y0 = null; p.style.transition = ""; p.style.transform = ""; if (dy > 80) closeSheet(); dy = 0; };
    g.addEventListener("pointerup", end); g.addEventListener("pointercancel", end);
    setTimeout(() => { const f = $(".opt.on", sh) || $(".opt", sh); if (f) f.focus({ preventScroll: true }); }, 350);
  }
  addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });

  /* ---------- swipe along the bottom bar to switch pages (like Telegram's tab bar) ---------- */
  function bindBar() {
    const tr = $("#btrack"); if (!tr) return;
    const items = $$("a", tr), rtl = () => doc.dir === "rtl";
    let sx = 0, id = null, drag = false, last = -1;
    const frac = x => { const r = tr.getBoundingClientRect(), w = r.width / items.length; return (rtl() ? r.right - x : x - r.left) / w - 0.5; };
    tr.addEventListener("pointerdown", e => { if (e.pointerType === "mouse" && e.button) return; sx = e.clientX; id = e.pointerId; drag = false; });
    tr.addEventListener("pointermove", e => {
      if (id !== e.pointerId) return;
      if (!drag) { if (Math.abs(e.clientX - sx) < 10) return; drag = true; tr.classList.add("drag"); try { tr.setPointerCapture(id); } catch (_) {} }
      const f = Math.min(items.length - 1, Math.max(0, frac(e.clientX))); tr.style.setProperty("--idx", f);
      const k = Math.round(f);
      if (k !== last) { last = k; items.forEach((x, i) => x.classList.toggle("hot", i === k)); if (navigator.vibrate) navigator.vibrate(6); }
    });
    const end = e => {
      if (id !== e.pointerId) return; id = null; if (!drag) return; drag = false;
      const k = Math.max(0, Math.min(items.length - 1, Math.round(parseFloat(tr.style.getPropertyValue("--idx")) || 0)));
      tr.classList.remove("drag"); items.forEach(x => x.classList.remove("hot")); last = -1;
      skipClick = true; setTimeout(() => { skipClick = false; }, 350);
      tr.style.setProperty("--idx", k);
      if (items[k].dataset.p === cur()) return;
      const r = routeOf(items[k].href); if (r) go(r, true);
    };
    tr.addEventListener("pointerup", end); tr.addEventListener("pointercancel", end);
  }

  /* ---------- in-page navigation (no reload, no flash) ---------- */
  const PAGES = ["services", "projects", "about", "process", "contact"];
  function routeOf(href) {
    let u; try { u = new URL(href, location.href); } catch (e) { return null; }
    if (!u.href.startsWith(BASE)) return null;
    const path = u.href.slice(BASE.length).split(/[?#]/)[0].replace(/\.html$/, "").replace(/\/$/, "");
    if (path === "" || path === "index") return { page: "home", slug: "", u };
    if (PAGES.includes(path)) return { page: path, slug: "", u };
    const m = path.match(/^projects\/([\w-]+)$/);
    if (m && D.projects.some(p => p.slug === m[1])) return { page: "project", slug: m[1], u };
    return null;
  }
  function updateNav() {
    $$("#bnav a").forEach(x => { if (x.dataset.p === cur()) x.setAttribute("aria-current", "page"); else x.removeAttribute("aria-current"); });
    const tr = $("#btrack"); if (tr) tr.style.setProperty("--idx", NAV.findIndex(n => n[0] === cur()));
  }
  function go(r, push) {
    const same = r.page === PAGE && r.slug === SLUG;
    if (push) history.pushState(null, "", r.u.href);
    if (same) { if (r.u.hash && $(r.u.hash)) $(r.u.hash).scrollIntoView(); else scrollTo({ top: 0, behavior: "smooth" }); return; }
    PAGE = r.page; SLUG = r.slug; body.dataset.page = PAGE; body.dataset.slug = SLUG;
    scrollTo({ top: 0, behavior: "instant" });
    renderPage(); updateNav(); onScroll();
    const m = $("#app"); m.style.animation = "none"; void m.offsetWidth; m.style.animation = "";
  }
  let skipClick = false;
  document.addEventListener("click", e => {
    if (skipClick) { e.preventDefault(); e.stopPropagation(); return; }
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = e.target.closest("a[href]");
    if (!el || el.target || el.hasAttribute("download")) return;
    const r = routeOf(el.href); if (!r) return;
    e.preventDefault(); go(r, true);
  });
  addEventListener("popstate", () => { const r = routeOf(location.href); if (r) go(r, false); });
  setTimeout(() => { const b = $("#bnav"); if (b) b.classList.add("still"); }, 1200);

  /* ---------- init ---------- */
  renderHeader(); renderFooter(); renderPage(); bindShell(); onScroll();
  let tick = false;
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { onScroll(); tick = false; }); } }, { passive: true });
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => { if (!store.get("dx-theme")) doc.dataset.theme = e.matches ? "light" : "dark"; });
  addEventListener("pageshow", e => { if (e.persisted) body.classList.remove("swap"); });
})();
