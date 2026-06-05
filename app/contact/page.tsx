"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans relative" id="contact-page">
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
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions about Langora or business requests? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Email support</h4>
                  <p className="text-muted-foreground text-sm">support@langora.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Call center</h4>
                  <p className="text-muted-foreground text-sm">+84 (24) 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Office Location</h4>
                  <p className="text-muted-foreground text-sm">Hanoi, Vietnam</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-xl border border-border">
              <h3 className="font-bold text-md mb-2">Technical Status</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Our AI engines are operating fully. Average support response time: 2 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 rounded-xl border border-border">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Full Name</label>
                <Input placeholder="John Doe" className="w-full bg-muted/50 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Email Address</label>
                <Input type="email" placeholder="john@company.com" className="w-full bg-muted/50 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider">Message</label>
                <Textarea placeholder="Type your message here..." className="w-full bg-muted/50 rounded-xl h-32" />
              </div>
              <Button className="w-full py-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(168,240,106,0.25)] transition-all">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t py-12 text-center text-xs text-muted-foreground">
        © 2024 Langora. Engineered for cognitive clarity.
      </footer>
    </div>
  );
}
