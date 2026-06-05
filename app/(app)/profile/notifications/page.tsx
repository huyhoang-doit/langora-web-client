"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function NotificationSettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="notification-settings-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Notification Settings</h2>
          <p className="text-xs text-muted-foreground">Manage push alerts and daily review reminders</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <div className="space-y-4">
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-sm text-foreground block">Daily Study Reminders</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Alert me when my streak is in danger of being lost.</p>
                </div>
                <Switch defaultChecked />
              </CardContent>
            </Card>

            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-sm text-foreground block">Weekly Performance Reports</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Receive weekly reports on vocabulary and grammar analytics.</p>
                </div>
                <Switch defaultChecked />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end pt-2">
            <Button className="font-bold text-xs gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
              Save Settings <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
