"""Builds web assets from the OFFICIAL DARCX logo image (tools/source/darcx-logo-official.png).
The logo is used as supplied: this script only removes the flat dark background
(so it works on light and dark pages), crops to the monogram and makes icon sizes.
Run from the project root:  python3 tools/make_logo_assets.py"""
from PIL import Image, ImageFilter, ImageDraw
import numpy as np, os
SRC = "tools/source/darcx-logo-official.png"
im = Image.open(SRC).convert("RGB"); a = np.array(im).astype(int)
bg = np.median(a[:40, :40].reshape(-1, 3), axis=0)
d = np.abs(a - bg).sum(2)
from scipy import ndimage as ndi
m = d > 45
m[332:400, 484:585] = True                                  # the top of the D fades into the background colour: keep it solid
lab, n = ndi.label(m); sizes = ndi.sum(m, lab, range(1, n + 1))
m = np.isin(lab, [i + 1 for i, v in enumerate(sizes) if v > 400])   # drop specks
core = ndi.binary_erosion(m, iterations=3)
idx = ndi.distance_transform_edt(~core, return_distances=False, return_indices=True)
c_in = a[idx[0], idx[1]].astype(float)                       # nearest solid colour for every pixel
v = c_in - bg; denom = (v * v).sum(2) + 1e-6
alpha = np.clip(((a - bg) * v).sum(2) / denom, 0, 1)         # how much of that colour is present (true edge coverage)
alpha[~ndi.binary_dilation(m, iterations=3)] = 0
alpha[core] = 1
dark = denom < 900                                           # near-background colours (top of the D): use the shape mask instead
alpha[dark & ndi.binary_dilation(m, iterations=1)] = ndi.gaussian_filter(m.astype(float), .8)[dark & ndi.binary_dilation(m, iterations=1)]
mask = Image.fromarray((alpha * 255).astype(np.uint8))
rgba = Image.fromarray(c_in.astype(np.uint8)).convert("RGBA"); rgba.putalpha(mask)
bbox = mask.point(lambda v: 255 if v > 40 else 0).getbbox()
x0, y0, x1, y1 = bbox; pad = 6
rgba = rgba.crop((x0 - pad, y0 - pad, x1 + pad, y1 + pad))
rgba = rgba.resize((rgba.width * 2, rgba.height * 2), Image.LANCZOS)
os.makedirs("assets/logo", exist_ok=True)
rgba.save("assets/logo/darcx-monogram.png", optimize=True)
# app icon tiles (dark rounded square + official monogram)
def tile(size, path, bgc=(14, 17, 22, 255), fill=.64):
    t = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(t).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * .23), fill=bgc)
    w = int(size * fill); h = int(w * rgba.height / rgba.width)
    lg = rgba.resize((w, h), Image.LANCZOS)
    t.alpha_composite(lg, ((size - w) // 2, (size - h) // 2)); t.save(path, optimize=True)
tile(512, "assets/icon-512.png"); tile(192, "assets/icon-192.png"); tile(180, "assets/apple-touch-icon.png"); tile(64, "assets/favicon.png")
print("logo assets built", rgba.size)
