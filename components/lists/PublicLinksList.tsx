"use client";

import React from "react";
import { DataTable } from "@/components/datatable/datatable";
import { useGetPublicLinksQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { Badge } from "@/components/ui/badge";
import { Eye, Copy, Trash2 } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";
import { formatDate } from "@/utils/formatDate";
import Spinner from "@/components/shared/Spinner";
import type { PublicLink } from "@/types/odk";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface PublicLinksListProps {
  formId: string;
  projectId: string | number;
  onViewLink?: (link: PublicLink) => void;
  onDeleteLink?: (link: PublicLink) => void;
}

export function PublicLinksList({
  formId,
  projectId,
  onViewLink,
  onDeleteLink
}: PublicLinksListProps) {
  const t = useTranslations();
  const { data: publicLinksData, isLoading, error } = useGetPublicLinksQuery({
    projectId: Number(projectId),
    formId
  });

  const handleViewLink = (link: PublicLink) => {
    if (onViewLink) {
      onViewLink(link);
    } else {
      // Default behavior - open link in new tab
      window.open(link.public_url, '_blank');
    }
  };

  const handleCopyLink = (link: PublicLink) => {
    navigator.clipboard.writeText(link.public_url).then(() => {
      toast.success(t("toast.success.linkCopied"));
    }).catch(() => {
      toast.error(t("toast.error.linkCopyFailed"));
    });
  };

  const handleDeleteLink = (link: PublicLink) => {
    if (onDeleteLink) {
      onDeleteLink(link);
    } else {
      // Default behavior
      console.log("Deleting public link:", link);
    }
  };

  const columns: Column<PublicLink>[] = [
    {
      key: "displayName",
      header: t("datatable.columns.name"),
      sortable: true,
      width: "25%",
    },
    {
      key: "once",
      header: t("datatable.columns.type"),
      sortable: true,
      width: "15%",
      render: (value: boolean) => (
        <Badge variant={value ? "destructive" : "default"}>
          {value ? "Single-use" : "Multi-use"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: t("datatable.columns.createdOn"),
      sortable: true,
      width: "20%",
      render: (value: string) => formatDate(value),
    },
    {
      key: "updatedAt",
      header: t("datatable.columns.lastUpdatedOn"),
      sortable: true,
      width: "20%",
      render: (value: string | null) => value ? formatDate(value) : "-",
    },
    {
      key: "public_url",
      header: t("datatable.columns.publicURL"),
      sortable: false,
      width: "20%",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs truncate max-w-[150px]" title={value}>
            {new URL(value).pathname.split('/').pop()}
          </span>
          <button
            onClick={() => handleCopyLink({ public_url: value } as PublicLink)}
            className="text-muted-foreground hover:text-foreground"
            title={t("datatable.actions.copyLink")}
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      ),
    },
  ];

  const actions: ActionItem<PublicLink>[] = [
    {
      label: t("datatable.actions.view"),
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewLink,
      variant: "default",
    },
    {
      label: t("datatable.actions.copyLink"),
      icon: <Copy className="h-4 w-4" />,
      onClick: handleCopyLink,
      variant: "default",
    },
    {
      label: t("datatable.actions.delete"),
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleDeleteLink,
      variant: "destructive",
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
        <p>Error loading public links</p>
      </div>
    );
  }

  const publicLinks = publicLinksData?.public_links?.results || [];

  if (publicLinks.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <div className="text-center text-muted-foreground">
            {t("notFound.link")}
        </div>
      </div>
    );
  }

  return (
    <DataTable
      data={publicLinks}
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
