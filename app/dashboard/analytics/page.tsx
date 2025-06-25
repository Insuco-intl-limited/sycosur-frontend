import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Trafic du site</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">Visiteurs uniques ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">12,345</div>
            <p className="text-xs text-dashboard-muted-foreground">+15% par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Taux de conversion</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">
              Pourcentage de visiteurs convertis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">3.2%</div>
            <p className="text-xs text-dashboard-muted-foreground">+0.5% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
