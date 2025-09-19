"use client";

import React from "react";

interface VersionsTabProps {
  formId: string;
  projectId: string;
}

export function VersionsTab({ formId, projectId }: VersionsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Versions</h2>
      </div>

      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
          Form version history will be displayed here.
        </div>
      </div>
    </div>
  );
}