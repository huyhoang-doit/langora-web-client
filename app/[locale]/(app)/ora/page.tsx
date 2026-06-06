"use client";

import Link from "next/link";
import { Bot, Send, Mic, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageLogoWeb from "@/components/image-logo-web";

export default function AIChatPage() {
  const messages = [
    { sender: "ora", text: "Hello! I am Ora, your AI companion. Would you like to practice speaking, review vocabulary, or examine your writing today?" },
    { sender: "user", text: "I want to review conditional grammar structures." },
    { sender: "ora", text: "Perfect! Let's start with a quick inversion question: 'Hardly had I arrived...' What auxiliary verb comes next?" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-chat-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <ImageLogoWeb variant="mascot" className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-black w-8 h-8" />
          <div>
            <h2 className="text-base font-black text-foreground flex items-center gap-1.5 text-heading">
              Ora AI Companion <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest text-heading">Active Companion Session</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/ora/voice">
            <Button size="sm" variant="outline" className="btn-edu h-9 px-4 text-xs border-2 bg-transparent text-primary hover:bg-primary/5 border-primary/25">
              <Mic className="w-3.5 h-3.5" /> Speak
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full border-2 border-border hover:bg-muted flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, idx) => {
            const isOra = msg.sender === "ora";
            return (
              <div key={idx} className={`flex gap-3 max-w-[85%] ${isOra ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
                {isOra && (
                  <ImageLogoWeb variant="mascot" className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-sm flex-shrink-0 self-end w-8 h-8" />
                )}
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  isOra 
                    ? "card-edu bg-muted/40 text-foreground rounded-bl-none shadow-none border-border/80 text-learning font-medium" 
                    : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none border-2 border-indigo-700 font-semibold"
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input container */}
      <footer className="border-t-2 border-border/60 py-4 px-6 bg-muted/10 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <Input 
            className="flex-grow bg-background border-2 border-border rounded-xl px-4 py-6 text-sm focus-visible:ring-1 focus-visible:ring-primary font-medium"
            placeholder="Type your message to Ora..."
          />
          <Button size="icon" className="btn-edu w-12 h-12 border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
