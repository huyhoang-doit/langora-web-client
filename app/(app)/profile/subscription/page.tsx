"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Subscriptions</h2>
          <p className="text-xs text-muted-foreground">Manage payment methods and premium tiers</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Current Plan: Pro Member
                </CardTitle>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-bold">199k/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">Your subscription is active and will automatically renew on July 1, 2026.</p>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">Included benefits:</h4>
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-destructive/20 text-destructive hover:bg-destructive/10 transition-all">
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
