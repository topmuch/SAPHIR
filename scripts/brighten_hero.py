#!/usr/bin/env python3
"""Éclaircit la bannière hero-wide.png (jugée trop sombre par le client).

Méthode : courbe gamma + légère hausse de luminosité/contraste.
La bannière d'origine est conservée (tons dorés + compo) — juste plus lumineuse.

NB : le fichier hero-wide.png d'origine contient en réalité des données JPEG
(extension .png mais format JPEG). On conserve cette convention pour garder
un poids de fichier équivalent (~140 Ko) au lieu des 1,1 Mo d'un vrai PNG.
"""
from PIL import Image, ImageEnhance, ImageStat

SRC = "/home/z/my-project/public/hero-wide.png"
DST = "/home/z/my-project/public/hero-wide.png"

img = Image.open(SRC).convert("RGB")

# 1) Courbe gamma (lève les tons sombres sans cramer les tons clairs)
gamma = 0.75  # < 1 éclaircit
lut = [min(255, int((i / 255) ** gamma * 255 + 0.5)) for i in range(256)] * 3
img = img.point(lut)

# 2) Petite hausse de luminosité (+8%) et de contraste (+4%) pour la punch
img = ImageEnhance.Brightness(img).enhance(1.08)
img = ImageEnhance.Contrast(img).enhance(1.04)

# 3) Sauvegarde JPEG (comme l'original) — extension .png conservée
img.save(DST, "JPEG", quality=88, optimize=True)

# Vérification
import os
check = Image.open(DST).convert("L")
w, h = check.size
print(f"Avant : luminosité moyenne 93.3/255 (moitié gauche 85.5), 140 Ko")
print(f"Après : luminosité moyenne {ImageStat.Stat(check).mean[0]:.1f}/255")
print(f"        moitié gauche      {ImageStat.Stat(check.crop((0, 0, w//2, h))).mean[0]:.1f}/255")
print(f"        poids fichier      {os.path.getsize(DST) // 1024} Ko")
