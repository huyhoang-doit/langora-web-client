"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0đ",
      period: "/month",
      features: [
        { text: "Learn 20 words per day", ok: true },
        { text: "AI Writing basic (3 lessons/week)", ok: true },
        { text: "Personalized Roadmap", ok: false },
        { text: "Real-time AI speaking coach", ok: false },
      ],
      cta: "Start Learning",
      featured: false,
    },
    {
      name: "Pro",
      price: "199k",
      period: "/month",
      features: [
        { text: "Unlimited Vocabulary learning", ok: true },
        { text: "Unlimited AI Writing Coach corrections", ok: true },
        { text: "Personalized Adaptive Roadmap", ok: true },
        { text: "Premium speaking simulations", ok: true },
      ],
      cta: "Upgrade to Pro",
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Premium AI",
      price: "450k",
      period: "/month",
      features: [
        { text: "Everything in Pro plan", ok: true },
        { text: "Voice Conversational Coaching with Ora", ok: true },
        { text: "Deep IELTS / TOEIC speech & essay evaluation", ok: true },
        { text: "Priority access to new AI models", ok: true },
      ],
      cta: "Upgrade to Premium",
      featured: false,
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="pricing-page">
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
      <main className="pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Invest in your language skills. Choose a plan that matches your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(({ name, price, period, features, cta, featured, badge }) => (
            <div
              key={name}
              className={`glass p-10 rounded-2xl flex flex-col relative ${featured ? "border-2 border-primary shadow-2xl shadow-primary/10" : "border border-border"}`}
            >
              {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {badge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <div className="text-5xl font-black">
                  {price}
                  <span className="text-sm text-muted-foreground font-normal">{period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-10 flex-grow">
                {features.map(({ text, ok }) => (
                  <li key={text} className="flex items-center gap-2 text-sm">
                    {ok ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
                    ) : (
                      <XCircle className="w-4 h-4 flex-shrink-0 text-muted-foreground opacity-30" />
                    )}
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={featured ? "default" : "outline"}
                className={`w-full py-6 rounded-xl font-bold text-sm ${featured ? "shadow-lg shadow-primary/20" : ""}`}
              >
                {cta}
              </Button>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t py-12 text-center text-xs text-muted-foreground">
        © 2024 Langora. Engineered for cognitive clarity.
      </footer>
    </div>
  );
}
