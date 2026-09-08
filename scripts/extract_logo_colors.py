#!/usr/bin/env python3
"""Extraction précise des couleurs du logo (pixels non blanchis, sans bucket)."""
from PIL import Image
from collections import Counter

img = Image.open('/home/z/my-project/upload/WhatsApp Image 2026-09-08 at 10.49.39.jpeg').convert('RGB')
w, h = img.size
pixels = list(img.getdata())

# Pixels "colorés" seulement (non fond blanc : saturation suffisante)
def is_colored(p):
    r, g, b = p
    mx, mn = max(p), min(p)
    return (mx - mn) > 40  # saturation notable

colored = [p for p in pixels if is_colored(p)]
print(f"Pixels colorés : {len(colored)} / {len(pixels)} ({100*len(colored)/len(pixels):.1f}%)")

# Couleurs exactes les plus fréquentes
exact = Counter(colored)
print("\n=== Couleurs EXACTES les plus fréquentes ===")
for color, count in exact.most_common(25):
    pct = 100 * count / len(colored)
    if pct < 0.3: continue
    hexv = '#{:02x}{:02x}{:02x}'.format(*color)
    print(f"{hexv}  {pct:5.1f}% des pixels colorés")

# Regroupement visuel par similarité (distance euclidienne)
def dist(a, b):
    return sum((x-y)**2 for x, y in zip(a, b)) ** 0.5

groups = []  # [ (couleur_moyenne, count) ]
for color, count in exact.items():
    placed = False
    for g in groups:
        if dist(color, g[0]) < 60:
            g[0] = tuple((g[0][i]*g[1] + color[i]*count) // (g[1]+count) for i in range(3))
            g[1] += count
            placed = True
            break
    if not placed:
        groups.append([list(color), count])

groups.sort(key=lambda g: -g[1])
print("\n=== Groupes de couleurs (moyennes) ===")
for color, count in groups[:12]:
    pct = 100 * count / len(colored)
    if pct < 0.5: continue
    hexv = '#{:02x}{:02x}{:02x}'.format(*color)
    print(f"{hexv}  {pct:5.1f}%")
