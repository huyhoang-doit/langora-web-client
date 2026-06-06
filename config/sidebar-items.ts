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
  { href: "/dashboard", icon: LayoutDashboard, label: "dashboard.dashboard", i18nKey: true },
  { href: "/learn", icon: Compass, label: "dashboard.learning_path", i18nKey: true },
  { href: "/vocabulary", icon: BookOpen, label: "dashboard.vocabulary", i18nKey: true },
  { href: "/games", icon: Gamepad2, label: "dashboard.mini_games", i18nKey: true },
  { href: "/writing", icon: PenLine, label: "dashboard.writing_coach", i18nKey: true },
  { href: "/grammar", icon: SpellCheck, label: "dashboard.grammar_lab", i18nKey: true },
  { href: "/ora", icon: Bot, label: "dashboard.ora_companion", i18nKey: true },
  { href: "/progress", icon: TrendingUp, label: "dashboard.progress_reports", i18nKey: true },
  { href: "/community", icon: Users, label: "dashboard.community_feed", i18nKey: true },
];

export const sidebarBottomItems = [
  { href: "/profile", icon: CircleUser, label: "dashboard.profile", i18nKey: true },
];
