import { BreadcrumbItem } from "@/app/[locale]/dashboard/types";
// @ts-ignore
import { TFunction } from "next-intl"; // TFunction is the type returned by useTranslation function from next-intl

// Import the getProjectById function from the shared utility
import { getProjectById } from "@/utils/projectUtils";

/**
 * Creates a slug from a project name, limited to 10 characters
 * @param name The project name to convert to a slug
 * @returns A slug of maximum 10 characters
 */
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

/**
 * Generates breadcrumb items based on the current path
 * 
 * Special handling for numeric IDs in paths:
 * - When a numeric ID is detected in the path (e.g., /dashboard/projects/1),
 *   the function attempts to retrieve the corresponding entity (e.g., project)
 *   and uses its name as the breadcrumb label instead of the ID.
 * - For project IDs, it fetches the project name and displays it in the breadcrumb.
 * - The URL path still uses the numeric ID to maintain proper routing.
 * - If the entity cannot be found, it falls back to the default behavior.
 * 
 * @param pathname The current path from usePathname()
 * @param t Translation function from useTranslations()
 * @param locale Current locale
 * @returns Array of breadcrumb items
 */
export function generateBreadcrumbs(
	pathname: string,
	t: TFunction,
	locale: string,
): BreadcrumbItem[] {
	// Skip empty string and locale from path segments
	const segments = pathname.split("/").filter(Boolean);
	if (segments.length === 0) return [];

	// Remove locale from segments if it's the first segment
	const pathSegments = segments[0] === locale ? segments.slice(1) : segments;
	if (pathSegments.length === 0) return [];

	const breadcrumbs: BreadcrumbItem[] = [];
	let currentPath = `/${locale}`;

	// Generate breadcrumb for each path segment
	// Limit to maximum of 3 levels (Dashboard / ODK / Projects)
	const maxDepth = 3;
	for (let i = 0; i < pathSegments.length && i < maxDepth; i++) {
		const segment = pathSegments[i];
		currentPath += `/${segment}`;

		// Skip dynamic segments (those in [brackets])
		if (segment.startsWith("[") && segment.endsWith("]")) continue;

		// Check if the segment is a numeric ID (for projects, etc.)
		const isNumericId = /^\d+$/.test(segment);
		
		// Handle numeric IDs (like project IDs)
		if (isNumericId && pathSegments[i-1] === "projects") {
			try {
				// Try to get the project data
				const project = getProjectById(segment);
				if (project && project.name) {
					// Create a slug from the project name
					const slug = createSlug(project.name);
					
					// For the URL, we still need to use the numeric ID to maintain proper routing
					// but we'll display the project name as the label
					breadcrumbs.push({
						label: project.name,
						href: i < pathSegments.length - 1 ? currentPath : undefined, // Last item has no href
					});
					continue; // Skip the rest of the loop for this segment
				}
			} catch (error) {
				console.error("Error getting project data:", error);
				// Continue with normal breadcrumb generation if there's an error
			}
		}
		
		// Try to get translation for the segment
		// With the new nested structure, we need to handle the "_self" key for self-references
		// Build the key path for accessing the nested structure
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
