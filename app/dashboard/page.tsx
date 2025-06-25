import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Revenus totaux",
      value: "€45,231.89",
      change: "+20.1% par rapport au mois dernier",
      icon: DollarSign,
    },
    {
      title: "Utilisateurs",
      value: "+2350",
      change: "+180.1% par rapport au mois dernier",
      icon: Users,
    },
    {
      title: "Ventes",
      value: "+12,234",
      change: "+19% par rapport au mois dernier",
      icon: BarChart3,
    },
    {
      title: "Croissance",
      value: "+573",
      change: "+201 depuis la semaine dernière",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-dashboard-card border-dashboard-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-dashboard-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-dashboard-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dashboard-foreground">{stat.value}</div>
              <p className="text-xs text-dashboard-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Aperçu</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-dashboard-muted-foreground">
              Graphique à venir
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Activité récente</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">
              Vous avez fait 265 ventes ce mois-ci.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-9 h-9 bg-dashboard-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-dashboard-accent-foreground">{item}</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-dashboard-foreground">
                      Commande #{1000 + item}
                    </p>
                    <p className="text-sm text-dashboard-muted-foreground">
                      Il y a {item} heure{item > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-dashboard-foreground">
                    +€{(Math.random() * 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
