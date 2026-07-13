"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import ImageLogoWeb from "./image-logo-web";

export function PublicFooter() {
  const t = useTranslations();

  const footerCols = [
    {
      heading: t("footer.product"),
      links: [
        { label: t("footer.features"), href: "/features" },
        { label: t("footer.pricing"), href: "/pricing" },
      ],
    },
    {
      heading: t("footer.resources"),
      links: [
        { label: t("footer.blog"), href: "/blog" },
        { label: t("footer.docs"), href: "#" },
      ],
    },
    {
      heading: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/about" },
        { label: t("footer.contact"), href: "/contact" },
      ],
    },
    {
      heading: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy-policy" },
        { label: t("footer.terms"), href: "/terms-of-service" },
      ],
    },
  ];

  return (
    <footer className="bg-card/40 border-t-2 border-border/80 mt-0">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 px-6 md:px-12 py-16 max-w-7xl mx-auto">
        {/* Brand col */}
        <div className="col-span-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity"
          >
            <ImageLogoWeb variant="big" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs mb-4 leading-relaxed font-medium">
            {t("footer.tagline")}
          </p>
          <div className="text-xs text-muted-foreground font-semibold">
            {t("footer.copyright")}
          </div>
        </div>

        {/* Nav cols */}
        {footerCols.map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="text-primary font-black mb-4 text-xs uppercase tracking-widest text-heading">
              {heading}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
