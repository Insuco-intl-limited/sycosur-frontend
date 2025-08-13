"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DataTableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function DataTableSearch({ value, onChange, placeholder = "Rechercher..." }: DataTableSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-8" />
    </div>
  )
}
