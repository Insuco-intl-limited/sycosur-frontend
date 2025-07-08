import { defineRouting, Pathnames, LocalePrefix } from "next-intl/routing";

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "fr", "es"],

	// Used when no locale matches
	defaultLocale: "en",
});
export type Locales = typeof routing.locales;

export const pathnames: Pathnames<Locales> = {
	"/": "/",
	pathnames: "pathnames",
};
export const localePrefix: LocalePrefix<Locales> = "always";
