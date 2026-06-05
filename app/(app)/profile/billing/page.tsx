"use client";

import Link from "next/link";
import { ArrowLeft, Receipt, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BillingHistoryPage() {
  const invoices = [
    { id: "INV-0842", date: "June 1, 2026", amount: "199,000đ", plan: "Pro Membership" },
    { id: "INV-0719", date: "May 1, 2026", amount: "199,000đ", plan: "Pro Membership" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="billing-history-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Billing History</h2>
          <p className="text-xs text-muted-foreground font-semibold">Download receipts and track billing cycles</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-4 pt-4">
          {invoices.map((inv) => (
            <div key={inv.id} className="card-edu p-5 bg-card flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Receipt className="w-5 h-5" />
                </span>
                <div className="text-heading">
                  <span className="font-black text-sm text-foreground block">{inv.plan}</span>
                  <span className="text-[10px] text-muted-foreground font-bold block mt-0.5">{inv.date} • {inv.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-sm font-black text-foreground text-heading">{inv.amount}</span>
                <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
