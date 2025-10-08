"use client";

import { useViewNavigation } from "@/hooks/useViewNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Users, FileText, BarChart, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const { projects } = useViewNavigation();
  
  // Get the three most recent projects
  const latestProjects = [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Mock data for line chart
  const monthlyProgress = [
    { month: 'Jan', completed: 65, ongoing: 35 },
    { month: 'Feb', completed: 75, ongoing: 25 },
    { month: 'Mar', completed: 85, ongoing: 15 },
    { month: 'Apr', completed: 70, ongoing: 30 },
    { month: 'May', completed: 90, ongoing: 10 },
    { month: 'Jun', completed: 95, ongoing: 5 }
  ];

  const projectsByStatus = {
    completed: 12,
    ongoing: 8,
    pending: 3,
    overdue: 2
  };

  const completionRate = Math.round((projectsByStatus.completed / (projectsByStatus.completed + projectsByStatus.ongoing + projectsByStatus.pending + projectsByStatus.overdue)) * 100);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>Overview of your projects and activities</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
                className="text-2xl font-bold">{Object.values(projectsByStatus).reduce((acc, curr) => acc + curr, 0)}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        {/* Completed Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsByStatus.completed}</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-chart-2 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        {/* Ongoing Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsByStatus.ongoing}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        {/* Overdue Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsByStatus.overdue}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyProgress}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  className="fill-muted-foreground text-xs"
                />
                <YAxis
                  className="fill-muted-foreground text-xs"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="ongoing"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                  name="Ongoing"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestProjects.map((project, index) => (
              <div key={project.pkid} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  index === 0 ? 'bg-chart-2' : 
                  index === 1 ? 'bg-chart-1' : 'bg-chart-4'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {project.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(project.created_at)}
                    </span>
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Upcoming Activities */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-4 flex items-center">
                <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                Upcoming Activities (3)
              </h4>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Field Training Session</p>
                    <p className="text-xs text-muted-foreground">February 28, 2026</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Support Fund Setup</p>
                    <p className="text-xs text-muted-foreground">March 15, 2026</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overdue Activities */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-4 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Overdue Activities (2)
              </h4>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Beneficiary Training</p>
                    <p className="text-xs text-red-600 dark:text-red-400">5 days overdue</p>
                  </div>
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Quarterly Assessment</p>
                    <p className="text-xs text-red-600 dark:text-red-400">12 days overdue</p>
                  </div>
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <BarChart className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
