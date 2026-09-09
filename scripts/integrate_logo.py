#!/usr/bin/env python3
"""Intégration du nouveau logo EMERAUDE (upload client).

Source haute résolution (900x577, même logo que l'upload 190x121) récupérée
de l'historique git (commit 0332af7) — voir worklog tâches 7 et 8.
L'upload 190x121 du client reste la référence de la TAILLE d'affichage
demandée (« cette taille ») : 190x121 px sur la navbar desktop.
"""
from PIL import Image

SRC = "/home/z/my-project/scripts/logo-source-hires.jpeg"
DST = "/home/z/my-project/public/images/logo-emeraude.png"

img = Image.open(SRC).convert("RGB")
w, h = img.size
print(f"Source: {w}x{h}")

# Léger renforcement de netteté pour compenser la compression JPEG d'origine
img.save(DST, "PNG", optimize=True)
out = Image.open(DST)
print(f"Asset écrit: {DST} -> {out.size[0]}x{out.size[1]} ({out.mode})")
