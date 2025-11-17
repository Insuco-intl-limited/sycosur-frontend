"use client";
import {useTranslations} from "next-intl";
import { DataTable } from "@/components/datatable/datatable";
import { useGetAppUsersQuery, useRevokeAppUserMutation } from "@/lib/redux/features/surveys/surveyApiSlice";
import { Badge } from "@/components/ui/badge";
import { BsExclamationTriangleFill } from "react-icons/bs";
import {QrCodeIcon, EyeIcon, TrashIcon, UserIcon, XMarkIcon} from "@heroicons/react/24/solid";
import type { Column, ActionItem } from "@/types/datatable";
import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import {toast} from "react-toastify";

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
  qr_code?: string;
}

interface AppUsersListProps {
  projectId: string | number;
}

export function AppUsersList({ projectId }: AppUsersListProps) {
  const { data: appUsersData, isLoading, error } = useGetAppUsersQuery(projectId);
  const [revokeAppUser, { isLoading: isRevoking }] = useRevokeAppUserMutation();
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const t = useTranslations();

  const handleRevokeUser = async (user: AppUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to revoke access for "${user.displayName}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        await revokeAppUser({
          projectId: Number(projectId),
          token: user.token,
        }).unwrap();
        toast.success(t("toast.success.userRevoked"));
      } catch (error) {
        toast.error(t("toast.error.userRevokeFailed"));
      }
    }
  };
const handleViewQRCode = (user: AppUser) => {
    setSelectedUser(user);
    setShowQRModal(true);
  };

  const columns: Column<AppUser>[] = [
    {
      key: "displayName",
      header: t("datatable.columns.name"),
      sortable: true,
      width: "40%",
    },
    {
      key: "createdAt",
      header: t("datatable.columns.createdOn"),
      sortable: true,
      width: "30%",
      render: (value: string) => value ? formatDate(value) : "-",
    },
    {
      key: "updatedAt",
      header: t("datatable.columns.lastUpdatedOn"),
      sortable: true,
      width: "30%",
      render: (value: string) => value ? formatDate(value) : "-",
    },
    {
      key:"token",
      header: t("datatable.columns.status"),
      sortable: false,
      width: "10%",
      render:(value:string)=>value ? <Badge className="bg-deepGreen">Active</Badge>:<Badge className="bg-red-500">Revoked</Badge>

    }
  ];

  const actions: ActionItem<AppUser>[] = [
     {
      label: "QR Code",
      icon: <QrCodeIcon className="h-4 w-4" />,
      onClick: handleViewQRCode,
      variant: "default",
      hidden: (user: AppUser) => !user.token,
    },
    {
      label: t("datatable.actions.revoke"),
      icon: <UserIcon className="h-4 w-4" />,
      onClick: handleRevokeUser,
      variant: "default",
      hidden: (user: AppUser) => !user.token, 
    },

  ];

  if (isLoading) {
    return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
    );
  }

  if (error) {
    return (
      <div className="border p-4 text-center text-amber-600">
         <p>Error in loading app users, check if the project is associated to a survey form</p>
      </div>
    );
  }

  const appUsers = appUsersData?.app_users?.results || [];

  if (appUsers.length === 0) {
    return (
      <div className="rounded-md border p-4 text-center text-gray-500">
        <p>{t("notFound.appUser")}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        data={appUsers}
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
      
      {/* QR Code Modal */}
      {showQRModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedUser.displayName}</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex justify-center">
              {selectedUser.qr_code ? (
                <img
                  src={`data:image/png;base64,${selectedUser.qr_code}`}
                  alt={`QR Code for ${selectedUser.displayName}`}
                  className="max-w-full h-auto"
                />
              ) : (
                <div className="text-gray-500">No QR code available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
