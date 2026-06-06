"use client";

import Link from "next/link";
import { CheckCircle, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

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

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Transparent Pricing</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-heading leading-[1.1]">
          Invest in Your{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Language Skills
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
          Choose a plan that matches your learning goals. No hidden fees.
        </p>
      </section>

      {/* Plans */}
      <section className="pb-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(({ name, price, period, features, cta, featured, badge }) => (
            <div
              key={name}
              className={`card-edu p-10 flex flex-col relative ${
                featured
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border"
              }`}
            >
              {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2 border-primary-foreground/20 shadow-md">
                  {badge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-black mb-2 text-heading">{name}</h3>
                <div className="text-5xl font-black text-foreground text-heading">
                  {price}
                  <span className="text-sm text-muted-foreground font-normal ml-0.5">
                    {period}
                  </span>
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
                    <span
                      className={
                        ok && featured
                          ? "text-primary font-bold text-learning"
                          : "text-foreground font-semibold text-learning"
                      }
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button
                  variant={featured ? "default" : "outline"}
                  className={`btn-edu w-full py-6 text-sm border-2 font-black uppercase tracking-wide ${
                    featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-transparent text-foreground hover:bg-muted"
                  }`}
                >
                  {cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-center max-w-2xl mx-auto">
          <span className="text-3xl flex-shrink-0">🐲</span>
          <p className="text-sm text-muted-foreground font-semibold text-learning">
            All paid plans come with a{" "}
            <span className="text-foreground font-black text-heading">7-day money-back guarantee</span>.
            Try Langora risk-free and feel the difference.
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
