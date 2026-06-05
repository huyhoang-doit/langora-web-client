"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const posts = [
    {
      slug: "cognitive-science-spaced-repetition",
      title: "How Cognitive Science and Spaced Repetition Supercharges Vocabulary Learning",
      desc: "An in-depth look at how the forgetting curve governs language retention and how SRS algorithms optimize flashcard study intervals.",
      date: "June 1, 2026",
      readTime: "5 min read",
      category: "Methodology",
    },
    {
      slug: "ai-writing-coaching-techniques",
      title: "Beyond Autocorrect: How AI Can Teach You to Write Like a Native Speaker",
      desc: "Traditional grammar checkers only fix typos. Discover how LLMs provide context-specific style suggestions to enhance your written expression.",
      date: "May 25, 2026",
      readTime: "7 min read",
      category: "AI Technology",
    },
    {
      slug: "ielts-writing-band-8-guide",
      title: "Step-by-Step Writing Plan for Reaching IELTS Band 8.0+",
      desc: "Actionable tips, templates, and vocabulary lists tailored for advanced candidates preparing for academic writing tasks.",
      date: "May 18, 2026",
      readTime: "10 min read",
      category: "IELTS Prep",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="blog-page">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <img src="/big-logo.png" className="h-10 w-auto" alt="Langora Logo" />
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button className="font-bold text-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Langora Insights</h1>
          <p className="text-lg text-muted-foreground">
            Linguistic insights, AI research, and actionable learning strategies from our engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <article className="glass p-6 rounded-xl border border-border hover:border-primary/50 transition-all h-full flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold mb-3 block">{post.category}</span>
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-6 line-clamp-3 flex-grow">{post.desc}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold pt-4 border-t">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t py-12 text-center text-xs text-muted-foreground">
        © 2024 Langora. Engineered for cognitive clarity.
      </footer>
    </div>
  );
}
