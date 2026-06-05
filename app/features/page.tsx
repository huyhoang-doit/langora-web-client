"use client";

import { Sparkles, Layers, PenLine, SpellCheck, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function FeaturesPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Vocabulary Builder",
      desc: "Automatically extracts and groups high-yield vocabulary based on your targets, interests, or placement results. No manual lookup needed.",
    },
    {
      icon: Layers,
      title: "Spaced Repetition Flashcards",
      desc: "A cognitive-science backed revision system that schedules words to be reviewed exactly when you're about to forget them, cementing them in long-term memory.",
    },
    {
      icon: PenLine,
      title: "AI Writing Coach",
      desc: "Translates, rewrites, and corrects your essays or paragraphs with granular corrections on grammar, style, vocabulary selection, and native phrasing.",
    },
    {
      icon: SpellCheck,
      title: "Adaptive Grammar Modules",
      desc: "Identifies your specific grammar blind spots and auto-generates custom mini-quizzes to practice only what you need help with.",
    },
    {
      icon: Bot,
      title: "Ora AI Companion",
      desc: "Your 24/7 speaking companion and personal coach. Engage in real-time voice conversations and receive customized recommendations.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="features-page">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Core Features</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-heading leading-[1.1]">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Master a Language
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          Langora integrates cognitive science with state-of-the-art AI to build the
          ultimate personal language learning workspace.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="pb-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-edu card-edu-interactive p-8 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-black text-xl mb-3 text-heading">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-semibold text-learning">{desc}</p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="card-edu p-8 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-4 block">🐲</span>
              <h3 className="font-black text-xl text-heading mb-3">Ready to start?</h3>
              <p className="text-sm text-muted-foreground font-semibold text-learning">
                Join 10,000+ learners leveraging AI to master languages faster.
              </p>
            </div>
            <Link href="/register" className="mt-6 inline-block">
              <Button className="btn-edu h-11 px-6 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
