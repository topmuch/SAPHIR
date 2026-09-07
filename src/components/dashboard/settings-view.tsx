'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, Search, Bell, BellOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface SettingsForm {
  agencyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  currency: string;
  language: string;
  emailNotifications: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  notifyContactMessages: boolean;
  notifyNewMember: boolean;
  notifyNewProject: boolean;
}

const DEFAULTS: SettingsForm = {
  agencyName: 'SAPHIR COM SEN',
  email: 'contact@zaphircomsen.com',
  phone: '+221 70 316 76 76',
  address: 'Dakar, Sénégal',
  website: 'www.zaphircomsen.com',
  currency: 'XOF',
  language: 'Français',
  emailNotifications: true,
  seoTitle:
    'SAPHIR COM SEN — Agence de communication 360° à Dakar',
  seoDescription:
    'Agence de communication 360° à Dakar : branding, marketing digital, production audiovisuelle, événementiel et création de sites web.',
  seoKeywords:
    'agence communication Dakar, communication 360 Sénégal, branding, marketing digital, production audiovisuelle, événementiel',
  notifyContactMessages: true,
  notifyNewMember: true,
  notifyNewProject: true,
};

export function SettingsView() {
  const { toast } = useToast();

  const [form, setForm] = useState<SettingsForm>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Chargement impossible');
      const data = await res.json();
      if (data?.settings) {
        setForm({ ...DEFAULTS, ...data.settings });
      }
    } catch {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les paramètres.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  function setField<K extends keyof SettingsForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setBoolField<K extends keyof SettingsForm>(
    key: K,
    value: boolean
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.agencyName.trim() || !form.email.trim()) {
      toast({
        title: 'Champs obligatoires',
        description: 'Le nom de l\u2019agence et l\u2019email sont requis.',
        variant: 'destructive',
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast({
        title: 'Email invalide',
        description: 'Veuillez saisir une adresse email valide.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({
          title: 'Erreur',
          description: data?.error || 'Sauvegarde impossible.',
          variant: 'destructive',
        });
        return;
      }
      if (data?.settings) {
        setForm({ ...DEFAULTS, ...data.settings });
      }
      toast({
        title: 'Paramètres sauvegardés',
        description: 'Les informations de l\u2019agence ont été mises à jour.',
      });
    } catch {
      toast({
        title: 'Erreur réseau',
        description: 'Sauvegarde impossible. Réessayez.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-sm text-muted-foreground">
          Gérez les informations, le SEO et les notifications de votre agence.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil de l'agence</CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset className="space-y-4" disabled={loading}>
            <legend className="sr-only">Informations de l'agence</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="agency-name">Nom de l'agence</Label>
                <Input
                  id="agency-name"
                  value={form.agencyName}
                  onChange={(e) => setField('agencyName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => setField('address', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={(e) => setField('website', e.target.value)}
                />
              </div>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gold" />
            Référencement (SEO)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset className="space-y-4" disabled={loading}>
            <legend className="sr-only">Paramètres SEO</legend>

            <div className="space-y-2">
              <Label htmlFor="seo-title">Titre SEO</Label>
              <Input
                id="seo-title"
                value={form.seoTitle}
                onChange={(e) => setField('seoTitle', e.target.value)}
                placeholder="Titre affiché dans les résultats Google"
              />
              <p className="text-xs text-muted-foreground">
                {form.seoTitle.length}/60 caractères recommandés
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo-description">Description SEO</Label>
              <Textarea
                id="seo-description"
                value={form.seoDescription}
                onChange={(e) => setField('seoDescription', e.target.value)}
                placeholder="Description affichée sous le titre dans Google"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {form.seoDescription.length}/160 caractères recommandés
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo-keywords">Mots-clés</Label>
              <Input
                id="seo-keywords"
                value={form.seoKeywords}
                onChange={(e) => setField('seoKeywords', e.target.value)}
                placeholder="Mots-clés séparés par des virgules"
              />
              <p className="text-xs text-muted-foreground">
                Séparez les mots-clés par des virgules.
              </p>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences</CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset className="space-y-4" disabled={loading}>
            <legend className="sr-only">Préférences</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Select
                  value={form.currency}
                  onValueChange={(v) => setField('currency', v)}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XOF">XOF — Franc CFA (FCFA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Langue</Label>
                <Select
                  value={form.language}
                  onValueChange={(v) => setField('language', v)}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Français">Français</SelectItem>
                    <SelectItem value="Arabe">Arabe</SelectItem>
                    <SelectItem value="Anglais">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {form.emailNotifications ? (
              <Bell className="w-4 h-4 text-gold" />
            ) : (
              <BellOff className="w-4 h-4 text-muted-foreground" />
            )}
            Notifications par email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset className="space-y-4" disabled={loading}>
            <legend className="sr-only">Notifications</legend>

            {/* Interrupteur principal */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">
                  Activer les notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Recevez des alertes par email (envoyées à{' '}
                  <span className="font-medium">{form.email}</span>).
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={form.emailNotifications}
                onCheckedChange={(checked) =>
                  setBoolField('emailNotifications', checked)
                }
              />
            </div>

            {/* Préférences détaillées */}
            <div
              className={`space-y-3 rounded-lg border p-4 transition-opacity ${
                form.emailNotifications ? '' : 'opacity-50 pointer-events-none'
              }`}
            >
              <p className="text-sm font-medium">Me notifier par email :</p>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-contact">
                    Messages du formulaire de contact
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Un email à chaque nouveau message envoyé depuis le site.
                  </p>
                </div>
                <Switch
                  id="notify-contact"
                  checked={form.notifyContactMessages}
                  onCheckedChange={(checked) =>
                    setBoolField('notifyContactMessages', checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-member">
                    Nouveaux membres de l'équipe
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Un email quand un membre est ajouté à l'équipe.
                  </p>
                </div>
                <Switch
                  id="notify-member"
                  checked={form.notifyNewMember}
                  onCheckedChange={(checked) =>
                    setBoolField('notifyNewMember', checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-project">Nouveaux projets</Label>
                  <p className="text-xs text-muted-foreground">
                    Un email quand un projet est créé dans le dashboard.
                  </p>
                </div>
                <Switch
                  id="notify-project"
                  checked={form.notifyNewProject}
                  onCheckedChange={(checked) =>
                    setBoolField('notifyNewProject', checked)
                  }
                />
              </div>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button
          className="bg-sapphire text-white hover:bg-sapphire/90"
          onClick={handleSave}
          disabled={loading || saving}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            'Sauvegarder'
          )}
        </Button>
      </div>
    </div>
  );
}
