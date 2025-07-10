import type React from "react"

export interface User {
  name: string
  avatar?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  children?: NavigationItem[]
  isActive?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
