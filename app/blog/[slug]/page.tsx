"use client";

import Link from "next/link";
import React, { use } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);

  // Fallback metadata for illustration
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
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id={`blog-post-${slug}`}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-25" />
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
      <main className="pt-36 pb-24 px-6 max-w-3xl mx-auto relative z-10">
        <div className="mb-10">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
          
          <span className="text-xs uppercase tracking-wider text-primary font-bold mb-3 block">{postInfo.category}</span>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{postInfo.title}</h1>

          <div className="flex items-center justify-between py-4 border-y border-border text-xs text-muted-foreground font-semibold">
            <div className="flex items-center gap-6">
              <span>By {postInfo.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {postInfo.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {postInfo.readTime}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><Share2 className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><Bookmark className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        </div>

        <article className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6 text-sm md:text-base">
          <p className="text-foreground font-medium text-lg leading-relaxed">
            This article explores the details, scientific models, and architectural components behind "{postInfo.title}". Langora focuses on reducing friction in acquiring foreign vocab and structuring grammatical ideas.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Core Concepts</h2>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 my-6 italic bg-muted/30 p-4 rounded-r-lg">
            "The combination of active recall, space repetition schedules, and automated LLM assessment represents a new standard in autonomous language study."
          </blockquote>
          <p>
            Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>
        </article>
      </main>

      <footer className="border-t py-12 text-center text-xs text-muted-foreground">
        © 2024 Langora. Engineered for cognitive clarity.
      </footer>
    </div>
  );
}
