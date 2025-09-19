"use client";

import React from "react";

interface ProjectRolesTabProps {
  projectId: string | number;
}

export function ProjectRolesTab({ projectId }: ProjectRolesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Project Roles</h2>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Create New Role
        </button>
      </div>

      {/* This would be replaced with actual roles management UI */}
      <div className="rounded-md border p-4 text-center">
        <p>No custom roles defined for this project.</p>
      </div>
    </div>
  );
}