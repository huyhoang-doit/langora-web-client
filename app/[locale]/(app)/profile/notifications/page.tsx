"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function NotificationSettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="notification-settings-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Notification Settings</h2>
          <p className="text-xs text-muted-foreground font-semibold">Manage push alerts and daily review reminders</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <div className="space-y-4">
            <div className="card-edu p-5 bg-card flex items-center justify-between gap-4">
              <div className="text-heading">
                <span className="font-black text-sm text-foreground block">Daily Study Reminders</span>
                <p className="text-xs text-muted-foreground mt-0.5 font-bold text-learning">Alert me when my streak is in danger of being lost.</p>
              </div>
              <Switch defaultChecked className="border-2 border-border/60" />
            </div>

            <div className="card-edu p-5 bg-card flex items-center justify-between gap-4">
              <div className="text-heading">
                <span className="font-black text-sm text-foreground block">Weekly Performance Reports</span>
                <p className="text-xs text-muted-foreground mt-0.5 font-bold text-learning">Receive weekly reports on vocabulary and grammar analytics.</p>
              </div>
              <Switch defaultChecked className="border-2 border-border/60" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button className="btn-edu h-10 px-5 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 gap-1.5">
              Save Settings <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
