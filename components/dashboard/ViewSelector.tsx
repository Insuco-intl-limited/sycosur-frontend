// "use client";
//
// import { useTranslations } from "next-intl";
// import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
// import { useViewNavigation } from "@/hooks/useViewNavigation";
// import {
// 	FolderIcon,
// 	HomeIcon,
// } from "@heroicons/react/24/solid";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
//
// export const ViewSelector = () => {
// 	const t = useTranslations();
// 	const { viewType, selectedProject, projects, selectProject, setViewType } = useViewNavigation();
// 	const projectsLoading = useAppSelector(state => state.view.isLoading);
//
// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<button className="text-white hover:text-gray-200 transition-colors p-2 flex items-center">
// 					{viewType === "general" ? (
// 						<HomeIcon className="w-7 h-7" strokeWidth={1} />
// 					) : (
// 						<FolderIcon className="w-7 h-7" strokeWidth={1} />
// 					)}
// 				</button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent className="w-56">
// 				<DropdownMenuLabel>{t("dashboard.menu.view_selection")}</DropdownMenuLabel>
// 				<DropdownMenuSeparator />
// 				<DropdownMenuItem
// 					className={viewType === "general" ? "bg-accent text-accent-foreground" : ""}
// 					onClick={() => setViewType("general")}
// 				>
// 					<HomeIcon className="w-4 h-4 mr-2" />
// 					{t("dashboard.menu.general_view")}
// 				</DropdownMenuItem>
//
// 				<DropdownMenuSeparator />
// 				<DropdownMenuLabel>{t("dashboard.menu.projects")}</DropdownMenuLabel>
// 				<DropdownMenuSeparator />
//
// 				{projectsLoading ? (
// 					<DropdownMenuItem disabled>
// 						{t("common.loading")}...
// 					</DropdownMenuItem>
// 				) : projects.length > 0 ? (
// 					projects.map((project) => (
// 						<DropdownMenuItem
// 							key={project.ID}
// 							className={selectedProject?.ID === project.ID ? "bg-accent text-accent-foreground" : ""}
// 							onClick={() => selectProject(project)}
// 						>
// 							<FolderIcon className="w-4 h-4 mr-2" />
// 							{project.name}
// 						</DropdownMenuItem>
// 					))
// 				) : (
// 					<DropdownMenuItem disabled>
// 						{t("dashboard.menu.no_projects")}
// 					</DropdownMenuItem>
// 				)}
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// };