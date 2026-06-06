"use client";

import Link from "next/link";
import { CheckCircle, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { useTranslations } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("pricing");

  const plans = [
    {
      name: t("plan_free_name"),
      price: "0đ",
      period: t("period"),
      features: [
        { text: t("plan_free_feat1"), ok: true },
        { text: t("plan_free_feat2"), ok: true },
        { text: t("plan_free_feat3"), ok: false },
        { text: t("plan_free_feat4"), ok: false },
      ],
      cta: t("plan_free_cta"),
      featured: false,
    },
    {
      name: t("plan_pro_name"),
      price: "199k",
      period: t("period"),
      features: [
        { text: t("plan_pro_feat1"), ok: true },
        { text: t("plan_pro_feat2"), ok: true },
        { text: t("plan_pro_feat3"), ok: true },
        { text: t("plan_pro_feat4"), ok: true },
      ],
      cta: t("plan_pro_cta"),
      featured: true,
      badge: t("plan_pro_badge"),
    },
    {
      name: t("plan_premium_name"),
      price: "450k",
      period: t("period"),
      features: [
        { text: t("plan_premium_feat1"), ok: true },
        { text: t("plan_premium_feat2"), ok: true },
        { text: t("plan_premium_feat3"), ok: true },
        { text: t("plan_premium_feat4"), ok: true },
      ],
      cta: t("plan_premium_cta"),
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
          <span className="text-xs font-black uppercase tracking-widest text-primary">{t("badge")}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-heading leading-[1.1]">
          {t("title")}{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            {t("title_highlight")}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
          {t("desc")}
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
            {t("guarantee")}
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
