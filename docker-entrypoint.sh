#!/bin/sh
# =====================================================================
# SAPHIR COM — point d'entrée du conteneur (Coolify / Docker)
# 1. Applique le schéma Prisma à la base SQLite (idempotent, rapide)
# 2. Lance le serveur Next.js standalone
# =====================================================================
set -e

echo "[entrypoint] Schéma Prisma -> ${DATABASE_URL:-file:/app/db/custom.db}"
if bun /app/node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss; then
  echo "[entrypoint] Base de données prête."
else
  # La DB n'est pas encore utilisée par les routes actuelles :
  # on ne bloque pas le démarrage du site si l'init échoue.
  echo "[entrypoint] AVERTISSEMENT : échec de l'init Prisma, démarrage du site quand même." >&2
fi

echo "[entrypoint] Démarrage de SAPHIR sur ${HOSTNAME:-0.0.0.0}:${PORT:-3000}"
exec bun server.js
