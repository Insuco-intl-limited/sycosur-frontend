export function formatDate(dateString: string | undefined, locale: string = 'en'): string {
    if (!dateString) {
      return "Date not provided";
    }
    const date: Date = new Date(dateString);

    // ISO 8601 format: YYYY-MM-DD HH:mm:ss
    // This format is language-independent and compatible with all locales (en, fr, es)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}