"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { NavigationItem } from "@/app/[locale]/dashboard/types";

interface NavigationMenuProps {
	items: NavigationItem[];
	className?: string;
}

const NavigationMenuItem = ({ item }: { item: NavigationItem }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const hasChildren = item.children && item.children.length > 0;

	return (
		<div className="w-full">
			<div
				className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 ${
					item.isActive
						? "bg-[#3189a1] text-white"
						: "text-white/90 hover:bg-white/10 hover:text-white"
				}`}
				onClick={() => hasChildren && setIsExpanded(!isExpanded)}
			>
				<div className="flex items-center space-x-3">
					{item.icon}
					<span className="font-[900]">{item.label}</span>
				</div>

				{hasChildren && (
					<button className="p-1">
						{isExpanded ? (
							<ChevronDown className="w-4 h-4" />
						) : (
							<ChevronRight className="w-4 h-4" />
						)}
					</button>
				)}
			</div>

			{hasChildren && isExpanded && (
				<div className="bg-[#3853a1]/30">
					{item.children?.map((child) => (
						<div
							key={child.id}
							className={`pl-12 pr-4 py-2 text-sm transition-colors ${
								child.isActive
									? "bg-[#3189a1] text-white"
									: "text-white/80 hover:bg-white/10 hover:text-white"
							}`}
						>
							{child.href ? (
								<Link href={child.href} className="block font-roboto">
									{child.label}
								</Link>
							) : (
								<span className="block font-roboto cursor-not-allowed opacity-50">
									{child.label}
								</span>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const NavigationMenu = ({
	items,
	className = "",
}: NavigationMenuProps) => {
	return (
		<nav className={`space-y-0 ${className}`}>
			{items.map((item, index) => (
				<div key={item.id}>
					<NavigationMenuItem item={item} />
					{/* Séparateur entre les menus principaux */}
					{index < items.length - 1 && (
						<div className="mx-4 my-2 border-t border-white/20"></div>
					)}
				</div>
			))}
		</nav>
	);
};
