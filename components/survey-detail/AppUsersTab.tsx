"use client";

import React from "react";
import { AppUsersFormModal } from "@/components/forms/odk/AppUsersFormModal";
import { AppUsersList } from "@/components/lists/AppUsersList";
import { Badge } from "@/components/ui/badge";
import { useGetAppUsersQuery } from "@/lib/redux/features/surveys/surveyApiSlice";

interface AppUsersTabProps {
  projectId: string | number;
}

export function AppUsersTab({ projectId }: AppUsersTabProps) {
  const { data: appUsersData } = useGetAppUsersQuery(projectId);
  const appUsers = appUsersData?.app_users;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Mobile Users</h2>
          <Badge variant="destructive" className="bg-accentBlue ml-2">
            {appUsers?.count}
          </Badge>
        </div>

        <AppUsersFormModal 
          projectId={projectId}
          title="Add User"
        />
      </div>

      <AppUsersList projectId={projectId} />
    </div>
  );
}