"use client";

import {
	BarChart3,
	Home,
	Settings,
	Users,
	ChevronDown,
	LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUserQuery } from "@/lib/redux/features/auth/authApiSlice";

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
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const menuItems = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Analytics",
		url: "/dashboard/analytics",
		icon: BarChart3,
		subItems: [
			{
				title: "Rapports",
				url: "/dashboard/analytics/reports",
			},
			{
				title: "Métriques",
				url: "/dashboard/analytics/metrics",
			},
		],
	},
	{
		title: "Utilisateurs",
		url: "/dashboard/users",
		icon: Users,
	},
	{
		title: "Paramètres",
		url: "/dashboard/settings",
		icon: Settings,
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	const { handleLogout, isAuthenticated } = useAuthNavigation();
	const { data: user } = useGetUserQuery();

	return (
		<Sidebar className="bg-dashboard-sidebar-background border-dashboard-border">
			<SidebarHeader className="p-4 flex flex-row items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-dashboard-primary rounded-lg flex items-center justify-center">
						<span className="text-dashboard-primary-foreground font-bold text-sm">
							D
						</span>
					</div>
					<span className="font-semibold text-dashboard-foreground">
						Dashboard
					</span>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-dashboard-muted-foreground">
						Navigation
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									{item.subItems ? (
										<Collapsible defaultOpen className="group/collapsible">
											<CollapsibleTrigger asChild>
												<SidebarMenuButton className="text-sidebar-foreground hover:bg-dashboard-accent hover:text-dashboard-accent-foreground dark:text-white dark:hover:text-white">
													<item.icon className="w-4 h-4" />
													<span>{item.title}</span>
													<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.subItems.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton
																asChild
																isActive={pathname === subItem.url}
																className="text-sidebar-submenu hover:text-sidebar-submenu-hover hover:text-dashboard-foreground dark:text-sidebar-submenu dark:hover:text-sidebar-submenu-hover"
															>
																<Link href={subItem.url}>
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</Collapsible>
									) : (
										<SidebarMenuButton
											asChild
											isActive={pathname === item.url}
											className="text-sidebar-foreground hover:bg-dashboard-accent hover:text-dashboard-accent-foreground data-[active=true]:bg-dashboard-accent data-[active=true]:text-dashboard-accent-foreground dark:text-white dark:hover:text-white"
										>
											<Link href={item.url}>
												<item.icon className="w-4 h-4" />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									)}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="p-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="text-dashboard-foreground hover:bg-dashboard-accent">
									<div className="w-6 h-6 bg-dashboard-primary rounded-full flex items-center justify-center">
										<span className="text-xs font-bold text-dashboard-primary-foreground">
											{user?.first_name?.[0] + "" + user?.last_name?.[0] || "U"}
										</span>
									</div>
									<span>{user?.username || "Utilisateur"}</span>
									<ChevronDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem
									onClick={handleLogout}
									className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
								>
									<LogOut className="w-4 h-4 mr-2" />
									Déconnexion
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
