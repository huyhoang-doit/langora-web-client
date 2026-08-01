"use client";

import Link from "next/link";
import { ArrowLeft, Save, Smartphone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { UserService } from "@/services/user.service";
import { UserPreference, UserDevice } from "@/types/user";
import { toast } from "sonner";
import { format } from "date-fns";

export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState<UserPreference | null>(null);
  const [devices, setDevices] = useState<UserDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prefRes, devRes] = await Promise.all([
          UserService.getPreferences(),
          UserService.getDevices()
        ]);
        
        if (prefRes.success && prefRes.data) {
          setPreferences(prefRes.data);
          setReminderEnabled(prefRes.data.reminderEnabled);
          setEmailNotificationEnabled(prefRes.data.emailNotificationEnabled);
        }

        if (devRes.success && devRes.data) {
          setDevices(devRes.data);
        }
      } catch (error) {
        console.error("Failed to load notifications settings", error);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await UserService.updatePreferences({
        reminderEnabled,
        emailNotificationEnabled
      });
      if (res.success) {
        toast.success("Notification settings saved!");
      }
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

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
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="card-edu p-5 bg-card flex items-center justify-between gap-4">
                  <div className="text-heading">
                    <span className="font-black text-sm text-foreground block">Daily Study Reminders</span>
                    <p className="text-xs text-muted-foreground mt-0.5 font-bold text-learning">Alert me when my streak is in danger of being lost.</p>
                  </div>
                  <Switch 
                    checked={reminderEnabled}
                    onCheckedChange={setReminderEnabled}
                    className="border-2 border-border/60" 
                  />
                </div>

                <div className="card-edu p-5 bg-card flex items-center justify-between gap-4">
                  <div className="text-heading">
                    <span className="font-black text-sm text-foreground block">Weekly Performance Reports</span>
                    <p className="text-xs text-muted-foreground mt-0.5 font-bold text-learning">Receive weekly reports on vocabulary and grammar analytics.</p>
                  </div>
                  <Switch 
                    checked={emailNotificationEnabled}
                    onCheckedChange={setEmailNotificationEnabled}
                    className="border-2 border-border/60" 
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-edu h-10 px-5 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 gap-1.5"
                >
                  {saving ? "Saving..." : "Save Settings"} {!saving && <Save className="w-4 h-4" />}
                </Button>
              </div>

              {/* Active Devices */}
              <div className="pt-6 mt-6 border-t-2 border-border/30">
                <h3 className="text-sm font-black text-foreground mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary" /> Active Devices
                </h3>
                {devices.length === 0 ? (
                  <div className="text-center p-6 border-2 border-dashed border-border/60 rounded-xl bg-muted/20">
                    <p className="text-xs font-bold text-muted-foreground">No active devices registered for push notifications.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {devices.map(device => (
                      <div key={device.id} className="card-edu p-4 bg-card flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-foreground">{device.deviceName || device.deviceType}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Last active: {device.lastActiveAt ? format(new Date(device.lastActiveAt), "MMM d, yyyy") : "Unknown"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${device.isActive ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}>
                            {device.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
