"use client";

import { User, HelpCircle, Power, Folder } from "lucide-react";
import type { UserResponse as UserType } from "@/types";
import { LanguageSwitcher } from "@/components/dashboard/language-switcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { setLogout } from "@/lib/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { extractErrorMessage } from "@/utils";

interface UserMenuProps {
	user: UserType;
	className?: string;
}

export const UserMenu = ({ user, className = "" }: UserMenuProps) => {
	const router = useRouter();
	const [logoutUser, { isLoading, isSuccess }] = useLogoutUserMutation();
	const dispatch = useAppDispatch();

	const handleLogout = useCallback(async () => {
		try {
			const toastId = toast.loading("Disconnecting you from the system...");
			await logoutUser().unwrap();
			dispatch(setLogout());
			toast.dismiss(toastId);
			toast.success("You have been successfully logged out.");

			router.push("/login");
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			console.error(errorMsg || "Erreur lors de la déconnexion:", error);
			dispatch(setLogout());
			// Afficher un message d'erreur mais rediriger quand même
			toast.error(
				"Error while logging out. Howevever, you have been redirected to the login page.",
			);
			router.push("/login");
		}
	}, [logoutUser, dispatch, router]);

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
			{/*TODO : Ajouter le lien vers la page de profil en fonction du langage*/}
			<Link
				href="/en/dashboard/profile"
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
				<button
					onClick={handleLogout}
					className="text-white hover:text-gray-200 transition-colors p-2"
				>
					<Power className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};
