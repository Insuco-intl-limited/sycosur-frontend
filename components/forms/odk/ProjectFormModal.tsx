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
import { useTranslations} from "next-intl";

interface ProjectFormModalProps {
	onSubmit: (data: TProjectSchema) => Promise<void>;
	triggerButton?: React.ReactNode;
	title?: string;
	initialData?: TProjectSchema;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function ProjectFormModal({
	onSubmit,
	triggerButton,
	title = "Create New Project",
	initialData,
	open: externalOpen,
	onOpenChange: externalOnOpenChange,
}: ProjectFormModalProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const open = externalOpen !== undefined ? externalOpen : internalOpen;
	const setOpen = externalOnOpenChange || setInternalOpen;
    const t = useTranslations();

	const handleSubmit = async (data: TProjectSchema) => {
		setIsLoading(true);
		try {
			await onSubmit(data);
			setOpen(false);
		} catch (error) {
			console.log(error);
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
            { t("forms.buttons.newProject")}
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{externalOpen === undefined && (
				<DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>
			)}
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<ProjectForm
						onSubmit={handleSubmit}
						onCancel={handleCancel}
						isLoading={isLoading}
						initialData={initialData}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
