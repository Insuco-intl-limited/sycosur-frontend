"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectSchema, TProjectSchema } from "@/lib/validationSchemas";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { FileTextIcon, TextIcon } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { toast } from "react-toastify";

interface ProjectFormProps {
	onSubmit: (data: TProjectSchema) => Promise<void>;
	onCancel?: () => void;
	isLoading?: boolean;
}

export function ProjectForm({
	onSubmit,
	onCancel,
	isLoading = false,
}: ProjectFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TProjectSchema>({
		resolver: zodResolver(ProjectSchema),
		mode: "all",
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const handleFormSubmit = async (values: z.infer<typeof ProjectSchema>) => {
		try {
			await onSubmit(values);
			reset();
		} catch (error) {
			toast.error("An error occurred while saving the project");
			console.error(error);
		}
	};

	return (
		<form
			noValidate
			onSubmit={handleSubmit(handleFormSubmit)}
			className="space-y-4"
		>
			<FormFieldComponent
				label="Project Name"
				name="name"
				register={register}
				errors={errors}
				placeholder="Enter project name"
				startIcon={<TextIcon className="size-4" />}
				required
			/>

			<FormFieldComponent
				label="Description"
				name="description"
				register={register}
				errors={errors}
				placeholder="Enter project description"
				startIcon={<FileTextIcon className="size-4" />}
				isTextArea
			/>

			<div className="flex justify-end space-x-2 pt-4">
				{onCancel && (
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						disabled={isLoading}
					>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					className="bg-mediumGreen hover:bg-green-700 text-white"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex items-center gap-2">
							<Spinner size="sm" />
							<span>Saving...</span>
						</div>
					) : (
						<span>Save</span>
					)}
				</Button>
			</div>
		</form>
	);
}
