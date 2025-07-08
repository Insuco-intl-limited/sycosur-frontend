"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";

export default function DashboardPage() {
	const t = useTranslations("dashboard");
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const router = useRouter();

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		router.push("/login");
	// 	}
	// }, [isAuthenticated, router]);
	//
	// if (!isAuthenticated) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<div className="flex-1">
						<h1 className="text-lg font-semibold">{t("title")}</h1>
					</div>
					<LanguageSwitcher />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Total Users</CardTitle>
								<CardDescription>Active users this month</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">1,234</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Revenue</CardTitle>
								<CardDescription>Total revenue this month</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">$12,345</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Orders</CardTitle>
								<CardDescription>New orders this week</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">89</div>
							</CardContent>
						</Card>
					</div>
					<Card className="flex-1">
						<CardHeader>
							<CardTitle>{t("welcome")}</CardTitle>
							<CardDescription>Hello welcome to your dashboard</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
								Dashboard content goes here
							</div>
						</CardContent>
					</Card>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
