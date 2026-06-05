"use client";

import Link from "next/link";
import { ArrowLeft, CircleUser, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="edit-profile-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Edit Account Information</h2>
          <p className="text-xs text-muted-foreground">Modify credentials and display configurations</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Display Name</label>
              <Input placeholder="Hoang" className="w-full bg-muted/50 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Email Address</label>
              <Input type="email" placeholder="hoang@langora.com" className="w-full bg-muted/50 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">New Password</label>
                <Input type="password" placeholder="••••••••" className="w-full bg-muted/50 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Confirm Password</label>
                <Input type="password" placeholder="••••••••" className="w-full bg-muted/50 rounded-xl" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button className="font-bold text-xs gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
                Save Changes <Save className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
