"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	FormsTab,
	EntityListsTab,
	ProjectRolesTab,
	AppUsersTab,
	SettingsTab,
} from "@/components/survey-detail";
import { CalendarIcon } from "lucide-react";
import { useGetProjectByIdQuery } from "@/lib/redux/features/projects/projectApiSlice";

export default function ProjectDetailPage() {
	const params = useParams();
	const projectId = params.id as string;
	const numericId = Number(projectId);

	const { data, isLoading, isError } = useGetProjectByIdQuery(numericId, {
		skip: Number.isNaN(numericId),
	});
	const project = data?.project;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (isError || !project) {
		return (
			<div className="flex flex-col items-center justify-center h-64">
				<h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
				<p className="text-muted-foreground">
					The project you are looking for does not exist or has been removed.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Project header with name and created date */}
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">{project.name}</h1>
				<div className="flex items-center text-muted-foreground">
					<CalendarIcon className="h-4 w-4 mr-1" />
					<span>
						Created on{" "}
						{new Date(project.created_at).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
			</div>

			{/* Project description */}
			<div className="p-4 bg-muted/50 rounded-lg">
				{/*<h2 className="text-xl font-semibold mb-2">Description</h2>*/}
				{/*<p>{project.description}</p>*/}
			</div>

			{/* Tabs for different sections */}
			<Tabs defaultValue="forms" className="w-full ">
				{project.odk_id ? (
					<TabsList className="grid grid-cols-5 w-full bg-mediumGreen text-light">
						<TabsTrigger value="forms">Forms</TabsTrigger>
						<TabsTrigger value="entity-lists">Entity Lists</TabsTrigger>
						<TabsTrigger value="project-roles">Project Roles</TabsTrigger>
						<TabsTrigger value="app-users">Mobile Users</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
					</TabsList>
				) : (
					<TabsList className="grid grid-cols-1 w-full bg-mediumGreen text-light">
						<TabsTrigger value="forms">Forms</TabsTrigger>
					</TabsList>
				)}

				<TabsContent value="forms" className="mt-6">
					<FormsTab projectId={project.pkid} />
				</TabsContent>

				{project.odk_id && (
					<>
						<TabsContent value="entity-lists" className="mt-6">
							<EntityListsTab projectId={project.pkid} />
						</TabsContent>

						<TabsContent value="project-roles" className="mt-6">
							<ProjectRolesTab projectId={project.pkid} />
						</TabsContent>

						<TabsContent value="app-users" className="mt-6">
							<AppUsersTab projectId={project.pkid} />
						</TabsContent>

						<TabsContent value="settings" className="mt-6">
							<SettingsTab projectId={project.pkid} />
						</TabsContent>
					</>
				)}
			</Tabs>
		</div>
	);
}
