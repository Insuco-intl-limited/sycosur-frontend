"use client"

import type React from "react"

import { useThemeColor } from "@/hooks/use-theme-color"
import { cn } from "@/lib/utils"

interface ThemeTextProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "muted"
}

export function ThemeText({ children, className, variant = "primary" }: ThemeTextProps) {
  const themeColor = useThemeColor()

  const getThemeColorClass = () => {
    if (variant === "muted") {
      return "text-dashboard-muted-foreground"
    }

    switch (themeColor) {
      case "blue":
        return "text-theme-blue"
      case "green":
        return "text-theme-green"
      case "purple":
        return "text-theme-purple"
      case "orange":
        return "text-theme-orange"
      case "dark":
        return "text-theme-dark"
      default:
        return "text-dashboard-primary"
    }
  }

  return <span className={cn(getThemeColorClass(), className)}>{children}</span>
}
