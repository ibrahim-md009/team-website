"""Generates the standalone DARCX SVG assets from assets/js/logo.js.
Run from the project root:  python3 tools/make_logos.py"""
import json, os
src = open("assets/js/logo.js", encoding="utf-8").read()
L = json.loads(src.split("=", 1)[1].strip().rstrip(";"))
VB = L["viewBox"]
SAGE, SAND, BLUE, TAUPE, INK, WHITE = "#A7B4A8", "#C9B9B9", "#8998A8", "#B49D94", "#0E1116", "#F5F5F3"
def pal(mode):
    return {"sage": SAGE, "sand": SAND, "taupe": TAUPE,
            "d": INK if mode == "light" else WHITE, "d2": BLUE}
def paths(mode):
    p = pal(mode)
    return "".join(f'<path d="{x["d"]}" fill="{p[x["c"]]}"' + (' fill-rule="evenodd"' if x.get("r") else "") + '/>' for x in L["parts"])
def write(name, svg):
    open(f"assets/logo/{name}", "w", encoding="utf-8").write(svg)
os.makedirs("assets/logo", exist_ok=True)
# icon / monogram only ("light" = for light backgrounds, "dark" = for dark backgrounds)
for m in ("light", "dark"):
    write(f"darcx-mark-{m}.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VB}" role="img" aria-label="DARCX">{paths(m)}</svg>')
# full horizontal lockup: mark + DARCX + DIGITAL SOLUTIONS
for m in ("light", "dark"):
    fg = INK if m == "light" else WHITE
    write(f"darcx-logo-{m}.svg",
      f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 84" role="img" aria-label="DARCX Digital Solutions">'
      f'<g>{paths(m)}</g>'
      f'<text x="130" y="48" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="600" font-size="34" letter-spacing="9" fill="{fg}">DARCX</text>'
      f'<text x="132" y="70" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="500" font-size="9.5" letter-spacing="5.2" fill="{TAUPE}">DIGITAL SOLUTIONS</text></svg>')
# favicon / app icon: charcoal rounded square + dark-mode mark
p = pal("dark")
inner = paths("dark")
write("../favicon.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="30" fill="{INK}"/><g transform="translate(14 21) scale(.97)">{inner}</g></svg>')
write("darcx-app-icon-dark.svg", open("assets/favicon.svg", encoding="utf-8").read())
light_inner = paths("light")
write("darcx-app-icon-light.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="30" fill="{WHITE}"/><g transform="translate(14 21) scale(.97)">{light_inner}</g></svg>')
print("logos written")
