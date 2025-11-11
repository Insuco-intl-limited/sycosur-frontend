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
import { useAddAppUserMutation } from "@/lib/redux/features/surveys/surveyApiSlice";
import { useTranslations } from "next-intl";

interface AppUsersFormModalProps {
	projectId: string | number;
	onSubmit?: (data: TAppUsersSchema) => Promise<void>;
	triggerButton?: React.ReactNode;
	title?: string;
	disabled?: boolean;
}

export function AppUsersFormModal({
	projectId,
	onSubmit,
	triggerButton,
	title = "Add User",
	disabled = false,
}: AppUsersFormModalProps) {
	const t = useTranslations();
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [addAppUser] = useAddAppUserMutation();

	const handleSubmit = async (data: TAppUsersSchema) => {
		setIsLoading(true);
		try {
			// If an onSubmit prop is provided, use it; otherwise use the addAppUser mutation
			if (onSubmit) {
				await onSubmit(data);
			} else {
				// Convert projectId to number if it's a string
				const numericProjectId = typeof projectId === 'string' ? parseInt(projectId, 10) : projectId;
				
				// Call the addAppUser mutation
				const response = await addAppUser({
					projectId: numericProjectId,
					displayName: data.displayName,
				}).unwrap();
				
				// Get user data from response
				const userData = response.app_user;
				
				// Show success message
				toast.success(t("toast.success.mobileUserAdded"));
			}

			setOpen(false);
		} catch (error: any) {
			// Extract error message from API response if available
			const errorMessage = error?.data?.message || 
				(error?.data?.error && typeof error.data.error === 'string' ? error.data.error : null) ||
				"Failed to add user";
			
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const defaultTrigger = (
		<Button
			disabled={disabled}
			aria-disabled={disabled}
			title={disabled ? "ODK non configuré pour ce projet" : undefined}
			className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<UserPlus className="h-4 w-4 mr-2" />
			New Mobile User
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={(val) => {
			if (disabled) return;
			setOpen(val);
		}}>
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
