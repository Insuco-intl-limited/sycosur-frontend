"use client";
import type React from "react";
import type { BreadcrumbItem } from "./types";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ContentArea } from "@/components/dashboard/ContentArea";
import { useTranslations } from "next-intl";
import { useGetUserQuery } from "@/lib/redux/features/auth/authApiSlice";
import { getCurrentLocale } from "@/utils";
import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "@/utils/generateBreadcrumbs";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { getDynamicNavigationItems } from "@/components/shared/DynamicNavigation";
import { useGetProjectByIdQuery } from "@/lib/redux/features/projects/projectApiSlice";

// Inner layout component that uses Redux for view state
function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
	const t = useTranslations();
	const pathname = usePathname();
	const { viewType, selectedProject } = useViewNavigation();

	const { data: user } = useGetUserQuery();
	
	// Récupération de la locale depuis les cookies
	const locale = getCurrentLocale();

	// Extract project ID from URL if present
	const projectMatch = pathname?.match(/\/projects\/(\d+)/);
	const projectId = projectMatch ? Number(projectMatch[1]) : undefined;
	const { data: projectByIdData } = useGetProjectByIdQuery(projectId as number, { skip: !projectId });
	const fetchedProject = projectByIdData?.project;

	// Build a current project context preferring fetched project, then selectedProject
	const currentProjectForContext = fetchedProject
		? { pkid: fetchedProject.pkid, id: fetchedProject.pkid, name: fetchedProject.name }
		: selectedProject
			? { pkid: (selectedProject as any).pkid ?? (selectedProject as any).ID, id: (selectedProject as any).ID ?? (selectedProject as any).pkid, name: (selectedProject as any).name }
			: undefined;

	// Generate breadcrumbs dynamically based on the current path
	const breadcrumbs: BreadcrumbItem[] = generateBreadcrumbs(pathname, t, locale, {
		currentProject: currentProjectForContext,
	});

	// Get dynamic navigation items based on the current view and pathname
	const navigationItems = getDynamicNavigationItems(
		t,
		locale,
		viewType,
		// If we have a fetched project, synthesize a minimal object compatible with view slice for nav paths
		(fetchedProject
			? ({ ID: fetchedProject.pkid, name: fetchedProject.name } as any)
			: (selectedProject as any)) || null,
		pathname,
	);

	// Render nothing if user data isn't loaded yet (after all hooks have run to keep hook order stable)
	if (!user) {
		return null;
	}

	return (
		<div className="h-screen flex flex-col font-roboto">
			{/* Header fixe */}

				<Header user={user} breadcrumbs={breadcrumbs} />

				{/* Container main */}
				<div className="flex flex-1 overflow-hidden">
					{/* Sidebar */}
					<Sidebar navigationItems={navigationItems} />
					
					{/* Zone de contenu */}
					<ContentArea>{children}</ContentArea>
				</div>
		
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
