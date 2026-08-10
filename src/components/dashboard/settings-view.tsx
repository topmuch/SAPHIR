'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export function SettingsView() {
  const [agencyName, setAgencyName] = useState('SAPHIR COM');
  const [email, setEmail] = useState('contact@saphircom.ma');
  const [phone, setPhone] = useState('+212 5 22 00 00 00');
  const [address, setAddress] = useState('Casablanca, Maroc');
  const [website, setWebsite] = useState('www.saphircom.ma');
  const [currency, setCurrency] = useState('MAD');
  const [language, setLanguage] = useState('Français');
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-sm text-muted-foreground">
          Gérez les informations et les préférences de votre agence.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil de l'agence</CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset className="space-y-4">
            <legend className="sr-only">Informations de l'agence</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="agency-name">Nom de l'agence</Label>
                <Input
                  id="agency-name"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences</CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset className="space-y-4">
            <legend className="sr-only">Préférences</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAD">MAD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Langue</Label>
                <Select value={language} onValueChange={setLanguage}>
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

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Notifications par email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez les alertes et mises à jour par email.
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button className="bg-sapphire text-white hover:bg-sapphire/90">
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}
