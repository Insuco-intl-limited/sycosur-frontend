import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Temps de réponse</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">Moyenne des 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">142ms</div>
            <p className="text-xs text-dashboard-muted-foreground">-12ms par rapport à hier</p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Disponibilité</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">Uptime du service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">99.9%</div>
            <p className="text-xs text-dashboard-muted-foreground">Excellent</p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Erreurs</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">Taux d'erreur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">0.1%</div>
            <p className="text-xs text-dashboard-muted-foreground">Très faible</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
