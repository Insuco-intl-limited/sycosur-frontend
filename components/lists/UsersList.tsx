"use client";

import { useState } from "react";
import { DataTable } from "@/components/datatable/datatable";
import { useGetAllUsersQuery, useAssignUserToProjectMutation, useRemoveUserFromProjectMutation } from "@/lib/redux/features/users/usersApiSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Settings, Trash2, Eye } from "lucide-react";
import type { Column, ActionItem } from "@/types/datatable";
import { formatDate } from "@/utils/formatDate";
import Spinner from "@/components/shared/Spinner";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  role?: string;
  projects?: Array<{ id: number; name: string; role: string }>;
}

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 1, searchTerm: "" });

  const { data: usersData, isLoading, error } = useGetAllUsersQuery();
  const [assignUser] = useAssignUserToProjectMutation();
  const [removeUser] = useRemoveUserFromProjectMutation();

  const handleAssignPermission = async () => {
    if (!selectedUser || !projectId || !selectedRole) return;

    try {
      await assignUser({
        userId: selectedUser.id,
        projectId,
        role: selectedRole,
      }).unwrap();

      toast.success(`User ${selectedUser.firstName} ${selectedUser.lastName} assigned to project with ${selectedRole} role`);
      setIsPermissionDialogOpen(false);
      setSelectedUser(null);
      setSelectedRole("");
    } catch (error) {
      toast.error("Failed to assign user to project");
    }
  };

  const handleRemovePermission = async (user: User) => {
    if (!projectId) return;

    try {
      await removeUser({
        userId: user.id,
        projectId,
      }).unwrap();

      toast.success(`User ${user.firstName} ${user.lastName} removed from project`);
    } catch (error) {
      toast.error("Failed to remove user from project");
    }
  };

  const handleViewUser = (user: User) => {
    // TODO: Navigate to user detail page
    console.log("Viewing user:", user);
  };

  const columns: Column<User>[] = [
    {
      key: "firstName",
      header: "Name",
      sortable: true,
      width: "25%",
      render: (_, user) => (
        <div className="flex flex-col">
          <span className="font-medium">{user.firstName} {user.lastName}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      sortable: true,
      width: "15%",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      width: "15%",
      render: (value: string) => value ? (
        <Badge variant="outline">{value}</Badge>
      ) : "-",
    },
    {
      key: "createdAt",
      header: "Joined",
      sortable: true,
      width: "20%",
      render: (value: string) => formatDate(value),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      sortable: true,
      width: "25%",
      render: (value: string) => value ? formatDate(value) : "Never",
    },
  ];

  const actions: ActionItem<User>[] = [
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
        onClick: (user: User) => {
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
        disabled: (user: User) => !user.projects?.some(p => p.id === projectId),
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

  const users = usersData?.results || [];

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
              Manage user permissions for this project. Assign roles and control access levels.
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
            searchPlaceholder="Search users by name or email..."
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
              Assign {selectedUser?.firstName} {selectedUser?.lastName} to this project with a specific role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
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
              disabled={!selectedRole}
            >
              Assign User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
