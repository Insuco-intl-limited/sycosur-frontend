"use client";
import type React from "react";
import type { BreadcrumbItem } from "./types";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ContentArea } from "@/components/dashboard/ContentArea";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useTranslations } from "next-intl";
import { useGetUserQuery } from "@/lib/redux/features/auth/authApiSlice";
import { getCurrentLocale } from "@/utils";
import { getNavigationItems } from "@/components/shared/Navigation";
import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "@/utils/generateBreadcrumbs";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const t = useTranslations();
	const pathname = usePathname();

	const { data: user } = useGetUserQuery();
	if (!user) {
		return;
	}
	// Récupération de la locale depuis les cookies
	const locale = getCurrentLocale();

	// Generate breadcrumbs dynamically based on the current path
	const breadcrumbs: BreadcrumbItem[] = generateBreadcrumbs(pathname, t, locale);

	// Données de navigation avec traductions
	const navigationItems = getNavigationItems(t, locale);

	return (
		<div className="h-screen flex flex-col font-roboto">
			{/* Header fixe */}
			<ProtectedRoute>
				<Header user={user} breadcrumbs={breadcrumbs} />

				{/* Container main */}
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
