"use client"

import { usePathname } from "next/navigation"
import { getRouteConfig } from "@/lib/route-config"
import { useThemeColor } from "@/hooks/use-theme-color"

export function PageHeader() {
  const pathname = usePathname()
  const config = getRouteConfig(pathname)
  const themeColor = useThemeColor()

  if (!config?.description) {
    return null
  }

  // Déterminer la classe CSS basée sur la couleur du thème
  const getThemeColorClass = () => {
    switch (themeColor) {
      case "blue":
        return "text-theme-blue"
      case "green":
        return "text-theme-green"
      case "purple":
        return "text-theme-purple"
      case "orange":
        return "text-theme-orange"
      default:
        return "text-dashboard-muted-foreground"
    }
  }

  return (
    <div className="mb-6 mt-5">
      <p className={`font-medium ${getThemeColorClass()}`}>{config.description}</p>
    </div>
  )
}
