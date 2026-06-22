"use client";

import { FileText } from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { useTranslations } from "next-intl";
import ImageLogoWeb from "@/components/image-logo-web";

export default function TermsOfServicePage() {
  const t = useTranslations("terms");

  const sections = [
    { title: t("sec1_title"), content: t("sec1_content") },
    { title: t("sec2_title"), content: t("sec2_content") },
    { title: t("sec3_title"), content: t("sec3_content") },
    { title: t("sec4_title"), content: t("sec4_content") },
  ];

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
          <span className="text-xs font-black uppercase tracking-widest text-primary">{t("badge")}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-heading leading-[1.1]">
          {t("title")}{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            {t("title_highlight")}
          </span>
        </h1>
        <p className="text-muted-foreground text-sm font-semibold">
          {t("last_updated")}
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
          <ImageLogoWeb variant="mascot" className="flex-shrink-0 w-8 h-8" />
          <p className="text-sm text-muted-foreground font-semibold text-learning">
            {t("contact_prompt")}{" "}
            <a href="/contact" className="text-primary font-black hover:underline text-heading">
              {t("contact_link")}
            </a>{" "}
            {t("contact_end")}
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
