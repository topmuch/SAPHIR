#!/usr/bin/env python3
"""Traite le logo EMERAUDE : recadrage, extraction du diamant, transparence, variantes."""
from PIL import Image, ImageFilter
import os

SRC = '/home/z/my-project/upload/WhatsApp Image 2026-09-08 at 10.49.39.jpeg'
OUT = '/home/z/my-project/public/images'
os.makedirs(OUT, exist_ok=True)

img = Image.open(SRC).convert('RGB')
w, h = img.size

def is_white(p, tol=18):
    return all(v >= 255 - tol for v in p)

def is_colored(p):
    return (max(p) - min(p)) > 30

# ── 1. Recadrage automatique (bounding box des pixels non blancs) ──
px = img.load()
min_x, min_y, max_x, max_y = w, h, 0, 0
for y in range(0, h, 2):
    for x in range(0, w, 2):
        if not is_white(px[x, y], 25):
            min_x, min_y = min(min_x, x), min(min_y, y)
            max_x, max_y = max(max_x, x), max(max_y, y)

pad = 12
box = (max(0, min_x - pad), max(0, min_y - pad), min(w, max_x + pad), min(h, max_y + pad))
trimmed = img.crop(box)
tw, th = trimmed.size
print(f"Recadré : {tw}x{th} (boîte {box})")

# ── 2. Détection de la séparation diamant / texte (densité par ligne) ──
tpx = trimmed.load()
row_density = []
for y in range(th):
    cnt = sum(1 for x in range(0, tw, 2) if is_colored(tpx[x, y]))
    row_density.append(cnt)

# Trouve le PREMIER "gap" (lignes quasi vides) après 30% de la hauteur :
# c'est la séparation entre le diamant (avec sa lueur) et le texte EMERAUDE
gap_start, gap_len, cur_start, cur_len = -1, 0, -1, 0
start_search = int(th * 0.30)
for y in range(start_search, th):
    if row_density[y] <= max(3, tw // 100):
        if cur_start < 0:
            cur_start = y
        cur_len = y - cur_start + 1
        if cur_len >= 8 and gap_start < 0:
            gap_start, gap_len = cur_start, cur_len
            break
    else:
        cur_start, cur_len = -1, 0

print(f"Séparation diamant/texte : ligne {gap_start} (gap {gap_len}px)")
mark_end = gap_start if gap_start > 0 else int(th * 0.68)

# ── 3. Extraction du diamant (mark) ──
mark = trimmed.crop((0, 0, tw, mark_end))
# Re-recadre le mark sur ses pixels colorés
mpx = mark.load()
mw, mh = mark.size
mmx, mmy, Mmx, Mmy = mw, mh, 0, 0
for y in range(mh):
    for x in range(mw):
        if is_colored(mpx[x, y]):
            mmx, mmy = min(mmx, x), min(mmy, y)
            Mmx, Mmy = max(Mmx, x), max(Mmy, y)
mark = mark.crop((max(0, mmx - 6), max(0, mmy - 6), min(mw, Mmx + 6), min(mh, Mmy + 6)))
mw, mh = mark.size
print(f"Mark diamant : {mw}x{mh}")

# ── 4. Fonction blanc → transparent ──
def make_transparent(im, ramp=140):
    im = im.convert('RGBA')
    data = im.getdata()
    out = []
    for r, g, b, a in data:
        d = ((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2) ** 0.5
        alpha = int(min(255, max(0, (d / ramp) * 255 - 30)))
        out.append((r, g, b, alpha))
    im.putdata(out)
    return im

# ── 5. Mark sur canvas carré transparent (avec halo lumineux léger) ──
side = max(mw, mh)
canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
mk = make_transparent(mark)
scale = 0.92
nw, nh = int(mw * scale * side / max(mw, mh) / scale * scale), int(mh * scale)
nw, nh = int(side * scale * mw / max(mw, mh)), int(side * scale * mh / max(mw, mh))
mk_resized = mk.resize((nw, nh), Image.LANCZOS)
canvas.paste(mk_resized, ((side - nw) // 2, (side - nh) // 2), mk_resized)
canvas_512 = canvas.resize((512, 512), Image.LANCZOS)
canvas_512.save(f'{OUT}/logo-mark.png')
print("→ logo-mark.png (512x512, transparent)")

# Favicon PNG 64px
canvas_512.resize((64, 64), Image.LANCZOS).save(f'{OUT}/logo-mark-64.png')
print("→ logo-mark-64.png (64x64)")

# ── 6. Logo complet : version blanche + version transparente ──
trimmed.save(f'{OUT}/logo-full.png')
print("→ logo-full.png (fond blanc)")
full_tr = make_transparent(trimmed)
full_tr.save(f'{OUT}/logo-full-transparent.png')
print("→ logo-full-transparent.png")

# ── 7. Version blanche du logo (pour fonds sombres sans carte) ──
# Inverse la luminance en gardant la teinte : bleus → bleus clairs/blancs
def make_light_version(im):
    im = im.convert('RGBA')
    data = im.getdata()
    out = []
    for r, g, b, a in data:
        d = ((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2) ** 0.5
        alpha = int(min(255, max(0, (d / 140) * 255 - 30)))
        # plus le pixel est coloré/sombre, plus il devient clair
        lum = (r + g + b) / 3
        if d < 60:
            nr, ng, nb = 255, 255, 255
        else:
            # mappe luminance 0-160 → 255-200 (clairs)
            t = max(0.0, min(1.0, lum / 170))
            nr = int(255 - t * 55)
            ng = int(255 - t * 55)
            nb = int(255 - t * 20)  # garde une pointe de bleu
        out.append((nr, ng, nb, alpha))
    im.putdata(out)
    return im

light_logo = make_light_version(trimmed)
light_logo.save(f'{OUT}/logo-full-light.png')
print("→ logo-full-light.png (version claire pour fonds sombres)")

# Vérification
for f in ['logo-mark.png', 'logo-mark-64.png', 'logo-full.png', 'logo-full-transparent.png', 'logo-full-light.png']:
    p = f'{OUT}/{f}'
    print(f"   {f}: {os.path.getsize(p)} octets, {Image.open(p).size}")
