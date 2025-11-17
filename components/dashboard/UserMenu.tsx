"use client";
import { clearCurrentUser } from "@/lib/redux/features/users/userSlice";

import type { UserResponse as UserType } from "@/types";
import { LanguageSwitcher } from "@/components/dashboard/language-switcher";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLogoutUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { setLogout } from "@/lib/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useCallback, useState, useRef, useEffect } from "react";
import { extractErrorMessage } from "@/utils";
import { useTranslations } from "next-intl";
import {
    UserIcon,
    QuestionMarkCircleIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
// import { ViewSelector } from "@/components/dashboard/ViewSelector";

interface UserMenuProps {
    user: UserType;
    className?: string;
}

export const UserMenu = ({ user, className = "" }: UserMenuProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [logoutUser, ] = useLogoutUserMutation();
    const dispatch = useAppDispatch();
    const t = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // 300ms delay before closing
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleLogout = useCallback(async () => {
       const confirmed = window.confirm(t("toast.confirm.logoutMessage"));
       if (!confirmed) {
          return;
       }
       try {
          const toastId = toast.loading(t("toast.loading.disconnecting"));
          await logoutUser().unwrap();
          dispatch(setLogout());
          dispatch(clearCurrentUser());
          toast.dismiss(toastId);
          toast.success(t("toast.success.loggedOutAlt"));

          router.push("/login");
       } catch (error) {
          const errorMsg = extractErrorMessage(error);
          console.error(errorMsg || "Erreur lors de la déconnexion:", error);
          dispatch(setLogout());
          dispatch(clearCurrentUser());
          toast.error(t("toast.error.logoutError"));
          router.push("/login");
       }
    }, [logoutUser, dispatch, router, t]);

    return (
       <div className={`flex items-center space-x-0 ${className}`}>
          {/* View selector dropdown */}
          {/*<ViewSelector />*/}

          <div className="">
             <LanguageSwitcher />
          </div>
          {/* Dropdown pour le menu utilisateur */}
          <div
             className="relative"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
          >
             <button className="bg-white/20 p-5 flex items-center space-x-2 cursor-pointer hover:bg-white/30 transition-colors">
                <UserIcon className="w-5 h-5 text-white" />
                <span className="text-white font-roboto font-medium">
                   {user?.full_name ? user.full_name : user.email}
                </span>
             </button>
             {isOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white mx-2 rounded-md shadow-lg py-1 z-50">
                   <Link
                      href="/en/dashboard/profile"
                      className="block px-4 py-1 text-md text-gray-900 hover:bg-gray-100"
                   >
                      Profile
                   </Link>
                   {/*<Link*/}
                   {/*   href="#"*/}
                   {/*   className="block px-4 py-1 text-md text-gray-900 hover:bg-gray-100"*/}
                   {/*>*/}
                   {/*   Help?*/}
                   {/*</Link>*/}
                </div>
             )}
          </div>
          <div className="bg-accentBlue p-3">
             <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 transition-colors p-2"
             >
                <PowerIcon className="w-6 h-6" />
             </button>
          </div>
       </div>
    );
};