import { routing, localePrefix, pathnames } from "./routing";

import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createLocalizedPathnamesNavigation({
		routing,
		pathnames,
		localePrefix,
	});
