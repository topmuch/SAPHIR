import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { PROJECTS, CLIENTS, TEAM } from "@/components/dashboard/dashboard-data";

// ------------------------------------------------------------------
// Constantes
// ------------------------------------------------------------------
export const SESSION_COOKIE = "saphir_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

const AUTH_SECRET =
  process.env.AUTH_SECRET || "saphir-com-secret-a-changer-en-production";

export const DEFAULT_ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "admin@zaphircomsen.com";
export const DEFAULT_ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "SaphirSenegal@2026";

// Ancien compte admin par défaut (identifiants publics dans l'historique du
// dépôt) : supprimé automatiquement au démarrage pour sécurité.
const LEGACY_ADMIN_EMAIL = "admin@saphircom.ma";

// ------------------------------------------------------------------
// Mots de passe (scrypt, natif Node/Bun — aucune dépendance)
// ------------------------------------------------------------------
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

// ------------------------------------------------------------------
// Jetons de session signés (HMAC-SHA256)
// ------------------------------------------------------------------
interface SessionPayload {
  uid: string;
  exp: number;
}

function sign(data: string): string {
  return createHmac("sha256", AUTH_SECRET).update(data).digest("hex");
}

export function createSessionToken(userId: string): string {
  const payload: SessionPayload = {
    uid: userId,
    exp: Date.now() + SESSION_DURATION_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as SessionPayload;
    if (!payload.uid || typeof payload.exp !== "number") return null;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------
// Session courante (côté serveur / routes API)
// ------------------------------------------------------------------
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = verifySessionToken(token);
  if (!payload) return null;
  const user = await db.user.findUnique({
    where: { id: payload.uid },
    select: { id: true, email: true, name: true, role: true },
  });
  return user ?? null;
}

// ------------------------------------------------------------------
// Initialisation : admin + données de démonstration
// ------------------------------------------------------------------
let seedPromise: Promise<void> | null = null;

async function seed(): Promise<void> {
  // 1) Compte administrateur : garanti existant avec les identifiants par
  //    défaut. Créé même si d'autres comptes existent déjà (montée de
  //    version d'une base en production) ; jamais écrasé s'il existe déjà.
  const adminEmail = DEFAULT_ADMIN_EMAIL.toLowerCase();
  const existingAdmin = await db.user.findUnique({
    where: { email: adminEmail },
  });
  if (!existingAdmin) {
    await db.user.create({
      data: {
        email: adminEmail,
        name: "EMERAUDE Admin",
        passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
        role: "admin",
      },
    });
  }

  // 1bis) Sécurité : révocation de l'ancien admin par défaut si présent
  if (adminEmail !== LEGACY_ADMIN_EMAIL) {
    await db.user.deleteMany({ where: { email: LEGACY_ADMIN_EMAIL } });
  }

  // 2) Projets de démonstration
  const projectCount = await db.project.count();
  if (projectCount === 0) {
    await db.project.createMany({
      data: PROJECTS.map((p) => ({
        reference: p.id,
        nom: p.nom,
        client: p.client,
        departement: p.departement,
        statut: p.statut,
        budget: p.budget,
        progression: p.progression,
        dateDebut: new Date(p.dateDebut),
        dateEcheance: new Date(p.dateEcheance),
        responsable: p.responsable,
      })),
    });
  }

  // 3) Clients de démonstration
  const clientCount = await db.client.count();
  if (clientCount === 0) {
    await db.client.createMany({
      data: CLIENTS.map((c) => ({
        nom: c.nom,
        entreprise: c.entreprise,
        email: c.email,
        telephone: c.telephone,
        tier: c.tier,
        projetsActifs: c.projetsActifs,
        revenuTotal: c.revenuTotal,
        derniereActivite: new Date(c.derniereActivite),
      })),
    });
  }

  // 4) Équipe de démonstration
  const teamCount = await db.teamMember.count();
  if (teamCount === 0) {
    await db.teamMember.createMany({
      data: TEAM.map((m) => ({
        nom: m.nom,
        role: m.role,
        departement: m.departement,
        email: m.email,
        projets: m.projets,
      })),
    });
  }
}

/** Idempotent : exécuté au plus une fois par instance du serveur. */
export function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = seed().catch((err) => {
      seedPromise = null; // permet une nouvelle tentative au prochain appel
      console.error("[seed] échec de l'initialisation :", err);
    });
  }
  return seedPromise;
}
