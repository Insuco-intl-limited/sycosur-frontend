"use client";

import React from "react";

interface EditFormTabProps {
  formId: string;
  projectId: string;
}

export function EditFormTab({ formId, projectId }: EditFormTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Edit Form</h2>
      </div>

      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
          Form editing options will be available here.
        </div>
      </div>
    </div>
  );
}