"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { 
  selectProject, 
  setViewType, 
  updateFromUrl, 
  loadProjects,
  selectProjects,
  selectViewType,
  selectSelectedProject,
  type ViewType
} from "@/lib/redux/features/view/viewSlice";
import {Project} from "@/types";


/**
 * Hook for handling view navigation and state updates based on URL
 * @returns Functions for navigating between views and selecting projects
 */
export const useViewNavigation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  
  const viewType = useAppSelector(selectViewType);
  const selectedProject = useAppSelector(selectSelectedProject);
  const projects = useAppSelector(selectProjects);

  // Load projects on mount
  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  // Check if we're on a project page and update the state
  useEffect(() => {
    if (pathname && projects.length > 0) {
      const matches = pathname.match(/\/dashboard\/projects\/(\d+)/);
      if (matches && matches[1]) {
        const projectId = parseInt(matches[1], 10);
        dispatch(updateFromUrl({ projectId }));
      } else if (pathname.includes("/dashboard") && !pathname.includes("/projects/")) {
        // If we're on a dashboard page but not a project page, set to general view
        dispatch(updateFromUrl({}));
      }
    }
  }, [pathname, projects, dispatch]);

  // Function to change the view type with navigation
  const changeViewType = (type: ViewType) => {
    dispatch(setViewType(type));
    
    // If switching to general view, navigate to the dashboard
    if (type === "general") {
      // Extract locale from pathname
      const locale = pathname.split('/')[1];
      router.push(`/${locale}/dashboard`);
    }
  };

  // Function to select a project with navigation
  const selectProjectWithNavigation = (project: Project | null) => {
    dispatch(selectProject(project));
    
    // Extract locale from pathname
    const locale = pathname.split('/')[1];
    
    if (project) {
      // Navigate to the project page
      router.push(`/${locale}/dashboard/projects/${project.pkid}`);
    } else {
      // Navigate to the dashboard
      router.push(`/${locale}/dashboard`);
    }
  };

  return {
    viewType,
    selectedProject,
    projects,
    setViewType: changeViewType,
    selectProject: selectProjectWithNavigation,
  };
};