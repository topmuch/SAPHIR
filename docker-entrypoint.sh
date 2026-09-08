#!/bin/sh
# =====================================================================
# EMERAUDE — point d'entrée du conteneur (Coolify / Docker)
# 1. Reprise d'une ancienne base si présente (/app/data/saphir.db)
# 2. Applique le schéma Prisma à la base SQLite (idempotent, rapide)
# 3. Lance le serveur Next.js standalone (node)
# =====================================================================
set -e

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$APP_DIR"

DB_URL="${DATABASE_URL:-file:/app/db/custom.db}"
DB_PATH="${DB_URL#file:}"
DB_DIR="$(dirname "$DB_PATH")"

mkdir -p "$DB_DIR" 2>/dev/null || true

# Anciennes images : la base vivait dans /app/data/saphir.db.
# Si un volume y est encore monté, on récupère les données existantes.
if [ ! -f "$DB_PATH" ] && [ -f /app/data/saphir.db ]; then
  echo "[entrypoint] Ancienne base détectée (/app/data/saphir.db) -> $DB_PATH"
  cp /app/data/saphir.db "$DB_PATH" || true
fi

echo "[entrypoint] Schéma Prisma -> $DB_URL"
if node "$APP_DIR/node_modules/prisma/build/index.js" db push --skip-generate --accept-data-loss; then
  echo "[entrypoint] Base de données prête."
else
  # La DB n'est pas indispensable au démarrage du site public :
  # on ne bloque pas le conteneur si l'init échoue.
  echo "[entrypoint] AVERTISSEMENT : échec de l'init Prisma, démarrage du site quand même." >&2
fi

echo "[entrypoint] Démarrage de EMERAUDE sur ${HOSTNAME:-0.0.0.0}:${PORT:-3000}"
exec node "$APP_DIR/server.js"
