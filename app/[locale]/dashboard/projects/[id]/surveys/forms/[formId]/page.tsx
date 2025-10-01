"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	SubmissionsTab,
	PublicAccessTab,
	EditFormTab,
	VersionsTab,
	SettingsTab,
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
	const defaultTab = isPublished ? "submissions" : "edit-form";

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
				<h1 className="text-3xl font-bold">{formTitle}</h1>
				<div className="flex items-center text-muted-foreground">
					<span>Form ID: {formId}</span>
					<span className="mx-2">•</span>
					<span className={`${isPublished ? "text-green-600" : "text-yellow-600"}`}>
						{isPublished ? "Published" : "Draft"}
					</span>
				</div>
			</div>

			{/* Tabs for different sections */}
			<Tabs defaultValue={defaultTab} className="w-full">
				{isPublished ? (
					<>
						<TabsList className="grid grid-cols-5 w-full bg-mediumGreen text-light">
							<TabsTrigger value="submissions">Submissions</TabsTrigger>
							<TabsTrigger value="public-access">Public Access</TabsTrigger>
							<TabsTrigger value="edit-form">Edit Form</TabsTrigger>
							<TabsTrigger value="versions">Versions</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="submissions" className="mt-6">
							<SubmissionsTab formId={formId} projectId={projectId} />
						</TabsContent>

						<TabsContent value="public-access" className="mt-6">
							<PublicAccessTab formId={formId} projectId={projectId} />
						</TabsContent>

						<TabsContent value="edit-form" className="mt-6">
							<EditFormTab formId={formId} projectId={projectId} />
						</TabsContent>

						<TabsContent value="versions" className="mt-6">
							<VersionsTab formId={formId} projectId={projectId} />
						</TabsContent>

						<TabsContent value="settings" className="mt-6">
							<SettingsTab formId={formId} projectId={projectId} />
						</TabsContent>
					</>
				) : (
					<>
						<TabsList className="grid grid-cols-2 w-full bg-mediumGreen text-light">
							<TabsTrigger value="edit-form">Edit Form</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="edit-form" className="mt-6">
							<EditFormTab formId={formId} projectId={projectId} />
						</TabsContent>

						<TabsContent value="settings" className="mt-6">
							<SettingsTab formId={formId} projectId={projectId} />
						</TabsContent>
					</>
				)}
			</Tabs>
		</div>
	);
}