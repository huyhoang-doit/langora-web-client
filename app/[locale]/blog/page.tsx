"use client";

import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Sparkles } from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

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

      <PublicNavbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Langora Insights</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-heading leading-[1.1]">
          Language &{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            AI Research
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
          Linguistic insights, AI research, and actionable learning strategies from our engineering team.
        </p>
      </section>

      {/* Posts Grid */}
      <section className="pb-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <article className="card-edu card-edu-interactive p-6 h-full flex flex-col">
                <div className="inline-flex items-center gap-1.5 bg-primary/10 border-2 border-primary/20 px-2.5 py-0.5 rounded-full mb-4">
                  <span className="text-[9px] uppercase tracking-widest text-primary font-black">{post.category}</span>
                </div>
                <h3 className="font-black text-base mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug text-heading">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-6 line-clamp-3 flex-grow font-semibold text-learning">
                  {post.desc}
                </p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold pt-4 border-t-2 border-border/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    {post.date} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
