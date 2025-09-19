"use client";

import React from "react";

interface SubmissionsTabProps {
  formId: string;
  projectId: string;
}

export function SubmissionsTab({ formId, projectId }: SubmissionsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Submissions</h2>
      </div>

      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
          No submissions available for this form.
        </div>
      </div>
    </div>
  );
}