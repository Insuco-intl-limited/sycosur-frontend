"use client";

import { NavigationMenu } from "./NavigationMenu";
import type { NavigationItem } from "@/app/[locale]/dashboard/types";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
	navigationItems: NavigationItem[];
	className?: string;
}

export const Sidebar = ({ navigationItems, className = "" }: SidebarProps) => {
	const { viewType, selectedProject } = useViewNavigation();
	const t = useTranslations();

	return (
		<aside
			className={`w-64 bg-gradient-to-r from-[#416c78] to-[#2d4a52] shadow-lg relative z-10 flex flex-col gap-0 ${className}`}
		>
			{/* En-tête de la sidebar */}
			{/*{viewType === "project" && selectedProject && (*/}
			{/*	<div className="p-4 border-b border-white/20 pt-6 flex justify-center ">*/}
			{/*		<Badge */}
			{/*			variant="destructive"*/}
			{/*			className="bg-gradient-mediumGreen-accentBlue text-white px-3 py-1 text-sm max-w-[90%] truncate rounded-none"*/}
			{/*		>*/}
			{/*			{selectedProject.name}*/}
			{/*		</Badge>*/}
			{/*	</div>*/}
			{/*)}*/}

			{/* Diamonds divider */}
			<div className="flex justify-center items-center gap-3 py-4">

			</div>

			{/* Menu de navigation */}
			<div className="flex-1 overflow-y-auto">
				<NavigationMenu items={navigationItems} />
			</div>

			{/* Footer de la sidebar */}
			<div className="p-4 border-t border-white/20">
				<div className="text-center">
					<span className="text-white/60 font-roboto text-xs">Sycosur 2.0</span>
				</div>
			</div>
		</aside>
	);
};
