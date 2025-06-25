import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")

    if (!domain) {
      return NextResponse.json({ error: "Domaine requis" }, { status: 400 })
    }

    // Découverte de la configuration SSO pour le domaine
    const ssoConfig = await discoverSSOConfig(domain)

    if (!ssoConfig) {
      return NextResponse.json({ error: "Configuration SSO non trouvée" }, { status: 404 })
    }

    return NextResponse.json(ssoConfig)
  } catch (error) {
    console.error("Erreur découverte SSO:", error)
    return NextResponse.json({ error: "Erreur lors de la découverte SSO" }, { status: 500 })
  }
}

async function discoverSSOConfig(domain: string) {
  // Base de données ou configuration des domaines SSO
  const ssoConfigs: Record<string, any> = {
    "exemple.com": {
      domain: "exemple.com",
      entityId: "https://exemple.com/sso",
      ssoUrl: "https://sso.exemple.com/saml/login",
      name: "Exemple Corp SSO",
    },
    "demo.com": {
      domain: "demo.com",
      entityId: "https://demo.com/sso",
      ssoUrl: "https://sso.demo.com/saml/login",
      name: "Demo Company SSO",
    },
  }

  return ssoConfigs[domain] || null
}
