import type React from "react";

export interface NavigationItem {
	id: string;
	label: string;
	icon?: React.ReactNode;
	href?: string;
	children?: NavigationItem[];
	isActive?: boolean;
}

export interface BreadcrumbItem {
	label: string;
	href?: string;
}
