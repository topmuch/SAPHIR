#!/usr/bin/env python3
"""Analyse les couleurs dominantes du logo uploadé."""
from PIL import Image
from collections import Counter
import colorsys

img = Image.open('/home/z/my-project/upload/WhatsApp Image 2026-09-08 at 10.49.39.jpeg').convert('RGB')
img_small = img.resize((150, 96))
pixels = list(img_small.getdata())

# Quantification en buckets de 16 pour regrouper les couleurs proches
def bucket(c, step=24):
    return tuple((v // step) * step + step // 2 for v in c)

counts = Counter(bucket(p) for p in pixels)
total = len(pixels)

print("=== Couleurs dominantes (buckets) ===")
for color, count in counts.most_common(15):
    pct = 100 * count / total
    hexv = '#{:02x}{:02x}{:02x}'.format(*color)
    r, g, b = [v / 255 for v in color]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    print(f"{hexv}  {pct:5.1f}%   HSL({h*360:.0f}, {s*100:.0f}%, {l*100:.0f}%)")

# Analyse par zones (centre vs bords) pour détecter le fond
w, h = img.size
center = img.crop((w//4, h//4, 3*w//4, 3*h//4)).resize((50, 32))
print("\n=== Couleurs du CENTRE (cœur du logo) ===")
cc = Counter(bucket(p) for p in list(center.getdata()))
for color, count in cc.most_common(10):
    pct = 100 * count / (50*32)
    hexv = '#{:02x}{:02x}{:02x}'.format(*color)
    print(f"{hexv}  {pct:5.1f}%")

# Coins = fond probable
print("\n=== Couleurs des COINS (fond probable) ===")
corners = []
for box in [(0,0,80,60), (w-80,0,w,60), (0,h-60,80,h), (w-80,h-60,w,h)]:
    corners.extend(list(img.crop(box).resize((20,14)).getdata()))
cocc = Counter(bucket(p) for p in corners)
for color, count in cocc.most_common(6):
    pct = 100 * count / len(corners)
    hexv = '#{:02x}{:02x}{:02x}'.format(*color)
    print(f"{hexv}  {pct:5.1f}%")
