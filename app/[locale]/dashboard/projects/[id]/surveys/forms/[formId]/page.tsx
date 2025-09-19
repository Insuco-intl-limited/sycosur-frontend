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

export default function FormDetailPage() {
	const params = useParams();
	const projectId = params.id as string;
	const formId = params.formId as string; // This should be the form ID from the URL

	return (
		<div className="space-y-6">
			{/* Form header */}
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">Form Details</h1>
				<div className="flex items-center text-muted-foreground">
					<span>Form ID: {formId}</span>
				</div>
			</div>

			{/* Tabs for different sections */}
			<Tabs defaultValue="submissions" className="w-full">
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
			</Tabs>
		</div>
	);
}