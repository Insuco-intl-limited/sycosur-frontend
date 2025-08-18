"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

interface DataTableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function DataTableSearch({ value, onChange, placeholder }: DataTableSearchProps) {
  const t = useTranslations("datatable.search")
  const defaultPlaceholder = t("searchPlaceholder")
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder || defaultPlaceholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-8" />
    </div>
  )
}
