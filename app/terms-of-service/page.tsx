"use client";

import { FileText } from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

const sections = [
  {
    title: "1. User Agreement",
    content:
      "By accessing Langora, you agree to comply with our code of conduct, respect intellectual property, and maintain secure passwords for your dashboard credentials.",
  },
  {
    title: "2. Pro/Premium Subscriptions",
    content:
      "Subscriptions to Pro and Premium packages are billed monthly or annually. Cancellation takes effect at the end of the current billing cycle. Refunds are processed according to our specific refund criteria.",
  },
  {
    title: "3. Acceptable Use of AI",
    content:
      "Our writing checkers and oral companions are for educational purposes. Any exploitation of the underlying API, automated extraction of language assets, or generation of prohibited materials will result in immediate suspension.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All AI-generated content, course materials, and vocabulary datasets are the intellectual property of Langora and its licensors. Redistribution of content outside the platform is strictly prohibited.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="terms-of-service-page">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-12 px-6 md:px-12 max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Terms of Service</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-heading leading-[1.1]">
          Clear &{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Fair Terms
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
          <span className="text-2xl flex-shrink-0">🐲</span>
          <p className="text-sm text-muted-foreground font-semibold text-learning">
            Have questions about our terms?{" "}
            <a href="/contact" className="text-primary font-black hover:underline text-heading">
              Reach out to our legal team
            </a>{" "}
            — we are happy to clarify.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
