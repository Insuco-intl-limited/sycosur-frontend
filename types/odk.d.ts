export interface Project {
    ID: string | number;
    name: string;
    description: string;
    createdAt: string;
}
export interface ProjectDeleteResponse {
    detail: string;
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

interface Form {
    projectId: number;
    xmlFormId: string;
    state: string;
    enketoId: string;
    enketoOnceId: string | null;
    createdAt: string;
    updatedAt: string | null;
    webformsEnabled: boolean;
    keyId: string | null;
    version: string;
    hash: string;
    sha: string;
    sha256: string;
    draftToken: string;
    publishedAt: string | null;
    name: string;
    publish?: boolean;
}

interface AppUser {
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
