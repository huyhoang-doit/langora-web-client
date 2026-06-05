"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, BookOpen, Layers, PenLine, SpellCheck, Bot, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="mb-16">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Core Features</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Langora integrates cognitive science with state-of-the-art AI to build the ultimate personal language learning workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass p-8 rounded-xl border border-border hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
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
