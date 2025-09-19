import {baseApiSlice} from "@/lib/redux/features/api/baseApiSlice";
import {Project, ProjectCreateData, ProjectResponse, ProjectsResponse} from "@/types";

const PROJECT_ENDPOINTS = {
    BASE: "/projects/",
    BY_ID: (id: number) => `/projects/${id}/`,
} as const;

export const projectApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<ProjectsResponse, void>({
            query: () => ({
                url: PROJECT_ENDPOINTS.BASE,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        getProjectById: builder.query<ProjectResponse, number>({
            query: (id) => ({
                url: PROJECT_ENDPOINTS.BY_ID(id),
                method: "GET",
            }),
            providesTags: (result, error, id) => [{type: "Project", id}],
        }),
        createProject: builder.mutation<ProjectResponse, ProjectCreateData>({
            query: (body) => ({
                url: PROJECT_ENDPOINTS.BASE,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Project"],
        }),
        deleteProject: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: PROJECT_ENDPOINTS.BY_ID(id),
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    // useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApiSlice;