"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PublicLinkForm } from "@/components/forms/odk/PublicLinkForm";
import { TPublicLinkSchema } from "@/lib/validationSchemas";

interface PublicLinkFormModalProps {
  onSubmitAction: (data: TPublicLinkSchema) => Promise<void>;
  title?: string;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function PublicLinkFormModal({
  onSubmitAction,
  title = "Create New Public Link",
  buttonText = "New Public Link",
  buttonVariant = "default",
}: PublicLinkFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TPublicLinkSchema) => {
    setIsLoading(true);
    try {
      await onSubmitAction(data);
      setIsOpen(false);
    } catch (error) {
      console.log("Error creating public link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className="gap-2">
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <PublicLinkForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
