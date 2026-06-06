"use client";

import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();

  const contactItems = [
    {
      icon: Mail,
      label: t("contact.email_support"),
      value: "support@langora.com",
    },
    {
      icon: Phone,
      label: t("contact.call_center"),
      value: "+84 (24) 1234-5678",
    },
    {
      icon: MapPin,
      label: t("contact.office_location"),
      value: "Hanoi, Vietnam",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="contact-page">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">{t("navbar.contact")}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-heading leading-[1.1]">
          {t("contact.hero_title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
          {t("contact.hero_desc")}
        </p>
      </section>

      {/* Content */}
      <section className="pb-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card-edu p-5 bg-card flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-heading">{label}</h4>
                  <p className="text-muted-foreground text-sm font-semibold text-learning">{value}</p>
                </div>
              </div>
            ))}

            {/* Status */}
            <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-3 items-start">
              <span className="text-2xl flex-shrink-0">🐲</span>
              <div>
                <h3 className="font-black text-sm text-heading mb-1">Technical Status</h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-semibold text-learning">
                  Our AI engines are operating fully. Average support response time: <span className="text-foreground font-black">2 hours</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-edu p-8 bg-card">
            <h2 className="text-lg font-black text-heading mb-6">{t("contact.form_title")}</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest text-heading">
                  {t("contact.name_label")}
                </label>
                <Input
                  placeholder={t("contact.name_placeholder")}
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-5 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest text-heading">
                  {t("contact.email_label")}
                </label>
                <Input
                  type="email"
                  placeholder={t("contact.email_placeholder")}
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-5 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest text-heading">
                  {t("contact.message_label")}
                </label>
                <Textarea
                  placeholder={t("contact.message_placeholder")}
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary h-32 font-medium"
                />
              </div>
              <Button
                type="submit"
                className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> {t("contact.send_button")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
