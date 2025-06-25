import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Rapport mensuel</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">
              Résumé des performances du mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">+15.2%</div>
            <p className="text-xs text-dashboard-muted-foreground">Croissance par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Rapport annuel</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">Vue d'ensemble de l'année</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">+42.8%</div>
            <p className="text-xs text-dashboard-muted-foreground">Croissance annuelle</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
