"use client";

import { useState } from "react";
import { FileUploadForm } from "./FileUploadForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useUploadProjectFormMutation } from "@/lib/redux/features/surveys/surveyApiSlice";

interface FileUploadFormModalProps {
	projectId: string | number;
	triggerButton?: React.ReactNode;
	title?: string;
}

export function FileUploadFormModal({
	projectId,
	triggerButton,
	title = "Upload Form",
}: FileUploadFormModalProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadProjectForm] = useUploadProjectFormMutation();

	const handleSubmit = async (data: {
		file: File | null;
		ignoreWarnings: boolean;
		publish: boolean;
		formId?: string;
	}) => {
		if (!data.file) return;

		setIsLoading(true);
		try {
			const response = await uploadProjectForm({
				projectId,
				file: data.file,
				ignoreWarnings: data.ignoreWarnings,
				publish: data.publish,
				formId: data.formId,
			}).unwrap();

			// Use the form name from the response if available
			const formName = response?.form?.name || data.file.name;
			
			toast.success(
				`Form "${formName}" uploaded successfully${data.publish ? " and published" : ""}`,
			);

			setOpen(false);
		} catch (error: any) {
			// Extract error message from API response if available
			const errorMessage = error?.data?.message || 
				(error?.data?.error && typeof error.data.error === 'string' ? error.data.error : null) ||
				"Failed to upload form";
			
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const defaultTrigger = (
		<Button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
			<Upload className="h-4 w-4 mr-2" />
			Create New Form
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<FileUploadForm
						onSubmit={handleSubmit}
						onCancel={handleCancel}
						isLoading={isLoading}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
