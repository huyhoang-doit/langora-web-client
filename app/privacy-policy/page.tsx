"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="privacy-policy-page">
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
          <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: June 5, 2026</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6 text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
            <p>
              We collect information to provide better services to our learners. This includes personal preferences, emails, learning objectives, vocabulary responses, essay writings, and voice inputs (if speaking simulation is activated).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. How We Use Information</h2>
            <p>
              We use the collected data to personalize your learning paths, calculate memory degradation curves, score your grammar and syntax structures via LLMs, and suggest daily recommendations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Data Security</h2>
            <p>
              We use industry-standard encryption protocols to protect your personal details and learning progress. We do not sell your learning datasets or personal credentials to third-party advertisers.
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
