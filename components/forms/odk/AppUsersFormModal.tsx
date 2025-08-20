"use client";

import { useState } from "react";
import { TAppUsersSchema } from "@/lib/validationSchemas";
import { AppUsersForm } from "./AppUsersForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { toast } from "react-toastify";

interface AppUsersFormModalProps {
	projectId: string | number;
	onSubmit?: (data: TAppUsersSchema) => Promise<void>;
	triggerButton?: React.ReactNode;
	title?: string;
}

export function AppUsersFormModal({
	projectId,
	onSubmit,
	triggerButton,
	title = "Add User",
}: AppUsersFormModalProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (data: TAppUsersSchema) => {
		setIsLoading(true);
		try {
			// If an onSubmit prop is provided, use it; otherwise use the default implementation
			if (onSubmit) {
				await onSubmit(data);
			} else {
				// Default implementation - in a real app, this would call an API
				console.log(
					"Adding user with display name:",
					data.displayName,
					"to project:",
					projectId,
				);

				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Show success message
				toast.success(`User "${data.displayName}" added successfully`);
			}

			setOpen(false);
		} catch (error) {
			console.error("Error adding user:", error);
			toast.error("Failed to add user");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const defaultTrigger = (
		<Button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
			<UserPlus className="h-4 w-4 mr-2" />
			Add App User
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<AppUsersForm
						onSubmit={handleSubmit}
						onCancel={handleCancel}
						isLoading={isLoading}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
