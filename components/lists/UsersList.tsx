"use client";

import { useState } from "react";
import { DataTable } from "@/components/datatable/datatable";
import { useGetAllUsersQuery, useAssignUserToProjectMutation, useRemoveUserFromProjectMutation } from "@/lib/redux/features/users/usersApiSlice";
import { useGetProjectsQuery } from "@/lib/redux/features/projects/projectApiSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus, Settings, Trash2, Eye } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";
import type { Profile, Project } from "@/types";
import { formatDate } from "@/utils/formatDate";
import Spinner from "@/components/shared/Spinner";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface UsersListProps {
  showPermissionManagement?: boolean;
  projectId?: number;
}

const USER_ROLES = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Project Manager" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

export function UsersList({ showPermissionManagement = false, projectId }: UsersListProps) {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);

  const { data: usersData, isLoading, error } = useGetAllUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();
  const [assignUser] = useAssignUserToProjectMutation();
  const [removeUser] = useRemoveUserFromProjectMutation();
  const t = useTranslations();

  const handleAssignPermission = async () => {
    const targetProjectId = projectId || Number(selectedProject);
    if (!selectedUser || !targetProjectId || !selectedRole) return;

    try {
      await assignUser({
        userId: Number(selectedUser.id),
        projectId: targetProjectId,
        role: selectedRole,
      }).unwrap();

      toast.success(`User ${selectedUser.first_name} ${selectedUser.last_name} assigned to project with ${selectedRole} role`);
      setIsPermissionDialogOpen(false);
      setSelectedUser(null);
      setSelectedRole("");
      setSelectedProject("");
    } catch (error) {
      toast.error("Failed to assign user to project");
    }
  };

  const handleRemovePermission = async (user: Profile) => {
    if (!projectId) return;

    try {
      await removeUser({
        userId: Number(user.id),
        projectId,
      }).unwrap();

      toast.success(`User ${user.first_name} ${user.last_name} removed from project`);
    } catch (error) {
      toast.error("Failed to remove user from project");
    }
  };

  const handleViewUser = (user: Profile) => {
    // TODO: Navigate to user detail page
    console.log("Viewing user:", user);
  };

  const columns: Column<Profile>[] = [
    {
      key: "full_name",
      header: "Name",
      sortable: true,
      width: "25%",
      render: (_, user) => (
        <div className="flex flex-col">
          <span className="font-medium">{user.full_name}</span>
        </div>
      ),
    },
    {
      key: "odk_role",
      header: "ODK Role",
      sortable: true,
      width: "15%",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "country_of_origin",
      header: "Country",
      sortable: true,
      width: "15%",
      render: (value: string) => value || "-",
    },
    {
      key: "date_joined",
      header: "Joined",
      sortable: true,
      width: "20%",
      render: (value: string) => formatDate(value),
    },

    {
      key: "city_of_origin",
      header: "City",
      sortable: true,
      width: "10%",
      render: (value: string) => value || "-",
    },
  ];

  const actions: ActionItem<Profile>[] = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: handleViewUser,
      variant: "default",
    },
    ...(showPermissionManagement ? [
      {
        label: "Assign to Project",
        icon: <UserPlus className="h-4 w-4" />,
        onClick: (user: Profile) => {
          setSelectedUser(user);
          setIsPermissionDialogOpen(true);
        },
        variant: "default" as const,
      },
      {
        label: "Remove from Project",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: handleRemovePermission,
        variant: "destructive" as const,
      },
    ] : []),
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
        <p>Error loading users</p>
      </div>
    );
  }

  const users = usersData?.profiles?.results || [];

  return (
    <div className="space-y-6">
      {showPermissionManagement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Permission Management
            </CardTitle>
            <CardDescription>
              Manage user permissions. Assign roles and control access levels.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {users.length} user{users.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={users}
            columns={columns}
            actions={actions}
            searchable={true}
            searchPlaceholder={t("datatable.search.searchPlaceholder")}
            paginated={true}
            pageSize={10}
            exportable={true}
            exportFormats={[
              { type: "csv", label: "Export as CSV" },
              { type: "json", label: "Export as JSON" },
            ]}
            filterable={true}
            sortable={true}
          />
        </CardContent>
      </Card>

      {/* Permission Assignment Dialog */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign User to Project</DialogTitle>
            <DialogDescription>
              Assign {selectedUser?.first_name} {selectedUser?.last_name} to a project with a specific role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!projectId && (
              <div>
                <label className="text-sm font-medium">Select Project</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectsData?.projects?.results?.map((project) => (
                      <SelectItem key={project.pkid} value={project.pkid.toString()}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Select Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPermissionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignPermission}
              disabled={!selectedRole || (!projectId && !selectedProject)}
            >
              Assign User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
