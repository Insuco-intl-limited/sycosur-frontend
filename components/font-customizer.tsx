"use client"

import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fontOptions = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "Lato, sans-serif" },
  { name: "Poppins", value: "Poppins, sans-serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
]

export function FontCustomizer() {
  const [selectedFont, setSelectedFont] = useState("Inter, sans-serif")

  const applyFont = (fontFamily: string) => {
    document.documentElement.style.setProperty("--font-family", fontFamily)
    document.body.style.fontFamily = fontFamily
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium text-dashboard-foreground">Police de caractères</Label>
        <Select
          value={selectedFont}
          onValueChange={(value) => {
            setSelectedFont(value)
            applyFont(value)
          }}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 border border-dashboard-border rounded-lg bg-dashboard-card">
        <p className="text-dashboard-foreground" style={{ fontFamily: selectedFont }}>
          Aperçu du texte avec la police sélectionnée. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  )
}
