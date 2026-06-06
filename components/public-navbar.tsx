"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";

export function PublicNavbar() {
  const t = useTranslations();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navGroups = [
    {
      label: t("navbar.product"),
      items: [
        { label: t("navbar.features"), href: "/features" },
        { label: t("navbar.pricing"), href: "/pricing" },
      ],
    },
    {
      label: t("navbar.company"),
      items: [
        { label: t("navbar.about"), href: "/about" },
        { label: t("navbar.blog"), href: "/blog" },
        { label: t("navbar.contact"), href: "/contact" },
      ],
    },
  ];

  const flatLinks = [
    { label: t("navbar.how_it_works"), href: "/#how-it-works" },
    { label: t("navbar.testimonials"), href: "/#testimonials" },
  ];

  const toggleGroup = (label: string) =>
    setOpenGroup((prev) => (prev === label ? null : label));

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 shadow-sm"
      id="public-navbar"
    >
      <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex items-center gap-2.5 mr-8 flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg">
            🐲
          </div>
          <span className="text-lg font-black text-primary text-heading tracking-tight">
            Langora
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 items-center flex-1">
          {navGroups.map((group) => (
            <div key={group.label} className="relative">
              <button
                onClick={() => toggleGroup(group.label)}
                onBlur={() => setTimeout(() => setOpenGroup(null), 150)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-black uppercase tracking-wide text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {group.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openGroup === group.label ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openGroup === group.label && (
                <div className="absolute top-full left-0 mt-2 w-44 card-edu bg-card p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {flatLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-black uppercase tracking-wide text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language selector — compact chip */}
          <div className="hidden sm:block">
            <LanguageSelector variant="compact" />
          </div>

          <ThemeToggle />

          <Link href="/login" className="hidden sm:block">
            <Button
              variant="outline"
              className="btn-edu h-9 px-4 text-xs border-2 bg-transparent text-foreground hover:bg-muted font-black uppercase tracking-wide"
            >
              {t("navbar.sign_in")}
            </Button>
          </Link>
          <Link href="/register">
            <Button className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide">
              {t("navbar.get_started")}
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-border/60 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-1">
          {navGroups.flatMap((group) =>
            group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-foreground hover:text-primary hover:bg-primary/5 transition-all"
              >
                {item.label}
              </Link>
            ))
          )}
          {flatLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-foreground hover:text-primary hover:bg-primary/5 transition-all"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language selector — full stacked */}
          <div className="pt-3 pb-1">
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-black px-1 mb-2 text-heading">
              Language / Ngôn ngữ
            </p>
            <LanguageSelector variant="full" />
          </div>

          <div className="pt-3 border-t-2 border-border/60 grid grid-cols-2 gap-3">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button
                variant="outline"
                className="btn-edu w-full h-10 text-xs border-2 font-black uppercase tracking-wide"
              >
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button className="btn-edu w-full h-10 text-xs border-2 bg-primary text-primary-foreground font-black uppercase tracking-wide">
                Bắt đầu
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
