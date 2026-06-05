"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LogOut, Globe, LayoutDashboard, BookOpen, Bot, CircleUser, Compass } from "lucide-react";
import { sidebarNavItems, sidebarBottomItems } from "@/app/(app)/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-72 flex-shrink-0 flex-col p-6 gap-2 bg-sidebar border-r border-sidebar-border overflow-y-auto scrollbar-thin">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1 flex-shrink-0">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Globe className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary leading-none tracking-tight">Langora</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5 font-semibold">
            AI Language Lab
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow flex flex-col gap-1">
        {sidebarNavItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary bg-sidebar-accent font-bold scale-[0.98]"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-4 flex-shrink-0">
        {sidebarBottomItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 w-full text-left cursor-pointer">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const mobileItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
    { href: "/learn", icon: Compass, label: "Learn" },
    { href: "/vocabulary", icon: BookOpen, label: "Vocab" },
    { href: "/ora", icon: Bot, label: "Ora" },
    { href: "/profile", icon: CircleUser, label: "Profile" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border h-16 flex items-center justify-around px-2">
      {mobileItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase">{label}</span>
          </Link>
        );
      })}
      
      {/* Theme Toggle cho Mobile */}
      <div className="flex flex-col items-center gap-1 text-muted-foreground border-l border-border pl-2">
        <ThemeToggle />
        <span className="text-[9px] font-bold uppercase mt-[-4px]">Theme</span>
      </div>
    </div>
  );
}
