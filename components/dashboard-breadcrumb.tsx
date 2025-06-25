"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getRouteConfig } from "@/lib/route-config"

export function DashboardBreadcrumb() {
  const pathname = usePathname()

  // Générer les segments du chemin
  const pathSegments = pathname.split("/").filter(Boolean)

  // Configuration des routes pour les breadcrumbs
  // Construire les breadcrumbs complets
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/")
    const config = getRouteConfig(path)

    return {
      path,
      label: config?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: config?.icon,
      isLast: index === pathSegments.length - 1,
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.path} className="flex items-center">
            <BreadcrumbItem>
              {breadcrumb.isLast ? (
                <BreadcrumbPage className="flex items-center gap-2 text-dashboard-foreground font-medium">
                  {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
                  {breadcrumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className="flex items-center gap-2 text-dashboard-muted-foreground hover:text-dashboard-foreground transition-colors"
                >
                  <Link href={breadcrumb.path}>
                    {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!breadcrumb.isLast && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-dashboard-muted-foreground" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
