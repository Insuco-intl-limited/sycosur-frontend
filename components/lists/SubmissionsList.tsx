"use client";

import React from "react";
import { DataTable } from "@/components/datatable/datatable";
import { useGetFormSubmissionsQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";
import { formatDate } from "@/utils/formatDate";
import Spinner from "@/components/shared/Spinner";
import type { Submission } from "@/types/odk";
import {useTranslations} from "next-intl";
import { SubmissionDetailsDialog } from "@/components/forms/odk/SubmissionDetailsDialog";


interface SubmissionsListProps {
  formId: string;
  projectId: string | number;
  onViewSubmission?: (submission: Submission) => void;
  onDownloadSubmission?: (submission: Submission) => void;
}

export function SubmissionsList({
  formId,
  projectId,
  onViewSubmission,
}: SubmissionsListProps) {
  const { data: submissionsData, isLoading, error } = useGetFormSubmissionsQuery({
    projectId: Number(projectId),
    formId
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null);
  const t = useTranslations();

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setDialogOpen(true);
    // If a custom handler is passed, still allow it to run after opening the dialog
    if (onViewSubmission) onViewSubmission(submission);
  };

  const reviewBadge = (value?: string | null) => {
    if (!value) return <Badge variant="outline">None</Badge>;
    const variant = value === "approved" ? "default" :
                  value === "rejected" ? "destructive" :
                  value === "hasIssues" ? "secondary" : "outline";
    return <Badge variant={variant}>{value}</Badge>;
  };

  const columns: Column<Submission>[] = [
    {
      key: "instanceId",
      header: t("datatable.columns.instance"),
      sortable: true,
      width: "28%",
      render: (value: string) => (
        <span className="font-mono text-sm truncate" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: "submitter",
      header: t("datatable.columns.submitter"),
      accessor: (item) => item.submitter?.displayName ?? "",
      sortable: true,
      width: "22%",
      render: (_: any, submission: Submission) => (
        <span className="text-sm" title={submission.submitter?.displayName || ''}>
          {submission.submitter?.displayName || "—"}
        </span>
      ),
    },
    {
      key: "submitterType",
      header: t("datatable.columns.type"),
      accessor: (item) => item.submitter?.type ?? "",
      sortable: true,
      width: "15%",
      render: (_: any, submission: Submission) => (
        <Badge variant="outline">{submission.submitter?.type || "—"}</Badge>
      ),
    },
    {
      key: "createdAt",
      header: t("datatable.columns.submissionDate"),
      sortable: true,
      width: "20%",
      render: (value: string) => formatDate(value),
    },

    {
      key: "reviewState",
      header: t("datatable.columns.reviewState"),
      sortable: true,
      width: "15%",
      render: (value: string | undefined) => {
        if (!value) return <Badge variant="outline">None</Badge>;

        const variant = value === "approved" ? "default" :
                      value === "rejected" ? "destructive" :
                      value === "hasIssues" ? "secondary" : "outline";

        return <Badge variant={variant}>{value}</Badge>;
      },
    },
  ];

  const actions: ActionItem<Submission>[] = [
    {
      label: t("datatable.actions.view"),
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewSubmission,
      variant: "default",
      hidden: () => true,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border p-4 text-center text-red-600">
        <p>Error loading submissions</p>
      </div>
    );
  }

  const submissions = submissionsData?.submissions?.results || [];

  if (submissions.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
            {t("notFound.submissions")}
        </div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        data={submissions}
        columns={columns}
        actions={actions}
        searchable={true}
        searchPlaceholder={t("datatable.search.searchPlaceholder")}
        paginated={true}
        pageSize={10}
        exportable={false}
        filterable={false}
        sortable={true}
      />

      {/* Submission details dialog */}
      <SubmissionDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        submission={selectedSubmission}
      />
    </>
  );
}
