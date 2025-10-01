"use client";

import { useState } from "react";
import { UsersList } from "@/components/lists/UsersList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Shield, Settings, Activity } from "lucide-react";
import { useTranslations } from "next-intl";

export default function UsersPage() {
  const t = useTranslations("users");
  const [activeTab, setActiveTab] = useState("all-users");

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">
            Manage users and their permissions across projects
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              91% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              5% of total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 ">
        <TabsList className="bg-mediumGreen text-white">
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="permissions">Permission Management</TabsTrigger>
          <TabsTrigger value="roles">Roles & Access</TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="space-y-4">
          <UsersList />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardContent className="mt-4">
              <UsersList showPermissionManagement={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>
                  Different access levels and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Administrator</div>
                    <div className="text-sm text-muted-foreground">Full system access</div>
                  </div>
                  <Badge variant="destructive">8 users</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Project Manager</div>
                    <div className="text-sm text-muted-foreground">Project-level management</div>
                  </div>
                  <Badge variant="default">24 users</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Editor</div>
                    <div className="text-sm text-muted-foreground">Can edit and create content</div>
                  </div>
                  <Badge variant="secondary">67 users</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Viewer</div>
                    <div className="text-sm text-muted-foreground">Read-only access</div>
                  </div>
                  <Badge variant="outline">43 users</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
                <CardDescription>
                  What each role can do in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-5 gap-2 text-sm font-medium">
                    <div>Permission</div>
                    <div>Admin</div>
                    <div>Manager</div>
                    <div>Editor</div>
                    <div>Viewer</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div>Create Projects</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>❌</div>
                    <div>❌</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div>Delete Projects</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>❌</div>
                    <div>❌</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div>Manage Users</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>❌</div>
                    <div>❌</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div>Edit Forms</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>❌</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div>View Data</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>✅</div>
                    <div>✅</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
