"use client";

import React from "react";

interface SettingsTabProps {
  formId: string;
  projectId: string;
}

export function SettingsTab({ formId, projectId }: SettingsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Settings</h2>
        <div className="px-2 py-1 rounded-md bg-pink-500 text-white text-xs font-medium">
          Open
        </div>
      </div>

      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
          Form settings and configuration options.
        </div>
      </div>
    </div>
  );
}