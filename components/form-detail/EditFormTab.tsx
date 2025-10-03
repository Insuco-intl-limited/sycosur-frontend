"use client";

import React from "react";
import { DraftFormContent } from "./EditContent/DraftFormContent";
import { PublishFormContent } from "./EditContent/PublishFormContent";
import { useGetFormDetailsQuery } from "@/lib/redux/features/surveys/surveyApiSlice";

interface EditFormTabProps {
  formId: string;
  projectId: string;
}

export function EditFormTab({ formId, projectId }: EditFormTabProps) {
  const numericProjectId = Number(projectId);
  
  const { data, isLoading } = useGetFormDetailsQuery(
    { projectId: numericProjectId, formId },
    { skip: Number.isNaN(numericProjectId) }
  );

  const form = data?.form;
  const isPublished = !!form?.publishedAt || form?.publish === true;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Edit Form</h2>
      </div>

      {/* Render content based on form state */}
      {isPublished ? (
        <PublishFormContent formId={formId} projectId={projectId} />
      ) : (
        <DraftFormContent formId={formId} projectId={projectId} />
      )}
    </div>
  );
}