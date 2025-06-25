import { Home, BarChart3, Users, Settings, FileText, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface RouteConfig {
  label: string
  description: string
  icon?: LucideIcon
}

export const routeConfig: Record<string, RouteConfig> = {
  "/dashboard": {
    label: "Dashboard",
    description: "Bienvenue sur votre tableau de bord",
    icon: Home,
  },
  "/dashboard/analytics": {
    label: "Analytics",
    description: "Analysez vos performances et tendances",
    icon: BarChart3,
  },
  "/dashboard/analytics/reports": {
    label: "Rapports",
    description: "Consultez vos rapports détaillés",
    icon: FileText,
  },
  "/dashboard/analytics/metrics": {
    label: "Métriques",
    description: "Suivez vos indicateurs clés de performance",
    icon: TrendingUp,
  },
  "/dashboard/users": {
    label: "Utilisateurs",
    description: "Gérez vos utilisateurs et leurs permissions",
    icon: Users,
  },
  "/dashboard/settings": {
    label: "Paramètres",
    description: "Personnalisez l'apparence de votre dashboard",
    icon: Settings,
  },
}

export function getRouteConfig(pathname: string): RouteConfig | null {
  return routeConfig[pathname] || null
}
