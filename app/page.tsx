"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Lock, Mail, Chrome } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [ssoDomain, setSsoDomain] = useState("")
  const [showSSODomain, setShowSSODomain] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de connexion - remplacer par votre logique d'authentification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      router.push("/dashboard")
    }
    setIsLoading(false)
  }

  const handleSSOLogin = async (provider: string) => {
    setSsoLoading(provider)

    try {
      if (provider === "google") {
        // Logique Google OAuth
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log(`Connexion avec ${provider}`)
        router.push("/dashboard")
      } else if (provider === "sso entreprise") {
        // Redirection vers le SSO d'entreprise
        window.location.href = "/api/auth/sso/initiate"
        return // Ne pas réinitialiser le loading car on redirige
      }
    } catch (error) {
      console.error(`Erreur de connexion ${provider}:`, error)
    }

    setSsoLoading(null)
  }

  const ssoProviders = [
    {
      name: "Google",
      icon: Chrome,
      color: "hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/20",
      textColor: "text-red-600 dark:text-red-400",
      type: "oauth",
    },
    {
      name: "SSO Entreprise",
      icon: Lock,
      color: "hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20",
      textColor: "text-blue-600 dark:text-blue-400",
      type: "sso",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
          <CardDescription className="text-center">Choisissez votre méthode de connexion préférée</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSSODomain && (
            <div className="space-y-2">
              <Label htmlFor="sso-domain">Domaine de votre entreprise</Label>
              <div className="flex gap-2">
                <Input
                  id="sso-domain"
                  type="text"
                  placeholder="exemple.com"
                  value={ssoDomain}
                  onChange={(e) => setSsoDomain(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (ssoDomain) {
                      handleSSOLogin("sso entreprise")
                    }
                  }}
                  disabled={!ssoDomain || ssoLoading !== null}
                >
                  Connexion
                </Button>
              </div>
            </div>
          )}
          {/* Options SSO */}
          <div className="space-y-3">
            {ssoProviders.map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                className={`w-full h-11 ${provider.color} transition-colors`}
                onClick={() => {
                  if (provider.type === "sso") {
                    setShowSSODomain(!showSSODomain)
                  } else {
                    handleSSOLogin(provider.name.toLowerCase())
                  }
                }}
                disabled={ssoLoading !== null}
              >
                {ssoLoading === provider.name.toLowerCase() ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <provider.icon className={`w-4 h-4 mr-2 ${provider.textColor}`} />
                )}
                <span className={provider.textColor}>
                  {provider.type === "sso" ? "Connexion SSO Entreprise" : `Continuer avec ${provider.name}`}
                </span>
              </Button>
            ))}
          </div>

          {/* Séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
            </div>
          </div>

          {/* Formulaire classique */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading || ssoLoading !== null}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={isLoading || ssoLoading !== null}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || ssoLoading !== null}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-muted-foreground">Se souvenir de moi</span>
              </label>
              <Button variant="link" className="p-0 h-auto text-sm">
                Mot de passe oublié ?
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || ssoLoading !== null}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          {/* Lien d'inscription */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Pas encore de compte ?{" "}
              <Button variant="link" className="p-0 h-auto text-sm font-medium">
                Créer un compte
              </Button>
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
