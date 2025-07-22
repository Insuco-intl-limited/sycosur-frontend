"use client";
import type React from "react";
import {
	ComputerDesktopIcon,
	ChartBarIcon,
	CircleStackIcon,
	UsersIcon,
} from "@heroicons/react/24/solid";
import type { NavigationItem, BreadcrumbItem } from "./types";
import { UserResponse } from "@/types";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ContentArea } from "@/components/dashboard/ContentArea";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

//import for translations
import { useTranslations } from "next-intl";
import { useGetUserQuery } from "@/lib/redux/features/auth/authApiSlice";
import { getCurrentLocale } from "@/utils";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const t = useTranslations();

	const { data: user } = useGetUserQuery();
	if (!user) {
		return;
	}
	// Récupération de la locale depuis les cookies
	const locale = getCurrentLocale();

	// Breadcrumbs exemple avec locale
	const breadcrumbs: BreadcrumbItem[] = [
		{
			label: t("dashboard.menu.activities"),
			href: `/${locale}/dashboard/activities`,
		},
	];

	// Données de navigation avec traductions et locale
	const navigationItems: NavigationItem[] = [
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

	return (
		<div className="h-screen flex flex-col font-roboto">
			{/* Header fixe */}
			<ProtectedRoute>
				<Header user={user} breadcrumbs={breadcrumbs} />

				{/* Container principal */}
				<div className="flex flex-1 overflow-hidden">
					{/* Sidebar */}
					<Sidebar navigationItems={navigationItems} />

					{/* Zone de contenu */}
					<ContentArea>{children}</ContentArea>
				</div>
			</ProtectedRoute>
		</div>
	);
}
