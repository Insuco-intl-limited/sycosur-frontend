"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { PublicLinksList } from "@/components/lists/PublicLinksList";
import { useGetPublicLinksQuery, useAddPublicLinkMutation } from "@/lib/redux/features/surveys/surveyApiSlice";
import { PublicLinkFormModal } from "@/components/forms/odk/PublicLinkFormModal";
import { TPublicLinkSchema } from "@/lib/validationSchemas";
import { toast } from "react-toastify";
import type { PublicLink } from "@/types/odk";
import {extractErrorMessage} from "@/utils";

interface PublicAccessTabProps {
  formId: string;
  projectId: string;
}

export function PublicAccessTab({ formId, projectId }: PublicAccessTabProps) {
  const { data: publicLinksData, refetch } = useGetPublicLinksQuery({
    projectId: Number(projectId),
    formId
  });

  const [addPublicLink, { isLoading: isCreating }] = useAddPublicLinkMutation();

  const handleViewLink = (link: PublicLink) => {
    // Open link in new tab
    window.open(link.public_url, '_blank');
  };

  const handleDeleteLink = (link: PublicLink) => {
    // TODO: Implement delete public link functionality
    console.log("Deleting public link:", link);
    toast.info(`Delete functionality for "${link.displayName}" will be implemented soon`);
  };

  const handleCreatePublicLink = async (data: TPublicLinkSchema) => {
    try {
      await addPublicLink({
        projectId: Number(projectId),
        formId,
        displayName: data.displayName,
        once: data.once,
      }).unwrap();

      toast.success(`Public link "${data.displayName}" created successfully`);
      refetch();
    } catch (error) {
      const msg = extractErrorMessage(error)
      toast.error("Failed to create public link" + (msg ? `: ${msg}` : ""));
      throw error;
    }
  };

  const publicLinks = publicLinksData?.public_links?.results || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Public Access</h2>
          <Badge variant="destructive" className="bg-accentBlue ml-2">
            {publicLinks.length}
          </Badge>
        </div>
        <PublicLinkFormModal
          onSubmitAction={handleCreatePublicLink}
          title="Create New Public Link"
          buttonText="New Public Link"
        />
      </div>

      <PublicLinksList
        formId={formId}
        projectId={projectId}
        onViewLink={handleViewLink}
        onDeleteLink={handleDeleteLink}
      />
    </div>
  );
}