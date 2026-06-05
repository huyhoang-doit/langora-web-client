"use client";

import Link from "next/link";
import { CircleUser, Edit3, Settings, Bell, CreditCard, Receipt, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
  const menuItems = [
    { href: "/profile/edit", label: "Edit Account Information", icon: Edit3 },
    { href: "/profile/preferences", label: "Learning Preferences", icon: Settings },
    { href: "/profile/notifications", label: "Notification Settings", icon: Bell },
    { href: "/profile/subscription", label: "Manage Subscriptions", icon: CreditCard },
    { href: "/profile/billing", label: "Billing & Invoices", icon: Receipt },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="profile-main-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">User Profile</h2>
          <p className="text-xs text-muted-foreground">Manage account credentials and learning targets</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6">
          {/* User Meta Card */}
          <Card className="p-6">
            <CardContent className="p-0 flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarFallback className="bg-muted text-xl">👤</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground">Hoang</h3>
                  <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">Pro Member</span>
                </div>
                <p className="text-xs text-muted-foreground">hoang@langora.com</p>
                <p className="text-[10px] text-muted-foreground font-semibold">Active target: English B2 • IELTS 8.0</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions List */}
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={item.label} className="block">
                  <Card className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-semibold text-foreground">{item.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
