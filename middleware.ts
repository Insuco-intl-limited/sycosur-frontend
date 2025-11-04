import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

//TODO: Remove this temporary redirect after presentation
export default function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	// Temporary redirect for presentation: /(fr|en|es)/dashboard -> /{locale}/dashboard/surveys
	const match = pathname.match(/^\/(fr|en|es)\/dashboard\/?$/);
	if (match) {
		const locale = match[1];
		const url = req.nextUrl.clone();
		url.pathname = `/${locale}/dashboard/projects`;
		return NextResponse.redirect(url);
	}

	return intlMiddleware(req);
}

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(fr|en|es)/:path*"],
};
