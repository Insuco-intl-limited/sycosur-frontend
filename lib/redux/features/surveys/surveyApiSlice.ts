import {baseApiSlice} from "@/lib/redux/features/api/baseApiSlice";
import {
    AppUsersResponse,
    CreateAppUserResponse,
    CreateFormResponse,
    CreatePublicLinkData,
    CreatePublicLinkResponse,
    FormDetailResponse,
    FormVersionsResponse,
    GenFormParams,
    ProjectFormsResponse,
    PublicLinksResponse,
    SubmissionsListResponse,
    SubmissionDetailResponse,
    CreateDraftFormResponse,
    createDraftFormData,
    DraftFormResponse,
    CreateAssignmentResponse,
    AssignmentsResponse,
    UsersFormAssignment, Matrix
} from "@/types/odk";

const ODK_ENDPOINTS = {
    MATRIX:(projectId: number| string) => `/odk/projects/${projectId}/matrix`,
    ADD_FORMS: (projectId: number | string) => `/odk/projects/${projectId}/forms/`,
    LIST_FORMS: (projectId: number | string) => `/odk/projects/${projectId}/forms`,
    VIEW_FORM: (projectId: number | string, formId: string) => `/odk/projects/${projectId}/forms/${formId}`,
    VERSION_XML: (projectId: number | string, formId: string, versionId: string) => `/odk/projects/${projectId}/forms/${formId}/versions/${versionId}.xml`,
    ADD_APP_USER: (projectId: number) => `odk/projects/${projectId}/app-users/`,
    LIST_APP_USERS: (projectId: number | string) => `/odk/projects/${projectId}/app-users`,
    ADD_SUBMISSION: (projectId: number | string, formId: string) => `/odk/projects/${projectId}/forms/${formId}/submissions/`,
} as const;

interface UploadFormParams {
    projectId: number | string;
    file: File;
    ignoreWarnings?: boolean;
    publish?: boolean;
    formId?: string;
}

interface ExportData extends GenFormParams {
    to?: "csv" | "xlsx";
}

interface ExportResponse {
    data: string | Blob;
    contentType?: string;
    filename?: string;
}

interface XMLVersionParams extends GenFormParams {
    versionId: string;
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

interface CreateSubmissionData {
    instanceName: string;
    submitterId: number;
}

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
        getFormDetails: builder.query<FormDetailResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        deleteForm: builder.mutation<void, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/delete/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],

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
        revokeAppUser: builder.mutation<void, {projectId:number, token:string }>({
                query: ({projectId, token}) => ({
                url: `${ODK_ENDPOINTS.ADD_APP_USER(projectId)}${token}/revoke/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
        assignForm: builder.mutation<CreateAssignmentResponse, GenFormParams & {user_id:number}>({
            query: ({projectId, formId, user_id}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/app-users/${user_id}/`,
                method: "POST",
                body: {}
            }),
            invalidatesTags: ["Project"],
        }),
        unassignForm: builder.mutation<void, GenFormParams & {user_id:number}>({
            query: ({projectId, formId, user_id}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/app-users/${user_id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
        assignments: builder.query<AssignmentsResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/app-users`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        matrix: builder.query<Matrix, { projectId: number }>({
            query: ({projectId}) => ({
                url: ODK_ENDPOINTS.MATRIX(projectId),
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        addSubmission: builder.mutation<SubmissionDetailResponse, GenFormParams & CreateSubmissionData>({
            query: ({projectId, formId, instanceName, submitterId}) => ({
                url: ODK_ENDPOINTS.ADD_SUBMISSION(projectId, formId),
                method: "POST",
                body: {instanceName, submitterId}
            }),
            invalidatesTags: ["Project"],
        }),
        getFormSubmissions: builder.query<SubmissionsListResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/submissions/`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        getSubmissionDetails: builder.query<SubmissionsListResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/submissions/`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        exportSubmissionsData: builder.mutation<ExportResponse, ExportData>({
            query: ({projectId, formId, to = "csv"}) => {
                return {
                    url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/submissions.csv`,
                    method: "POST",
                    headers: {
                        "to": to,
                        Accept: 'text/csv, text/plain, */*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                    responseHandler: async (response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const contentType = response.headers.get("Content-Type") || "";
                        const filename = response.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/["']/g, "");
                        const data = to === "xlsx"
                            ? await response.blob()
                            : await response.text();
                        return {data, contentType, filename};
                    }
                };
            },
        }),
        getPublicLinks: builder.query<PublicLinksResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/public-links/`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        addPublicLink: builder.mutation<CreatePublicLinkResponse, GenFormParams & CreatePublicLinkData>({
            query: ({projectId, formId, displayName, once}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/public-links/`,
                method: "POST",
                body: {display_name: displayName, once}
            }),
            invalidatesTags: ["Project"],
        }),
        getFormVersions: builder.query<FormVersionsResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/versions/`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        getXMLVersion: builder.query<string, XMLVersionParams>({
            query: ({projectId, formId, versionId}) => ({
                url: `${ODK_ENDPOINTS.VERSION_XML(projectId, formId, versionId)}`,
                method: "GET",
                headers: {
                    'Accept': 'application/xml, text/xml, text/plain, */*',
                },
                responseHandler: 'text',
            }),
            providesTags: ["Project"],
        }),
        getFormDraft: builder.query<DraftFormResponse, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/draft/`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
        addFormDraft: builder.mutation<CreateDraftFormResponse, createDraftFormData>({
            query: ({projectId, formId, form, ignore_warnings = false}) => {
                const formData = new FormData();
                formData.append("form", form);

                const params = new URLSearchParams();
                params.set("ignore_warnings", ignore_warnings ? "true" : "false");
                const queryString = params.toString();

                return {
                    url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/draft/${queryString ? `?${queryString}` : ""}`,
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Project"],
        }),
        publishFormDraft: builder.mutation<void, GenFormParams & { version?: string }>({
            query: ({projectId, formId, version}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/draft/publish/`,
                method: "POST",
                body: version ? {version} : {},
            }),
            invalidatesTags: ["Project"],
        }),
        deleteFormDraft: builder.mutation<void, GenFormParams>({
            query: ({projectId, formId}) => ({
                url: `${ODK_ENDPOINTS.VIEW_FORM(projectId, formId)}/draft/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),


    }),
});

export const {
    useUploadProjectFormMutation,
    useGetProjectFormsQuery,
    useAddAppUserMutation,
    useGetAppUsersQuery,
    useGetFormDetailsQuery,
    useDeleteFormMutation,
    useGetFormSubmissionsQuery,
    useGetSubmissionDetailsQuery,
    useGetPublicLinksQuery,
    useAddPublicLinkMutation,
    useGetFormVersionsQuery,
    useGetXMLVersionQuery,
    useGetFormDraftQuery,
    usePublishFormDraftMutation,
    useDeleteFormDraftMutation,
    useAddSubmissionMutation,
    useExportSubmissionsDataMutation,
    useAddFormDraftMutation,
    useRevokeAppUserMutation,
    useAssignFormMutation,
    useUnassignFormMutation,
    useMatrixQuery,
    useAssignmentsQuery,
} = surveyApiSlice;