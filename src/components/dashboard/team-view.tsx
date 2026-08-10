'use client';

import { useState, useMemo } from 'react';
import { UserPlus, Mail, FolderKanban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TEAM } from './dashboard-data';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function TeamView() {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const departments = useMemo(() => {
    const unique = Array.from(new Set(TEAM.map((m) => m.departement)));
    return ['Tous', ...unique];
  }, []);

  const filteredTeam = useMemo(
    () =>
      activeFilter === 'Tous'
        ? TEAM
        : TEAM.filter((m) => m.departement === activeFilter),
    [activeFilter],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight">Équipe</h2>
          <Badge variant="secondary" className="text-sm">
            {TEAM.length} membres
          </Badge>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {/* Department filter pills */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveFilter(dept)}
            className={
              activeFilter === dept
                ? 'rounded-full bg-sapphire px-4 py-1.5 text-sm font-medium text-white transition-colors'
                : 'rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200'
            }
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeam.map((member) => (
          <Card key={member.id}>
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sapphire text-sm font-semibold text-white">
                  {getInitials(member.nom)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{member.nom}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <Badge
                    variant="secondary"
                    className="mt-1.5 bg-sapphire/5 text-xs text-sapphire"
                  >
                    {member.departement}
                  </Badge>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>

              {/* Active projects count */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FolderKanban className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {member.projets} projets actifs
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
