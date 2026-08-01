import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";


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
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      {children}
    </GoogleOAuthProvider>
  );
}
