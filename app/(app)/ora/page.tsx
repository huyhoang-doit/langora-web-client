"use client";

import Link from "next/link";
import { Bot, Sparkles, Send, Mic, Volume2, Settings, BrainCircuit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AIChatPage() {
  const messages = [
    { sender: "ora", text: "Hello! I am Ora, your AI companion. Would you like to practice speaking, review vocabulary, or examine your writing today?" },
    { sender: "user", text: "I want to review conditional grammar structures." },
    { sender: "ora", text: "Perfect! Let's start with a quick inversion question: 'Hardly had I arrived...' What auxiliary verb comes next?" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-chat-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-1.5">
              Ora AI Companion <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Companion Session</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/ora/voice">
            <Button size="sm" variant="outline" className="font-bold text-xs gap-1 border-primary/20 text-primary hover:bg-primary/5">
              <Mic className="w-3.5 h-3.5" /> Speak
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border"><Settings className="w-4 h-4" /></Button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, idx) => {
            const isOra = msg.sender === "ora";
            return (
              <div key={idx} className={`flex gap-3 max-w-[80%] ${isOra ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
                {isOra && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0 self-end">
                    🤖
                  </div>
                )}
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  isOra ? "bg-muted/40 border border-border text-foreground rounded-bl-none" : "bg-primary text-primary-foreground rounded-br-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input container */}
      <footer className="border-t py-4 px-6 bg-muted/10 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <Input 
            className="flex-grow bg-background border-border rounded-xl px-4 py-6 text-sm focus-visible:ring-1 focus-visible:ring-primary"
            placeholder="Type your message to Ora..."
          />
          <Button size="icon" className="w-12 h-12 rounded-xl hover:shadow-[0_0_15px_rgba(168,240,106,0.3)] transition-all">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
