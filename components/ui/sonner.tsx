"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <div className="w-12 h-12 rounded-[14px] bg-primary/15 flex items-center justify-center border-2 border-primary/30 flex-shrink-0">
            <CircleCheckIcon className="size-7 text-primary" strokeWidth={2.5} />
          </div>
        ),
        info: (
          <div className="w-12 h-12 rounded-[14px] bg-blue-500/15 flex items-center justify-center border-2 border-blue-500/30 flex-shrink-0">
            <InfoIcon className="size-7 text-blue-500" strokeWidth={2.5} />
          </div>
        ),
        warning: (
          <div className="w-12 h-12 rounded-[14px] bg-amber-500/15 flex items-center justify-center border-2 border-amber-500/30 flex-shrink-0">
            <TriangleAlertIcon className="size-7 text-amber-500" strokeWidth={2.5} />
          </div>
        ),
        error: (
          <div className="w-12 h-12 rounded-[14px] bg-destructive/15 flex items-center justify-center border-2 border-destructive/30 flex-shrink-0">
            <OctagonXIcon className="size-7 text-destructive" strokeWidth={2.5} />
          </div>
        ),
        loading: (
          <div className="w-12 h-12 rounded-[14px] bg-primary/10 flex items-center justify-center border-2 border-primary/20 flex-shrink-0">
            <Loader2Icon className="size-7 animate-spin text-primary" strokeWidth={2.5} />
          </div>
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast card-edu group-[.toaster]:bg-card group-[.toaster]:text-foreground font-sans px-6 py-5 gap-4 items-start",
          title: "text-lg font-black text-heading leading-tight",
          description: "text-[15px] font-bold text-muted-foreground group-[.toast]:text-muted-foreground leading-relaxed mt-1.5",
          icon: "w-12 h-12 flex-shrink-0 [&>div]:w-full [&>div]:h-full mt-0.5 mr-2",
          content: "flex-1",
          actionButton:
            "group-[.toast]:btn-edu group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:h-10 group-[.toast]:px-5 group-[.toast]:text-sm",
          cancelButton:
            "group-[.toast]:btn-edu group-[.toast]:bg-transparent group-[.toast]:border-border group-[.toast]:text-foreground group-[.toast]:h-10 group-[.toast]:px-5 group-[.toast]:text-sm",
          success: "group-[.toaster]:!border-4 group-[.toaster]:!border-primary",
          error: "group-[.toaster]:!border-4 group-[.toaster]:!border-destructive",
          warning: "group-[.toaster]:!border-4 group-[.toaster]:!border-amber-500",
          info: "group-[.toaster]:!border-4 group-[.toaster]:!border-blue-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
