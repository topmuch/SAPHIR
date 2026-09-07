# syntax=docker/dockerfile:1

# =====================================================================
# SAPHIR COM — Image Docker pour déploiement Coolify
# Stack : Next.js 16 (standalone) + React 19 + Tailwind 4 + Prisma/SQLite
# Runtime : bun (cohérent avec bun.lock et les scripts du projet)
# Le serveur écoute sur 0.0.0.0:${PORT:-3000} (PORT injecté par Coolify)
# =====================================================================

# ── Base commune ─────────────────────────────────────────────────────
FROM oven/bun:1 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ── Étape 1 : dépendances ────────────────────────────────────────────
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ── Étape 2 : build ──────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# URL factice suffisante pour `prisma generate` (aucune DB contactée au build)
ENV DATABASE_URL="file:/app/db/custom.db"
RUN bunx prisma generate
# `next build` + copie de .next/static et public dans .next/standalone (script npm)
RUN bun run build

# ── Étape 3 : runtime ────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    DATABASE_URL="file:/app/db/custom.db"

# Utilisateur non-root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs \
 && mkdir -p /app/db \
 && chown -R nextjs:nodejs /app

# App standalone : server.js + node_modules tracés + .next/static + public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Prisma (CLI + engines + client généré) pour initialiser la base au démarrage
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Script de démarrage : init/migration SQLite puis serveur Next.js
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Volume SQLite (données persistantes entre les déploiements)
VOLUME /app/db

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

ENTRYPOINT ["./docker-entrypoint.sh"]
