"use client";

import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BarChart3, Home, Settings, Users, LogOut } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { setLogout } from "@/lib/redux/features/auth/authSlice";

export function DashboardSidebar() {
	const t = useTranslations("dashboard");
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();
	const locale = params.locale as string;

	const handleLogout = () => {
		dispatch(setLogout());
		router.push(`/login`);
	};

	const menuItems = [
		{
			title: t("overview"),
			icon: Home,
			url: `/${locale}/dashboard`,
		},
		{
			title: t("analytics"),
			icon: BarChart3,
			url: `/${locale}/dashboard/analytics`,
		},
		{
			title: t("users"),
			icon: Users,
			url: `/${locale}/dashboard/users`,
		},
		{
			title: t("settings"),
			icon: Settings,
			url: `/${locale}/dashboard/settings`,
		},
	];

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="px-4 py-2">
					<h2 className="text-lg font-semibold">{t("title")}</h2>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button
					variant="ghost"
					className="w-full justify-start"
					onClick={handleLogout}
				>
					<LogOut className="h-4 w-4 mr-2" />
					{t("logout")}
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
