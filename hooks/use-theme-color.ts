"use client"

import { useEffect, useState } from "react"

export type ThemeColor = "blue" | "green" | "purple" | "orange" | "dark" | "default"

export function useThemeColor(): ThemeColor {
  const [themeColor, setThemeColor] = useState<ThemeColor>("default")

  useEffect(() => {
    const detectThemeColor = () => {
      const root = document.documentElement
      const primaryColor = getComputedStyle(root).getPropertyValue("--dashboard-primary").trim()

      // Correspondance des couleurs HSL avec les thèmes
      const colorMap: Record<string, ThemeColor> = {
        "221.2 83.2% 53.3%": "blue", // Bleu par défaut
        "142.1 76.2% 36.3%": "green", // Vert
        "262.1 83.3% 57.8%": "purple", // Violet
        "24.6 95% 53.1%": "orange", // Orange
        "217.2 91.2% 59.8%": "dark", // Sombre
      }

      const detectedColor = colorMap[primaryColor] || "default"
      setThemeColor(detectedColor)
    }

    // Détecter la couleur au montage
    detectThemeColor()

    // Écouter les changements de thème personnalisés
    const handleThemeChange = () => {
      setTimeout(detectThemeColor, 100)
    }

    window.addEventListener("themeColorChanged", handleThemeChange)

    // Observer les changements de variables CSS
    const observer = new MutationObserver(() => {
      detectThemeColor()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })

    return () => {
      window.removeEventListener("themeColorChanged", handleThemeChange)
      observer.disconnect()
    }
  }, [])

  return themeColor
}
