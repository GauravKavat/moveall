'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    digest: true,
  });

  const handleCompanySave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Company settings saved', description: 'Company profile updated in prototype mode.' });
  };

  const handleNotificationSave = () => {
    toast({ title: 'Preferences saved', description: 'Notification preferences have been updated.' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and platform settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Company Settings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Company Information</h2>
          <form className="space-y-4" onSubmit={handleCompanySave}>
            <FieldGroup>
              <Field>
                <FieldLabel>Company Name</FieldLabel>
                <Input
                  type="text"
                  defaultValue="Move All Logistics"
                  disabled
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  defaultValue="admin@moveall.com"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  type="tel"
                  defaultValue="+91-9876543210"
                />
              </Field>
            </FieldGroup>

            <Button type="submit">Save Changes</Button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email alerts for important events
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({ ...prev, email: e.target.checked }))
                }
                className="h-4 w-4 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get SMS notifications for critical issues
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.sms}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({ ...prev, sms: e.target.checked }))
                }
                className="h-4 w-4 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Daily Digest</p>
                <p className="text-sm text-muted-foreground">
                  Receive daily summary of operations
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.digest}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({ ...prev, digest: e.target.checked }))
                }
                className="h-4 w-4 rounded"
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleNotificationSave}>
            Save Preferences
          </Button>
        </div>

        {/* Integrations */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Integrations</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium">DPL API</p>
                <p className="text-sm text-muted-foreground">
                  Connected • Updated 2 hours ago
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast({ title: 'DPL API', description: 'Opening DPL integration settings (prototype).' })}
              >
                Manage
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium">Ecom Express API</p>
                <p className="text-sm text-muted-foreground">
                  Connected • Updated 4 hours ago
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast({ title: 'Ecom Express API', description: 'Opening courier integration settings (prototype).' })}
              >
                Manage
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-red-900">Danger Zone</h2>
          <p className="mb-4 text-sm text-red-800">
            These actions are irreversible. Please proceed with caution.
          </p>
          <Button
            variant="destructive"
            onClick={() =>
              toast({
                title: 'Restricted in prototype',
                description: 'Account deletion is disabled in demo mode.',
                variant: 'destructive',
              })
            }
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
