// ==================
// Project interfaces
// ==================
export interface Project {
    ID: string | number;
    name: string;
    description: string;
    createdAt: string;
}

export interface OdkProject {
    id: number;
    name: string;
    description: string | null;
    archived: boolean | null;
    keyId: number | null;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    verbs: string[];
}

export interface OdkProjectsResponse {
    status_code: number;
    odkProjects: {
        count: number;
        results: OdkProject[];
        cached: boolean;
        userRole: string;
    };
}

export interface ProjectDeleteResponse {
    detail: string;
}

// =================
// Form interfaces
// =================
export interface Form {
    projectId: number;
    xmlFormId: string;
    state: string;
    enketoId: string | null;
    enketoOnceId: string | null;
    createdAt: string;
    updatedAt: string | null;
    webformsEnabled: boolean;
    keyId: number | null;
    version: string;
    hash: string;
    sha: string;
    sha256: string;
    draftToken: string | null;
    publishedAt: string | null;
    name: string;
    publish?: boolean;
}
export interface ProjectFormsResponse {
    status_code: number;
    project_forms: {
        forms: Form[];
    };
}
export interface CreateFormResponse {
    status_code: number;
    form: Form;
}
export interface FormDetailResponse {
    status_code: number;
    form: Form;
}

// ====================
// App User interfaces
// ====================
export interface AppUser {
    projectId: number;
    id: number;
    type: string;
    displayName: string;
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
    token: string;
    csrf?: string;
    expiresAt?: string;
}

export interface CreateAppUserData {
    displayName: string;
}

export interface CreateAppUserResponse {
    status_code: number;
    app_user: AppUser;
}

export interface AppUsersResponse {
    status_code: number;
    app_users: {
        count: number;
        results: AppUser[];
    }
}

// ========================
// Submission interfaces
// ========================
export interface SubmissionSubmitter {
    id: number;
    type: string; // e.g., 'public_link' | 'user'
    displayName: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

export interface SubmissionVersion {
    submitterId: number;
    createdAt: string;
    instanceName: string;
    instanceId: string;
    current: boolean;
    deviceId?: string | null;
    userAgent?: string;
    submitter?: SubmissionSubmitter;
}

export interface Submission {
    instanceId: string;
    submitterId: number;
    deviceId?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    reviewState?: string | null;
    userAgent?: string;
    deletedAt?: string | null;
    submitter?: SubmissionSubmitter;
    currentVersion: SubmissionVersion;
}

export interface GenFormParams {
    formId: string;
    projectId: number;
}

export interface SubmissionsListResponse {
    status_code: number;
    submissions: {
        results: Submission[];
    };
}

export interface SubmissionDetailResponse {
    status_code: number;
    submission: Submission;
}

// ========================
// Public Access interfaces
// ========================
export interface PublicLink {
    once: boolean;
    id: number;
    type: string;
    displayName: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    token: string;
    public_url: string;
}

export interface PublicLinksResponse {
    status_code: number;
    public_links: {
        results: PublicLink[];
    };
}

export interface CreatePublicLinkData {
    displayName: string;
    once?: boolean;
}

export interface CreatePublicLinkResponse {
    status_code: number;
    public_link: PublicLink;
}

// ========================
// Form versions interfaces
// ========================
export interface FormVersionsResponse {
    status_code: number;
    form_versions: {
        results: Form[];
    };
}
export interface ErrorResponse {
    status_code: number;
    error: string;
    detail: string;
    validation_messages?: string[];
}

// ========================
// Form Draft interfaces
// ========================
export interface CreateDraftFormResponse {
    status_code: number;
    draft_form: {
        success: boolean;
    }
}
export interface createDraftFormData {
    ignore_warnings?: boolean;
    projectId: number;
    formId: string;
    form: File;
}

export interface DraftFormResponse {
    status_code: number;
    form_draft: Form;
}