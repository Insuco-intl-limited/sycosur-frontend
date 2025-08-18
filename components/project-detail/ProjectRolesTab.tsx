"use client";

import React from "react";

interface ProjectRolesTabProps {
  projectId: string | number;
}

export function ProjectRolesTab({ projectId }: ProjectRolesTabProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Project Roles</h2>
      <p className="text-muted-foreground">
        Manage roles and permissions for project ID: {projectId}
      </p>
      
      {/* This would be replaced with actual roles management UI */}
      <div className="rounded-md border p-4 text-center">
        <p>No custom roles defined for this project.</p>
        <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Create New Role
        </button>
      </div>
    </div>
  );
}