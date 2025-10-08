import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import { projectApiSlice } from "@/lib/redux/features/projects/projectApiSlice";
import {Project} from "@/types";


// Define the view types
export type ViewType = "general" | "project";

// Define the state interface
interface ViewState {
  viewType: ViewType;
  selectedProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ViewState = {
  viewType: "general",
  selectedProject: null,
  projects: [],
  isLoading: false,
  error: null,
};

// Async thunk for loading projects
export const loadProjects = createAsyncThunk(
  "view/loadProjects",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(projectApiSlice.endpoints.getProjects.initiate());
      if (result.error) {
        console.log("Error loading projects:", result.error);
        return rejectWithValue("Failed to load projects");
      }
      // Extract the projects array from the API response
      // @ts-ignore
      return result.data.projects.results;
    } catch (error) {
      console.error("Error loading projects:", error);
      return rejectWithValue("Failed to load projects");
    }
  }
);

// Create the slice
const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<ViewType>) => {
      state.viewType = action.payload;
      
      // If switching to general view, clear the selected project
      if (action.payload === "general") {
        state.selectedProject = null;
      }
    },
    selectProject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload;
      
      // If selecting a project, set the view type to project
      if (action.payload) {
        state.viewType = "project";
      } else {
        state.viewType = "general";
      }
    },
    // This action is used when the URL changes to update the state
    updateFromUrl: (state, action: PayloadAction<{ projectId?: number }>) => {
      const { projectId } = action.payload;
      
      if (projectId) {
        const project = state.projects.find(p => p.pkid === projectId);
        if (project) {
          state.selectedProject = project;
          state.viewType = "project";
        }
      } else {
        state.selectedProject = null;
        state.viewType = "general";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setViewType, selectProject, updateFromUrl } = viewSlice.actions;
// Export selectors
export const selectViewState = (state: RootState) => state.view;
export const selectViewType = (state: RootState) => state.view.viewType;
export const selectSelectedProject = (state: RootState) => state.view.selectedProject;
export const selectProjects = (state: RootState) => state.view.projects;
export const selectIsLoading = (state: RootState) => state.view.isLoading;

// Export reducer
export default viewSlice.reducer;