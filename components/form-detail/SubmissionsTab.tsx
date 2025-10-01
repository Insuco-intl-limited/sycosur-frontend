"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { SubmissionsList } from "@/components/lists/SubmissionsList";
import { useGetFormSubmissionsQuery, useLazyExportSubmissionsDataQuery } from "@/lib/redux/features/surveys/surveyApiSlice";

interface SubmissionsTabProps {
  formId: string;
  projectId: string;
}

export function SubmissionsTab({ formId, projectId }: SubmissionsTabProps) {
  const { data: submissionsData } = useGetFormSubmissionsQuery({
    projectId: Number(projectId),
    formId
  });

  const [triggerExport, { isFetching: isExporting }] = useLazyExportSubmissionsDataQuery();

  const handleNewSubmission = () => {
    // TODO: Implement new submission functionality
    console.log("Creating new submission for form:", formId, "in project:", projectId);
  };

  const handleSubmissionsExport = async () => {
    try {
      const csvText = await triggerExport({ projectId: Number(projectId), formId }).unwrap();
      const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formId}-submissions.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to export submissions:", e);
    }
  };

  const submissions = submissionsData?.submissions?.results || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Submissions</h2>
          <Badge variant="destructive" className="bg-accentBlue ml-2">
            {submissions.length}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSubmissionsExport} className="gap-2" disabled={isExporting}>
            <Download className="h-4 w-4"/>
            {isExporting ? "Exporting..." : "Export to CSV"}
          </Button>
          <Button onClick={handleNewSubmission} className="gap-2">
            <Plus className="h-4 w-4" />
            New Submission
          </Button>
        </div>
      </div>

      <SubmissionsList
        formId={formId}
        projectId={projectId}
      />
    </div>
  );
}