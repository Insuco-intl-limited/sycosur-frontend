"use client";

import type { NavigationItem } from "@/app/[locale]/dashboard/types";
import type { ViewType } from "@/lib/redux/features/view/viewSlice";
import { Project } from "@/types"
import {
  ComputerDesktopIcon,
  CircleStackIcon,
  UsersIcon,
  Cog6ToothIcon,
  FolderIcon,
  BugAntIcon
} from "@heroicons/react/24/solid";
// @ts-ignore
import type { TFunction } from "next-intl";

/**
 * Get navigation items for the General View
 * @param t Translation function
 * @param locale Current locale
 * @param pathname Current pathname for determining active item
 * @returns Array of navigation items for General View
 */
export const getGeneralNavigationItems = (
  t: TFunction,
  locale: string,
  pathname: string
): NavigationItem[] => {
  return [
    // {
    //   id: "dashboard",
    //   label: t("dashboard.menu.dashboard"),
    //   icon: <ComputerDesktopIcon className="w-5 h-5" />,
    //   href: `/${locale}/dashboard`,
    //   isActive: pathname === `/${locale}/dashboard` || pathname === `/${locale}/dashboard/`,
    // },
    {
      id: "projects",
      label: t("dashboard.menu.projects"),
      icon: <FolderIcon className="w-5 h-5" />,
      href: `/${locale}/dashboard/projects`,
      isActive: pathname.startsWith(`/${locale}/dashboard/projects`),
    },
    {
      id: "users",
      label: t("dashboard.menu.users"),
      icon: <UsersIcon className="w-5 h-5" />,
      href: `/${locale}/dashboard/users`,
      isActive: pathname.startsWith(`/${locale}/dashboard/users`),
      disabled: true,
    },
    {
      id: "settings",
      label: t("dashboard.menu.settings"),
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      href: `/${locale}/dashboard/settings`,
      isActive: pathname.startsWith(`/${locale}/dashboard/settings`),
      disabled: true,
    },
  ];
};

/**
 * Get navigation items for the Project View
 * @param t Translation function
 * @param locale Current locale
 * @param project The selected project
 * @param pathname Current pathname for determining active item
 * @returns Array of navigation items for Project View
 */
export const getProjectNavigationItems = (
  t: TFunction,
  locale: string,
  project: Project,
  pathname: string
): NavigationItem[] => {
  const projectBasePath = `/${locale}/dashboard/projects/${project.pkid}`;
  
  return [
    {
      id: "dashboard",
      label: t("dashboard.menu.dashboard"),
      icon: <ComputerDesktopIcon className="w-5 h-5" />,
      href: projectBasePath,
      isActive: pathname === projectBasePath || pathname === `${projectBasePath}/`,
    },
    {
      id: "survey",
      label: t("dashboard.menu.surveys"),
      icon: <BugAntIcon className="w-5 h-5" />,
      href: `${projectBasePath}/surveys`,
      isActive: pathname.startsWith(`${projectBasePath}/surveys`),
      //         children: [
      //     {
      //       id: "web-users",
      //       label: t("dashboard.menu.webUsers"),
      //       href: `${projectBasePath}/surveys/links`,
      //     },
      // ]
    },
    {
      id: "data",
      label: t("dashboard.menu.data"),
      icon: <CircleStackIcon className="w-5 h-5" />,
      ///href: `${projectBasePath}/data`,
      isActive: pathname.startsWith(`${projectBasePath}/data`),
      disabled: true,
      children: [
				{
					id: "sandbox",
					label: t("dashboard.menu.sandbox"),
					href: `/${locale}/dashboard/sandbox`,
				},
				{
					id: "analysis",
					label: t("dashboard.menu.analysis"),
					href: `/${locale}/dashboard/analysis`,
				},
				{
					id: "documentation",
					label: t("dashboard.menu.documentation"),
					href: `/${locale}/dashboard/documentation`,
				},
			],
    },
    {
      id: "project-users",
      label: t("dashboard.menu.users"),
      icon: <UsersIcon className="w-5 h-5" />,
      //href: `${projectBasePath}/users`,
      isActive: pathname.startsWith(`${projectBasePath}/users`),
      children: [
          // {
          //   id: "web-users",
          //   label: t("dashboard.menu.webUsers"),
          //   href: `${projectBasePath}/users/web`,
          // },
          {
            id: "mobile-users",
            label: t("dashboard.menu.mobileUsers"),
            href: `${projectBasePath}/users/mobile`,
          }
      ]
    },
    {
      id: "project-settings",
      label: t("dashboard.menu.settings"),
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      href: `${projectBasePath}/settings`,
      isActive: pathname.startsWith(`${projectBasePath}/settings`),
      disabled: true,
    },
  ];
};

/**
 * Get dynamic navigation items based on the current view type and selected project
 * @param t Translation function
 * @param locale Current locale
 * @param viewType Current view type (general or project)
 * @param selectedProject Currently selected project (if any)
 * @param pathname Current pathname for determining active item
 * @returns Array of navigation items based on the current view
 */
export const getDynamicNavigationItems = (
  t: TFunction,
  locale: string,
  viewType: ViewType,
  selectedProject: Project | null,
  pathname: string
): NavigationItem[] => {
  // Consider we are on a project route when the path includes an ID segment
  const onProjectPath = /\/dashboard\/projects\/\d+/.test(pathname);

  // Show project navigation whenever we're on a project route and we have a project context
  // Also keep backward compatibility if viewType is explicitly set to "project"
  if ((onProjectPath && selectedProject) || (viewType === "project" && selectedProject)) {
    return getProjectNavigationItems(t, locale, selectedProject, pathname);
  }
  
  return getGeneralNavigationItems(t, locale, pathname);
};