// Utility to format date and time according to locale
// Usage: formatLocalizedDate(dateString, locale)

export function formatLocalizedDate(dateString: string, locale: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Default options: show date and time (hour:minute)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    // Supported locales: 'en', 'fr', 'es'. Fallback to 'en'.
    let resolvedLocale = 'en-US';
    if (locale.startsWith('fr')) resolvedLocale = 'fr-FR';
    else if (locale.startsWith('es')) resolvedLocale = 'es-ES';
    return date.toLocaleString(resolvedLocale, options);
}

