# syntax=docker/dockerfile:1
# =====================================================================
# EMERAUDE (ex-SAPHIR) — image de production pour Coolify
#
# Build en 2 étapes pour une image finale légère : l'étape « builder »
# (clone du dépôt, bun install, next build, cache complet) n'est jamais
# exportée — seule l'étape « runner » (~400-500 Mo) l'est, contre
# ~1,5-2 Go en mono-étape. Réduit fortement la pression disque du
# serveur au moment de l'export de l'image.
#
#   étape 1 (builder) : clone du dépôt GitHub + bun install + next build
#   étape 2 (runner)  : serveur Next.js standalone + CLI Prisma
#
# La base SQLite est créée / mise à jour au démarrage via `prisma db
# push` (idempotent). Volume persistant Coolify recommandé : /app/db
# =====================================================================

# ---------- Étape 1 : builder ----------
FROM node:20-alpine AS builder

# git : clone du dépôt ; libc6-compat + sqlite : compat runtime
RUN apk add --no-cache git libc6-compat sqlite
RUN npm install -g bun

WORKDIR /app

# Code source : dépôt GitHub public (branche main).
# Le clone garantit que l'image est construite depuis le code poussé,
# même si le contexte de build est vide (Dockerfile collé dans Coolify).
RUN git clone --depth 1 https://github.com/topmuch/SAPHIR.git .

# Dépendances (verrouillées par bun.lock)
RUN bun install

# Client Prisma (généré dans node_modules/.prisma)
RUN npx prisma generate

# Build Next.js (sortie standalone : server.js + node_modules minimaux)
# DB de build jetable — aucune donnée n'est embarquée dans l'image.
RUN NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=file:/tmp/emeraude-build.db bun run build

# ---------- Étape 2 : image finale ----------
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat sqlite

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    DATABASE_URL=file:/app/db/custom.db

# 1) Serveur standalone (server.js + node_modules tracés + .next/static + public)
COPY --from=builder --chown=node:node /app/.next/standalone ./

# 2) CLI Prisma + moteurs + client généré : permet `db push` au démarrage
#    (fusion dans node_modules — mêmes versions que lors du build)
COPY --from=builder --chown=node:node /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=node:node /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=node:node /app/node_modules/.prisma ./node_modules/.prisma

# 3) Schéma Prisma + point d'entrée
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/docker-entrypoint.sh /app/docker-entrypoint.sh

RUN chmod +x /app/docker-entrypoint.sh \
    && mkdir -p /app/db \
    && chown -R node:node /app/db

# Utilisateur non-root (image node:20-alpine : utilisateur « node », uid 1000)
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api').then(r=>process.exit(r.status<400?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["/app/docker-entrypoint.sh"]
