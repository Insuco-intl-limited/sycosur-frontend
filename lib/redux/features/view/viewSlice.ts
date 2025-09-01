import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

// Define the Project type
export interface Project {
  ID: number;
  name: string;
  description: string;
  createdAt: string;
}

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

// Sample projects data (in a real app, this would come from an API)
const sampleProjects: Project[] = [
  {
    ID: 1,
    name: "Rural Development Project",
    description:
      "A project focused on developing rural areas through sustainable agriculture and infrastructure.",
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    ID: 2,
    name: "Water Access Program",
    description:
      "Program to improve access to clean water in underserved communities.",
    createdAt: "2024-02-10T10:30:00Z",
  },
  {
    ID: 3,
    name: "Community Health Initiative",
    description:
      "Initiative to improve healthcare services and education in local communities.",
    createdAt: "2024-03-01T08:15:00Z",
  },
  {
    ID: 4,
    name: "Digital Education Project",
    description:
      "Project to enhance digital literacy and provide technology resources to schools.",
    createdAt: "2024-02-15T14:45:00Z",
  },
  {
    ID: 5,
    name: "Food Security Program",
    description:
      "Program to address food insecurity through sustainable farming practices.",
    createdAt: "2024-04-01T11:20:00Z",
  },
];

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
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use the sample data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return sampleProjects;
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
        const project = state.projects.find(p => p.ID === projectId);
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