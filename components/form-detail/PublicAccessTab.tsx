"use client";

import React from "react";

interface PublicAccessTabProps {
  formId: string;
  projectId: string;
}

export function PublicAccessTab({ formId, projectId }: PublicAccessTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Public Access</h2>
      </div>

      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
          Public access settings for this form.
        </div>
      </div>
    </div>
  );
}