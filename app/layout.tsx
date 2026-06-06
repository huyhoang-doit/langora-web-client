import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Langora | Master Languages Smarter with AI",
  description:
    "Nền tảng học ngôn ngữ thế hệ mới. Build vocabulary, improve writing, and learn faster with personalized AI.",
  keywords: ["language learning", "AI", "vocabulary", "flashcards", "IELTS", "JLPT"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
