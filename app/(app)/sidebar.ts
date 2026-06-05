import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Gamepad2,
  PenLine,
  SpellCheck,
  Bot,
  TrendingUp,
  Users,
  CircleUser,
} from "lucide-react";

export const sidebarNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/learn", icon: Compass, label: "Learning Path" },
  { href: "/vocabulary", icon: BookOpen, label: "Vocabulary" },
  { href: "/games", icon: Gamepad2, label: "Mini Games" },
  { href: "/writing", icon: PenLine, label: "Writing Coach" },
  { href: "/grammar", icon: SpellCheck, label: "Grammar Lab" },
  { href: "/ora", icon: Bot, label: "Ora Companion" },
  { href: "/progress", icon: TrendingUp, label: "Progress Reports" },
  { href: "/community", icon: Users, label: "Community Feed" },
];

export const sidebarBottomItems = [
  { href: "/profile", icon: CircleUser, label: "Profile" },
];
