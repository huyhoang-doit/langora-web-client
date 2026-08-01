"use client";

import Link from "next/link";
import { Edit3, Settings, Bell, CreditCard, Receipt, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import AvatarUpload from "@/components/customize/avatar-upload";
import { UserService } from "@/services/user.service";
import { learningService } from "@/services/learning.service";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { UserLearningProfile } from "@/types/user";
import { Language } from "@/types/learning";

export default function ProfilePage() {
  const menuItems = [
    { href: "/profile/edit", label: "Edit Account Information", icon: Edit3 },
    { href: "/profile/preferences", label: "Learning Preferences", icon: Settings },
    { href: "/profile/notifications", label: "Notification Settings", icon: Bell },
    { href: "/profile/subscription", label: "Manage Subscriptions", icon: CreditCard },
    { href: "/profile/billing", label: "Billing & Invoices", icon: Receipt },
  ];
  
  const { user, setAuth } = useAuthStore();
  const userName = user?.displayName || user?.fullName || "Student";
  const userInitials = userName.substring(0, 2).toUpperCase();
  const email = user?.email || "";
  const role = user?.roles?.includes("PRO") ? "Pro Member" : "Free Member";

  const [learningProfile, setLearningProfile] = useState<UserLearningProfile | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, languagesRes] = await Promise.all([
          UserService.getLearningProfile(),
          learningService.getLanguages()
        ]);
        if (profileRes.success && profileRes.data) {
          setLearningProfile(profileRes.data);
        }
        if (languagesRes.success && languagesRes.data) {
          setLanguages(languagesRes.data);
        }
      } catch (error) {
        console.error("Failed to load profile data", error);
      }
    };
    fetchData();
  }, []);

  const handleAvatarUpload = async (file: File) => {
    try {
      const res = await UserService.updateAvatar(file);
      if (res.success) {
        toast.success("Avatar updated successfully!");
        const profileRes = await UserService.getProfile();
        if (profileRes.success && profileRes.data) {
          setAuth(profileRes.data);
        }
      }
    } catch (error) {
      toast.error("Failed to upload avatar.");
      console.error(error);
    }
  };

  const getLanguageName = (langId?: string) => {
    if (!langId) return "Not Set";
    return languages.find(l => l.id === langId)?.name || langId;
  };

  const getLevelDisplay = (levelId?: string) => {
    return levelId ? ` • Level ${levelId.toUpperCase()}` : "";
  };

  const activeTargetDisplay = learningProfile 
    ? `Active target: ${getLanguageName(learningProfile.targetLanguageId)}${getLevelDisplay(learningProfile.currentLevelId)}`
    : "Active target: Not Set";

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="profile-main-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">User Profile</h2>
          <p className="text-xs text-muted-foreground font-semibold">Manage account credentials and learning targets</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6">
          {/* User Meta Card */}
          <div className="card-edu p-6 bg-card flex items-center gap-6">
            <AvatarUpload
              url={user?.avatarUrl}
              fallback={userInitials}
              onUpload={handleAvatarUpload}
              className="w-16 h-16 border-2 border-primary"
            />
            <div className="space-y-1 text-heading">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-foreground">{userName}</h3>
                <span className="text-[10px] font-black text-primary uppercase bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full">{role}</span>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">{email}</p>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{activeTargetDisplay}</p>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={item.label} className="block">
                  <div className="card-edu card-edu-interactive p-4 bg-card flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-bold text-foreground text-heading">{item.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
