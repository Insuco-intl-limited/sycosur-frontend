"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
	EditFormTab,
} from "@/components/form-detail";
import { useGetFormDetailsQuery } from "@/lib/redux/features/surveys/surveyApiSlice";

export default function FormDetailPage() {
	const params = useParams();
	const projectId = params.id as string;
	const formId = params.formId as string; // This should be the form ID from the URL
	const numericProjectId = Number(projectId);

	const { data, isLoading, isError, error } = useGetFormDetailsQuery(
		{ projectId: numericProjectId, formId },
		{ skip: Number.isNaN(numericProjectId) }
	);

	const form = data?.form;
	const isPublished = !!form?.publishedAt || form?.publish === true;
	const defaultTab = "edit-form";

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}
	if (isError || !form) {
		return (
			<div className="flex flex-col items-center justify-center h-64">
				<h1 className="text-2xl font-bold mb-2">Form Not Found</h1>
				<p className="text-muted-foreground">{(error as any)?.data?.message || "The form you are looking for does not exist or has been removed."}</p>
			</div>
		);
	}
	const formTitle = form?.name || formId;

	return (
		<div className="space-y-6">
			{/* Form header */}
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">Form Management</h1>
				<div className="flex items-center text-muted-foreground">
					<span >Form ID: {formId}</span>
					<span className="mx-2">•</span>
					<span className={`${isPublished ? "text-green-600" : "text-yellow-600"}`}>
						{isPublished ? "Published" : "Draft"}
					</span>
				</div>
			</div>

			<EditFormTab formId={formId} projectId={projectId} />
		</div>
	);
}