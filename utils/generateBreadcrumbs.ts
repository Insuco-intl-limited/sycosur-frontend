import {BreadcrumbItem} from "@/app/[locale]/dashboard/types";
// @ts-ignore
import {TFunction} from "next-intl"; // TFunction is the type returned by useTranslation function from next-intl

/* Utility function to create a slug from project name */
function createSlug(name: string): string {
	// Convert to lowercase, replace spaces and special chars with hyphens
	const slug = name
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

	// Limit to 10 characters
	return slug.substring(0, 10);
}

type CurrentProject = { id?: string ; pkid?: number; name: string } | null | undefined;

export function generateBreadcrumbs(
	pathname: string,
	t: TFunction,
	locale: string,
	options?: { currentProject?: CurrentProject }
): BreadcrumbItem[] {
	// Skip empty string and locale from path segments
	const segments = pathname.split("/").filter(Boolean);
	if (segments.length === 0) {
		return [];
	}

	// Remove locale from segments if it's the first segment
	const pathSegments = segments[0] === locale ? segments.slice(1) : segments;
	if (pathSegments.length === 0) {
		return [];
	}

	const breadcrumbs: BreadcrumbItem[] = [];
	let currentPath = `/${locale}`;

	// Generate breadcrumb for each path segment
	// Limit to maximum of 3 levels (Dashboard / ODK / Projects)
	const maxDepth = 3;
	for (let i = 0; i < pathSegments.length && i < maxDepth; i++) {
		const segment = pathSegments[i];
		currentPath += `/${segment}`;

		// Skip dynamic segments (those in [brackets])
		if (segment.startsWith("[") && segment.endsWith("]")) {
			continue;
		}

		// Check if the segment is a numeric ID (for projects, etc.)
		const isNumericId = /^\d+$/.test(segment);

		// Handle numeric segments (IDs like project IDs) — never translate IDs
		if (isNumericId) {
			if (pathSegments[i - 1] === "projects") {
				const proj = options?.currentProject;
				const segStr = String(segment);
				const match = proj && (
					(proj.pkid !== undefined && String(proj.pkid) === segStr) ||
					(proj.id !== undefined && String(proj.id) === segStr)
				);
				if (match && proj?.name) {
					// Use the project name without translation
					breadcrumbs.push({
						label: proj.name,
						href: i < pathSegments.length - 1 ? currentPath : undefined,
					});
					continue;
				}
			}
			// Fallback for any numeric segment: show the raw ID as label without translation
			breadcrumbs.push({
				label: String(segment),
				href: i < pathSegments.length - 1 ? currentPath : undefined,
			});
			continue;
		}

		let breadcrumbKey = "";
		if (i === 0) {
			// For the first segment (dashboard), use the "_self" key
			breadcrumbKey = `breadcrumbs.dashboard._self`;
		} else if (i === 1 && segment === "odk") {
			// For the second segment if it's "odk", use the nested structure with "_self"
			breadcrumbKey = `breadcrumbs.dashboard.odk._self`;
		} else if (i === 2 && pathSegments[1] === "odk") {
			// For the third segment if the second is "odk", use the nested structure
			breadcrumbKey = `breadcrumbs.dashboard.odk.${segment}`;
		} else {
			// For other segments, use the direct key in the dashboard object
			breadcrumbKey = `breadcrumbs.dashboard.${segment}`;
		}

		// Fallback to menu items in the dashboard namespace
		const menuKey = `dashboard.menu.${segment}`;

		// Use the translation if available, otherwise capitalize the segment
		let label = "";
		try {
			// Try specific breadcrumb translation first
			label = t(breadcrumbKey);
		} catch (error) {
			try {
				// Try menu translation as fallback
				label = t(menuKey);
			} catch (error) {
				// If no translation is found, use the segment name with first letter capitalized
				label = segment.charAt(0).toUpperCase() + segment.slice(1);
			}
		}

		breadcrumbs.push({
			label,
			href: i < pathSegments.length - 1 ? currentPath : undefined, // Last item has no href
		});
	}

	return breadcrumbs;
}
