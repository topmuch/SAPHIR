import {
  Fingerprint,
  Building2,
  Radar,
  Palette,
  Film,
  Share2,
  Code,
  Megaphone,
  PenTool,
  Video,
  Target,
  TrendingUp,
  Cpu,
  CalendarDays,
  Sparkles,
  BarChart3,
  Users,
  Gauge,
  Compass,
  MonitorSmartphone,
  UserCheck,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Départements", href: "#departements" },
  { label: "Mission", href: "#mission" },
  { label: "Avantages", href: "#avantages" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Fingerprint,
    title: "Branding & Identité visuelle",
    desc: "Création de logos, chartes graphiques et identités de marque uniques et mémorables.",
  },
  {
    icon: Building2,
    title: "Communication corporate",
    desc: "Stratégies de communication interne et externe pour renforcer votre image d'entreprise.",
  },
  {
    icon: Radar,
    title: "Communication globale & Marketing 360°",
    desc: "Approche intégrée couvrant tous les canaux pour maximiser votre impact.",
  },
  {
    icon: Palette,
    title: "Création graphique et audiovisuelle",
    desc: "Design graphique professionnel et productions audiovisuelles de haute qualité.",
  },
  {
    icon: Film,
    title: "Production de films & supports",
    desc: "Films, spots radio et supports print pour une communication percutante.",
  },
  {
    icon: Share2,
    title: "Communication digitale & Réseaux sociaux",
    desc: "Gestion des réseaux sociaux et stratégies de contenu digital engageantes.",
  },
  {
    icon: Code,
    title: "Création de sites web & Référencement",
    desc: "Sites web performants, optimisés SEO pour une visibilité maximale en ligne.",
  },
  {
    icon: Megaphone,
    title: "Relations publiques & Événements",
    desc: "Organisation d'événements et gestion des relations publiques sur mesure.",
  },
];

export const DEPARTMENTS: { icon: LucideIcon; name: string }[] = [
  { icon: PenTool, name: "Création graphique" },
  { icon: Video, name: "Production audiovisuelle" },
  { icon: Target, name: "Planning stratégique" },
  { icon: TrendingUp, name: "Commercial" },
  { icon: Cpu, name: "Informatique & Sonorisation" },
  { icon: CalendarDays, name: "Événementiel" },
];

export const MISSION_PILLARS: { icon: LucideIcon; label: string }[] = [
  { icon: Sparkles, label: "Créativité" },
  { icon: BarChart3, label: "Marketing" },
  { icon: Users, label: "Expérience client" },
  { icon: Gauge, label: "Performance" },
];

export const ADVANTAGES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Compass,
    title: "Stratégies adaptées",
    desc: "Des stratégies sur mesure conçues pour répondre précisément à vos objectifs et votre marché.",
  },
  {
    icon: MonitorSmartphone,
    title: "Expertise digitale",
    desc: "Une maîtrise approfondie du marketing digital et de la création de contenu impactant.",
  },
  {
    icon: UserCheck,
    title: "Prospects qualifiés",
    desc: "Génération de leads et de prospects qualifiés grâce à des méthodes éprouvées.",
  },
  {
    icon: Handshake,
    title: "Accompagnement personnalisé",
    desc: "Un suivi de proximité et un accompagnement dédié tout au long de votre projet.",
  },
];
