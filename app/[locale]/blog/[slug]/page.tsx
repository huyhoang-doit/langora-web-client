"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const relatedPosts = [
  {
    slug: "ai-writing-coaching-techniques",
    title: "Beyond Autocorrect: How AI Can Teach You to Write Like a Native Speaker",
    category: "AI Technology",
    readTime: "7 min read",
  },
  {
    slug: "ielts-writing-band-8-guide",
    title: "Step-by-Step Writing Plan for Reaching IELTS Band 8.0+",
    category: "IELTS Prep",
    readTime: "10 min read",
  },
];

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);

  const postInfo = {
    title: slug
      .replace(/-/g, " ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    date: "June 5, 2026",
    readTime: "8 min read",
    author: "Langora Research Team",
    category: "Insights",
  };

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative"
      id={`blog-post-${slug}`}
    >
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-20" />
      </div>

      <PublicNavbar />

      {/* Article layout */}
      <main className="pt-36 pb-24 px-6 max-w-3xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground font-bold mb-8">
          <Link
            href="/blog"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Blog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{postInfo.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          {/* Category pill */}
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border-2 border-primary/20 px-3 py-1 rounded-full mb-5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[9px] uppercase tracking-widest text-primary font-black">
              {postInfo.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-heading">
            {postInfo.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center justify-between py-4 border-y-2 border-border/60 text-xs text-muted-foreground font-bold">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-sm">
                  🐲
                </div>
                <span className="font-black text-foreground text-heading">
                  {postInfo.author}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {postInfo.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {postInfo.readTime}
              </span>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="btn-edu w-8 h-8 rounded-full border-2 border-border text-muted-foreground hover:text-primary hover:bg-primary/5 p-0"
                title="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="btn-edu w-8 h-8 rounded-full border-2 border-border text-muted-foreground hover:text-primary hover:bg-primary/5 p-0"
                title="Bookmark"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article className="space-y-6 text-sm md:text-base">
          <p className="text-foreground font-semibold text-lg leading-relaxed text-learning">
            This article explores the details, scientific models, and
            architectural components behind &ldquo;{postInfo.title}&rdquo;.
            Langora focuses on reducing friction in acquiring foreign vocabulary
            and structuring grammatical ideas with precision.
          </p>

          <p className="text-muted-foreground leading-relaxed font-semibold text-learning">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta.
          </p>

          <div className="card-edu p-6 bg-card space-y-1">
            <h2 className="text-xl font-black text-heading">Core Concepts</h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-semibold text-learning">
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra. Curabitur sodales ligula in libero. Sed dignissim lacinia
              nunc. Curabitur tortor. Pellentesque nibh.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote className="card-edu p-6 border-l-4 border-primary bg-primary/5 relative overflow-hidden">
            <div className="absolute top-4 left-5 text-5xl text-primary/10 font-black leading-none select-none">
              &ldquo;
            </div>
            <p className="text-foreground font-black text-base leading-relaxed italic text-heading relative z-10">
              The combination of active recall, spaced repetition schedules, and
              automated LLM assessment represents a new standard in autonomous
              language study.
            </p>
          </blockquote>

          <p className="text-muted-foreground leading-relaxed font-semibold text-learning">
            Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
            Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla
            metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.
            Quisque volutpat condimentum velit.
          </p>

          {/* Ora tip box */}
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-start">
            <span className="text-3xl animate-bounce flex-shrink-0">🐲</span>
            <div>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-1 text-heading flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Ora&apos;s Tip
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-learning">
                Apply the SRS method by reviewing new words at 1-day, 3-day, and
                7-day intervals. Langora handles the scheduling automatically —
                just keep your daily session streak alive!
              </p>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="mt-16 pt-10 border-t-2 border-border/60">
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 text-heading">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="card-edu card-edu-interactive p-5">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 border-2 border-primary/20 px-2.5 py-0.5 rounded-full mb-3">
                    <span className="text-[9px] uppercase tracking-widest text-primary font-black">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-black text-sm text-heading group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="mt-10">
          <div className="card-edu p-8 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 text-center">
            <h3 className="text-xl font-black text-heading mb-2">
              Ready to apply what you&apos;ve learned?
            </h3>
            <p className="text-sm text-muted-foreground font-semibold text-learning mb-5">
              Start your personalized language journey with Langora and Ora 🐲.
            </p>
            <Link href="/register">
              <Button className="btn-edu h-11 px-8 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide">
                Start for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
