import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProfileSubpageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  className?: string;
}

/**
 * ProfileSubpageHeader — lightweight in-flow header for profile sub-pages.
 *
 * This is intentionally NOT sticky since AppTopbar in (app)/layout.tsx already
 * provides the persistent top bar. This renders as a slim breadcrumb-style
 * section at the top of the page content area.
 */
export function ProfileSubpageHeader({
  title,
  subtitle,
  backHref = "/profile",
  className,
}: ProfileSubpageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-6 py-3 border-b-2 border-border/50 bg-background/60 backdrop-blur-sm flex-shrink-0",
        className,
      )}
    >
      <Link href={backHref}>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg border-2 border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </Link>
      <div className="min-w-0">
        <h2 className="text-sm font-black text-foreground text-heading leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[10px] text-muted-foreground font-semibold truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
