import {baseApiSlice} from "@/lib/redux/features/api/baseApiSlice";
import {AppUsersResponse, CreateAppUserResponse, CreateFormResponse, ProjectFormsResponse} from "@/types/odk";

const ODK_ENDPOINTS = {
    ADD_FORMS: (projectId: number | string) => `/odk/projects/${projectId}/forms/`,
    LIST_FORMS: (projectId: number | string) => `/odk/projects/${projectId}/forms`,
    ADD_APP_USER: (projectId: number) => `odk/projects/${projectId}/app-users/`,
    LIST_APP_USERS: (projectId: number | string) => `/odk/projects/${projectId}/app-users`,
} as const;

interface UploadFormParams {
    projectId: number | string;
    file: File;
    ignoreWarnings?: boolean;
    publish?: boolean;
    formId?: string;
}

const buildFormUploadQuery = ({projectId, file, ignoreWarnings = false, publish = false, formId}: UploadFormParams) => {
    const formData = new FormData();
    formData.append("form", file);

    const queryParams = buildFormQueryParams(formId, ignoreWarnings, publish);
    const queryString = queryParams.toString();

    return {
        url: `${ODK_ENDPOINTS.ADD_FORMS(projectId)}${queryString ? `?${queryString}` : ""}`,
        method: "POST" as const,
        body: formData,
    };
};

const buildFormQueryParams = (formId: string | undefined, ignoreWarnings: boolean, publish: boolean): URLSearchParams => {
    const params = new URLSearchParams();

    if (typeof formId === "string" && formId.trim().length > 0) {
        params.set("form_id", formId.trim());
    }
    params.set("ignore_warnings", ignoreWarnings ? "true" : "false");
    params.set("publish", publish ? "true" : "false");

    return params;
};

export const surveyApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadProjectForm: builder.mutation<CreateFormResponse, UploadFormParams>({
            query: buildFormUploadQuery,
            invalidatesTags: ["Project"],
        }),
        getProjectForms: builder.query<ProjectFormsResponse, number | string>({
            query: (projectId) => ({
                url: ODK_ENDPOINTS.LIST_FORMS(projectId),
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        addAppUser: builder.mutation<CreateAppUserResponse, { projectId: number; displayName: string }>({
            query: ({projectId, displayName}) => ({
                url: ODK_ENDPOINTS.ADD_APP_USER(projectId),
                method: "POST",
                body: {display_name: displayName},
            }),
            invalidatesTags: ["Project"],
        }),
        getAppUsers: builder.query<AppUsersResponse, number | string>({
            query: (projectId) => ({
                url: ODK_ENDPOINTS.LIST_APP_USERS(projectId),
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
    }),
});

export const {
    useUploadProjectFormMutation,
    useGetProjectFormsQuery,
    useAddAppUserMutation,
    useGetAppUsersQuery,
} = surveyApiSlice;