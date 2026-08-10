import {
  Palette,
  Building2,
  Megaphone,
  Film,
  Globe,
  Code2,
  PenTool,
  Video,
  Target,
  Store,
  Volume2,
  PartyPopper,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  HandshakeIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Départements", href: "#departements" },
  { label: "Mission", href: "#mission" },
  { label: "Avantages", href: "#avantages" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    icon: Palette,
    title: "Branding & Identité visuelle",
    desc: "Création de logos, chartes graphiques et identités de marque uniques et mémorables.",
  },
  {
    icon: Building2,
    title: "Communication corporate",
    desc: "Stratégies de communication interne et externe pour renforcer votre image d’entreprise.",
  },
  {
    icon: Megaphone,
    title: "Communication globale & Marketing 360°",
    desc: "Approche intégrée couvrant tous les canaux pour maximiser votre impact.",
  },
  {
    icon: PenTool,
    title: "Création graphique et audiovisuelle",
    desc: "Design graphique professionnel et productions audiovisuelles de haute qualité.",
  },
  {
    icon: Film,
    title: "Production de films & supports",
    desc: "Films, spots radio et supports print pour une communication percutante.",
  },
  {
    icon: Globe,
    title: "Communication digitale & Réseaux sociaux",
    desc: "Gestion des réseaux sociaux et stratégies de contenu digital engageantes.",
  },
  {
    icon: Code2,
    title: "Création de sites web & Référencement",
    desc: "Sites web performants, optimisés SEO pour une visibilité maximale en ligne.",
  },
  {
    icon: PartyPopper,
    title: "Relations publiques & Événements",
    desc: "Organisation d’événements et gestion des relations publiques sur mesure.",
  },
];

export const DEPARTMENTS = [
  { icon: PenTool, name: "Création graphique" },
  { icon: Video, name: "Production audiovisuelle" },
  { icon: Target, name: "Planning stratégique" },
  { icon: Store, name: "Commercial" },
  { icon: Volume2, name: "Informatique & Sonorisation" },
  { icon: CalendarDays, name: "Événementiel" },
];

export const MISSION_PILLARS = [
  { label: "Créativité", icon: Sparkles },
  { label: "Marketing", icon: TrendingUp },
  { label: "Expérience client", icon: Users },
  { label: "Performance", icon: Award },
];

export const ADVANTAGES = [
  {
    icon: Target,
    title: "Stratégies adaptées",
    desc: "Des stratégies sur mesure conçues pour répondre précisément à vos objectifs et votre marché.",
  },
  {
    icon: Globe,
    title: "Expertise digitale",
    desc: "Une maîtrise approfondie du marketing digital et de la création de contenu impactant.",
  },
  {
    icon: TrendingUp,
    title: "Prospects qualifiés",
    desc: "Génération de leads et de prospects qualifiés grâce à des méthodes éprouvées.",
  },
  {
    icon: HandshakeIcon,
    title: "Accompagnement personnalisé",
    desc: "Un suivi de proximité et un accompagnement dédié tout au long de votre projet.",
  },
];
