"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PublicLinkSchema, TPublicLinkSchema } from "@/lib/validationSchemas";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LinkIcon } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { toast } from "react-toastify";

interface PublicLinkFormProps {
  onSubmit: (data: TPublicLinkSchema) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function PublicLinkForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: PublicLinkFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TPublicLinkSchema>({
    resolver: zodResolver(PublicLinkSchema),
    mode: "all",
    defaultValues: {
      displayName: "",
      once: false,
    },
  });

  const onceValue = watch("once");

  const handleFormSubmit = async (values: z.infer<typeof PublicLinkSchema>) => {
    try {
      await onSubmit(values);
      reset();
    } catch (error) {
      toast.error("An error occurred while creating the public link");
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
        placeholder="Enter display name for the public link"
        startIcon={<LinkIcon className="size-4" />}
        required
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="once"
          checked={onceValue}
          onCheckedChange={(checked) => setValue("once", checked as boolean)}
        />
        <Label
          htmlFor="once"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Single-use link (can only be used once)
        </Label>
      </div>

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
              <span>Creating...</span>
            </div>
          ) : (
            <span>Create Public Link</span>
          )}
        </Button>
      </div>
    </form>
  );
}
