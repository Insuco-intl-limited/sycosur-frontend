"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppUsersSchema, TAppUsersSchema } from "@/lib/validationSchemas";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { toast } from "react-toastify";

interface AppUsersFormProps {
  onSubmit: (data: TAppUsersSchema) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function AppUsersForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: AppUsersFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAppUsersSchema>({
    resolver: zodResolver(AppUsersSchema),
    mode: "all",
    defaultValues: {
      displayName: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof AppUsersSchema>) => {
    try {
      await onSubmit(values);
      reset();
    } catch (error) {
      toast.error("An error occurred while saving the display name");
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
        label="Display Name"
        name="displayName"
        register={register}
        errors={errors}
        placeholder="Enter display name"
        startIcon={<UserIcon className="size-4" />}
        required
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
          className="bg-primary hover:bg-primary/90"
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