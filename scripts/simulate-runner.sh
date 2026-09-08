#!/bin/sh
# =====================================================================
# Simulation locale de l'étape « runner » du Dockerfile EMERAUDE
# Reproduit exactement ce que fera le conteneur final :
#   1. copie du standalone + des briques Prisma (comme les COPY --from)
#   2. exécution de docker-entrypoint.sh (prisma db push + node server.js)
#   3. healthcheck (curl /api) + test de la page d'accueil
# =====================================================================
set -e

PROJET=/home/z/my-project
SIM=$PROJET/.zscripts/runner-sim

echo "=== Préparation du répertoire de simulation ==="
rm -rf "$SIM"
mkdir -p "$SIM"

# 1) Serveur standalone (server.js + node_modules tracés + .next/static + public)
cp -r "$PROJET/.next/standalone/." "$SIM/"
rm -f "$SIM/.env"   # pas de .env dans l'image Docker (fichier non suivi par git)

# 2) CLI Prisma + moteurs + client généré (identiques aux COPY --from=builder)
cp -r "$PROJET/node_modules/prisma" "$SIM/node_modules/"
cp -r "$PROJET/node_modules/@prisma" "$SIM/node_modules/"
cp -r "$PROJET/node_modules/.prisma" "$SIM/node_modules/"

# 3) Schéma + point d'entrée
cp -r "$PROJET/prisma" "$SIM/prisma"
cp "$PROJET/docker-entrypoint.sh" "$SIM/docker-entrypoint.sh"
chmod +x "$SIM/docker-entrypoint.sh"

echo "=== Lancement du point d'entrée (comme le conteneur) ==="
cd "$SIM"
DATABASE_URL="file:$SIM/db/custom.db" PORT=3999 HOSTNAME=127.0.0.1 \
  sh docker-entrypoint.sh > "$SIM/sim.log" 2>&1 &
SIM_PID=$!

# Attente du démarrage (prisma db push + serveur Next)
i=0
until curl -s -o /dev/null http://127.0.0.1:3999/api 2>/dev/null; do
  i=$((i+1))
  if [ $i -ge 30 ]; then echo "ECHEC : serveur non démarré après 30s"; break; fi
  sleep 1
done

echo "=== Résultats ==="
curl -s -o /dev/null -w "GET /api  -> HTTP %{http_code}\n" http://127.0.0.1:3999/api || echo "GET /api -> ECHEC"
curl -s -o /dev/null -w "GET /    -> HTTP %{http_code}\n" http://127.0.0.1:3999/ || echo "GET /    -> ECHEC"
echo "--- corps /api ---"
curl -s http://127.0.0.1:3999/api | head -c 200; echo
echo "--- journal du point d'entrée ---"
cat "$SIM/sim.log"

echo "=== Nettoyage ==="
kill $SIM_PID 2>/dev/null || true
pkill -f "runner-sim/server.js" 2>/dev/null || true
sleep 1
rm -rf "$SIM"
echo "OK — simulation terminée."
