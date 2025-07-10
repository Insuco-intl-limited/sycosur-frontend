"use client";
import type React from "react";
import { Monitor, BarChart3, Database, Users } from "lucide-react";
import type { NavigationItem, User, BreadcrumbItem } from "./types";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ContentArea } from "@/components/dashboard/ContentArea";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

// import for translations
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { getCookie } from "cookies-next";

// Utilisateur exemple
const user: User = {
	name: "JOHN DOE",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const t = useTranslations("dashboard");
	const router = useRouter();
	const { params } = useParams();

	// Récupération de la locale depuis les cookies
	const locale = getCookie("NEXT_LOCALE") || "en";

	// Breadcrumbs exemple avec locale
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: t("menu.activities"), href: `/${locale}/dashboard/activities` },
	];

	// Données de navigation avec traductions et locale
	const navigationItems: NavigationItem[] = [
		{
			id: "monitoring",
			label: t("menu.monitoring"),
			icon: <Monitor className="w-5 h-5" />,
			children: [
				{
					id: "dashboard",
					label: t("menu.dashboard"),
					href: `/${locale}/dashboard`,
					isActive: true,
				},
				{
					id: "activities",
					label: t("menu.activities"),
					href: `/${locale}/dashboard/activities`,
				},
			],
		},
		{
			id: "reinstallation",
			label: t("menu.reinstallation"),
			icon: <BarChart3 className="w-5 h-5" />,
			children: [
				{
					id: "gestion-par",
					label: t("menu.gestion-par"),
					href: `/${locale}/dashboard/gestion-par`,
				},
				{
					id: "budget-par",
					label: t("menu.budget-par"),
					href: `/${locale}/dashboard/budget-par`,
				},
			],
		},
		{
			id: "donnees",
			label: t("menu.data"),
			icon: <Database className="w-5 h-5" />,
			children: [
				{
					id: "sandbox",
					label: t("menu.sandbox"),
					href: `/${locale}/dashboard/sandbox`,
				},
				{
					id: "analyse",
					label: t("menu.analyze"),
					href: `/${locale}/dashboard/analyse`,
				},
				{
					id: "documentation",
					label: t("menu.documentation"),
					href: `/${locale}/dashboard/documentation`,
				},
			],
		},
		{
			id: "parties-prenantes",
			label: t("menu.stakeholders"),
			icon: <Users className="w-5 h-5" />,
			children: [
				{
					id: "fiches",
					label: t("menu.profiles"),
					href: `/${locale}/dashboard/fiches`,
				},
				{
					id: "engagement",
					label: t("menu.engagement"),
					href: `/${locale}/dashboard/engagement`,
				},
				{
					id: "contestation",
					label: t("menu.challenge"),
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
