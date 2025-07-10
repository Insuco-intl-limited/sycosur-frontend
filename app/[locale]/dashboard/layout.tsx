import type React from "react";
import { Monitor, BarChart3, Database, Users } from "lucide-react";
import type { NavigationItem, User, BreadcrumbItem } from "./types";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ContentArea } from "@/components/dashboard/ContentArea";

// Données de navigation
const navigationItems: NavigationItem[] = [
	{
		id: "monitoring",
		label: "Monitoring",
		icon: <Monitor className="w-5 h-5" />,
		children: [
			{
				id: "dashboard",
				label: "Dashboard",
				href: "/dashboard",
				isActive: true,
			},
			{ id: "activities", label: "Activités", href: "/dashboard/activities" },
		],
	},
	{
		id: "reinstallation",
		label: "Reinstallation",
		icon: <BarChart3 className="w-5 h-5" />,
		children: [
			{
				id: "gestion-par",
				label: "Gestion du PAR",
				href: "/dashboard/gestion-par",
			},
			{
				id: "budget-par",
				label: "Budget du PAR",
				href: "/dashboard/budget-par",
			},
		],
	},
	{
		id: "donnees",
		label: "Données",
		icon: <Database className="w-5 h-5" />,
		children: [
			{ id: "sandbox", label: "Sandbox", href: "/dashboard/sandbox" },
			{ id: "analyse", label: "Analyse", href: "/dashboard/analyse" },
			{
				id: "documentation",
				label: "Documentation",
				href: "/dashboard/documentation",
			},
		],
	},
	{
		id: "parties-prenantes",
		label: "Parties Prenantes",
		icon: <Users className="w-5 h-5" />,
		children: [
			{
				id: "fiches",
				label: "Fiches individuelles",
				href: "/dashboard/fiches",
			},
			{ id: "engagement", label: "Engagement", href: "/dashboard/engagement" },
			{
				id: "contestation",
				label: "Contestation",
				href: "/dashboard/contestation",
			},
		],
	},
];

// Utilisateur exemple
const user: User = {
	name: "JOHN DOE",
};

// Breadcrumbs exemple
const breadcrumbs: BreadcrumbItem[] = [
	{ label: "Activités", href: "/dashboard/activities" },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col font-roboto">
			{/* Header fixe */}
			<Header user={user} breadcrumbs={breadcrumbs} />

			{/* Container principal */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<Sidebar navigationItems={navigationItems} />

				{/* Zone de contenu */}
				<ContentArea>{children}</ContentArea>
			</div>
		</div>
	);
}
