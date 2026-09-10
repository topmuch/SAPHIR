#!/usr/bin/env python3
"""Intégration du NOUVEAU logo EMERAUDE (tâche 11 — « change le logo en gardant la taille »).

Source : upload client 150x95 JPEG (diamant compact + EMERAUDE + double trait).
L'ancien logo (900x577, tâche 8) reste récupérable via git (commit 39fc197).

Traitement :
- conversion directe SANS recadrage (marges quasi identiques à l'ancien :
  87,3% de largeur utile vs 86,3% -> même présence visuelle dans les boîtes)
- upscale x6 LANCZOS (150x95 -> 900x570) : le plus grand affichage est
  190x121 CSS px (380x242 en retina) — le navigateur re-échantillonne
  ainsi une source ample au lieu d'agrandir un petit raster
- légère accentuation pour compenser la compression JPEG de WhatsApp
- PNG RGB fond blanc (même convention que l'ancien asset : boîte blanche)

Les tailles d'affichage (navbar 190x121 / 110x70, footer 100x64, CTA 150x96,
login 126x80, admin 100x64) sont dans le code et ne changent PAS :
le remplacement du fichier asset suffit.
"""
import shutil
from PIL import Image, ImageFilter

SRC = "/home/z/my-project/upload/WhatsApp Image 2026-09-08 at 10.49.39.jpeg"
BACKUP = "/home/z/my-project/scripts/logo-source-v2.jpeg"
DST = "/home/z/my-project/public/images/logo-emeraude.png"

# 0) Sauvegarde de la source (protection contre le phénomène d'écrasement d'upload)
shutil.copy2(SRC, BACKUP)

# 1) Chargement
img = Image.open(SRC).convert("RGB")
w, h = img.size
print(f"Source: {w}x{h}")

# 2) Upscale x6 LANCZOS
up = img.resize((w * 6, h * 6), Image.LANCZOS)
print(f"Upscale x6: {up.size[0]}x{up.size[1]}")

# 3) Accentuation légère (compense JPEG + interpolation)
up = up.filter(ImageFilter.UnsharpMask(radius=2, percent=65, threshold=2))

# 4) Écriture de l'asset final
up.save(DST, "PNG", optimize=True)
out = Image.open(DST)
import os
print(f"Asset écrit: {DST} -> {out.size[0]}x{out.size[1]} ({out.mode}, {os.path.getsize(DST)} octets)")
print(f"Ratio nouveau: {out.size[0]/out.size[1]:.3f} (affiches ~1.56-1.58, ancien 1.559)")
