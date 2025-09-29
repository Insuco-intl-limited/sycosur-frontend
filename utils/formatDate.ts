export function formatDate(dateString: string | undefined, locale: string = 'en'): string {
    if (!dateString) return "Date not provided";
    const date: Date = new Date(dateString);

    // Supported locales: 'en', 'fr', 'es'. Fallback to 'en'.
    let resolvedLocale = 'en-US';
    if (locale.startsWith('fr')) resolvedLocale = 'fr-FR';
    else if (locale.startsWith('es')) resolvedLocale = 'es-ES';

    // Recommended formats:
    // en: September 24, 2025
    // fr: 24 septembre 2025
    // es: 24 de septiembre de 2025
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString(resolvedLocale, options);
}