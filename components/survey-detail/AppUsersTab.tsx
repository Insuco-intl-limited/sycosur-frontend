"use client";

import React from "react";
import { AppUsersFormModal } from "@/components/forms/odk/AppUsersFormModal";
import { AppUsersList } from "@/components/lists/AppUsersList";
import { Badge } from "@/components/ui/badge";
import { useGetAppUsersQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import {useTranslations} from "next-intl";

interface AppUsersTabProps {
  projectId: string | number;
}

export function AppUsersTab({ projectId }: AppUsersTabProps) {
  const { data: appUsersData } = useGetAppUsersQuery(projectId);
  const appUsers = appUsersData?.app_users;
  const { selectedProject } = useViewNavigation();
  const t = useTranslations();
  const hasOdk = !!selectedProject?.odk_id;
  const disabledReason = hasOdk ? undefined : t("forms.buttons.disableReason");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{t("sections.mobileUsers")}</h2>
          <Badge variant="destructive" className="bg-accentBlue ml-2">
            {appUsers?.count || 0}
          </Badge>
        </div>

        <AppUsersFormModal 
          projectId={projectId}
          title=""
          disabled={!hasOdk}
          triggerButton={
            <button
              className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!hasOdk}
              title={disabledReason}
            >
                {t("forms.buttons.newMobileUser")}
            </button>
          }
        />
      </div>

      <AppUsersList projectId={projectId} />
    </div>
  );
}