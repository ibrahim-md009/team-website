"""Generates the HTML page shells. Content lives in assets/js/data.js.
Run: python3 build.py   (only needed if you add pages or change the shell)"""
import json, os, re
data = open("assets/js/data.js", encoding="utf-8").read()
slugs = re.findall(r'slug:\s*"([^"]+)"', data)
SEO = {
 "home": ("DARCX | نبني منتجات رقمية تعمل", "استوديو برمجيات يبني مواقع وتطبيقات وأنظمة إدارة أعمال مبنية حول عملك."),
 "services": ("خدماتنا | DARCX", "مواقع إلكترونية، لوحات تحكم، تطبيقات جوال وأنظمة إدارة أعمال."),
 "projects": ("أعمالنا | DARCX", "مشاريع DARCX: البلد للمياه، كيو ستوديو، نظام نقاط البيع ونظام إدارة الاستوديو."),
 "about": ("من نحن | DARCX", "تعرّف على DARCX ومهاراتها والتقنيات التي تستخدمها."),
 "process": ("طريقة العمل | DARCX", "كيف نعمل من الفكرة حتى الإطلاق."),
 "contact": ("تواصل معنا | DARCX", "أرسل طلب مشروعك إلى DARCX."),
}
FILES = {"home": "index.html", "services": "services.html", "projects": "projects.html", "about": "about.html", "process": "process.html", "contact": "contact.html"}
TPL = """<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:type" content="website"><meta property="og:site_name" content="DARCX">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:locale" content="ar_AR">
<meta name="theme-color" content="#0E1116">
<link rel="icon" href="{root}assets/favicon.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="{root}assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script>
/* applies saved language + theme before first paint (no flash) */
(function(){var d=document.documentElement,g=function(k){try{return localStorage.getItem(k)}catch(e){return null}};
var l=g("dx-lang")==="en"?"en":"ar",t=g("dx-theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
d.lang=l;d.dir=l==="ar"?"rtl":"ltr";d.dataset.theme=t;})();
</script>
<link rel="stylesheet" href="{root}assets/css/styles.css">
</head>
<body data-page="{page}" data-root="{root}"{slug}>
<div id="hdr"></div>
<main id="app"><noscript><p style="padding:140px 24px">DARCX — Digital Solutions. {desc}</p></noscript></main>
<div id="ftr"></div>
<script src="{root}assets/js/data.js"></script>
<script src="{root}assets/js/app.js"></script>
</body>
</html>
"""
def write(path, **kw):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    out = TPL
    for k, v in kw.items():
        out = out.replace("{" + k + "}", v)
    open(path, "w", encoding="utf-8").write(out)
for page, f in FILES.items():
    t, d = SEO[page]; write(f, title=t, desc=d, root="", page=page, slug="")
NAMES = re.findall(r'slug:\s*"([^"]+)".*?name:\s*\{\s*ar:\s*"([^"]+)"', data, re.S)
SHORT = re.findall(r'short:\s*\{\s*ar:\s*"([^"]+)"', data)
for (s, nm), sh in zip(NAMES, SHORT):
    write(f"projects/{s}.html", title=f"{nm} | DARCX", desc=sh, root="../", page="project", slug=f' data-slug="{s}"')
print("built", len(FILES) + len(slugs), "pages")
