"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	FormsTab,
	EntityListsTab,
	ProjectRolesTab,
	AppUsersTab,
	SettingsTab,
} from "@/components/project-detail";
import { CalendarIcon } from "lucide-react";

// This would typically come from an API call
const getProjectById = (id: string | number) => {
	// For demo purposes, we're using the sample projects data
	const sampleProjects: Project[] = [
		{
			ID: 1,
			name: "Rural Development Project",
			description:
				"A project focused on developing rural areas through sustainable agriculture and infrastructure.",
			createdAt: "2024-01-15T09:00:00Z",
		},
		{
			ID: 2,
			name: "Water Access Program",
			description:
				"Program to improve access to clean water in underserved communities.",
			createdAt: "2024-02-10T10:30:00Z",
		},
		{
			ID: 3,
			name: "Community Health Initiative",
			description:
				"Initiative to improve healthcare services and education in local communities.",
			createdAt: "2024-03-01T08:15:00Z",
		},
		{
			ID: 4,
			name: "Digital Education Project",
			description:
				"Project to enhance digital literacy and provide technology resources to schools.",
			createdAt: "2024-02-15T14:45:00Z",
		},
		{
			ID: 5,
			name: "Food Security Program",
			description:
				"Program to address food insecurity through sustainable farming practices.",
			createdAt: "2024-04-01T11:20:00Z",
		},
		{
			ID: 6,
			name: "Microfinance Initiative",
			description:
				"Initiative to provide small loans to entrepreneurs in developing regions.",
			createdAt: "2024-05-15T13:10:00Z",
		},
		{
			ID: 7,
			name: "Reforestation Project",
			description:
				"Project to restore forest ecosystems in areas affected by deforestation.",
			createdAt: "2024-06-01T09:45:00Z",
		},
		{
			ID: 8,
			name: "Renewable Energy Program",
			description:
				"Program to implement renewable energy solutions in rural communities.",
			createdAt: "2024-07-01T10:00:00Z",
		},
	];

	return (
		sampleProjects.find((project) => project.ID.toString() === id.toString()) ||
		null
	);
};

export default function ProjectDetailPage() {
	const params = useParams();
	const projectId = params.id as string;
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// In a real application, this would be an API call
		const fetchProject = async () => {
			setLoading(true);
			try {
				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 500));
				const projectData = getProjectById(projectId);
				setProject(projectData);
			} catch (error) {
				console.error("Error fetching project:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [projectId]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (!project) {
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
						{new Date(project.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
			</div>

			{/* Project description */}
			<div className="p-4 bg-muted/50 rounded-lg">
				<h2 className="text-xl font-semibold mb-2">Description</h2>
				<p>{project.description}</p>
			</div>

			{/* Tabs for different sections */}
			<Tabs defaultValue="forms" className="w-full ">
				<TabsList className="grid grid-cols-5 w-full bg-mediumGreen text-light">
					<TabsTrigger value="forms">Forms</TabsTrigger>
					<TabsTrigger value="entity-lists">Entity Lists</TabsTrigger>
					<TabsTrigger value="project-roles">Project Roles</TabsTrigger>
					<TabsTrigger value="app-users">App Users</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>

				<TabsContent value="forms" className="mt-6">
					<FormsTab projectId={project.ID} />
				</TabsContent>

				<TabsContent value="entity-lists" className="mt-6">
					<EntityListsTab projectId={project.ID} />
				</TabsContent>

				<TabsContent value="project-roles" className="mt-6">
					<ProjectRolesTab projectId={project.ID} />
				</TabsContent>

				<TabsContent value="app-users" className="mt-6">
					<AppUsersTab projectId={project.ID} />
				</TabsContent>

				<TabsContent value="settings" className="mt-6">
					<SettingsTab projectId={project.ID} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
