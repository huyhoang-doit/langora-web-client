"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="terms-of-service-page">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <img src="/big-logo.png" className="h-10 w-auto" alt="Langora Logo" />
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button className="font-bold text-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-36 pb-24 px-6 md:px-12 max-w-3xl mx-auto relative z-10">
        <div className="mb-12">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: June 5, 2026</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6 text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. User Agreement</h2>
            <p>
              By accessing Langora, you agree to comply with our code of conduct, respect intellectual property, and maintain secure passwords for your dashboard credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Pro/Premium Subscriptions</h2>
            <p>
              Subscriptions to Pro and Premium packages are billed monthly or annually. Cancellation takes effect at the end of the current billing cycle. Refunds are processed according to our specific refund criteria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Acceptable Use of AI</h2>
            <p>
              Our writing checkers and oral companions are for educational purposes. Any exploitation of the underlying API, automated extraction of language assets, or generation of prohibited materials will result in immediate suspension.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-12 text-center text-xs text-muted-foreground">
        © 2024 Langora. Engineered for cognitive clarity.
      </footer>
    </div>
  );
}
