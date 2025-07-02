"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed left-[var(--sidebar-width)] right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-dashboard-border bg-dashboard-header/95 px-6 shadow-sm backdrop-blur transition-[left] duration-200 ease-linear group-data-[collapsible=offcanvas]/sidebar-wrapper:left-0 supports-[backdrop-filter]:bg-dashboard-header/60">
      {/* Fil d'Ariane à gauche */}
      <div className="flex-1">
        <DashboardBreadcrumb />
      </div>

      {/* Theme Switcher à droite */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="shrink-0 text-dashboard-foreground hover:bg-dashboard-accent"
      >
        <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Basculer le thème</span>
      </Button>
    </header>
  )
}
