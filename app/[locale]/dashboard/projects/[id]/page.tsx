"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Users, FileText, Settings, BarChart } from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from "recharts";
import { useGetProjectByIdQuery } from "@/lib/redux/features/projects/projectApiSlice";

// Mock data for charts
const activityData = [
  { name: 'Jan', forms: 4, surveys: 2 },
  { name: 'Feb', forms: 3, surveys: 4 },
  { name: 'Mar', forms: 2, surveys: 3 },
  { name: 'Apr', forms: 5, surveys: 6 },
  { name: 'May', forms: 7, surveys: 4 },
  { name: 'Jun', forms: 6, surveys: 3 },
];

const projectInfoData = [
  { name: 'Total Forms', value: 42 },
  { name: 'Data Analysis Reports', value: 8 },
  { name: 'Complaints Received', value: 15 },
  { name: 'Social Impact Score', value: 87 },
];

export default function ProjectDashboardPage() {
  const t = useTranslations();
  const params = useParams();
  const projectId = params.id as string;
  const numericId = Number(projectId);

  const { data, isLoading, isError } = useGetProjectByIdQuery(numericId, {
    skip: Number.isNaN(numericId),
  });
  const project = data?.project;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold mb-2">{t('project.notFound')}</h1>
        <p className="text-muted-foreground">
          {t('project.notFoundDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project header with name and created date */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>
            {t('project.createdOn')}{" "}
            {new Date(project.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Project description */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{t('project.description')}</h2>
        <p>{project.description}</p>
      </div>

      {/* Project Information */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {projectInfoData.map((info, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{info.name}</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{info.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Activity (Bar chart) */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.monthlyActivity')}</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={activityData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} domain={[0, 8]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="forms" fill="#8884d8" name={t('dashboard.forms')} />
              <Bar dataKey="surveys" fill="#82ca9d" name={t('dashboard.surveys')} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Navigation to other project sections */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('project.sections')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                {t('project.surveys')}
              </CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('project.surveysDescription')}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                {t('project.users')}
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('project.usersDescription')}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                {t('project.settings')}
              </CardTitle>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('project.settingsDescription')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}