import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    // Échange du code contre un token d'accès
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      }),
    })

    const tokens = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || "Erreur lors de l'échange de code")
    }

    // Récupération des informations utilisateur
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const userData = await userResponse.json()

    if (!userResponse.ok) {
      throw new Error("Erreur lors de la récupération des données utilisateur")
    }

    // Ici, vous pouvez sauvegarder l'utilisateur en base de données
    // et créer une session

    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        provider: "google",
      },
    })
  } catch (error) {
    console.error("Erreur callback Google:", error)
    return NextResponse.json({ error: "Erreur d'authentification Google" }, { status: 400 })
  }
}
