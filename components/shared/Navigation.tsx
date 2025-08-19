import type { NavigationItem } from "@/app/[locale]/dashboard/types";
import {
	ComputerDesktopIcon,
	ChartBarIcon,
	CircleStackIcon,
	UsersIcon,
	BugAntIcon,
} from "@heroicons/react/24/solid";
// @ts-ignore
import type { TFunction } from "next-intl"; //TFunction is the type returned by the useTranslation method from next-intl

/**
 * Get navigation items for the dashboard sidebar
 * @param t Translation function
 * @param locale Current locale
 * @returns Array of navigation items
 */
export const getNavigationItems = (
	t: TFunction,
	locale: string,
): NavigationItem[] => {
	return [
		{
			id: "monitoring",
			label: t("dashboard.menu.monitoring"),
			icon: <ComputerDesktopIcon className="w-5 h-5" />,
			children: [
				{
					id: "dashboard",
					label: t("dashboard.menu.dashboard"),
					href: `/${locale}/dashboard`,
					isActive: true,
				},
				{
					id: "activities",
					label: t("dashboard.menu.activities"),
					href: `/${locale}/dashboard/activities`,
				},
			],
		},
		{
			id: "ODK",
			label: t("dashboard.menu.odk"),
			icon: <BugAntIcon className="w-5 h-5" />,
			children: [
				{
					id: "projects",
					label: t("dashboard.menu.projects"),
					href: `/${locale}/dashboard/odk/projects`,
					isActive: true,
				},
				{
					id: "forms",
					label: t("dashboard.menu.forms"),
					href: `/${locale}/dashboard/odk/forms`,
				},
				{
					id: "submissions",
					label: t("dashboard.menu.submissions"),
					href: `/${locale}/dashboard/odk/submissions`,
				},
				{
					id: "assignments",
					label: t("dashboard.menu.assignments"),
					href: `/${locale}/dashboard/odk/assignments`,
				},
			],
		},
		{
			id: "reinstallation",
			label: t("dashboard.menu.reinstallation"),
			icon: <ChartBarIcon className="w-5 h-5" />,
			children: [
				{
					id: "gestion-par",
					label: t("dashboard.menu.gestion-par"),
					href: `/${locale}/dashboard/gestion-par`,
				},
				{
					id: "budget-par",
					label: t("dashboard.menu.budget-par"),
					href: `/${locale}/dashboard/budget-par`,
				},
			],
		},
		{
			id: "donnees",
			label: t("dashboard.menu.data"),
			icon: <CircleStackIcon className="w-5 h-5" />,
			children: [
				{
					id: "sandbox",
					label: t("dashboard.menu.sandbox"),
					href: `/${locale}/dashboard/sandbox`,
				},
				{
					id: "analyse",
					label: t("dashboard.menu.analyze"),
					href: `/${locale}/dashboard/analyse`,
				},
				{
					id: "documentation",
					label: t("dashboard.menu.documentation"),
					href: `/${locale}/dashboard/documentation`,
				},
			],
		},
		{
			id: "parties-prenantes",
			label: t("dashboard.menu.stakeholders"),
			icon: <UsersIcon className="w-5 h-5" />,
			children: [
				{
					id: "fiches",
					label: t("dashboard.menu.profiles"),
					href: `/${locale}/dashboard/fiches`,
				},
				{
					id: "engagement",
					label: t("dashboard.menu.engagement"),
					href: `/${locale}/dashboard/engagement`,
				},
				{
					id: "contestation",
					label: t("dashboard.menu.challenge"),
					href: `/${locale}/dashboard/contestation`,
				},
			],
		},
	];
};
