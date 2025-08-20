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

	const handleSubmit = async (data: {
		file: File | null;
		ignoreWarnings: boolean;
		publish: boolean;
	}) => {
		if (!data.file) return;

		setIsLoading(true);
		try {
			// In a real application, this would be an API call to upload the form
			console.log("Uploading form for project:", projectId, data);

			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Show success message
			toast.success(
				`Form "${data.file.name}" uploaded successfully${data.publish ? " and published" : ""}`,
			);

			setOpen(false);
		} catch (error) {
			console.error("Error uploading form:", error);
			toast.error("Failed to upload form");
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
