"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FormVersionsList } from "@/components/lists/FormVersionsList";
import { XMLViewerModal } from "@/components/forms/odk/XMLViewerModal";
import { useGetFormVersionsQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import type { Form } from "@/types/odk";
import {useTranslations} from "next-intl";

interface VersionsTabProps {
  formId: string;
  projectId: string;
}

export function VersionsTab({ formId, projectId }: VersionsTabProps) {
  const { data: versionsData } = useGetFormVersionsQuery({
    projectId: Number(projectId),
    formId
  });

  const [selectedVersion, setSelectedVersion] = useState<Form | null>(null);
  const [isXMLModalOpen, setIsXMLModalOpen] = useState(false);
  const t = useTranslations();

  const handleViewXML = (version: Form) => {
    setSelectedVersion(version);
    setIsXMLModalOpen(true);
  };

  const handleDownloadXML = (version: Form) => {
    // TODO: Implement direct XML download functionality
    console.log("Downloading XML for version:", version);
    // For now, we'll open the modal which has download functionality
    handleViewXML(version);
  };

  const handleCloseXMLModal = () => {
    setIsXMLModalOpen(false);
    setSelectedVersion(null);
  };

  const versions = versionsData?.form_versions?.results || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{t("sections.versions")}</h2>
          <Badge variant="destructive" className="bg-accentBlue ml-2">
            {versions.length}
          </Badge>
        </div>
      </div>

      <FormVersionsList
        formId={formId}
        projectId={projectId}
        onViewXML={handleViewXML}
        onDownloadXML={handleDownloadXML}
      />

      <XMLViewerModal
        isOpen={isXMLModalOpen}
        onCloseAction={handleCloseXMLModal}
        version={selectedVersion}
        projectId={projectId}
        formId={formId}
      />
    </div>
  );
}