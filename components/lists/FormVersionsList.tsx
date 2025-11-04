"use client";

import React from "react";
import { DataTable } from "@/components/datatable/datatable";
import { useGetFormVersionsQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Calendar } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";
import { formatDate } from "@/utils/formatDate";
import Spinner from "@/components/shared/Spinner";
import type { Form } from "@/types/odk";
import { useTranslations} from "next-intl";

interface FormVersionsListProps {
  formId: string;
  projectId: string | number;
  onViewXML?: (version: Form) => void;
  onDownloadXML?: (version: Form) => void;
}

export function FormVersionsList({
  formId,
  projectId,
  onViewXML,
  onDownloadXML
}: FormVersionsListProps) {
  const { data: versionsData, isLoading, error } = useGetFormVersionsQuery({
    projectId: Number(projectId),
    formId
  });
  const t = useTranslations();

  const handleViewXML = (version: Form) => {
    if (onViewXML) {
      onViewXML(version);
    } else {
      // Default behavior
      console.log("Viewing XML for version:", version);
    }
  };

  const handleDownloadXML = (version: Form) => {
    if (onDownloadXML) {
      onDownloadXML(version);
    } else {
      // Default behavior
      console.log("Downloading XML for version:", version);
    }
  };

  const columns: Column<Form>[] = [
    {
      key: "version",
      header: t("datatable.columns.version"),
      sortable: true,
      width: "20%",
      render: (value: string) => (
        <Badge variant="secondary" className="font-mono">
          {value}
        </Badge>
      ),
    },
    {
      key: "name",
      header: t("datatable.columns.formName"),
      sortable: true,
      width: "50%",
    },
    {
      key: "state",
      header: t("datatable.columns.state"),
      sortable: true,
      width: "10%",
      render: (value: string) => {
        const variant = value === "open" ? "default" :
                      value === "closed" ? "destructive" :
                      value === "closing" ? "secondary" : "outline";

        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      key: "publishedAt",
      header: t("datatable.columns.publishedDate"),
      sortable: true,
      width: "30%",
      render: (value: string | null) => value ? formatDate(value) : "Not published",
    },

  ];

  const actions: ActionItem<Form>[] = [
    {
      label: t("datatable.actions.view") + " XML",
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewXML,
      variant: "default",
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
        <p>Error loading form versions</p>
      </div>
    );
  }

  const versions = versionsData?.form_versions?.results || [];

  if (versions.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
          No versions available for this form.
        </div>
      </div>
    );
  }

  return (
    <DataTable
      data={versions}
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
  );
}
