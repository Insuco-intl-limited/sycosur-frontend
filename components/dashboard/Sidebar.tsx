"use client";

import { NavigationMenu } from "./NavigationMenu";
import type { NavigationItem } from "@/app/[locale]/dashboard/types";

interface SidebarProps {
	navigationItems: NavigationItem[];
	className?: string;
}

export const Sidebar = ({ navigationItems, className = "" }: SidebarProps) => {
	return (
		<aside
			className={`w-64 bg-gradient-to-r from-[#416c78] to-[#2d4a52] shadow-lg relative z-10 flex flex-col ${className}`}
		>
			{/* En-tête de la sidebar */}
			<div className="p-4 border-b border-white/20 pt-6">
				<select className="w-full bg-white/10 text-white border border-white/20 px-3 py-2 font-roboto">
					<option>Sycosur</option>
				</select>
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
