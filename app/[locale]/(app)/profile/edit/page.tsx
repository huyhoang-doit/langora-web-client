"use client";

import Link from "next/link";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { UserService } from "@/services/user.service";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import AvatarUpload from "@/components/customize/avatar-upload";
import { ProfileSubpageHeader } from "@/components/profile/profile-subpage-header";

export default function EditProfilePage() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    displayName: user?.displayName || "",
    bio: user?.bio || "",
  });

  const userName = user?.displayName || user?.fullName || "Student";
  const userInitials = userName.substring(0, 2).toUpperCase();

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await UserService.updateProfile({
        fullName: formData.fullName,
        displayName: formData.displayName,
        bio: formData.bio,
      });
      if (res.success) {
        // Fetch new profile data to update state
        const profileRes = await UserService.getProfile();
        if (profileRes.success && profileRes.data) {
          setAuth(profileRes.data);
        }
        toast.success("Profile updated successfully!");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="edit-profile-page">
      <ProfileSubpageHeader
        title="Edit Account Information"
        subtitle="Modify credentials and display configurations"
      />

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">

          {/* Avatar Section */}
          <div className="card-edu p-8 flex flex-col items-center text-center space-y-4 bg-card">
            <AvatarUpload
              url={user?.avatarUrl}
              fallback={userInitials}
              onUpload={handleAvatarUpload}
              className="w-32 h-32 border-4 border-background shadow-lg"
            />
            <div>
              <p className="text-sm font-bold text-muted-foreground">Click avatar to upload new photo</p>
            </div>
          </div>

          <form className="card-edu p-6 md:p-8 space-y-5 bg-card" onSubmit={handleSave}>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">Display Name</label>
              <Input
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="What should we call you?"
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">Full Name</label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">Bio</label>
              <Input
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button disabled={loading} type="submit" className="btn-edu h-10 px-5 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 gap-1.5">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                {!loading && <Save className="w-4 h-4" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
