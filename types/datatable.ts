import type React from "react"

export interface Column<T = any> {
  key: string
  header: string
  accessor?: (item: T) => any
  sortable?: boolean
  filterable?: boolean
  width?: string
  render?: (value: any, item: T) => React.ReactNode
}

export interface ActionItem<T = any> {
  label: string
  icon?: React.ReactNode
  onClick: (item: T) => void
  variant?: "default" | "destructive"
  disabled?: (item: T) => boolean
}

export interface DataTableProps<T = any> {
  data: T[]
  columns: Column<T>[]
  actions?: ActionItem<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  paginated?: boolean
  pageSize?: number
  exportable?: boolean
  exportFormats?: ExportFormat[]
  filterable?: boolean
  sortable?: boolean
  className?: string
}

export interface ExportFormat {
  type: "csv" | "json" | "excel"
  label: string
}

export interface FilterOption {
  column: string
  value: string
  operator: "equals" | "contains" | "startsWith" | "endsWith"
}

export interface SortConfig {
  key: string
  direction: "asc" | "desc"
}
