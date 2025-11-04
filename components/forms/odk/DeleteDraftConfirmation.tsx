"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

interface DeleteDraftConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export function DeleteDraftConfirmation({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteDraftConfirmationProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.log("Error deleting draft:", error);
      toast.error("Error deleting draft");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <TrashIcon className="w-5 h-5 text-red-600" />
            Delete Draft
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="block">
              Are you sure you want to delete this draft? This action cannot be undone.
            </span>
            <span className="block bg-amber-50 border border-amber-200 rounded-md p-3">
              <span className="text-sm text-amber-800">
                <span className="font-medium">Note:</span> This will only delete the working draft. 
                The currently published version of the form will remain unchanged.
              </span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? "Deleting..." : "Delete Draft"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}