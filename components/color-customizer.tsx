"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const colorPresets = [
  {
    name: "Bleu par défaut",
    colors: {
      primary: "221.2 83.2% 53.3%",
      accent: "210 40% 98%",
      sidebar: "0 0% 98%",
      sidebarBackground: "0 0% 96%",
    },
  },
  {
    name: "Vert",
    colors: {
      primary: "142.1 76.2% 36.3%",
      accent: "138 76% 97%",
      sidebar: "138 76% 97%",
      sidebarBackground: "138 76% 95%",
    },
  },
  {
    name: "Violet",
    colors: {
      primary: "262.1 83.3% 57.8%",
      accent: "270 95% 98%",
      sidebar: "270 95% 98%",
      sidebarBackground: "270 95% 96%",
    },
  },
  {
    name: "Orange",
    colors: {
      primary: "24.6 95% 53.1%",
      accent: "24 95% 97%",
      sidebar: "24 95% 97%",
      sidebarBackground: "24 95% 95%",
    },
  },
]

export function ColorCustomizer() {
  const [selectedPreset, setSelectedPreset] = useState(0)

  const applyColors = (colors: any) => {
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      if (key === "sidebarBackground") {
        root.style.setProperty(`--dashboard-sidebar-background`, value as string)
        root.style.setProperty(`--sidebar-background`, value as string)
      } else {
        root.style.setProperty(`--dashboard-${key}`, value as string)
        if (key === "sidebar") {
          root.style.setProperty(`--sidebar-background`, value as string)
        }
      }
    })

    // Déclencher un événement pour notifier le changement de thème
    window.dispatchEvent(new CustomEvent("themeColorChanged"))
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium text-dashboard-foreground">Préréglages de couleurs</Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {colorPresets.map((preset, index) => (
            <Button
              key={index}
              variant={selectedPreset === index ? "default" : "outline"}
              className="h-auto p-3 flex flex-col items-start"
              onClick={() => {
                setSelectedPreset(index)
                applyColors(preset.colors)
              }}
            >
              <span className="font-medium">{preset.name}</span>
              <div className="flex gap-1 mt-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: `hsl(${preset.colors.primary})` }}
                />
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: `hsl(${preset.colors.accent})` }}
                />
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: `hsl(${preset.colors.sidebarBackground})` }}
                />
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 border border-dashboard-border rounded-lg bg-dashboard-card">
        <p className="text-sm text-dashboard-muted-foreground mb-2">Aperçu des couleurs appliquées :</p>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded border bg-dashboard-primary"></div>
          <div className="w-8 h-8 rounded border bg-dashboard-accent"></div>
          <div
            className="w-8 h-8 rounded border"
            style={{ backgroundColor: "hsl(var(--dashboard-sidebar-background))" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
