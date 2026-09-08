#!/usr/bin/env python3
"""Vérifie la structure verticale du logo : profil de densité par ligne."""
from PIL import Image

img = Image.open('/home/z/my-project/public/images/logo-full.png').convert('RGB')
w, h = img.size

def is_colored(p):
    return (max(p) - min(p)) > 30

px = img.load()
density = []
for y in range(h):
    cnt = sum(1 for x in range(0, w, 2) if is_colored(px[x, y]))
    density.append(cnt)

# Affiche le profil compressé : bandes de 10 lignes
print("Ligne → densité (1 caractère = 5% de largeur)")
for y in range(0, h, 5):
    d = max(density[y:y+5])
    bar = '#' * min(60, int(60 * d / (w / 2)))
    print(f"{y:4d} {d:4d} {bar}")

# Trouve tous les gaps (>= 8 lignes consécutives quasi vides)
print("\n=== Gaps détectés ===")
gap_start, cur_len = -1, 0
gaps = []
for y in range(h):
    if density[y] <= max(3, w // 100):
        if gap_start < 0:
            gap_start = y
        cur_len = y - gap_start + 1
    else:
        if cur_len >= 8 and gap_start > 0:
            gaps.append((gap_start, cur_len))
        gap_start, cur_len = -1, 0
if cur_len >= 8 and gap_start > 0:
    gaps.append((gap_start, cur_len))
for g in gaps:
    print(f"Gap: lignes {g[0]}–{g[0]+g[1]} ({g[1]}px)")
