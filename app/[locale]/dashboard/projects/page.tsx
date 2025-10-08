"use client";
import {Badge} from "@/components/ui/badge";
import {Edit, Trash2, Eye} from "lucide-react";
import type {Column, ActionItem} from "@/types/datatable";
import {useTranslations} from "next-intl";
import {DataTable} from "@/components/datatable/datatable";
import {ProjectFormModal} from "@/components/forms/odk/ProjectFormModal";
import {toast} from "react-toastify";
import {useRouter, usePathname} from "next/navigation";
import {
    useCreateProjectMutation,
    useGetProjectsQuery,
    useDeleteProjectMutation
} from "@/lib/redux/features/projects/projectApiSlice";
import type {Project} from "@/types";
import { formatDate as formatDateUtil } from "@/utils/formatDate";

export default function ProjectsPage() {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();

    // Fetch projects from API
    const {data, isLoading, isError, refetch} = useGetProjectsQuery();
    // Sort projects by created_at descending
    const projects: Project[] = (data?.projects?.results ?? []).slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const totalCount = data?.projects?.count ?? 0;
    const [createProject, {isLoading: isCreating}] = useCreateProjectMutation();
    const [deleteProject, {isLoading: isDeleting}] = useDeleteProjectMutation();

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        return formatDateUtil(dateString, getLocaleFromPathname());
    };

    // Helper function to extract locale from pathname
    const getLocaleFromPathname = (): string => {
        return pathname.split('/')[1];
    };

    // Navigation handlers
    const handleViewProject = (project: Project): void => {
        const locale = getLocaleFromPathname();
        router.push(`/${locale}/dashboard/projects/${project.pkid}`);
    };

    const handleUpdateProject = (project: Project): void => {
        // TODO: implement update flow
        toast.info(`Update project: ${project.name}`);
    };

    const showApiError = (operation: string, error: unknown): void => {
        toast.error(`Failed to ${operation} project`);
    };

    const handleCreateProject = async (form: { name: string; description?: string }): Promise<void> => {
        try {
            const projectData: { name: string; description?: string } = {
                name: form.name
            };
            if (form.description && form.description.trim() !== '') {
                projectData.description = form.description;
            }
            await createProject(projectData).unwrap();
            toast.success(`Project "${form.name}" created successfully`);
            refetch();
        } catch (error) {
            showApiError("creating", error);
            throw error as Error;
        }
    };

    const handleDeleteProject = async (project: Project): Promise<void> => {
        if (confirm(`Are you sure you want to delete the project "${project.name}"?`)) {
            try {
                await deleteProject(project.pkid).unwrap();
                toast.success(`Project "${project.name}" deleted successfully`);
                refetch();
            } catch (error) {
                showApiError("deleting", error);
            }
        }
    };
    
    const buildColumns = (): Column<Project>[] => [
        // {
        //     key: "pkid",
        //     header: "ID",
        //     width: "80px",
        //     sortable: true,
        // },
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
            accessor: (project) => project.description || "-",
        },
        {
            key: "created_by_name",
            header: "Created By",
            sortable: true,
            accessor: (project) => project.created_by_name || "-",
        },
        {
            key: "created_at",
            header: "Created On",
            sortable: true,
            accessor: (project) => formatDate(project.created_at),
        },
    ];

    const buildActions = (): ActionItem<Project>[] => [
        {
            label: "View",
            icon: <Eye className="h-4 w-4"/>,
            onClick: handleViewProject,
        },
        {
            label: "Update",
            icon: <Edit className="h-4 w-4"/>,
            onClick: handleUpdateProject,
        },
        {
            label: "Delete",
            icon: <Trash2 className="h-4 w-4"/>,
            variant: "destructive" as const,
            onClick: handleDeleteProject,
        },
    ];

    const columns = buildColumns();
    const actions = buildActions();

    return (
        <div className="space-y-6">
            {/* Header with title, total items count as badge, and add button */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <Badge variant="default" className="text-sm bg-accentBlue">
                        {isLoading ? "..." : totalCount}
                    </Badge>
                </div>
                <ProjectFormModal
                    onSubmit={handleCreateProject}
                    title="Create New Project"
                />
            </div>

            {/* DataTable component */}
            {isError ? (
                <div className="text-red-500">Failed to load projects</div>
            ) : (
                <DataTable
                    data={projects}
                    columns={columns}
                    actions={actions}
                    searchable={true}
                    paginated={true}
                    pageSize={5}
                    exportable={true}
                    filterable={true}
                    sortable={true}
                />
            )}
        </div>
    );
}