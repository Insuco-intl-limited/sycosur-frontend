"use client";

import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import type { BreadcrumbItem } from "@/app/[locale]/dashboard/types";
import { ChartBarSquareIcon } from "@heroicons/react/16/solid";
import { UserResponse } from "@/types";

interface HeaderProps {
	user: UserResponse;
	breadcrumbs?: BreadcrumbItem[];
	className?: string;
}

export const Header = ({
	user,
	breadcrumbs = [],
	className = "",
}: HeaderProps) => {
	return (
		<header
			className={`bg-[#416c78] h-16 flex items-center justify-between px-6 shadow-lg relative z-20 ${className}`}
		>
			{/* Section gauche : Logo + Breadcrumb */}
			<div className="flex items-center space-x-8">
				<Logo />

				{breadcrumbs.length > 0 && (
					<nav className="flex items-center space-x-2">
						<ChartBarSquareIcon className="w-6 h-6 text-white/60" />
						{breadcrumbs.map((item, index) => (
							<div key={index} className="flex items-center space-x-2">
								{index > 0 && <span className="text-white/60">/</span>}
								{item.href ? (
									<a
										href={item.href}
										className="text-white hover:text-gray-200 font-roboto font-extrabold transition-colors"
									>
										{item.label}
									</a>
								) : (
									<span className="text-white font-roboto font-bold">
										{item.label}
									</span>
								)}
							</div>
						))}
					</nav>
				)}
			</div>

			{/* Section droite : Menu utilisateur */}
			<UserMenu user={user} />
		</header>
	);
};
