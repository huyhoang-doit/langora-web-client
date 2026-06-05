"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OnboardingWelcomePage() {
  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-welcome-page">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[500px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10 text-center">
        <header className="mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary text-heading">Onboarding Step 1 of 6</span>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-4 text-heading">Welcome to Langora!</h1>
          <p className="text-muted-foreground text-sm leading-relaxed font-medium">
            Let's customize your linguistic journey. We'll set up your target language, evaluate your goals, and estimate your initial proficiency level.
          </p>
        </header>

        <div className="my-8 py-6 border-y-2 border-border/80 flex justify-around items-center">
          <div className="text-center">
            <div className="text-2xl font-black text-primary text-heading">2 min</div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider mt-0.5">Estimated time</div>
          </div>
          <div className="w-[2px] h-10 bg-border/80" />
          <div className="text-center">
            <div className="text-2xl font-black text-primary text-heading">AI-guided</div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider mt-0.5">Flow style</div>
          </div>
        </div>

        <Link href="/onboarding/select-language" className="block w-full">
          <Button className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
            Let's Start
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-semibold">© 2024 Langora. Engineered for cognitive clarity.</p>
      </div>
    </main>
  );
}
