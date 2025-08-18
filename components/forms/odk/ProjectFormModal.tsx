"use client";

import { useState } from "react";
import { TProjectSchema } from "@/lib/validationSchemas";
import { ProjectForm } from "./ProjectForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ProjectFormModalProps {
	onSubmit: (data: TProjectSchema) => Promise<void>;
	triggerButton?: React.ReactNode;
	title?: string;
}

export function ProjectFormModal({
	onSubmit,
	triggerButton,
	title = "Create New Project",
}: ProjectFormModalProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (data: TProjectSchema) => {
		setIsLoading(true);
		try {
			await onSubmit(data);
			setOpen(false);
		} catch (error) {
			// Error is handled in the ProjectForm component
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const defaultTrigger = (
		<Button className="bg-[#3189a1] hover:bg-[#276d8a]">
			<PlusCircle className="h-4 w-4 mr-2" />
			NEW PROJECT
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
					<ProjectForm
						onSubmit={handleSubmit}
						onCancel={handleCancel}
						isLoading={isLoading}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
