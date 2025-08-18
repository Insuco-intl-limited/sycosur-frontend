"use client";

import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/datatable/datatable";
import { ProjectFormModal } from "@/components/forms/odk/ProjectFormModal";
import { toast } from "react-toastify";

// Sample project data
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

export default function ProjectsPage() {
	const t = useTranslations();

	// Column definitions for the DataTable
	const columns: Column<Project>[] = [
		{
			key: "ID",
			header: "ID",
			width: "80px",
			sortable: true,
		},
		{
			key: "name",
			header: "Project Name",
			sortable: true,
			filterable: true,
		},
		{
			key: "description",
			header: "Description",
			sortable: true,
			filterable: true,
		},
		{
			key: "createdAt",
			header: "Created At",
			sortable: true,
			accessor: (project) =>
				new Date(project.createdAt).toLocaleDateString("en-US"),
		},
	];

	// Action definitions for the DataTable
	const actions: ActionItem<Project>[] = [
		{
			label: "View",
			icon: <Eye className="h-4 w-4" />,
			onClick: (project) => {
				alert(
					`View project details: ${project.name}\nDescription: ${project.description}\nCreated At: ${new Date(project.createdAt).toLocaleDateString("en-US")}\nID: ${project.ID}`,
				);
			},
		},
		{
			label: "Update",
			icon: <Edit className="h-4 w-4" />,
			onClick: (project) => {
				alert(`Update project: ${project.name}`);
			},
		},
		{
			label: "Delete",
			icon: <Trash2 className="h-4 w-4" />,
			variant: "destructive" as const,
			onClick: (project) => {
				if (
					confirm(
						`Are you sure you want to delete the project: ${project.name}?`,
					)
				) {
					alert(
						`Project ${project.name} with ID ${project.ID} has been deleted`,
					);
				}
			},
		},
	];

	// Handler for creating a new project
	const handleCreateProject = async (data: {
		name: string;
		description: string;
	}) => {
		try {
			// In a real application, this would be an API call to create the project
			console.log("Creating project:", data);

			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Show success message
			toast.success(`Project "${data.name}" created successfully`);

			// In a real application, you would refresh the projects list here
		} catch (error) {
			console.error("Error creating project:", error);
			toast.error("Failed to create project");
			throw error; // Re-throw to let the form component handle it
		}
	};

	return (
		<div className="space-y-6">
			{/* Header with title, total items count as badge, and add button */}
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">Projects</h1>
					<Badge variant="default" className="text-sm bg-accentBlue">
						{sampleProjects.length}
					</Badge>
				</div>
				<ProjectFormModal
					onSubmit={handleCreateProject}
					title="Create New Project"
				/>
			</div>

			{/* DataTable component */}

			<DataTable
				data={sampleProjects}
				columns={columns}
				actions={actions}
				searchable={true}
				paginated={true}
				pageSize={5}
				exportable={true}
				filterable={true}
				sortable={true}
			/>
		</div>
	);
}
