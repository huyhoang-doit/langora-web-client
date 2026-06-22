"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="edit-profile-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Edit Account Information</h2>
          <p className="text-xs text-muted-foreground font-semibold">Modify credentials and display configurations</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">Display Name</label>
              <Input placeholder="Hoang" className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">Email Address</label>
              <Input type="email" placeholder="hoang@langora.com" className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">New Password</label>
                <Input type="password" placeholder="••••••••" className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 text-heading">Confirm Password</label>
                <Input type="password" placeholder="••••••••" className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button className="btn-edu h-10 px-5 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 gap-1.5">
                Save Changes <Save className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
