"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import {
	FormsTab,
	EntityListsTab,
	FormAccessTab,
	AppUsersTab,
	SettingsTab,
} from "@/components/survey-detail";
import { CalendarIcon } from "lucide-react";
import { useGetProjectByIdQuery } from "@/lib/redux/features/projects/projectApiSlice";
import {useTranslations} from "next-intl";

export default function ProjectDetailPage() {
	const params = useParams();
	const projectId = params.id as string;
	const numericId = Number(projectId);
    const t = useTranslations();
	const { data, isLoading, isError } = useGetProjectByIdQuery(numericId, {
		skip: Number.isNaN(numericId),
	});
	const project = data?.project;

    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';

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
				{/*<h1 className="text-3xl font-bold">{project.name}</h1>*/}
				<div className="flex items-center text-muted-foreground">
					<CalendarIcon className="h-4 w-4 mr-1" />
					<span>
                        {t('project.createdOn')}{" "}
                        {new Date(project.created_at).toLocaleDateString(currentLocale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
					</span>
				</div>
			</div>
            <FormsTab projectId={project.pkid} />

		</div>
	);
}
