import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const samlResponse = formData.get("SAMLResponse") as string
    const relayState = formData.get("RelayState") as string

    if (!samlResponse) {
      return NextResponse.json({ error: "Réponse SAML manquante" }, { status: 400 })
    }

    // Décoder et valider la réponse SAML
    const decodedResponse = Buffer.from(samlResponse, "base64").toString("utf-8")
    const userInfo = await validateSAMLResponse(decodedResponse)

    if (!userInfo) {
      return NextResponse.json({ error: "Réponse SAML invalide" }, { status: 400 })
    }

    // Créer une session utilisateur
    // Ici vous pouvez sauvegarder l'utilisateur en base de données
    // et créer une session/JWT

    // Redirection vers le dashboard ou l'URL de retour
    const redirectUrl = relayState || "/dashboard"
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error) {
    console.error("Erreur callback SSO:", error)
    return NextResponse.json({ error: "Erreur lors du traitement SSO" }, { status: 500 })
  }
}

async function validateSAMLResponse(samlResponse: string) {
  try {
    // Validation basique de la réponse SAML
    // Dans un vrai projet, utilisez une bibliothèque comme saml2-js

    // Extraction des informations utilisateur de la réponse SAML
    const emailMatch = samlResponse.match(/<saml:AttributeValue[^>]*>([^<]+@[^<]+)<\/saml:AttributeValue>/)
    const nameMatch = samlResponse.match(/<saml:AttributeValue[^>]*>([^<@]+\s+[^<@]+)<\/saml:AttributeValue>/)

    if (!emailMatch) {
      throw new Error("Email non trouvé dans la réponse SAML")
    }

    return {
      email: emailMatch[1],
      name: nameMatch ? nameMatch[1] : emailMatch[1].split("@")[0],
      provider: "sso",
    }
  } catch (error) {
    console.error("Erreur validation SAML:", error)
    return null
  }
}
