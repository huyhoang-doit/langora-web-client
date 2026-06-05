import Link from "next/link";

const footerCols = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="bg-card/40 border-t-2 border-border/80 mt-0">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 px-6 md:px-12 py-16 max-w-7xl mx-auto">
        {/* Brand col */}
        <div className="col-span-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg">
              🐲
            </div>
            <span className="text-lg font-black text-primary text-heading tracking-tight">
              Langora
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs mb-4 leading-relaxed font-medium">
            Engineered for cognitive clarity. Nền tảng học ngôn ngữ thế hệ mới
            được hỗ trợ bởi trí tuệ nhân tạo.
          </p>
          <div className="text-xs text-muted-foreground font-semibold">
            © 2024 Langora. All rights reserved.
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
