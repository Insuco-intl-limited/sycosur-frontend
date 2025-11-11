"use client";

import { AppUsersTab } from "@/components/survey-detail/AppUsersTab";
import { FormAccessTab } from "@/components/survey-detail/FormAccessTab";
import { useParams } from "next/navigation";
import { useGetAppUsersQuery } from "@/lib/redux/features/surveys/surveyApiSlice";

export default function MobileProjectUsersPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);

  const { data: appUsersData } = useGetAppUsersQuery(projectId, {
    skip: Number.isNaN(projectId),
  });

  const appUsers = appUsersData?.app_users;
  const hasMobileUsers = (appUsers?.count || 0) > 0;

  return (
    <div className="flex flex-col h-full p-4 gap-6">
      {hasMobileUsers && (
        <>
          <FormAccessTab projectId={projectId} />
          {/* Separator between contexts */}
          <hr className="border-t border-dotted border-accentBlue" />
        </>
      )}

      <AppUsersTab projectId={projectId} />

    </div>
  );
}
