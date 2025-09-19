"use client";

import React from "react";
import { AppUsersFormModal } from "@/components/forms/odk/AppUsersFormModal";
import { AppUsersList } from "@/components/lists/AppUsersList";

interface AppUsersTabProps {
  projectId: string | number;
}

export function AppUsersTab({ projectId }: AppUsersTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">App Users</h2>
        <AppUsersFormModal 
          projectId={projectId}
          title="Add User"
        />
      </div>

      <AppUsersList projectId={projectId} />
    </div>
  );
}