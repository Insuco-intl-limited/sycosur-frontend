"use client";

import { DataTable } from "@/components/datatable/datatable";
import { useGetAppUsersQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserX } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";
import { formatDate } from "@/utils/formatDate";
import Spinner from "@/components/shared/Spinner";

interface AppUser {
  projectId: number;
  id: number;
  type: string;
  displayName: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  token: string;
  csrf?: string;
  expiresAt?: string;
}

interface AppUsersListProps {
  projectId: string | number;
}

export function AppUsersList({ projectId }: AppUsersListProps) {
  const { data: appUsersData, isLoading, error } = useGetAppUsersQuery(projectId);

  const handleRevokeUser = (user: AppUser) => {
    // TODO: Implement revoke user functionality
    console.log("Revoking user:", user);
  };

  const handleDeleteUser = (user: AppUser) => {
    // TODO: Implement delete user functionality
    console.log("Deleting user:", user);
  };

  const columns: Column<AppUser>[] = [
    {
      key: "displayName",
      header: "Display Name",
      sortable: true,
      width: "40%",
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      width: "30%",
      render: (value: string) => value ? formatDate(value) : "-",
    },
    {
      key: "updatedAt",
      header: "Last Used",
      sortable: true,
      width: "30%",
      render: (value: string) => value ? formatDate(value) : "Never",
    },
  ];

  const actions: ActionItem<AppUser>[] = [
    {
      label: "Revoke",
      icon: <UserX className="h-4 w-4" />,
      onClick: handleRevokeUser,
      variant: "default",
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleDeleteUser,
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
        <p>Error in loading app users</p>
      </div>
    );
  }

  const appUsers = appUsersData?.app_users?.results || [];

  if (appUsers.length === 0) {
    return (
      <div className="rounded-md border p-4 text-center">
        <p>No App user assigned to this project</p>
      </div>
    );
  }

  return (
    <DataTable
      data={appUsers}
      columns={columns}
      actions={actions}
      searchable={true}
      searchPlaceholder="Search..."
      paginated={true}
      pageSize={10}
      exportable={false}
      filterable={false}
      sortable={true}
    />
  );
}
