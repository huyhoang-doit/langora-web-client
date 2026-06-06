import { NextIntlClientProvider } from "next-intl";
import { Inter, Be_Vietnam_Pro, Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

async function loadMessages(locale: string) {
  const [common, auth, dashboard, onboarding] = await Promise.all([
    import(`@/messages/${locale}/common.json`),
    import(`@/messages/${locale}/auth.json`),
    import(`@/messages/${locale}/dashboard.json`),
    import(`@/messages/${locale}/onboarding.json`),
  ]);
  return {
    ...common.default,
    ...auth.default,
    ...dashboard.default,
    onboarding: onboarding.default,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await loadMessages(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${beVietnamPro.variable} ${nunito.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
