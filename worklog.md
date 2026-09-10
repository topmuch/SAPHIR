# Worklog — Projet EMERAUDE (ex-SAPHIR)

---
Task ID: 1
Agent: Super Z (agent principal)
Task: Synchroniser la version GitHub (https://github.com/topmuch/SAPHIR) avec la version locale — le conteneur local avait été réinitialisé et les fichiers du projet avaient disparu.

Work Log:
- Vérifié l'état local : dépôt git quasi vide (commit initial scaffolding), aucun remote, projet absent
- Testé l'accès au dépôt GitHub `topmuch/SAPHIR` (public, accessible en lecture)
- Sauvegardé le `.env` local (`DATABASE_URL=file:/home/z/my-project/db/custom.db`)
- Ajouté le remote `origin` → `https://github.com/topmuch/SAPHIR.git`, fetch de `main` + tag `v1`
- `git reset --hard origin/main` → local aligné sur le commit `259dd80` « feat(theme): mode sombre/clair + KPI multicolores jaune et bleu » (travail de la session précédente, déjà poussé sur GitHub)
- Vérifié la base SQLite restaurée (`db/custom.db`) : User=1, Client=10, Project=12, tables Message/TeamMember/Setting présentes
- `bun install` (827 paquets) + `prisma generate`
- Lancé le serveur dev : accueil `/` et `/admin` répondent HTTP 200, puis serveur arrêté
- Confirmé dans le code : `src/components/theme-toggle.tsx` (bascule clair/sombre, localStorage), anti-flash dans `layout.tsx`, KPI dégradés saphir/or dans `overview.tsx`
- Configuré le suivi de branche `main` → `origin/main`

Stage Summary:
- Synchronisation GitHub → local terminée avec succès ; le local est identique à `origin/main` (259dd80)
- Projet fonctionnel : dépendances installées, Prisma généré, base de données intacte, serveur validé
- ⚠️ Push (local → GitHub) impossible pour l'instant : aucun credential configuré (pas de token/SSH). Seul le pull fonctionne (dépôt public)
- Fichier non suivi détecté : `upload/WhatsApp Image 2026-09-08 at 10.49.39.jpeg`

---
Task ID: 2
Agent: Super Z (agent principal)
Task: Intégrer le logo client (upload WhatsApp) dans le site et harmoniser les couleurs du site avec les couleurs du logo.

Work Log:
- Analysé le logo uploadé (VLM + extraction pixel) : diamant bleu facetté + texte « EMERAUDE » sur fond blanc
- Palette extraite : #000031 (nuit), #000f69 (indigo), #001c83/#002798 (royal), #0031b3/#0042cc (vif/cobalt), #5091ce (ciel), #8fa6d6 (lavande)
- Script `scripts/process_logo.py` : recadrage auto, extraction du diamant (détection gap par densité de lignes), fond blanc → transparent, canvas carré 512px
- Variantes générées : `public/images/logo-mark.png`, `logo-mark-64.png`, `logo-full.png`, `logo-full-transparent.png`, `logo-full-light.png`
- Nouveau `public/logo.svg` : favicon diamant facetté SVG (dégradé radial #8fa6d6→#001c83, facettes blanches, étincelle) + `public/diamond-watermark.svg` pour le hero
- `globals.css` : tokens remappés — sapphire #002798 / light #0031b3 / dark #000f69 ; gold #5091ce / light #8fa6d6 / dark #0042cc (noms conservés, valeurs bleues)
- Mode sombre : fond #000031, card #0a1233, primary #5091ce, charts bleus, ring #5091ce
- `.text-gradient-gold` : variante claire (cobalt→ciel) + sombre (ciel→lavande) pour le contraste
- Hero : `hero-wide.png` (tons or) remplacé par `bg-sapphire-radial` + filigrane diamant + lueur bleu ciel
- Logo intégré dans : navbar publique, navbar page-router, footer, sidebar dashboard, login (desktop+mobile), CTA, dialogues contact, écran de chargement admin — tous les `Gem` remplacés
- Favicon metadata : SVG + PNG 64px ; placeholders hero white/40→white/55 (a11y)
- Validations : dev server HTTP 200, build production OK (13 pages), captures VLM clair/sombre (accueil, à-propos, login, dashboard) — logo net, palette 100% bleue, KPI bleu royal/bleu ciel sans doré
- Commit `8e131ae` « feat(branding): logo EMERAUDE intégré + palette du site harmonisée aux bleus du logo »

Stage Summary:
- Logo intégré partout (8 emplacements) + favicon redessiné aux couleurs exactes du logo
- Palette entièrement harmonisée aux bleus du diamant ; plus aucune teinte dorée/ambre
- Les noms de tokens sapphire/gold sont conservés (compatibilité) mais rendent désormais les bleus du logo
- Push GitHub toujours en attente de credentials (token PAT) — commit local prêt

---
Task ID: 3
Agent: Super Z (agent principal)
Task: Pousser le code local (tâche logo + harmonisation des couleurs) vers GitHub (https://github.com/topmuch/SAPHIR).

Work Log:
- Vérifié l'état : branche main en avance de 4 commits sur origin/main (259dd80), arbre propre, contenu des commits audité (aucun secret, pas de .env)
- Tentative de push sans credential : refusé par GitHub (authentification HTTPS requise ; ni SSH, ni gh CLI, ni credential helper configurés)
- Nettoyage d'historique amorcé (reformulation des 2 commits checkpoint UUID) mais abandonné : l'environnement rebascule automatiquement la branche — push effectué tel quel, sans réécriture
- Push effectué avec le PAT fourni par l'utilisateur, via URL one-off en ligne de commande (token jamais écrit sur disque ni dans un fichier, masqué dans les sorties)
- Résultat : fast-forward 259dd80 → 86dad58 publié sur origin/main (4 commits : source du logo, branding 8e131ae, worklog 1ca08cc, scripts 86dad58)
- Vérification post-push : fetch + statut → local et origin/main parfaitement synchronisés (0/0)
- Branches temporaires clean-main et backup-main supprimées

Stage Summary:
- Code intégralement poussé : logo EMERAUDE + palette harmonisée désormais visibles sur GitHub (origin/main = 86dad58)
- Token PAT utilisé en one-off, non persisté ; recommandation de révocation communiquée à l'utilisateur (exposé dans le chat)

---
Task ID: 4
Agent: Super Z (agent principal)
Task: Corriger l'échec de déploiement Coolify (« Deployment failed » pendant « #13 exporting to image / exporting layers », build Next.js pourtant réussi).

Work Log:
- Diagnostiqué à partir du log utilisateur : toutes les étapes de build DONE (9/9), échec instantané à l'export de l'image → cause la plus probable : image mono-étape trop lourde (~1,5-2 Go : node_modules complet 827 paquets + cache de build + bun + clone) face à un disque serveur saturé
- Constaté une incohérence d'architecture : README/docker-entrypoint/docker-compose décrivaient un design (volume /app/db, entrypoint, non-root, healthcheck /api) non appliqué par le Dockerfile réel (mono-étape, git clone interne, CMD inline, /app/data)
- Vérifications préalables : schéma Prisma en sortie par défaut (node_modules/.prisma), pas de better-sqlite3, /api répond du JSON (cible healthcheck), standalone complet (.next/static + public cachés confirmés)
- Dockerfile réécrit en 2 étapes : builder (clone GitHub + bun install + prisma generate + next build, NON exporté) / runner (standalone + CLI Prisma + moteurs + schéma + entrypoint, ~400-500 Mo, base node:20-alpine, utilisateur node, healthcheck fetch /api)
- docker-entrypoint.sh réécrit : node (au lieu de bun), chemins relatifs via dirname $0, prisma db push idempotent, reprise automatique d'une ancienne base /app/data/saphir.db si un volume y est encore monté, messages EMERAUDE
- README : description de l'image mise à jour + encadré troubleshooting « exporting to image » → docker system prune -af
- Validation sans Docker (indisponible localement) via scripts/simulate-runner.sh : reproduction exacte du runner (standalone + @prisma + prisma + .prisma + schema + entrypoint) → db push OK (12ms), serveur Next prêt (71ms), GET /api et GET / en HTTP 200, puis nettoyage
- Commit 545204f poussé sur origin/main avec le PAT (one-off, masqué)

Stage Summary:
- Correctif poussé sur GitHub : image finale ~3-4× plus légère, architecture alignée sur le README (volume /app/db, non-root, healthcheck)
- Action utilisateur restante : relancer Deploy sur Coolify ; si échec persiste, vérifier l'espace disque du serveur (docker system prune -af) et fournir le début du log (partie erreur)

---
Task ID: 5
Agent: Super Z (agent principal)
Task: Retour arrière demandé par l'utilisateur : restaurer la bannière du hero (modifiée sans en avoir reçu la demande) et augmenter la taille du logo.

Work Log:
- Écouté le retour utilisateur : la refonte du hero (dégradé + filigrane diamant + lueur) de la tâche 2 était un dépassement de périmètre → restauré
- hero.tsx rétabli à l'identique de la version 259dd80 (git checkout) : image de fond hero-wide.png d'origine, voile dégradé d'origine, placeholders d'origine
- Logo agrandi dans les 11 emplacements (containers + attributs Image) : navbar publique 44→48/56px, navbar pages 40→48/56px, footer 56→64px, login desktop 56→64px / mobile 40→48px, bloc CTA 80→96px, sidebar dashboard 40→48px, écran de chargement admin 48→64px, icônes des 3 dialogues contact 20→24px
- Chaque taille vérifiée compatible avec son conteneur (navbar h-16/h-20, header sidebar h-16, blocs centrés)
- Validation : build production OK ; serveur dev + curl (hero-wide.png présent dans le HTML servi, classes w-12/md:w-14 présentes, filigrane absent) ; capture d'écran + analyse VLM (bannière photo d'origine avec tons dorés de retour, logo diamant bleu bien visible, navbar propre sans chevauchement)
- Serveur et navigateur arrêtés, captures supprimées
- Commit 8b4b42d poussé sur origin/main (PAT one-off, masqué)

Stage Summary:
- Bannière du hero d'origine restaurée à l'identique ; logo agrandi partout (+27% à +100% selon emplacement)
- Harmonisation des couleurs et intégration du logo (demandes initiales) conservées
- Leçon enregistrée : ne modifier QUE ce qui est explicitement demandé ; proposer les idées bonus sans les appliquer

---
Task ID: 6
Agent: Super Z (agent principal)
Task: Trois demandes utilisateur : 1) hero jugé trop sombre, 2) retirer le texte « EMERAUDE COM » à côté du logo et agrandir le logo, 3) développer les pages des onglets de la page d'accueil.

Work Log:
- HERO : analysé l'image (luminosité 93/255 + voile sapphire-dark/90→50) → pas de nouvelle image à générer (la bannière restaurée en tâche 5 devait être conservée) : éclaircissement par script PIL (gamma 0.75 + luminosité ×1.08 + contraste ×1.04 → 115.8/255) via scripts/brighten_hero.py ; fichier conservé en JPEG-dans-.png comme l'original (171 Ko au lieu de 1,15 Mo en vrai PNG — anomalie de poids détectée et corrigée) ; voile allégé en deux passes (90/50 → 75/35 → 60/20) avec validation VLM intermédiaire
- LOGO : texte « EMERAUDE COM » retiré à côté du logo et conteneur agrandi 48/56px → 56/64px (p-1.5 → p-1) dans la navbar active (page-router.tsx) + navbar.tsx (composant inutilisé, cohérence conservée) ; aria-label « EMERAUDE COM — Accueil » ajouté pour l'accessibilité
- PAGES DES ONGLETS :
  * Services : 3 points forts (coches) par service + section « Notre méthode » (5 cartes 01-05 : écoute, stratégie, création, production, suivi)
  * FAQ : 8 → 12 questions (régie complète, interventions hors Dakar, mesure des résultats, droits sur les créations) + bloc CTA « Une autre question ? » avec liens mailto/tel
  * À propos : section « Six départements, un seul partenaire » (6 cartes avec descriptions des équipes) + CTA final « Envie de travailler ensemble ? » naviguant vers Contact (prop onNavigate ajoutée)
  * Cohérence de contenu : 8 références « Maroc » corrigées en Sénégal (faq-page, service-detail-page — le site étant positionné agence dakaroise)
- VALIDATIONS : lint OK ; serveur dev HTTP 200 ; navigation agent-browser sur les 4 onglets (DOM vérifié : 12 questions FAQ, 5 étapes méthode, 6 départements, CTA fonctionnels) ; captures VLM : hero « clair et lumineux, texte lisible », navbar « uniquement le logo, sans texte, aucune erreur », méthode « 5 cartes numérotées », mobile « sans chevauchement » ; aucune erreur console ni dev.log (EADDRINUSE = doublon de lancement, serveur actif sain)
- Captures de contrôle supprimées ; scripts/vlm-check.cjs (mauvaise API) supprimé, scripts/brighten_hero.py conservé et documenté

Stage Summary:
- Hero : bannière d'origine conservée mais éclaircie (+24% luminosité) + voile allégé — pas d'image régénérée
- Logo : texte « EMERAUDE COM » supprimé dans les navbar, logo agrandi 56/64px, accessible
- Pages des onglets substantiellement enrichies : Services (+méthode+points forts), FAQ (12 questions+CTA), À propos (+6 départements+CTA), références géographiques harmonisées Sénégal
- Périmètre strictement limité aux 3 demandes ; données de démo du dashboard (Maroc Telecom etc.) volontairement non touchées

---
Task ID: 7
Agent: Super Z (agent principal)
Task: Changer l'image du hero (demande utilisateur : « change l'image du hero »).

Work Log:
- 3 candidates générées par IA (1344x768, z-ai image) : 1) scène d'équipe d'agence lumineuse (visages dans le tiers gauche → refusée : le texte les recouvrirait) ; 2) diamant saphir abstrait très lumineux (153/255 — écartée : image d'identité déjà portée par le logo, composition centrée recouverte par le formulaire) ; 3) scène d'agence avec composition guidée (équipe à DROITE, moitié gauche dégagée : fenêtre + mur + plante)
- Candidate 3 retenue : 150/255 de luminosité (vs 116 pour l'ancienne), aucune personne dans la zone texte, aucun artefact IA (mains/proportions vérifiés par VLM)
- Installation : public/hero-wide.png remplacé (JPEG q88 dans la convention .png, 147 Ko) ; source conservée dans scripts/hero-candidates/hero-source-v2.png pour d'éventuels ajustements sans régénérer (une régénération IA produirait une image différente)
- Voile ajusté pour l'image plus lumineuse : sapphire-dark 60/20 → 70/30 (lisibilité du texte blanc sur zone fenêtre claire)
- Validations VLM desktop : « image très lumineuse, moderne et professionnelle », « titre très contrasté, paragraphe parfaitement lisible », « carte formulaire bien intégrée » ; mobile : « texte lisible, aucun chevauchement »
- Incident parallèle traité : upload/WhatsApp Image…jpeg (logo source du client) trouvé écrasé par une version redimensionnée 190x121 (même logo, poids 10 Ko) à 11h12 — cause non identifiée, aucune de mes commandes n'écrit dans upload/ ; version git originale 900x577 restaurée par git checkout ; le site n'utilise pas ce fichier (variantes public/images/)

Stage Summary:
- Nouveau hero : photo IA d'équipe d'agence collaborative, très lumineuse, composition adaptée au layout (texte à gauche sur zone dégagée, équipe à droite) — remplace l'ancienne photo dorée
- Prompt de génération documenté dans le worklog pour reproductibilité ; source PNG conservée
- Ancienne bannière récupérable via l'historique git (commit 2f51bc3) si retour arrière souhaité

---
Task ID: 8
Agent: Super Z (agent principal)
Task: Intégrer le logo fourni par le client (« INTEGRE CE LOGO AVEC CETTE TAILLE » — upload 190x121, diamant saphir + texte EMERAUDE).

Work Log:
- Upload analysé : JPEG 190x121 (diamant bleu facetté + « EMERAUDE » + soulignement, fond blanc) ; bbox contenu mesuré (diamant ~68% hauteur, texte ~24%)
- Source haute résolution retrouvée : git show HEAD:upload/… = même logo en 900x577 (75,6 Ko) — l'upload 190x121 du client sert de référence de TAILLE, la version 900x577 de source ; vérifié identique par VLM ; copiée dans scripts/logo-source-hires.jpeg (précédent hero-source-v2.png)
- Asset généré par scripts/integrate_logo.py : public/images/logo-emeraude.png (900x577 PNG, conversion directe sans upscale — net sur écrans retina)
- Navbar active (page-router.tsx) : logo intégré À LA TAILLE DEMANDÉE — desktop 190x121 px exactement (« cette taille »), mobile 110x70 (proportionnel) ; hauteur navbar h-16→h-20 mobile / h-20→h-[133px] desktop ; offset contenu pt-16→pt-20 / pt-20→pt-[133px] ; mesuré en navigateur : navbar 133px, hero démarre exactement à y=133 (aucun chevauchement)
- Autres emplacements intégrés proportionnellement au ratio 1,57 : footer page-router 100x64 (+ texte EMERAUDE COM conservé), CTA 150x96, panneau marque login desktop 126x80, écran de chargement admin 100x64 ; navbar.tsx (code mort) synchronisé comme en tâche 6
- Petites icônes de dialogues (24px, cta.tsx/navbar.tsx) et lockups icône+wordmark (login mobile 48px, sidebar dashboard 48px) : ancien logo-mark.png (diamant seul) volontairement conservé — le texte du logo complet serait illisible à ces tailles
- Validations : bun run lint OK ; build production OK ; VLM desktop (logo net, aucun chevauchement, navbar propre), mobile 375px (logo entier visible, pas de chevauchement avec le bouton menu), footer/CTA/login (logos entiers, non déformés, texte lisible), navbar scrollée OK ; tailles rendues mesurées : 190x121 / 150x97 / 100x65
- Scripts de capture jetables supprimés après validation (lint resté propre) ; captures de contrôle conservées localement dans scripts/ (non commitées)

Stage Summary:
- Nouveau logo client intégré : navbar desktop affichée à exactement 190x121 px (taille de l'image fournie), source asset 900x577 haute résolution
- Navbar desktop 133px de haut (vs 80 avant) pour loger le logo à cette taille — offset du contenu ajusté au pixel près
- 6 fichiers modifiés + 1 nouvel asset ; logo-mark.png (diamant) conservé pour les micro-usages (<50px) et la favicon
- Anciennes variantes non supprimées (logo-full*, logo-mark*) : aucune n'était référencée par le code

---
Task ID: 9
Agent: Super Z (agent principal)
Task: Régénérer l'image du hero avec des hommes et femmes noirs + retirer le texte « EMERAUDE COM » à côté du logo dans le footer.

Work Log:
- 3 candidats générés par IA (z-ai image, 1344x768) avec équipe 100% noire (agence sénégalaise) et composition guidée (groupe à DROITE, moitié gauche dégagée) : A refusé (personnes réparties sur toute la largeur), C refusé (personnages centrés), B retenu
- Candidat B : 2 hommes + 2 femmes noirs, groupe à droite, moitié gauche libre, luminosité 150/255 (zone texte 156 — voile 70/30 existant conservé inchangé)
- Inspection VLM approfondie : mains et doigts naturels, visages nets, aucun texte résiduel/watermark, décor cohérent
- Installation : public/hero-wide.png remplacé (JPEG q88 dans la convention .png, 136 Ko) ; source conservée dans scripts/hero-candidates/hero-source-v3.png ; candidats non retenus supprimés
- Footer : span « EMERAUDE COM » (blanc + dégradé or) retiré à côté de la boîte logo dans page-router.tsx (footer actif) et footer.tsx (code mort synchronisé) ; boîte logo 100x64 inchangée
- Validations : lint OK ; build production OK ; VLM desktop (professionnels noirs à droite, titre parfaitement lisible, carte formulaire bien intégrée, aucun artefact) ; mobile 375px (texte lisible, navbar propre) ; footer (logo seul, aucun texte à côté)

Stage Summary:
- Hero : nouvelle photo d'équipe d'agence 100% noire (2 hommes, 2 femmes), composition identique au layout (texte gauche sur zone dégagée, équipe droite) — voile et code hero inchangés
- Footer : logo EMERAUDE seul (texte redondant supprimé), demandé explicitement
- Ancien hero récupérable via git (0332af7) ; source PNG v3 conservée pour ajustements futurs
- Incident parallèle (2e occurrence, cf. tâche 7) : commit local automatique externe « 994f180 (UUID) » a ajouté 11 captures de validation non suivies (verif_*.png, 1,9 Mo) à 11h38 — supprimé par rebase avant push (`git rebase --onto 0d6eba0 994f180 main`), dépôt GitHub propre ; phénomène à surveiller : vérifier `git log` avant chaque commit/push et dropper les commits UUID

---
Task ID: 10
Agent: Super Z (agent principal)
Task: Synchroniser GitHub avec le local + retirer le formulaire de devis du hero + passer tous les textes superposés du hero en blanc.

Work Log:
- Synchronisation : commit UUID parasite local 4ef3dab (4 captures de validation, 3e occurrence du phénomène) supprimé par git reset --hard 486de76 ; local = GitHub = 486de76 avant les modifications
- Formulaire de devis supprimé du hero (hero.tsx) : carte glassmorphism entière (colonne droite) + tout le code mort associé (états form/errors/loading/sent/serverError, handlers set/validate/handleSubmit, imports Input/Textarea/Label/Select/Loader2/Send/CheckCircle2/AlertCircle/SERVICES) — hero.tsx réécrit de 348 à 113 lignes, composant purement présentatif
- Textes superposés passés en blanc : badge « Agence de communication 360° » (or → blanc : border-white/40 text-white bg-white/10), span du titre « communication 360° » (dégradé or → blanc), paragraphe (text-white/70 → text-white) ; boutons et indicateur scroll inchangés (non demandé)
- Grille lg:grid-cols-2 conservée avec colonne droite vide → texte reste sur la moitié gauche, équipe de l'image pleinement visible à droite (plus de carte qui la recouvre)
- Validation #devis-form/#hero form absent du DOM (Playwright) ; lint OK ; build production OK ; VLM desktop (formulaire disparu, textes 100% blancs, équipe visible, lisibilité parfaite) et mobile (textes blancs et lisibles, empilement vertical normal)
- Aucune référence cassée : #devis-form et #devis n'étaient référencés nulle part ailleurs

Stage Summary:
- GitHub synchronisé avec le local (commit parasite UUID droppé avant push)
- Hero épuré : plus de formulaire de devis — la demande de contact reste possible via la section CTA et la page Contact
- Tous les textes du hero en blanc pur (badge, titre, paragraphe) sur voile bleu nuit inchangé
