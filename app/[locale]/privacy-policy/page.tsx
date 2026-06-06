"use client";

import { Shield, Sparkles } from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import ImageLogoWeb from "@/components/image-logo-web";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information to provide better services to our learners. This includes personal preferences, emails, learning objectives, vocabulary responses, essay writings, and voice inputs (if speaking simulation is activated).",
  },
  {
    title: "2. How We Use Information",
    content:
      "We use the collected data to personalize your learning paths, calculate memory degradation curves, score your grammar and syntax structures via LLMs, and suggest daily recommendations.",
  },
  {
    title: "3. Data Security",
    content:
      "We use industry-standard encryption protocols to protect your personal details and learning progress. We do not sell your learning datasets or personal credentials to third-party advertisers.",
  },
  {
    title: "4. Your Rights",
    content:
      "You may request export or deletion of your personal data at any time through the account settings panel. Data deletion requests are processed within 14 business days.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="privacy-policy-page">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-12 px-6 md:px-12 max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Privacy Policy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-heading leading-[1.1]">
          Your Privacy,{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Protected
          </span>
        </h1>
        <p className="text-muted-foreground text-sm font-semibold">
          Last updated: June 5, 2026
        </p>
      </section>

      {/* Content */}
      <section className="pb-20 px-6 md:px-12 max-w-3xl mx-auto relative z-10 space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="card-edu p-6 bg-card space-y-3">
            <h2 className="text-base font-black text-heading text-foreground">{s.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold text-learning">
              {s.content}
            </p>
          </div>
        ))}

        <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-3 items-start">
          <ImageLogoWeb variant="mascot" className="flex-shrink-0 w-8 h-8" />
          <p className="text-sm text-muted-foreground font-semibold text-learning">
            Questions about your privacy?{" "}
            <a href="/contact" className="text-primary font-black hover:underline text-heading">
              Contact our data team
            </a>{" "}
            and we will respond within 2 business days.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
