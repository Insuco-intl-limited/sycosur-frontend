"use client";

import React from "react";

interface EntityListsTabProps {
  projectId: string | number;
}

export function EntityListsTab({ projectId }: EntityListsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Entity Lists</h2>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Create New Entity List
        </button>
      </div>

      {/* This would be replaced with actual entity lists and management UI */}
      <div className="rounded-md border p-4 text-center">
        <p>No entity lists available for this project.</p>
      </div>
    </div>
  );
}