"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// ─── Pagination Range Hook ────────────────────────────────────────────────────

const DOTS = "DOTS" as const;
type PaginationRange = (number | typeof DOTS)[];

function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  showEdges: boolean
): PaginationRange {
  return React.useMemo(() => {
    // Total visible: siblings*2 + currentPage + 2 edge pages + 2 ellipsis
    const totalVisible = siblingCount * 2 + 5;

    if (totalPages <= totalVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => i + 1
      );
      return showEdges
        ? [...leftRange, DOTS, totalPages]
        : [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => totalPages - (3 + siblingCount * 2) + i + 1
      );
      return showEdges
        ? [1, DOTS, ...rightRange]
        : [1, DOTS, ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i
    );
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }, [currentPage, totalPages, siblingCount, showEdges]);
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CustomizePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Số trang hiển thị mỗi bên currentPage (default: 1) */
  siblingCount?: number;
  /** Hiển thị nút jump về trang đầu/cuối (default: true) */
  showEdges?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CustomizePagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  className,
}: CustomizePaginationProps) {
  const t = useTranslations("pagination");
  const paginationRange = usePaginationRange(
    currentPage,
    totalPages,
    siblingCount,
    showEdges
  );

  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex items-center justify-center gap-1.5 flex-wrap", className)}
    >
      {/* Jump to First */}
      {showEdges && (
        <button
          onClick={() => onPageChange(1)}
          disabled={isFirst}
          aria-label={t("go_to_first")}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
            "font-bold text-sm",
            isFirst
              ? "border-border/40 text-muted-foreground/40 cursor-not-allowed"
              : "card-edu card-edu-interactive border-border text-foreground cursor-pointer hover:border-primary/40 hover:text-primary"
          )}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      )}

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label={t("go_to_prev")}
        className={cn(
          "btn-edu inline-flex h-10 items-center gap-1.5 px-3 border-2 text-sm font-bold transition-all duration-200",
          isFirst
            ? "border-border/40 text-muted-foreground/40 cursor-not-allowed shadow-none translate-y-0 hover:translate-y-0 hover:shadow-none"
            : "border-border text-foreground hover:border-primary/40 hover:text-primary bg-transparent"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">{t("prev")}</span>
      </button>

      {/* Page Numbers */}
      {paginationRange.map((page, idx) => {
        if (page === DOTS) {
          return (
            <span
              key={`dots-${idx}`}
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground"
            >
              <Ellipsis className="w-4 h-4" />
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-label={t("go_to_page", { page })}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-2xl border-2 text-sm transition-all duration-200 cursor-pointer select-none",
              isActive
                ? [
                    "bg-primary/10 border-primary/30 text-primary font-black",
                    "-translate-y-0.5",
                    "shadow-[0_4px_0_0_rgba(99,102,241,0.25)]",
                  ]
                : [
                    "card-edu card-edu-interactive",
                    "border-border text-foreground font-bold",
                    "hover:border-primary/40 hover:text-primary",
                  ]
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label={t("go_to_next")}
        className={cn(
          "btn-edu inline-flex h-10 items-center gap-1.5 px-3 border-2 text-sm font-bold transition-all duration-200",
          isLast
            ? "border-border/40 text-muted-foreground/40 cursor-not-allowed shadow-none translate-y-0 hover:translate-y-0 hover:shadow-none"
            : "border-border text-foreground hover:border-primary/40 hover:text-primary bg-transparent"
        )}
      >
        <span className="hidden sm:inline">{t("next")}</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Jump to Last */}
      {showEdges && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={isLast}
          aria-label={t("go_to_last")}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
            "font-bold text-sm",
            isLast
              ? "border-border/40 text-muted-foreground/40 cursor-not-allowed"
              : "card-edu card-edu-interactive border-border text-foreground cursor-pointer hover:border-primary/40 hover:text-primary"
          )}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
}