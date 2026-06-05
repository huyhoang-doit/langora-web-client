"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManageSubscriptionPage() {
  const benefits = [
    "Unlimited AI Writing diagnostics and style suggestions.",
    "Real-time spoken simulation sessions with Ora companion.",
    "Calculated spaced repetition review recommendations.",
    "Comprehensive weekly grammar diagnostic analytics reports.",
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="manage-subscription-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Subscriptions</h2>
          <p className="text-xs text-muted-foreground font-semibold">Manage payment methods and premium tiers</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <div className="card-edu p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-primary/20 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-1.5 text-heading">
                <Award className="w-4 h-4" /> Current Plan: Pro Member
              </h3>
              <span className="text-[10px] text-primary bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full font-black text-heading">199k/month</span>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-learning">Your subscription is active and will automatically renew on July 1, 2026.</p>
            
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-black text-foreground uppercase tracking-widest text-heading">Included benefits:</h4>
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed font-semibold text-learning">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="btn-edu w-full py-6 text-sm border-2 bg-transparent border-destructive/25 text-destructive hover:bg-destructive/10">
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
