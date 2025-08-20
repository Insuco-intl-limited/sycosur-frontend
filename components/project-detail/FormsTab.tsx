"use client";

import React from "react";
import { FileUploadFormModal } from "@/components/forms/odk/FileUploadFormModal";

interface FormsTabProps {
  projectId: string | number;
}

export function FormsTab({ projectId }: FormsTabProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Forms</h2>
      <p className="text-muted-foreground">
        Manage forms for project ID: {projectId}
      </p>
      
      {/* This would be replaced with actual forms list and management UI */}
      <div className="rounded-md border p-4 text-center">
        <p>No forms available for this project.</p>
        <FileUploadFormModal 
          projectId={projectId}
          title="Upload Form"
        />
      </div>
    </div>
  );
}