"use client";

import { User, HelpCircle, Power, Folder } from "lucide-react";
import type { UserResponse as UserType } from "@/types";
import { LanguageSwitcher } from "@/components/dashboard/language-switcher";
import Link from "next/link";

interface UserMenuProps {
	user: UserType;
	className?: string;
}

export const UserMenu = ({ user, className = "" }: UserMenuProps) => {
	return (
		<div className={`flex items-center space-x-4 ${className}`}>
			{/* Icônes du menu utilisateur */}
			<button className="text-white hover:text-gray-200 transition-colors p-2">
				<Folder className="w-5 h-5" strokeWidth={1} />
			</button>

			<div>
				<LanguageSwitcher />
			</div>

			{/* Nom utilisateur */}
			<Link
				href="/profile"
				className="bg-white/20 p-5 flex items-center sapce-x-2 cursor-pointer hover:bg-white/30 transition-colors"
			>
				<User className="w-5 h-5 text-white" />
				<span className="text-white font-roboto font-medium">
					{user?.full_name ? user.full_name : user.email}
				</span>
			</Link>

			<button className="text-white hover:text-gray-200 transition-colors p-2">
				<HelpCircle className="w-5 h-5" />
			</button>

			<div className="bg-accentBlue p-3">
				<button className="text-white  hover:text-gray-200 transition-colors p-2">
					<Power className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};
