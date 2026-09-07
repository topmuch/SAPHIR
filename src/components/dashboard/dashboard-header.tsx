'use client';

import { Menu, Search, Bell, LogOut } from 'lucide-react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import type { AuthUser } from '@/components/saphir/login-screen';

export interface DashboardHeaderProps {
  onMenuToggle: () => void;
  title: string;
  user: AuthUser;
  onLogout: () => void;
}

function getInitials(nameOrEmail: string): string {
  const parts = nameOrEmail.replace(/@.*/, '').split(/[.\s_-]+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((p) => p[0]).join('').toUpperCase();
  return initials || 'U';
}

export function DashboardHeader({ onMenuToggle, title, user, onLogout }: DashboardHeaderProps) {
  const displayName = user.name || user.email.replace(/@.*/, '');

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-sapphire md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search input (decorative) */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            readOnly
            className="h-9 w-56 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 text-sm text-gray-500 placeholder-gray-400 outline-none transition-colors focus:border-sapphire focus:ring-1 focus:ring-sapphire/20"
          />
        </div>

        {/* Notification bell with red dot badge */}
        <button
          className="relative rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-sapphire"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User avatar with hover card + logout */}
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sapphire text-xs font-bold text-white transition-colors hover:bg-sapphire-dark"
              aria-label="Profil utilisateur"
            >
              {getInitials(displayName)}
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom" align="end" className="w-56">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          <LogOut className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Déconnexion</span>
          <span className="sr-only">Se déconnecter</span>
        </Button>
      </div>
    </header>
  );
}
