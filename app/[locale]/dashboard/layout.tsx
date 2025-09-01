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
import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "@/utils/generateBreadcrumbs";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { getDynamicNavigationItems } from "@/components/shared/DynamicNavigation";

// Inner layout component that uses Redux for view state
function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
	const t = useTranslations();
	const pathname = usePathname();
	const { viewType, selectedProject } = useViewNavigation();

	const { data: user } = useGetUserQuery();
	if (!user) {
		return null;
	}
	
	// Récupération de la locale depuis les cookies
	const locale = getCurrentLocale();

	// Generate breadcrumbs dynamically based on the current path
	const breadcrumbs: BreadcrumbItem[] = generateBreadcrumbs(pathname, t, locale);

	// Get dynamic navigation items based on the current view and pathname
	const navigationItems = getDynamicNavigationItems(t, locale, viewType, selectedProject, pathname);

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

// Main layout component
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DashboardLayoutInner>{children}</DashboardLayoutInner>;
}
