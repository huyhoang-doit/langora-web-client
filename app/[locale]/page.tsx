"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Layers,
  PenLine,
  BarChart2,
  Flame,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function LandingPage() {
  const t = useTranslations();
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans">
      {/* Subtle radial glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="z-10">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {t("landing.badge")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] mb-4 tracking-tight text-heading">
              {t("landing.hero_title")}{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {t("landing.hero_highlight")}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg leading-relaxed">
              {t("landing.hero_description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button
                  size="sm"
                  className="btn-edu h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t("landing.cta_primary")}
                </Button>
              </Link>
              <Link href="#demo-section">
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-edu h-10 px-6 bg-transparent hover:bg-muted text-foreground"
                >
                  {t("landing.cta_secondary")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Ora image + floating cards */}
          <div className="relative min-h-[360px] flex items-center justify-center">
            <div className="w-full relative overflow-hidden rounded-3xl p-2 flex justify-center">
              <Image
                src="/ora/3-ora.png"
                alt="Langora AI Companion"
                width={800}
                height={600}
                className="w-[110%] md:w-[120%] lg:w-[130%] max-w-none h-auto object-contain drop-shadow-xl transition-transform duration-500 z-10"
                priority
              />
            </div>

            {/* Floating Cards */}
            <div
              className="absolute -top-2 left-0 glass card-edu p-3 w-40 shadow-md"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  FLASHCARD
                </span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-0.5 text-heading">木漏れ日</h3>
              <p className="text-[10px] text-muted-foreground">Japanese • N2</p>
            </div>

            <div className="absolute -bottom-20 right-3 md:right-0 glass card-edu p-4 w-52 shadow-lg">
              <div className="flex items-center gap-1.5 mb-2">
                <PenLine className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                  AI Coach
                </span>
              </div>
              <div className="text-xs leading-relaxed text-foreground">
                &quot;I{" "}
                <span className="bg-destructive/20 text-destructive px-1 rounded font-bold">
                  gived
                </span>{" "}
                <span className="text-primary font-bold">gave</span> her the book.&quot;
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-border/60 text-[10px] text-muted-foreground italic">
                &quot;Use past tense for completed actions.&quot;
              </div>
            </div>

            <div className="absolute top-2 -right-16 glass card-edu px-3 py-2 flex items-center gap-1.5 shadow-sm">
              <Flame className="w-4 h-4 text-primary" />
              <div>
                <div className="text-[10px] text-muted-foreground">{t("landing.streak_label")}</div>
                <div className="text-xs font-bold text-foreground">{t("landing.streak_value")}</div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-4 glass card-edu p-3 w-48 shadow-sm">
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] font-bold text-foreground">{t("landing.xp_label")}</span>
                <span className="text-[10px] text-muted-foreground font-semibold">850/1000</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/80">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ──────────────────────────────────────────── */}
      <section id="features" className="bg-card/50 py-10 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { num: "10.000+", label: t("landing.stats_students") },
            { num: "500.000+", label: t("landing.stats_vocab") },
            { num: "98%", label: t("landing.stats_satisfaction") },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-primary mb-1 text-heading">{num}</div>
              <div className="text-xs text-muted-foreground font-bold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Demo Video ───────────────────────────────────────────────── */}
      <section id="demo-section" className="py-12 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight text-heading">
            {t("landing.demo_heading").split("Langora")[0]}
            <span className="text-primary">Langora</span>
            {t("landing.demo_heading").split("Langora")[1] ?? ""}
          </h2>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="w-full bg-card rounded-xl border border-border shadow-md overflow-hidden relative group">
            <div className="p-3 border-b border-border bg-muted/40 flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
              </div>
              <div className="text-[10px] text-muted-foreground font-mono select-none">
                langora-demo.mp4
              </div>
              <div className="w-12" />
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src="/demo.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-8 tracking-tight text-heading">
          {t("landing.features_heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Sparkles, titleKey: "feature_vocab_title", descKey: "feature_vocab_desc" },
            { icon: Layers, titleKey: "feature_flash_title", descKey: "feature_flash_desc" },
            { icon: PenLine, titleKey: "feature_writing_title", descKey: "feature_writing_desc" },
            { icon: BarChart2, titleKey: "feature_path_title", descKey: "feature_path_desc" },
          ].map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="card-edu card-edu-interactive p-5 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-sm mb-2 text-heading">{t(`landing.${titleKey}`)}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(`landing.${descKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 bg-card/20 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-black text-center mb-10 tracking-tight text-heading">
            {t("landing.how_heading")}
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-5 left-0 w-full h-px bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center mb-3 shadow-sm shadow-primary/20 z-10 border-2 border-primary-foreground/20 text-sm">
                    {n}
                  </div>
                  <h4 className="font-bold mb-1 text-xs text-foreground text-heading">
                    {t(`landing.step${n}_title`)}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">{t(`landing.step${n}_desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section id="testimonials" className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-8 tracking-tight text-heading">
          {t("landing.testimonials_heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Minh Trí",
              role: "IELTS Learner (8.0 Target)",
              quote:
                "Langora thực sự thay đổi cách mình học writing. Phản hồi từ AI cực kỳ chi tiết và giúp mình nhận ra những lỗi ngữ pháp trước đây luôn bỏ qua.",
              avatar: "/avatar/person-1.jpg",
            },
            {
              name: "Phương Anh",
              role: "Business English",
              quote:
                "Giao diện hiện đại, tối giản giúp mình tập trung hoàn toàn vào việc học. Hệ thống Flashcard rất gây nghiện và hiệu quả cho từ vựng chuyên ngành.",
              featured: true,
              avatar: "/avatar/person-2.jpg",
            },
            {
              name: "Quốc Bảo",
              role: "Japanese Learner",
              quote:
                "Việc học tiếng Nhật trở nên dễ dàng hơn rất nhiều. AI Coach giải thích các cấu trúc ngữ pháp phức tạp một cách rất dễ hiểu.",
              avatar: "/avatar/person-3.jpg",
            },
          ].map(({ name, role, quote, featured, avatar }) => (
            <div
              key={name}
              className={`card-edu card-edu-interactive p-5 ${featured ? "border-primary bg-primary/5 shadow-sm" : ""}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="font-bold text-xs">{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-xs text-foreground text-heading">{name}</div>
                  <div className="text-[10px] text-primary font-bold">{role}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &quot;{quote}&quot;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <section id="pricing" className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-8 tracking-tight text-heading">
          {t("landing.pricing_heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              nameKey: "free_name",
              priceKey: "free_price",
              periodKey: "free_period",
              features: [
                { key: "free_feature1", ok: true },
                { key: "free_feature2", ok: true },
                { key: "free_feature3", ok: false },
              ],
              ctaKey: "free_cta",
              featured: false,
            },
            {
              nameKey: "pro_name",
              priceKey: "pro_price",
              periodKey: "pro_period",
              badgeKey: "pro_badge",
              features: [
                { key: "pro_feature1", ok: true },
                { key: "pro_feature2", ok: true },
                { key: "pro_feature3", ok: true },
                { key: "pro_feature4", ok: true },
              ],
              ctaKey: "pro_cta",
              featured: true,
            },
            {
              nameKey: "premium_name",
              priceKey: "premium_price",
              periodKey: "premium_period",
              features: [
                { key: "premium_feature1", ok: true },
                { key: "premium_feature2", ok: true },
                { key: "premium_feature3", ok: true },
              ],
              ctaKey: "premium_cta",
              featured: false,
            },
          ].map(({ nameKey, priceKey, periodKey, features, ctaKey, featured, badgeKey }) => (
            <div
              key={nameKey}
              className={`card-edu p-6 flex flex-col relative ${featured ? "border-primary bg-primary/5 shadow-sm" : "border-border"}`}
            >
              {badgeKey && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-foreground/20">
                  {t(`landing.${badgeKey}`)}
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-sm font-bold mb-1 text-heading">{t(`landing.${nameKey}`)}</h3>
                <div className="text-3xl font-black text-foreground text-heading">
                  {t(`landing.${priceKey}`)}
                  <span className="text-xs text-muted-foreground font-normal ml-1">
                    {t(`landing.${periodKey}`)}
                  </span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {features.map(({ key, ok }) => (
                  <li key={key} className="flex items-center gap-2 text-xs">
                    {ok ? (
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground opacity-30" />
                    )}
                    <span className={ok && featured ? "text-primary font-bold" : "text-foreground"}>
                      {t(`landing.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={featured ? "default" : "outline"}
                size="sm"
                className={`btn-edu w-full text-xs border ${featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-transparent text-foreground hover:bg-muted"}`}
              >
                {t(`landing.${ctaKey}`)}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-edu p-8 ai-radial-glow overflow-hidden relative">
            <h2 className="text-2xl font-black mb-3 tracking-tight text-foreground relative z-10 text-heading">
              {t("landing.cta_heading")}
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed relative z-10 font-medium">
              {t("landing.cta_description")}
            </p>
            <Link href="/register" className="relative z-10 inline-block">
              <Button
                size="sm"
                className="btn-edu px-8 h-10 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t("landing.cta_button")}
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
