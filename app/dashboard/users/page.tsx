import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Utilisateurs actifs</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">
              Connectés dans les dernières 24h
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">1,234</div>
            <p className="text-xs text-dashboard-muted-foreground">+5% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Nouveaux utilisateurs</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">Inscriptions cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dashboard-foreground">89</div>
            <p className="text-xs text-dashboard-muted-foreground">+12% par rapport à la semaine dernière</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
