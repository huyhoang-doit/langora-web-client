"use client";

import Link from "next/link";
import { Brain, Zap, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function AboutPage() {
  const pillars = [
    {
      icon: Brain,
      title: "Cognitive Science",
      desc: "Applying spaced repetition, active recall, and structured progression to build memory paths that stick.",
    },
    {
      icon: Zap,
      title: "AI Personalization",
      desc: "Adapting materials based on real-time weakness analysis. No generic pathways, only targeted modules.",
    },
    {
      icon: Target,
      title: "Effective Mastery",
      desc: "Helping students and professionals achieve verifiable fluency markers (IELTS, JLPT, Business Proficiency).",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Learners" },
    { value: "500K+", label: "Words Mastered" },
    { value: "98%", label: "AI Satisfaction" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="about-page">
      {/* Radial background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Our Mission</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-heading leading-[1.1]">
          Built for the{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Modern Learner
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          We build tools that align human cognitive capacity with personalized
          artificial intelligence. Our vision is to optimize how the brain
          retains languages.
        </p>
      </section>

      {/* Stats bar */}
      <section className="bg-card/50 py-12 border-y-2 border-border/80">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-10 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-4xl font-black text-primary mb-1 text-heading">
                {value}
              </div>
              <div className="text-xs text-muted-foreground font-black uppercase tracking-widest text-heading">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <h2 className="text-2xl font-black text-center mb-12 text-heading uppercase tracking-widest text-primary">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-edu card-edu-interactive p-6 bg-card group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg mb-2 text-heading">{title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed font-semibold text-learning">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ora Banner */}
      <section className="pb-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="card-edu p-8 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-5 items-start">
          <span className="text-4xl animate-bounce flex-shrink-0">🐲</span>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-primary text-heading">
              Why Langora?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-semibold text-learning">
              Traditional language tools treat every user identically, which leads
              to boredom or discouragement. Langora operates dynamically — it
              adjusts content to match your speed, alerts you to vocab you&apos;re
              about to forget, and checks your written structure with specialized
              language models.
            </p>
            <Link href="/register" className="inline-block mt-2">
              <Button className="btn-edu h-10 px-5 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide">
                Start for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
