import { getCookie } from "cookies-next";

/**
 * Récupère la locale courante depuis les cookies
 * @param defaultLocale - La locale par défaut à utiliser si aucune n'est trouvée (par défaut "en")
 * @returns La locale courante
 */
export function getCurrentLocale(defaultLocale: string = "en"): string {
  return getCookie("NEXT_LOCALE") as string || defaultLocale;
}
