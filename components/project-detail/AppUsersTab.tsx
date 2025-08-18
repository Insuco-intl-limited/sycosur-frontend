"use client";

import React from "react";

interface AppUsersTabProps {
  projectId: string | number;
}

export function AppUsersTab({ projectId }: AppUsersTabProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">App Users</h2>
      <p className="text-muted-foreground">
        Manage application users for project ID: {projectId}
      </p>
      
      {/* This would be replaced with actual users management UI */}
      <div className="rounded-md border p-4 text-center">
        <p>No app users assigned to this project.</p>
        <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Add User
        </button>
      </div>
    </div>
  );
}