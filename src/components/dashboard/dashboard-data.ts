// ------------------------------------------------------------------
// Mock Data for EMERAUDE COM Dashboard
// ------------------------------------------------------------------

export type ProjectStatus = "en_cours" | "termine" | "en_attente" | "pause";
export type ClientTier = "premium" | "standard" | "nouveau";

export interface Project {
  id: string;
  nom: string;
  client: string;
  departement: string;
  statut: ProjectStatus;
  budget: number;
  progression: number;
  dateDebut: string;
  dateEcheance: string;
  responsable: string;
}

export interface Client {
  id: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  tier: ClientTier;
  projetsActifs: number;
  revenuTotal: number;
  derniereActivite: string;
}

export interface TeamMember {
  id: string;
  nom: string;
  role: string;
  departement: string;
  email: string;
  projets: number;
  avatar?: string;
}

export interface Activity {
  id: string;
  type: "projet" | "client" | "equipe" | "facture";
  message: string;
  timestamp: string;
}

// ----- Projects -----
export const PROJECTS: Project[] = [
  {
    id: "P-001",
    nom: "Rebranding Maroc Telecom",
    client: "Maroc Telecom",
    departement: "Création graphique",
    statut: "en_cours",
    budget: 280000,
    progression: 72,
    dateDebut: "2025-01-15",
    dateEcheance: "2025-06-30",
    responsable: "Amina Benali",
  },
  {
    id: "P-002",
    nom: "Spot TV Ramadan 2025",
    client: "Coca-Cola Maroc",
    departement: "Production audiovisuelle",
    statut: "en_cours",
    budget: 450000,
    progression: 45,
    dateDebut: "2025-02-01",
    dateEcheance: "2025-05-15",
    responsable: "Youssef El Idrissi",
  },
  {
    id: "P-003",
    nom: "Site E-commerce LuxMaroc",
    client: "LuxMaroc",
    departement: "Informatique & Sonorisation",
    statut: "en_attente",
    budget: 120000,
    progression: 10,
    dateDebut: "2025-03-10",
    dateEcheance: "2025-07-20",
    responsable: "Karim Tazi",
  },
  {
    id: "P-004",
    nom: "Lancement produit Ooredoo",
    client: "Ooredoo",
    departement: "Planning stratégique",
    statut: "en_cours",
    budget: 380000,
    progression: 88,
    dateDebut: "2024-11-01",
    dateEcheance: "2025-04-30",
    responsable: "Fatima Zahra Ouazzani",
  },
  {
    id: "P-005",
    nom: "Gala annuel BMCE",
    client: "BMCE Bank",
    departement: "Événementiel",
    statut: "termine",
    budget: 520000,
    progression: 100,
    dateDebut: "2024-09-01",
    dateEcheance: "2025-02-28",
    responsable: "Rachid Bennani",
  },
  {
    id: "P-006",
    nom: "Campagne réseaux sociaux Inwi",
    client: "Inwi",
    departement: "Création graphique",
    statut: "en_cours",
    budget: 95000,
    progression: 60,
    dateDebut: "2025-01-20",
    dateEcheance: "2025-05-31",
    responsable: "Amina Benali",
  },
  {
    id: "P-007",
    nom: "Documentaire Royal Air Maroc",
    client: "Royal Air Maroc",
    departement: "Production audiovisuelle",
    statut: "pause",
    budget: 320000,
    progression: 35,
    dateDebut: "2025-02-15",
    dateEcheance: "2025-08-30",
    responsable: "Youssef El Idrissi",
  },
  {
    id: "P-008",
    nom: "Refonte site Attijariwafa",
    client: "Attijariwafa Bank",
    departement: "Informatique & Sonorisation",
    statut: "en_attente",
    budget: 175000,
    progression: 0,
    dateDebut: "2025-04-01",
    dateEcheance: "2025-09-15",
    responsable: "Karim Tazi",
  },
  {
    id: "P-009",
    nom: "Stratégie digitale Manzil",
    client: "Manzil",
    departement: "Planning stratégique",
    statut: "en_cours",
    budget: 68000,
    progression: 55,
    dateDebut: "2025-02-10",
    dateEcheance: "2025-06-15",
    responsable: "Fatima Zahra Ouazzani",
  },
  {
    id: "P-010",
    nom: "Festival Mawazine",
    client: "Mawazine",
    departement: "Événementiel",
    statut: "termine",
    budget: 750000,
    progression: 100,
    dateDebut: "2024-10-01",
    dateEcheance: "2025-03-31",
    responsable: "Rachid Bennani",
  },
  {
    id: "P-011",
    nom: "Identité visuelle Jumia MA",
    client: "Jumia Maroc",
    departement: "Création graphique",
    statut: "en_cours",
    budget: 45000,
    progression: 82,
    dateDebut: "2025-01-05",
    dateEcheance: "2025-04-15",
    responsable: "Sara Alaoui",
  },
  {
    id: "P-012",
    nom: "Séminaire Axa Maroc",
    client: "Axa Maroc",
    departement: "Événementiel",
    statut: "en_attente",
    budget: 210000,
    progression: 5,
    dateDebut: "2025-05-01",
    dateEcheance: "2025-07-15",
    responsable: "Rachid Bennani",
  },
];

// ----- Clients -----
export const CLIENTS: Client[] = [
  {
    id: "C-001",
    nom: "Mohammed Alami",
    entreprise: "Maroc Telecom",
    email: "m.alami@maroctelecom.ma",
    telephone: "+212 5 22 11 22 33",
    tier: "premium",
    projetsActifs: 3,
    revenuTotal: 890000,
    derniereActivite: "2025-03-10",
  },
  {
    id: "C-002",
    nom: "Leila Fassi",
    entreprise: "Coca-Cola Maroc",
    email: "l.fassi@coca-cola.ma",
    telephone: "+212 5 22 33 44 55",
    tier: "premium",
    projetsActifs: 2,
    revenuTotal: 720000,
    derniereActivite: "2025-03-08",
  },
  {
    id: "C-003",
    nom: "Omar Haji",
    entreprise: "Ooredoo",
    email: "o.haji@ooredoo.ma",
    telephone: "+212 5 22 55 66 77",
    tier: "premium",
    projetsActifs: 1,
    revenuTotal: 380000,
    derniereActivite: "2025-03-09",
  },
  {
    id: "C-004",
    nom: "Nadia Berrada",
    entreprise: "BMCE Bank",
    email: "n.berrada@bmce.ma",
    telephone: "+212 5 22 77 88 99",
    tier: "standard",
    projetsActifs: 1,
    revenuTotal: 520000,
    derniereActivite: "2025-02-28",
  },
  {
    id: "C-005",
    nom: "Khalid Rami",
    entreprise: "Inwi",
    email: "k.rami@inwi.ma",
    telephone: "+212 5 22 99 00 11",
    tier: "standard",
    projetsActifs: 2,
    revenuTotal: 195000,
    derniereActivite: "2025-03-05",
  },
  {
    id: "C-006",
    nom: "Salma Chraibi",
    entreprise: "Royal Air Maroc",
    email: "s.chraibi@ram.ma",
    telephone: "+212 5 22 12 34 56",
    tier: "standard",
    projetsActifs: 1,
    revenuTotal: 320000,
    derniereActivite: "2025-02-20",
  },
  {
    id: "C-007",
    nom: "Yassine Boulouiz",
    entreprise: "Attijariwafa Bank",
    email: "y.boulouiz@attijariwafa.ma",
    telephone: "+212 5 22 78 90 12",
    tier: "premium",
    projetsActifs: 1,
    revenuTotal: 175000,
    derniereActivite: "2025-03-11",
  },
  {
    id: "C-008",
    nom: "Houda Lemrini",
    entreprise: "LuxMaroc",
    email: "h.lemrini@luxmaroc.ma",
    telephone: "+212 5 22 34 56 78",
    tier: "nouveau",
    projetsActifs: 1,
    revenuTotal: 120000,
    derniereActivite: "2025-03-10",
  },
  {
    id: "C-009",
    nom: "Rédouane Filali",
    entreprise: "Jumia Maroc",
    email: "r.filali@jumia.ma",
    telephone: "+212 5 22 56 78 90",
    tier: "standard",
    projetsActifs: 1,
    revenuTotal: 45000,
    derniereActivite: "2025-03-07",
  },
  {
    id: "C-010",
    nom: "Imane El Fassi",
    entreprise: "Axa Maroc",
    email: "i.elfassi@axa.ma",
    telephone: "+212 5 22 90 12 34",
    tier: "nouveau",
    projetsActifs: 1,
    revenuTotal: 210000,
    derniereActivite: "2025-03-11",
  },
];

// ----- Team -----
export const TEAM: TeamMember[] = [
  { id: "T-001", nom: "Amina Benali", role: "Directrice Artistique", departement: "Création graphique", email: "a.benali@saphircom.ma", projets: 3 },
  { id: "T-002", nom: "Youssef El Idrissi", role: "Réalisateur", departement: "Production audiovisuelle", email: "y.elidrissi@saphircom.ma", projets: 2 },
  { id: "T-003", nom: "Karim Tazi", role: "Lead Développeur", departement: "Informatique & Sonorisation", email: "k.tazi@saphircom.ma", projets: 2 },
  { id: "T-004", nom: "Fatima Zahra Ouazzani", role: "Stratège digitale", departement: "Planning stratégique", email: "fz.ouazzani@saphircom.ma", projets: 2 },
  { id: "T-005", nom: "Rachid Bennani", role: "Chef de projet événementiel", departement: "Événementiel", email: "r.bennani@saphircom.ma", projets: 3 },
  { id: "T-006", nom: "Sara Alaoui", role: "Graphiste senior", departement: "Création graphique", email: "s.alaoui@saphircom.ma", projets: 1 },
  { id: "T-007", nom: "Hamza Moussaoui", role: "Cadreur", departement: "Production audiovisuelle", email: "h.moussaoui@saphircom.ma", projets: 2 },
  { id: "T-008", nom: "Nour El Houda", role: "Community Manager", departement: "Planning stratégique", email: "n.elhouda@saphircom.ma", projets: 2 },
  { id: "T-009", nom: "Omar Squalli", role: "Développeur Front-end", departement: "Informatique & Sonorisation", email: "o.squalli@saphircom.ma", projets: 1 },
  { id: "T-010", nom: "Zineb Lahlou", role: "Chargée de clientèle", departement: "Commercial", email: "z.lahlou@saphircom.ma", projets: 4 },
  { id: "T-011", nom: "Amine Kabbaj", role: "Directeur commercial", departement: "Commercial", email: "a.kabbaj@saphircom.ma", projets: 5 },
  { id: "T-012", nom: "Hicham Ait Brahim", role: "Régisseur son", departement: "Informatique & Sonorisation", email: "h.aitbrahim@saphircom.ma", projets: 2 },
];

// ----- Activity -----
export const ACTIVITIES: Activity[] = [
  { id: "A-001", type: "projet", message: "Le projet P-004 \"Lancement produit Ooredoo\" a atteint 88%", timestamp: "2025-03-11T14:30:00" },
  { id: "A-002", type: "client", message: "Nouveau client : Imane El Fassi (Axa Maroc)", timestamp: "2025-03-11T11:15:00" },
  { id: "A-003", type: "facture", message: "Facture #F-2025-048 envoyée à BMCE Bank - 180 000 MAD", timestamp: "2025-03-11T10:00:00" },
  { id: "A-004", type: "equipe", message: "Sara Alaoui a rejoint le projet P-011", timestamp: "2025-03-10T16:45:00" },
  { id: "A-005", type: "projet", message: "Le projet P-005 \"Gala annuel BMCE\" est terminé", timestamp: "2025-03-10T15:30:00" },
  { id: "A-006", type: "facture", message: "Paiement reçu de Coca-Cola Maroc - 225 000 MAD", timestamp: "2025-03-10T09:00:00" },
  { id: "A-007", type: "client", message: "Réunion avec LuxMaroc - Brief projet e-commerce", timestamp: "2025-03-09T14:00:00" },
  { id: "A-008", type: "projet", message: "Le projet P-001 \"Rebranding Maroc Telecom\" a atteint 72%", timestamp: "2025-03-09T11:30:00" },
  { id: "A-009", type: "equipe", message: "Hamza Moussaoui a terminé le tournage spot TV", timestamp: "2025-03-08T17:00:00" },
  { id: "A-010", type: "facture", message: "Facture #F-2025-047 envoyée à Inwi - 47 500 MAD", timestamp: "2025-03-08T10:30:00" },
];

// ----- Revenue Chart Data -----
export const REVENUE_DATA = [
  { mois: "Sep", revenu: 420000, depenses: 280000 },
  { mois: "Oct", revenu: 580000, depenses: 310000 },
  { mois: "Nov", revenu: 490000, depenses: 295000 },
  { mois: "Déc", revenu: 720000, depenses: 380000 },
  { mois: "Jan", revenu: 640000, depenses: 350000 },
  { mois: "Fév", revenu: 560000, depenses: 320000 },
  { mois: "Mar", revenu: 810000, depenses: 390000 },
];

// ----- Projects by Department -----
export const PROJECTS_BY_DEPT = [
  { departement: "Création graphique", projets: 8 },
  { departement: "Audiovisuel", projets: 5 },
  { departement: "Stratégique", projets: 6 },
  { departement: "Événementiel", projets: 7 },
  { departement: "Digital", projets: 9 },
  { departement: "Commercial", projets: 4 },
];

// ----- Services Distribution -----
export const SERVICES_DISTRIBUTION = [
  { name: "Branding", value: 28, fill: "var(--color-sapphire)" },
  { name: "Digital", value: 24, fill: "var(--color-gold)" },
  { name: "Audiovisuel", value: 18, fill: "var(--color-sapphire-light)" },
  { name: "Événementiel", value: 16, fill: "var(--color-gold-dark)" },
  { name: "Autres", value: 14, fill: "hsl(220, 14%, 46%)" },
];

// ----- Status helpers -----
export const STATUS_LABELS: Record<ProjectStatus, string> = {
  en_cours: "En cours",
  termine: "Terminé",
  en_attente: "En attente",
  pause: "En pause",
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  en_cours: "bg-emerald-100 text-emerald-700",
  termine: "bg-slate-100 text-slate-600",
  en_attente: "bg-amber-100 text-amber-700",
  pause: "bg-rose-100 text-rose-600",
};

export const TIER_LABELS: Record<ClientTier, string> = {
  premium: "Premium",
  standard: "Standard",
  nouveau: "Nouveau",
};

export const TIER_COLORS: Record<ClientTier, string> = {
  premium: "bg-sapphire/10 text-sapphire",
  standard: "bg-muted text-muted-foreground",
  nouveau: "bg-emerald-100 text-emerald-700",
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `il y a ${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `il y a ${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `il y a ${diffDays}j`;
}
