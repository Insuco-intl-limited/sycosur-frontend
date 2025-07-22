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
			className={`w-64 bg-gradient-to-r from-[#416c78] to-[#2d4a52] shadow-lg relative z-10 flex flex-col gap-0 ${className}`}
		>
			{/* En-tête de la sidebar */}
			{/*<div className="p-4 border-b border-white/20 pt-6">*/}
			{/*	<select className="w-full bg-white/10 text-white border border-white/20 px-3 py-2 font-roboto">*/}
			{/*		<option>Sycosur</option>*/}
			{/*	</select>*/}
			{/*</div>*/}

			{/* Diamonds divider */}
			<div className="flex justify-center items-center gap-3 py-4">
				<div className="w-2 h-2 rotate-45 bg-gradient-to-br from-white/30 to-white/10"></div>
				<div className="w-2 h-2 rotate-45 bg-gradient-to-br from-white/30 to-white/10"></div>
				<div className="w-2 h-2 rotate-45 bg-gradient-to-br from-white/30 to-white/10"></div>
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
