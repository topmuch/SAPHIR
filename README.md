# SAPHIR COM — Site vitrine

Site web de l'agence SAPHIR COM (communication 360°) : Next.js 16 (Turbopack) + React 19 + Tailwind CSS 4 + shadcn/ui + Prisma (SQLite) + framer-motion.

## Stack technique

| Élément | Détail |
|---|---|
| Framework | Next.js 16, output `standalone` |
| UI | React 19, Tailwind 4, shadcn/ui, framer-motion |
| Base de données | Prisma + SQLite (schéma `prisma/schema.prisma`) |
| Runtime / paquets | bun (`bun.lock`) |
| Port par défaut | 3000 (écrasé par la variable `PORT`) |

## Développement local

```bash
bun install
bunx prisma generate
bunx prisma db push          # crée la base SQLite
bun run dev                  # http://localhost:3000
```

Variables d'environnement : voir `.env.example` (`DATABASE_URL`).

---

## Déploiement sur Coolify

Le projet est prêt pour Coolify via un **Dockerfile** (build pack Docker), déjà présent à la racine du repo. L'image finale est basée sur `oven/bun:1`, exécute le serveur Next.js standalone en utilisateur non-root, initialise la base SQLite au démarrage et expose un healthcheck sur `/api`.

### 1. Pousser le repo sur GitHub

Coolify construit l'image depuis Git : les fichiers de déploiement (`Dockerfile`, `docker-entrypoint.sh`, `.dockerignore`) doivent être présents sur la branche principale.

```bash
git add Dockerfile docker-entrypoint.sh .dockerignore .env.example docker-compose.yml README.md
git commit -m "chore(docker): préparation du déploiement Coolify"
git push origin main
```

### 2. Créer la ressource dans Coolify

1. **Resources → Add → Git Repository** (public : `https://github.com/topmuch/SAPHIR`, ou via GitHub App pour un repo privé).
2. **Build Pack : Dockerfile** — Coolify détecte automatiquement le `Dockerfile` à la racine.
3. **Port : 3000** (l'app écoute sur `0.0.0.0:$PORT`, `3000` par défaut).

### 3. Variables d'environnement (onglet Environment)

| Variable | Valeur | Obligatoire |
|---|---|---|
| `DATABASE_URL` | `file:/app/db/custom.db` | Oui |

Aucune autre variable n'est nécessaire. Le port est géré par Coolify.

### 4. Stockage persistant (important — SQLite)

La base SQLite vit dans `/app/db`. Pour qu'elle survive aux redéploiements :

**Persistent Storage → Add volume :**
- Mount path : `/app/db`
- (laisser Coolify créer le volume — ne pas utiliser de bind mount vers un dossier host root)

Sans ce volume, la base est recréée à chaque déploiement (acceptable tant que la DB n'est pas utilisée, mais à configurer dès maintenant pour éviter les surprises).

### 5. Déployer

**Deploy**. Le premier build prend quelques minutes (install + `next build`). Surveillez les logs :

```
[entrypoint] Schéma Prisma -> file:/app/db/custom.db
[entrypoint] Base de données prête.
[entrypoint] Démarrage de SAPHIR sur 0.0.0.0:3000
```

Ajoutez ensuite un **domaine** dans l'onglet Domains (Coolify génère le HTTPS via son proxy Traefik automatiquement).

### Mises à jour

Chaque `git push` sur la branche suivie déclenche un rebuild + redéploiement automatique si le webhook est configuré, sinon relancez **Deploy**. Le schéma Prisma est réappliqué à chaque démarrage (`prisma db push`, idempotent).

---

## Test local du conteneur (identique à Coolify)

```bash
docker compose up --build
# → http://localhost:3000
```

## Passer de SQLite à PostgreSQL (optionnel)

Sur Coolify, vous pouvez ajouter une base PostgreSQL managée (Add resource → PostgreSQL) puis :

1. `prisma/schema.prisma` : `provider = "postgresql"`
2. Variables Coolify : `DATABASE_URL=postgresql://user:pass@host:5432/saphir`
3. Redéployer — le schéma est appliqué au démarrage par l'entrypoint.

## Structure du déploiement

```
Dockerfile              # build multi-stage (deps → build → runtime)
docker-entrypoint.sh    # init Prisma + lancement du serveur
.dockerignore           # contexte de build minimal
docker-compose.yml      # test local du même setup
.env.example            # documentation des variables
```
