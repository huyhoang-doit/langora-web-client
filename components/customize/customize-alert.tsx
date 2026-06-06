"use client";

import * as React from "react";
import { Info, CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

// ─── Variant Config ───────────────────────────────────────────────────────────

type AlertVariant = "default" | "destructive" | "success" | "warning";

const variantConfig: Record<
  AlertVariant,
  {
    Icon: React.ElementType;
    iconColor: string;
    iconBg: string;
    borderColor: string;
    headerBg: string;
    actionBg: string;
    actionHover: string;
  }
> = {
  default: {
    Icon: Info,
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/20",
    borderColor: "border-border",
    headerBg: "bg-primary/5",
    actionBg: "bg-primary text-primary-foreground hover:bg-primary/90",
    actionHover: "",
  },
  destructive: {
    Icon: CircleX,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10 border-destructive/20",
    borderColor: "border-destructive/40",
    headerBg: "bg-destructive/5",
    actionBg: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    actionHover: "",
  },
  success: {
    Icon: CircleCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/20",
    borderColor: "border-primary/30",
    headerBg: "bg-primary/5",
    actionBg: "bg-primary text-primary-foreground hover:bg-primary/90",
    actionHover: "",
  },
  warning: {
    Icon: TriangleAlert,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    borderColor: "border-amber-500/30",
    headerBg: "bg-amber-500/5",
    actionBg: "bg-amber-500 text-white hover:bg-amber-500/90",
    actionHover: "",
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CustomizeAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: AlertVariant;
  title: string;
  description?: string;
  /** Label nút xác nhận (default: "Confirm") */
  confirmLabel?: string;
  /** Label nút hủy (default: "Cancel") */
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Hiển thị mascot Ora 🐲 bên cạnh icon */
  showOra?: boolean;
  /** Custom icon ghi đè icon mặc định của variant */
  icon?: React.ReactNode;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CustomizeAlert({
  open,
  onOpenChange,
  variant = "default",
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  showOra = false,
  icon,
  className,
}: CustomizeAlertProps) {
  const config = variantConfig[variant];
  const { Icon } = config;

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal>
        {/* Overlay */}
        <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />

        {/* Content */}
        <AlertDialogContent
          className={cn(
            // Base card-edu style
            "card-edu fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
            "bg-card text-card-foreground outline-none p-0 gap-0 ring-0",
            // Variant border
            config.borderColor,
            // Animations
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-200",
            className
          )}
        >
          {/* Header */}
          <div className={cn("px-6 pt-6 pb-4 rounded-t-[18px]", config.headerBg)}>
            <AlertDialogHeader className="flex-row items-start gap-4 text-left space-y-0">
              {/* Icon + optional Ora */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl border-2 flex items-center justify-center flex-shrink-0",
                    config.iconBg
                  )}
                >
                  {icon ?? <Icon className={cn("w-5 h-5", config.iconColor)} />}
                </div>
                {showOra && (
                  <span className="text-xl animate-bounce" style={{ animationDuration: "2s" }}>
                    🐲
                  </span>
                )}
              </div>

              {/* Title + Description */}
              <div className="min-w-0 flex-1 pt-1">
                <AlertDialogTitle className="text-base font-black text-heading text-foreground leading-tight">
                  {title}
                </AlertDialogTitle>
                {description && (
                  <AlertDialogDescription className="mt-1.5 text-sm text-muted-foreground font-semibold leading-relaxed text-learning">
                    {description}
                  </AlertDialogDescription>
                )}
              </div>
            </AlertDialogHeader>
          </div>

          {/* Footer */}
          <AlertDialogFooter className="!m-0 flex flex-row justify-end gap-2 px-6 py-4 border-t-2 border-border/50 bg-muted/20 rounded-b-[18px]">
            {/* Cancel */}
            <button
              onClick={handleCancel}
              className={cn(
                "btn-edu inline-flex h-10 items-center px-5 text-sm border-2",
                "bg-transparent text-foreground border-border hover:bg-muted",
              )}
            >
              {cancelLabel}
            </button>

            {/* Confirm */}
            <button
              onClick={handleConfirm}
              className={cn(
                "btn-edu inline-flex h-10 items-center px-5 text-sm border-2 border-transparent",
                config.actionBg
              )}
            >
              {confirmLabel}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}