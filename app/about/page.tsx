"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Brain, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="about-page">
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
      <main className="pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
        <div className="mb-16">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Mission</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We build tools that align human cognitive capacity with personalized artificial intelligence. Our vision is to optimize how the brain retains languages.
          </p>
        </div>

        <div className="space-y-12">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl border border-border">
              <Brain className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Cognitive Science</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Applying spaced repetition, active recall, and structured progression to build memory paths that stick.
              </p>
            </div>
            <div className="glass p-6 rounded-xl border border-border">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">AI Personalization</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Adapting materials based on real-time weakness analysis. No generic pathways, only targeted modules.
              </p>
            </div>
            <div className="glass p-6 rounded-xl border border-border">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Effective Mastery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Helping students and professionals achieve verifiable fluency markers (IELTS, JLPT, Business Proficiency).
              </p>
            </div>
          </section>

          <section className="glass p-8 rounded-xl border border-border space-y-4">
            <h2 className="text-2xl font-bold">Why Langora?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Traditional language tools treat every user identically, which leads to boredom or discouragement. Langora operates dynamically. It adjusts content to match your speed, alerts you to vocab you are about to forget, and checks your written structure with specialized language models.
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
