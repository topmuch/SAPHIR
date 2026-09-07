'use client';

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  UserCircle,
  Settings,
  X,
  Gem,
  HelpCircle,
  Globe,
  Inbox,
} from 'lucide-react';

export interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  unreadCount?: number;
}

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'messages', label: 'Messages', icon: Inbox },
  { id: 'projets', label: 'Projets', icon: FolderKanban },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'equipe', label: 'Équipe', icon: UserCircle },
  { id: 'parametres', label: 'Paramètres', icon: Settings },
] as const;

const showcaseItem = { id: 'site_web', label: 'Site web', icon: Globe };

export function DashboardSidebar({
  isOpen,
  onClose,
  activeView,
  onViewChange,
  unreadCount = 0,
}: DashboardSidebarProps) {
  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  const isSiteWeb = activeView === 'site_web';

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={
          'fixed top-0 left-0 z-50 flex h-full flex-col bg-sapphire-dark transition-transform duration-300 ease-in-out w-64 ' +
          (isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0')
        }
      >
        {/* Header / Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <Gem className="h-7 w-7 text-gold" />
            <span className="text-lg font-bold tracking-wide text-white">
              EMERAUDE{' '}
              <span className="text-gradient-gold">COM</span>
            </span>
          </div>

          {/* Close button (visible on mobile) */}
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/10" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeView === id;

            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-white/60 hover:bg-white/5 hover:text-white')
                }
              >
                <Icon className={
                  'h-5 w-5 shrink-0' +
                  (isActive ? ' text-gold' : '')
                } />
                {label}

                {/* Badge messages non lus */}
                {id === 'messages' && unreadCount > 0 && (
                  <span
                    className={
                      'ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ' +
                      (isActive
                        ? 'bg-gold text-sapphire-dark'
                        : 'bg-gold/20 text-gold')
                    }
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}

                {/* Active indicator bar */}
                {id !== 'messages' && isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
                )}
              </button>
            );
          })}

          {/* Separator before Site Web */}
          <div className="my-3 h-px bg-white/10" />

          {/* Site Web showcase link */}
          <button
            onClick={() => handleNavClick(showcaseItem.id)}
            className={
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ' +
              (isSiteWeb
                ? 'bg-gold/10 text-gold'
                : 'text-white/60 hover:bg-white/5 hover:text-white')
            }
          >
            <showcaseItem.icon className={
              'h-5 w-5 shrink-0' +
              (isSiteWeb ? ' text-gold' : '')
            } />
            {showcaseItem.label}
            {isSiteWeb && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
            )}
          </button>
        </nav>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/10" />

        {/* Bottom section - Help */}
        <div className="px-3 py-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <HelpCircle className="h-5 w-5 shrink-0" />
            Aide & Support
          </a>
        </div>
      </aside>
    </>
  );
}
