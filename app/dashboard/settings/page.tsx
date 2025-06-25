import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorCustomizer } from "@/components/color-customizer"
import { FontCustomizer } from "@/components/font-customizer"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Couleurs du thème</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">
              Personnalisez les couleurs de votre dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorCustomizer />
          </CardContent>
        </Card>

        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="text-dashboard-foreground">Police</CardTitle>
            <CardDescription className="text-dashboard-muted-foreground">
              Choisissez la police de caractères
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FontCustomizer />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
